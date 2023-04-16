package ezen.hang.heritage.domain.admin.service;

import java.util.List;
import java.util.Map;

/**
 * 회원 관련 비즈니스 메소드 선언
 */
public interface AdminService {

	// 모든 댓글내용 가져오기
	public List<Map<String, Object>> allCommentList(Map<String, Object> useridData) throws Exception;

	// 검색단어로 등록된 댓글 가져오기
	public List<Map<String, Object>> keywordCommentFind(Map<String, Object> keyword) throws Exception;

	// 선택한 리뷰 삭제하기
	public void checkCommentDelete(List<Map<String, Object>> deleteCommentList) throws Exception;

	// 가입된 유저의 관리자권한과 댓글쓰기권한 가져오기
	public List<Map<String, Object>> allUserAuthority(Map<String, Object> useridData) throws Exception;
}
