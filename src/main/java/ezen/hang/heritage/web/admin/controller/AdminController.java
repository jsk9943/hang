package ezen.hang.heritage.web.admin.controller;

import ezen.hang.heritage.domain.admin.service.AdminService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;

	// 모든 댓글 가져오기
	@PostMapping("/clist")
	@ResponseBody
	public List<Map<String, Object>> allCommentList(@RequestBody Map<String, Object> useridData) {
		List<Map<String, Object>> map = null;
		try {
			map = adminService.allCommentList(useridData);
		} catch (Exception e) {}
		return map;
	}

	// 검색단어로 등록된 댓글 가져오기
	@PostMapping("/clist/search")
	@ResponseBody
	public List<Map<String, Object>> keywordCommentFind(@RequestBody Map<String, Object> keyword) {
		List<Map<String, Object>> map = null;
		try {
			map = adminService.keywordCommentFind(keyword);
		} catch (Exception e) {}
		return map;
	}

	// 선택한 리뷰 삭제하기
	@DeleteMapping("/clist")
	@ResponseBody
	public String checkCommentDelete(@RequestBody List<Map<String, Object>> deleteCommentList) {
		String result = null;
		try {
			adminService.checkCommentDelete(deleteCommentList);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	// 가입된 유저의 관리자권한과 댓글쓰기권한 가져오기
	@PostMapping("/ulist")
	@ResponseBody
	public List<Map<String, Object>> allUserAuthority(@RequestBody Map<String, Object> useridData) {
		List<Map<String, Object>> map = null;
		try {
			map = adminService.allUserAuthority(useridData);
		} catch (Exception e) {}
		return map;
	}

	// 검색단어로 필요한 유저정보 가져오기
	@PostMapping("/ulist/search")
	@ResponseBody
	public List<Map<String, Object>> keywordUserAuthorityFind(@RequestBody Map<String, Object> keyword) {
		List<Map<String, Object>> map = null;
		try {
			map = adminService.keywordUserAuthorityFind(keyword);
		} catch (Exception e) {}
		return map;
	}

	// 유저의 관리자 권한 및 댓글쓰기 권한 변경
	@PatchMapping("/ulist")
	@ResponseBody
	public String userAuthorityChange(@RequestBody List<Map<String, Object>> userData) {
		String result = null;
		try {
			adminService.userAuthorityChange(userData);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}
}