package ezen.hang.heritage.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import ezen.hang.heritage.domain.visitor.service.VisitorService;

@Controller
public class WebController {
	
	@Autowired
	private VisitorService visitorService;
	
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
	
	//공지사항 페이지
	@GetMapping("/notice")
	public String noticePage() {
		return "notice";
	}
	
	//방문자 쿠키 유무에 따른 카운터 세기
	@PostMapping("/visitor")
	@ResponseBody
	public Map<String, Object> dayVisitorExiste(@RequestBody Map<String, Object> todayData) {
		Map<String, Object> map = new HashMap<>();
		try {
			map.putAll(visitorService.dayVisitorExiste(todayData));
		} catch (Exception e) {}
		return map;
	}
	
	@PatchMapping("/visitor/update")
	@ResponseBody
	public String updateTodayVisitorCount(@RequestBody Map<String, Object> todayData) {
		String result = "false";
		try {
			visitorService.updateTodayVisitorCount(todayData);
			result = "true";
		} catch (Exception e) {}
		return result;
	}
}
