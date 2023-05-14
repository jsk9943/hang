package ezen.hang.heritage.domain.member.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import ezen.hang.heritage.domain.member.dto.Member;

/**
 * 회원 기능 관련 mapper
 */
@Mapper
public interface MemberMapper {

	/**
	 * 회원가입을 통해 신규가입 시 사용되는 Mapper 
	 */
	public void CreateMember(Member member);

	public void CreateAuthority(Member member);

	public int checkUserId(String userid);

	/**
	 * 회원이 가입 후 잃어버린 아이디와 비밀번호 변경을 위한 Mapper
	 */
	public Member lostIdSearch(Member member);
	
	public void lostPasswordChange(Member member);

	/**
	 * 가입된 회원이 로그인 시 사용되는 Mapper 
	 */
	public Member login(Member member);


	/**
	 * 가입된 회원이 회원정보 수정을 하기 위해 사용되는 Mapper
	 */
	public void update(Member member);

	public Member usingProfile(String userid);
	
	/**
	 * 프로필 사진을 수정하기 위해 사용되는 Mapper
	 */
	public int profileUploadBefore(String userid);
	
	public void memberDeleteProfileImg(String userid);
	
	public void profileImageDelete(String userid);

	public void profileImgUpload(Map<String, Object> imgData);

	public void profileImgMemberUpload(Map<String, Object> imgData);

	public Map<String, Object> profileImgLoading(Map<String, Object> imgData);
	
	/**
	 * 북마크를 등록, 삭제 하기 위해 사용되는 Mapper
	 */
	public void createBookmark(Map<String, Object> BookmarkData);

	public List<Map<String, Object>> getBookmarkList(String userid);

	public void deleteBookmark(Map<String, Object> BookmarkList);
	
	/**
	 * 회원 스스로 탈퇴하기 위한 Mapper
	 */
	public void userSelfWithdrawalMEMBER(String userid);

	public void userSelfWithdrawalHERITAGEREVIEW(Map<String, Object> userData);
	
	public void userSelfWithdrawalRATE(Map<String, Object> userData);
	
	public void userSelfWithdrawalBOOKMARK(String userid);
	
	public void userSelfWithdrawalPROFILEIMAGE(String userid);
	
	public void userSelfrWithdrawalAUTHORITY(String userid);

}
