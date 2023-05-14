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
 * 회원 관련 비즈니스 ServiceImplements
 */
@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberMapper memberMapper;

	/**
	 * 회원가입을 통해 신규가입 시 사용되는 ServiceImplements
	 */
	@Override
	public void register(String username, String userid, String userpw, String userph, String email) throws Exception {
		Member member = new Member();
		member.setUsername(username);
		member.setUserid(userid);
		member.setUserpw(userpw);
		member.setUserph(userph);
		member.setEmail(email);
		memberMapper.CreateMember(member);
		memberMapper.CreateAuthority(member);
	}

	@Override
	public int checkUserId(String userid) {
		return memberMapper.checkUserId(userid);
	}

	/**
	 * 회원이 가입 후 잃어버린 아이디와 비밀번호 변경을 위한 ServiceImplements
	 */
	@Override
	public String lostIdSearch(String userName, String userPh) throws Exception {
		Member lostIdMember = new Member();
		lostIdMember.setUsername(userName);
		lostIdMember.setUserph(userPh);
		return memberMapper.lostIdSearch(lostIdMember).getUserid();
	}

	@Override
	public String lostPasswordChange(Map<String, Object> lostPasswordData) throws Exception {
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
			memberMapper.lostPasswordChange(member);
			result = "true";
		}
		return result;
	}

	/**
	 * 가입된 회원이 로그인 시 사용되는 ServiceImplements
	 */
	@Override
	public Member login(Map<String, Object> loginData) {
		Member loginMember = new Member();
		loginMember.setUserid(loginData.get("userid").toString());
		loginMember.setUserpw(loginData.get("userpw").toString());
		return memberMapper.login(loginMember);
	}

	/**
	 * 가입된 회원이 회원정보 수정을 하기 위해 사용되는 ServiceImplements
	 */
	@Override
	public void updateMember(Map<String, Object> updateData) throws Exception {
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
		memberMapper.update(member);
	}

	@Override
	public Member usingProfile(String userid) {
		return memberMapper.usingProfile(userid);
	}

	/**
	 * 프로필 사진을 수정하기 위해 사용되는 ServiceImplements
	 */
	@Override
	public String profileImgUpload(Map<String, Object> imgData) throws Exception {
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
		if (count != 0) {
			memberMapper.memberDeleteProfileImg(userid);
			memberMapper.profileImageDelete(userid);
		}
		memberMapper.profileImgUpload(map);
		memberMapper.profileImgMemberUpload(map);
		return uuid;
	}

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

	/**
	 * 북마크를 등록, 삭제 하기 위해 사용되는 ServiceImplements
	 */
	@Override
	public void createBookmark(Map<String, Object> BookmarkData) throws Exception {
		memberMapper.createBookmark(BookmarkData);
	}

	@Override
	public List<Map<String, Object>> getBookmarkList(String userid) {
		return memberMapper.getBookmarkList(userid);
	}

	@Override
	public void infoDeleteBookmark(@RequestBody Map<String, Object> BookmarkData) throws Exception {
		memberMapper.deleteBookmark(BookmarkData);
	}

	@Override
	public void deleteBookmark(List<Map<String, Object>> BookmarkList) throws Exception {
		for (Map<String, Object> map : BookmarkList) {
			memberMapper.deleteBookmark(map);
		}
	}

	/**
	 * 회원 스스로 탈퇴하기 위한 ServiceImplements
	 */
	@Override
	public void userWithdrawal(Map<String, Object> userData) throws Exception {
		String sessionUserid = userData.get("sessionUserid").toString();
		String userid = userData.get("userid").toString();
		if (sessionUserid.equals(userid)) {
			Map<String, Object> map = new HashMap<>();
			String uuid = userid + UUID.randomUUID().toString();
			map.put("userid", userid);
			map.put("randomUUID", uuid);
			memberMapper.userSelfWithdrawalHERITAGEREVIEW(map);
			memberMapper.userSelfWithdrawalRATE(map);
			memberMapper.userSelfWithdrawalBOOKMARK(userid);
			memberMapper.userSelfWithdrawalPROFILEIMAGE(userid);
			memberMapper.userSelfrWithdrawalAUTHORITY(userid);
			memberMapper.userSelfWithdrawalMEMBER(userid);			
		} else {
			throw new Exception();
		} 
	};
}
