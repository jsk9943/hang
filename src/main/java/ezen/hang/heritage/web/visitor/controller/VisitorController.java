package ezen.hang.heritage.web.visitor.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ezen.hang.heritage.domain.visitor.service.VisitorService;

@RestController
@RequestMapping("/visitor")
public class VisitorController {
	
	@Autowired
	private VisitorService visitorService;

	// 방문자 쿠키 유무에 따른 카운터 세기
	@PostMapping
	public Map<String, Object> dayVisitorExiste(@RequestBody Map<String, Object> todayData) {
		Map<String, Object> map = new HashMap<>();
		try {
			map.putAll(visitorService.dayVisitorExiste(todayData));
		} catch (Exception e) {
		}
		return map;
	}

	@PatchMapping
	public Map<String, Object> updateTodayVisitorCount(@RequestBody Map<String, Object> todayData) {
		Map<String, Object> map = new HashMap<>();
		try {
			map.putAll(visitorService.updateTodayVisitorCount(todayData));
		} catch (Exception e) {
		}
		return map;
	}
}
