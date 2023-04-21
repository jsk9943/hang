package ezen.hang.heritage.domain.member.service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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
	public void register(String username, String userid, String userpw, String userph, String email) throws Exception {
		Member member = new Member();
		member.setUsername(username);
		member.setUserid(userid);
		member.setUserpw(userpw);
		member.setUserph(userph);
		member.setEmail(email);
		memberMapper.CreateMember(member);
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

	// 아이디 찾기
	@Override
	public String lostIdSearch(String userName, String userPh) {
		String result = null;
		Member lostIdMember = new Member();
		lostIdMember.setUsername(userName);
		lostIdMember.setUserph(userPh);
		try {
			result = memberMapper.lostIdSearch(lostIdMember).getUserid();
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	// 비밀번호 분실 변경
	@Override
	public String lostPasswordChange(Map<String, Object> lostPasswordData) {
		String result = null;
		Member member = new Member();
		String userid = lostPasswordData.get("userid").toString();
		String username = lostPasswordData.get("username").toString();
		String userph = lostPasswordData.get("userph").toString();
		String email = lostPasswordData.get("email").toString();
		String userpw = lostPasswordData.get("userChangePassword").toString();
		member = memberMapper.usingProfile(userid);
		if (member == null) {
			result = "ID_DENIED";
		} else if (!member.getUsername().equals(username)) {
			result = "NAME_DENIED";
		} else if (!member.getUserph().equals(userph)) {
			result = "PHONE_DENIED";
		} else if (!member.getEmail().equals(email)) {
			result = "EMAIL_DENIED";
		} else {
			member.setUserid(userid);
			member.setUsername(username);
			member.setUserph(userph);
			member.setEmail(email);
			member.setUserpw(userpw);
			try {
				memberMapper.lostPasswordChange(member);
				result = "true";
			} catch (Exception e) {
				result = "false";
			}
		}
		return result;
	}

	// 회원정보 수정
	@Override
	public String updateMember(Map<String, Object> updateData) {
		Member member = new Member();
		String userid = updateData.get("userid").toString();
		String username = updateData.get("username").toString();
		String email = updateData.get("email").toString();
		String userpw = updateData.get("userpw").toString();
		String userph = updateData.get("userph").toString();
		member.setUserid(userid);
		if (username.equals("")) {
			username = null;
		}
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
		member.setUsername(username);
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

	// 프로필 사진 등록하기(등록 전 기존 파일 확인 후 삭제처리)
	@Override
	public String profileImgUpload(Map<String, Object> imgData) {
		String result = null;
		Map<String, Object> map = new HashMap<>();
		String uuid = UUID.randomUUID().toString();
		String userid = imgData.get("userid").toString();
		String imagefile = imgData.get("imgBase64Data").toString();
		String[] parts = imagefile.split(",", 2);
		String base64Data = parts[1];
		byte[] bytes = Base64.getDecoder().decode(base64Data);
		map.put("imagefile", bytes);
		map.put("userid", userid);
		map.put("imagefilename", uuid);
		int count = memberMapper.profileUploadBefore(userid);
		try {
			if (count != 0) {
				memberMapper.memberDeleteProfileImg(userid);
				memberMapper.profileImageDelete(userid);
			}
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
				headers.setContentType(MediaType.IMAGE_JPEG);
				return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
			} catch (IOException | SQLException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	// 북마크 생성
	public void createBookmark(Map<String, Object> BookmarkData) throws Exception {
		memberMapper.createBookmark(BookmarkData);
	}

	// 북마크 가져오기
	@Override
	public List<Map<String, Object>> getBookmarkList(String userid) {
		return memberMapper.getBookmarkList(userid);
	}

	// 인포창에서 버튼을 통한 단일 문화재 북마크 삭제
	@Override
	public void infoDeleteBookmark(@RequestBody Map<String, Object> BookmarkData) throws Exception {
		memberMapper.deleteBookmark(BookmarkData);
	}

	// 북마크 삭제 기능
	@Override
	public void deleteBookmark(List<Map<String, Object>> BookmarkList) throws Exception {
		for (Map<String, Object> map : BookmarkList) {
			memberMapper.deleteBookmark(map);
		}
	}
	
	// 회원탈퇴 기능
	@Override
	public void userWithdrawal(Map<String, Object> userData) throws Exception {
		String sessionUserid = userData.get("sessionUserid").toString();
		String userid = userData.get("userid").toString();
		if(sessionUserid.equals(userid)) {
			memberMapper.userWithdrawal1(userid);
			memberMapper.userWithdrawal2(userid);
			memberMapper.userWithdrawal3(userid);
			memberMapper.userWithdrawal4(userid);
			memberMapper.userWithdrawal5(userid);			
		} else {
			throw new Exception();
		}
	};
}
