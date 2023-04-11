package ezen.hang.heritage.domain.member.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import ezen.hang.heritage.domain.member.dto.Member;

/**
 * 회원 관련 비즈니스 메소드 선언
 */
public interface MemberService {

	// 회원가입
	public String register(Member member);

	// 로그인
	public Member login(Map<String, Object> loginData);

	// 아이디 체크
	public int checkUserId(String userid);

	// 회원정보 수정
	public String updateMember(Map<String, Object> updateData);

	// 아이디로 회원정보 가져오기
	public Member usingProfile(String userid);
	
	// 프로필 사진 등록하기
	public String profileImgUpload(Map<String, Object> imgData);
	
	// 프로필 사진 가져오기
	public ResponseEntity<byte[]> profileImgLoading(Map<String, Object> imgData);
}
