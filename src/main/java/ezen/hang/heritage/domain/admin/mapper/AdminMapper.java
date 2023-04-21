package ezen.hang.heritage.domain.admin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * admin 권한 관련 유저권한, 댓글관리, 강제탈퇴 기능을 가진 mapper 
 */
@Mapper
public interface AdminMapper {
	
	/**
	 * 모든 Admin mapper 실행 시 기본적으로 수행되어야 하는 관리자 권한 유무 확인
	 */
	public String adminIdConfirm(String userid);

	/**
	 * 코멘트가 등록된 전체 유저 정보를 가져와 게시판에 보여주고
	 * 선택된 데이터가 request되면 DB에서 삭제
	 */
	public List<Map<String, Object>> allCommentList();
	
	public List<Map<String, Object>> keywordCommentFind(Map<String, Object> keyword);
	
	public void checkCommentDelete(Map<String, Object> deleteCommentList);
	
	/**
	 * 유저의 권한부여 기능으로 관리자권한과 댓글쓰기,금지 권한을 변경 할 수 있음
	 */
	public List<Map<String, Object>> allUserAuthority();
	
	public List<Map<String, Object>> keywordUserAuthorityFind(Map<String, Object> keyword);
	
	public void userAuthorityChange(Map<String, Object> userData);
	
	/**
	 * 유저를 강제 탈퇴시킬 수 있는 기능
	 */
	public List<Map<String, Object>> allUserForcedWithdrawal();

	public List<Map<String, Object>> keywordUserForcedWithdrawalFind(Map<String, Object> keyword);
	
	public void userWithdrawalHERITAGEREVIEW(Map<String, Object> useridData);
	
	public void userWithdrawalRATE(Map<String, Object> useridData);
	
	public void userWithdrawalBOOKMARK(Map<String, Object> useridData);
	
	public void userWithdrawalPROFILEIMAGE(Map<String, Object> useridData);
	
	public void userWithdrawalMEMBER(Map<String, Object> useridData);
}
