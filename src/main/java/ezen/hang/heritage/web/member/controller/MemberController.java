package ezen.hang.heritage.web.member.controller;

import ezen.hang.heritage.domain.member.service.MemberService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ezen.hang.heritage.domain.member.dto.Member;

@RestController
@RequestMapping("/member")
public class MemberController {

	@Autowired
	private MemberService memberService;

	// 회원가입
	@PostMapping("/register")
	@ResponseBody
	public String registerMember(@RequestParam("username") String username, @RequestParam("userid") String userid,
			@RequestParam("userpw") String userpw, @RequestParam("userph") String userph,
			@RequestParam("email") String email) {
		String result = null;
		try {
			memberService.register(username, userid, userpw, userph, email);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	// 회원가입 아이디 체크 컨트롤러
	@PostMapping("/idCheck")
	@ResponseBody
	public int idCheck(@RequestParam("userid") String userid) {
		return memberService.checkUserId(userid);
	}
	
	// 아이디 찾기
	@GetMapping("/idCheck")
	public String lostIdSearch(@RequestParam("userName") String userName, @RequestParam("userPh") String userPh) {
		return memberService.lostIdSearch(userName, userPh);
	}
	
	// 비밀번호 잃어버려서 변경하기
	@PatchMapping()
	@ResponseBody
	public String lostPasswordChange(@RequestBody Map<String, Object> passwordChangeData) {
		return memberService.lostPasswordChange(passwordChangeData);
	}

	// 로그인
	@PostMapping("/login")
	@ResponseBody
	public Map<String, Object> logindo(@RequestBody Map<String, Object> loginData, HttpSession session) {
		Map<String, Object> userinfo = new HashMap<>();
		Member member = memberService.login(loginData);
		if (member != null) {
			session.setAttribute("member", member);
			userinfo.put("userid", member.getUserid());
			userinfo.put("username", member.getUsername());
			userinfo.put("imagefilename", member.getImagefilename());
			userinfo.put("admin", member.getAdmin());
			return userinfo;
		}
		return userinfo;
	}

	// 로그아웃
	@GetMapping("/logout")
	public void logout(HttpSession session) {
		session.removeAttribute("member");
		session.invalidate();
	}

	// 회원정보 수정
	@PatchMapping("/update")
	@ResponseBody
	public String updateMember(@RequestBody Map<String, Object> updateData) {
		return memberService.updateMember(updateData);
	}

	// 회원정보 수정전 회원정보 가져오기
	@PostMapping("/usingprofile")
	@ResponseBody
	public Member usingProfile(String userid) {
		return memberService.usingProfile(userid);
	}

	// 프로필 사진 등록하기
	@PostMapping("/profileimg/upload")
	@ResponseBody
	public String profileImgUpload(@RequestBody Map<String, Object> imgData) {
		return memberService.profileImgUpload(imgData);
	}

	// 프로필 사진 불러오기
	@PostMapping("/profileimg")
	@ResponseBody
	public ResponseEntity<byte[]> profileImgLoading(@RequestBody Map<String, Object> imgData) {
		try {
			return memberService.profileImgLoading(imgData);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// 북마크 생성
	@PostMapping("/bookmark/add")
	@ResponseBody
	public String createBookmark(@RequestBody Map<String, Object> BookmarkData) {
		String result = null;
		try {
			memberService.createBookmark(BookmarkData);
			result = BookmarkData.get("ccbaMnm1").toString();
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	// 북마크 등록 리스트 가져오기
	@GetMapping("/bookmark")
	public List<Map<String, Object>> getBookmarkList(@RequestParam("userid") String userid) {
		return memberService.getBookmarkList(userid);
	}

	// 인포창에서 버튼을 통한 단일 문화재 북마크 삭제
	@DeleteMapping("/bookmark")
	@ResponseBody
	public String infoDeleteBookmark(@RequestBody Map<String, Object> BookmarkList) {
		String result = null;
		try {
			memberService.infoDeleteBookmark(BookmarkList);
			result = BookmarkList.get("ccbaMnm1").toString();
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	// 회원 즐겨찾기를 통한 북마크 삭제
	@DeleteMapping("/bookmark/delete")
	@ResponseBody
	public String deleteBookmark(@RequestBody List<Map<String, Object>> BookmarkList) {
		String result = null;
		try {
			memberService.deleteBookmark(BookmarkList);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}
}