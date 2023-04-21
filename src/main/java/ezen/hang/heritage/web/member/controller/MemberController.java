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


/**
 * 회원가입과 회원탈퇴, 회원정보 변경, 프로필사진 등록 및 변경, 북마크리스트 관리
 * Service를 제공받기 위한 Controller 
 */
@RestController
@RequestMapping("/member")
public class MemberController {

	@Autowired
	private MemberService memberService;

	/**
	 * 회원가입을 통해 신규가입 시 사용되는 Controller 
	 */
	@PostMapping("/register")
	public String registerMember(
			@RequestParam("username") String username,
			@RequestParam("userid") String userid,
			@RequestParam("userpw") String userpw,
			@RequestParam("userph") String userph,
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

	@PostMapping("/idCheck")
	public int idCheck(@RequestParam("userid") String userid) {
		return memberService.checkUserId(userid);
	}
	
	/**
	 * 회원이 가입 후 잃어버린 아이디와 비밀번호 변경을 위한 Controller
	 */
	@GetMapping("/idCheck")
	public String lostIdSearch(
			@RequestParam("userName") String userName,
			@RequestParam("userPh") String userPh) {
		String result = null;
		try {
			result = memberService.lostIdSearch(userName, userPh);
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}
	
	@PatchMapping()
	public String lostPasswordChange(@RequestBody Map<String, Object> passwordChangeData) {
		String result = null;
		try {
			result = memberService.lostPasswordChange(passwordChangeData);
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	/**
	 * 가입된 회원이 로그인, 로그아웃 시 사용되는 Controller 
	 */
	@PostMapping("/login")
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

	@GetMapping("/logout")
	public void logout(HttpSession session) {
		session.removeAttribute("member");
		session.invalidate();
	}

	
	/**
	 * 가입된 회원이 회원정보 수정을 하기 위해 사용되는 Controller
	 */
	@PatchMapping("/update")
	public String updateMember(@RequestBody Map<String, Object> updateData) {
		String result = null;
		try {
			memberService.updateMember(updateData);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	@PostMapping("/usingprofile")
	public Member usingProfile(String userid) {
		return memberService.usingProfile(userid);
	}

	/**
	 * 프로필 사진을 수정하기 위해 사용되는 Controller
	 */
	@PostMapping("/profileimg/upload")
	public String profileImgUpload(@RequestBody Map<String, Object> imgData) {
		String result = null;
		try {
			result = memberService.profileImgUpload(imgData);
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	@PostMapping("/profileimg")
	public ResponseEntity<byte[]> profileImgLoading(@RequestBody Map<String, Object> imgData) {
		try {
			return memberService.profileImgLoading(imgData);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 북마크를 등록, 삭제 하기 위해 사용되는 Controller
	 */
	@PostMapping("/bookmark/add")
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

	@DeleteMapping("/bookmark")
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
	
	@GetMapping("/bookmark")
	public List<Map<String, Object>> getBookmarkList(@RequestParam("userid") String userid) {
		return memberService.getBookmarkList(userid);
	}

	@DeleteMapping("/bookmark/delete")
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
	
	/**
	 * 회원 스스로 탈퇴하기 위한 Controller
	 */
	@DeleteMapping()
	public String userWithdrawal(@RequestBody Map<String, Object> userData) {
		String result = null;
		try {
			memberService.userWithdrawal(userData);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}
}