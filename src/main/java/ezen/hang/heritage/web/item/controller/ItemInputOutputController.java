package ezen.hang.heritage.web.item.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ezen.hang.heritage.domain.item.dto.CommentStarRate;
import ezen.hang.heritage.domain.item.service.ItemService;

@RestController
@RequestMapping("/heritage/item")
public class ItemInputOutputController {

	@Autowired
	private ItemService itemService;

	// 유저가 작성한 코멘트 및 별점 등록 컨트롤러
	@PostMapping("/input")
	@ResponseBody
	public String createCommentStarRate(@RequestBody Map<String, Object> inputData) {
		return itemService.createCommentStarRate(inputData);
	}
	
	// 유저가 작성한 문화재 리스트
	@PostMapping("/writer/heritage.list")
	@ResponseBody
	public List<CommentStarRate> userHeritageList(String userid) {
		return itemService.userHeritageList(userid);
	}
	
	// 유저의 코멘트 및 별점 삭제 컨트롤러
	@PostMapping("/writer/heritage.delete")
	@ResponseBody
	public String deleteCommentStarRate(@RequestBody List<Map<String, Object>> deleteData) {
		return itemService.deleteCommentStarRate(deleteData);
	}

	@PostMapping("/output")
	@ResponseBody
	public List<Map<String, Object>> loadCommentStarRate(@RequestBody Map<String, Object> outputData) {
		return itemService.loadCommentStarRate(outputData);
	}

}
