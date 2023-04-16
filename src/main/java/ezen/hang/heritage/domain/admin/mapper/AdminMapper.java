package ezen.hang.heritage.domain.admin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface AdminMapper {
	
	//관리자가 맞는지 확인
	public String adminIdConfirm(String userid);

	// 모든 댓글 가져오기
	public List<Map<String, Object>> allCommentList();
	
	// 검색단어로 등록된 댓글 가져오기
	public List<Map<String, Object>> keywordCommentFind(Map<String, Object> keyword);
	
	// 선택한 리뷰 삭제하기
	public void checkCommentDelete(Map<String, Object> deleteCommentList);
	
	// 가입된 유저의 관리자권한과 댓글쓰기권한 가져오기
	public List<Map<String, Object>> allUserAuthority();
}
