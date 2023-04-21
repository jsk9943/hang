package ezen.hang.heritage.domain.member.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import ezen.hang.heritage.domain.member.dto.Member;

/**
 * 회원 관련 비즈니스 Service
 */
public interface MemberService {

	/**
	 * 회원가입을 통해 신규가입 시 사용되는 Service 
	 */
	public void register(String username, String userid, String userpw, String userph, String email) throws Exception;

	public int checkUserId(String userid);
	
	/**
	 * 회원이 가입 후 잃어버린 아이디와 비밀번호 변경을 위한 Service
	 */
	public String lostIdSearch(String userName, String userPh) throws Exception;
	
	public String lostPasswordChange(Map<String, Object> lostPasswordData) throws Exception;
	
	/**
	 * 가입된 회원이 로그인 시 사용되는 Service 
	 */
	public Member login(Map<String, Object> loginData);
	
	/**
	 * 가입된 회원이 회원정보 수정을 하기 위해 사용되는 Service
	 */
	public void updateMember(Map<String, Object> updateData) throws Exception;

	public Member usingProfile(String userid);

	/**
	 * 프로필 사진을 수정하기 위해 사용되는 Service
	 */
	public String profileImgUpload(Map<String, Object> imgData) throws Exception;

	public ResponseEntity<byte[]> profileImgLoading(Map<String, Object> imgData);
	
	/**
	 * 북마크를 등록, 삭제 하기 위해 사용되는 Service
	 */
	public void createBookmark(Map<String, Object> BookmarkData) throws Exception;

	public List<Map<String, Object>> getBookmarkList(String userid);
	
	public void infoDeleteBookmark(@RequestBody Map<String, Object> BookmarkData) throws Exception;

	public void deleteBookmark(List<Map<String, Object>> BookmarkList) throws Exception;
	
	/**
	 * 회원 스스로 탈퇴하기 위한 Service
	 */
	public void userWithdrawal(Map<String, Object> userData) throws Exception;
}
