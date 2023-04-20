package ezen.hang.heritage.domain.admin.service;

import java.util.List;
import java.util.Map;



/**
 * 회원 관련 비즈니스 메소드 선언
 */
public interface AdminService {

	/**
	 * 코멘트가 등록된 전체 유저 정보를 가져와 게시판에 보여주고
	 * 선택된 데이터가 request되면 DB에서 삭제
	 */
	public List<Map<String, Object>> allCommentList(Map<String, Object> useridData) throws Exception;

	public List<Map<String, Object>> keywordCommentFind(Map<String, Object> keyword) throws Exception;

	public void checkCommentDelete(List<Map<String, Object>> deleteCommentList) throws Exception;

	/**
	 * 유저의 권한부여 기능으로 관리자권한과 댓글쓰기,금지 권한을 변경 할 수 있음
	 */
	public List<Map<String, Object>> allUserAuthority(Map<String, Object> useridData) throws Exception;
	
	public List<Map<String, Object>> keywordUserAuthorityFind(Map<String, Object> keyword) throws Exception;
	
	public void userAuthorityChange(List<Map<String, Object>> userData) throws Exception;
	
	/**
	 * 유저를 강제 탈퇴시킬 수 있는 기능
	 */
	public List<Map<String, Object>> allUserForcedWithdrawal(Map<String, Object> useridData) throws Exception;
	
	public List<Map<String, Object>> keywordUserForcedWithdrawalFind(Map<String, Object> keyword) throws Exception;
	
	public void deleteUserForcedWithdrawal(Map<String, Object> useridData) throws Exception;
}
