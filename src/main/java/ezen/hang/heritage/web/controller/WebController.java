package ezen.hang.heritage.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
	
	// 메인페이지
	@GetMapping("/main")
	public String main() {
		return "main";
	}
	
	// 아이디 찾기
	@GetMapping("/findMyId")
	public String findMyId() {
		return "findMyId";
	}
	
	// 비밀번호 찾기
	@GetMapping("/changeMyPassword")
	public String changeMyPassword() {
		return "changeMyPassword";
	}
	
	// 관리자 페이지
	@GetMapping("/admin")
	public String adminPage() {
		return "admin";
	}
	
	//소개 페이지
	@GetMapping("/introduce")
	public String introducePage() {
		return "introducePage";
	}
}
