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

	/**
	 * 코멘트가 등록된 전체 유저 정보를 가져와 게시판에 보여주고
	 * 선택된 데이터가 request되면 DB에서 삭제
	 */
	@PostMapping("/clist")
	public List<Map<String, Object>> allCommentList(@RequestBody Map<String, Object> useridData) {
		List<Map<String, Object>> map = null;
		try {
			map = adminService.allCommentList(useridData);
		} catch (Exception e) {}
		return map;
	}

	@PostMapping("/clist/search")
	public List<Map<String, Object>> keywordCommentFind(@RequestBody Map<String, Object> keyword) {
		List<Map<String, Object>> map = null;
		try {
			map = adminService.keywordCommentFind(keyword);
		} catch (Exception e) {}
		return map;
	}

	@DeleteMapping("/clist")
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

	/**
	 * 유저의 권한부여 기능으로 관리자권한과 댓글쓰기,금지 권한을 변경 할 수 있음
	 */
	@PostMapping("/ulist")
	public List<Map<String, Object>> allUserAuthority(@RequestBody Map<String, Object> useridData) {
		List<Map<String, Object>> map = null;
		try {
			map = adminService.allUserAuthority(useridData);
		} catch (Exception e) {}
		return map;
	}

	@PostMapping("/ulist/search")
	public List<Map<String, Object>> keywordUserAuthorityFind(@RequestBody Map<String, Object> keyword) {
		List<Map<String, Object>> map = null;
		try {
			map = adminService.keywordUserAuthorityFind(keyword);
		} catch (Exception e) {}
		return map;
	}

	@PatchMapping("/ulist")
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
	
	/**
	 * 유저를 강제 탈퇴시킬 수 있는 기능
	 */
	@PostMapping("/wlist")
	public List<Map<String, Object>> allUserForcedWithdrawal(@RequestBody Map<String, Object> useridData){
		List<Map<String, Object>> map = null;
		try {
			map = adminService.allUserForcedWithdrawal(useridData);
		} catch (Exception e) {}
		return map;
	}
	
	@PostMapping("/wlist/search")
	public List<Map<String, Object>> keywordUserForcedWithdrawalFind(@RequestBody Map<String, Object> keyword) {
		List<Map<String, Object>> map = null;
		try {
			map = adminService.keywordUserForcedWithdrawalFind(keyword);
		} catch (Exception e) {}
		return map;
	}
	
	@DeleteMapping("/wlist") 
	public String deleteUserForcedWithdrawal(@RequestBody Map<String, Object> useridData){
		String result = null;
		try {
			adminService.deleteUserForcedWithdrawal(useridData);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}
}