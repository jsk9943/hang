package ezen.hang.heritage.web.member.controller;

import ezen.hang.heritage.domain.member.service.MemberService;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import ezen.hang.heritage.domain.member.dto.Member;

@Controller
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
		Member member = new Member();
		member.setUsername(username);
		member.setUserid(userid);
		member.setUserpw(userpw);
		member.setUserph(userph);
		member.setEmail(email);
		return memberService.register(member);
	}

	// 회원가입 아이디 체크 컨트롤러
	@PostMapping("/idCheck")
	@ResponseBody
	public int idCheck(@RequestParam("userid") String userid) {
		return memberService.checkUserId(userid);
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
			return userinfo;
		}
		return userinfo;
	}

	// 로그아웃
	@PostMapping("/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("member");
		return "redirect:/main";
	}

	// 회원정보 수정
	@PostMapping("/update")
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
	@PostMapping("/profileimg/loading")
	@ResponseBody
	public ResponseEntity<byte[]> profileImgLoading(@RequestBody Map<String, Object> imgLoadingData) {
		try {
			return memberService.profileImgLoading(imgLoadingData);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}