package ezen.hang.heritage.domain.member.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import ezen.hang.heritage.domain.member.dto.Member;

@Mapper
public interface MemberMapper {

	// 회원가입
	public void CreateMember(Member member);

	// 로그인
	public Member login(Member member);

	// 아이디 중복체크
	public int checkUserId(String userid);

	// 회원정보 수정
	public void update(Member member);

	// 회원 정보 가져오기
	public Member usingProfile(String userid);

	// 프로필 사진 등록하기(이미지 테이블)
	public void profileImgUpload(Map<String, Object> imgData);

	// 프로필 사진 등록하기(맴버 테이블)
	public void profileImgMemberUpload(Map<String, Object> imgData);

	// 프로필 사진 불러오기
	public Map<String, Object> profileImgLoading(Map<String, Object> imgData);
	
	// 북마크 생성
	public void createBookmark(Map<String, Object> BookmarkData);

	// 북마크 기능
	public List<Map<String, Object>> getBookmarkList(String userid);

	// 북마크 삭제기능
	public void deleteBookmark(Map<String, Object> BookmarkList);

}
