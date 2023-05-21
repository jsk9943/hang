package ezen.hang.heritage.web.notice.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ezen.hang.heritage.domain.notice.dto.Notice;
import ezen.hang.heritage.domain.notice.service.NoticeService;

@RestController
@RequestMapping("/notice")
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	
	@GetMapping("/show")
	public Notice showPreviousNotice(){
		return noticeService.showPreviousNotice();
	}
	
	@GetMapping("/show/stop.do")
	public String noticeShowStop() {
		String result = "false";
		try {
			noticeService.noticeShowStop();
			result = "true";
		} catch (Exception e) {}
		return result;
	}
	
	@PostMapping("/show/reuse.do")
	public String showPreviousNoticeReuse(@RequestBody List<Map<String, Object>> noticeData) {
		String result = "false";
		try {
			noticeService.showPreviousNoticeReuse(noticeData);
			result = "true";
		} catch (Exception e) {}
		return result;
	}
	
	@PostMapping("/show")
	public String newNoticeInsert(@RequestBody List<Map<String, Object>> newNoticeData) {
		String result = "false";
		try {
			noticeService.newNoticeInsert(newNoticeData);
			result = "true";
		} catch (Exception e) {}
		return result;
	}
}
