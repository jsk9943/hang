package ezen.hang.heritage.domain.member.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import ezen.hang.heritage.domain.member.dto.Member;

/**
 * 회원 관련 비즈니스 메소드 선언
 */
public interface MemberService {

	// 회원가입
	public void register(String username, String userid, String userpw, String userph, String email) throws Exception;

	// 로그인
	public Member login(Map<String, Object> loginData);

	// 아이디 체크
	public int checkUserId(String userid);
	
	// 아이디 찾기
	public String lostIdSearch(String userName, String userPh);
	
	// 비밀번호 분실 변경
	public String lostPasswordChange(Map<String, Object> lostPasswordData);

	// 회원정보 수정
	public String updateMember(Map<String, Object> updateData);

	// 아이디로 회원정보 가져오기
	public Member usingProfile(String userid);

	// 프로필 사진 등록하기
	public String profileImgUpload(Map<String, Object> imgData);

	// 프로필 사진 가져오기
	public ResponseEntity<byte[]> profileImgLoading(Map<String, Object> imgData);
	
	// 북마크 생성
	public void createBookmark(Map<String, Object> BookmarkData) throws Exception;

	// 북마크 기능
	public List<Map<String, Object>> getBookmarkList(String userid);
	
	// 인포창에서 버튼을 통한 단일 문화재 북마크 삭제
	public void infoDeleteBookmark(@RequestBody Map<String, Object> BookmarkData) throws Exception;

	// 북마크 삭제 기능
	public void deleteBookmark(List<Map<String, Object>> BookmarkList) throws Exception;
	
	// 회원탈퇴 기능
	public void userWithdrawal(Map<String, Object> userData) throws Exception;
}
