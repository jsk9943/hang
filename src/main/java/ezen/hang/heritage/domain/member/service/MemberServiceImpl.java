package ezen.hang.heritage.domain.member.service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ezen.hang.heritage.domain.member.dto.Member;
import ezen.hang.heritage.domain.member.mapper.MemberMapper;

/**
 * 회원 관련 비즈니스 메소드 구현
 */
@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberMapper memberMapper;

	// 회원가입
	@Override
	public String register(Member member) {
		String result = null;
		try {
			memberMapper.CreateMember(member);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	// 로그인
	@Override
	public Member login(Map<String, Object> loginData) {
		Member loginMember = new Member();
		loginMember.setUserid(loginData.get("userid").toString());
		loginMember.setUserpw(loginData.get("userpw").toString());
		return memberMapper.login(loginMember);
	}

	// 아이디 체크
	@Override
	public int checkUserId(String userid) {
		return memberMapper.checkUserId(userid);
	}

	// 회원정보 수정
	@Override
	public String updateMember(Map<String, Object> updateData) {
		Member member = new Member();
		String userid = updateData.get("userid").toString();
		String email = updateData.get("email").toString();
		String userpw = updateData.get("userpw").toString();
		String userph = updateData.get("userph").toString();
		member.setUserid(userid);
		if (email.equals("")) {
			email = null;
		}
		if (userpw.equals("")) {
			userpw = null;
		}
		if (userph.equals("")) {
			Member userSavePh = usingProfile(userid);
			userph = userSavePh.getUserph();
		}
		member.setEmail(email);
		member.setUserpw(userpw);
		member.setUserph(userph);
		String result = null;
		try {
			memberMapper.update(member);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	// 아이디로 회원정보 가져오기
	@Override
	public Member usingProfile(String userid) {
		return memberMapper.usingProfile(userid);
	}

	// 프로필 사진 등록하기
	@Override
	public String profileImgUpload(Map<String, Object> imgData) {
		String result = null;
		Map<String, Object> map = new HashMap<>();
		String uuid = UUID.randomUUID().toString();
		String userid = imgData.get("userid").toString();
		String imagefile = imgData.get("imgBase64Data").toString();
		String[] parts = imagefile.split(",", 2);
		String base64Data = parts[1]; // "/9j/4AAQSkZJRgABAQ"
		byte[] bytes = Base64.getDecoder().decode(base64Data);
		map.put("imagefile", bytes);
		map.put("userid", userid);
		map.put("imagefilename", uuid);
		try {
			memberMapper.profileImgUpload(map);
			memberMapper.profileImgMemberUpload(map);
			result = uuid;
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	// 프로필 사진 가져오기
	@Override
	public ResponseEntity<byte[]> profileImgLoading(Map<String, Object> imgData) {
		Map<String, Object> map = memberMapper.profileImgLoading(imgData);
		if (map != null) {
			Blob imageFile = (Blob) map.get("IMAGEFILE");
			try (InputStream inputStream = imageFile.getBinaryStream()) {
				byte[] imageBytes = inputStream.readAllBytes();
				HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.IMAGE_JPEG); // 이미지 파일의 MIME 타입에 맞게 설정
				return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
			} catch (IOException | SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
