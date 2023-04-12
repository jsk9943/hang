package ezen.hang.heritage.web.item.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ezen.hang.heritage.domain.item.dto.CommentStarRate;
import ezen.hang.heritage.domain.item.dto.Heritage;
import ezen.hang.heritage.domain.item.service.ItemService;

@RestController
@RequestMapping("/heritage/item")
public class ItemController {

	@Autowired
	private ItemService itemService;
	
	// 문화재 이름으로 검색결과 가져오기
	@GetMapping("/search")
	public List<Heritage> search(@RequestParam("keyword") String keyword) {
		return itemService.searchHeritageParsing(keyword);
	}
	
	// 문화재 상세검색
	@GetMapping("/search/detail")
	public Heritage search(
			@RequestParam("ccbaKdcd") String ccbaKdcd,
			@RequestParam("ccbaAsno") String ccbaAsno,
			@RequestParam("ccbaCtcd") String ccbaCtcd ) {
		return itemService.detailSearchHeritageParsing(ccbaKdcd, ccbaAsno, ccbaCtcd);
	}

	// 유저가 작성한 문화재 리스트
	@GetMapping
	public List<CommentStarRate> userHeritageList(@RequestParam("userid") String userid) {
		return itemService.userHeritageList(userid);
	}
	
	// 유저가 작성한 코멘트 및 별점 등록 컨트롤러
	@PostMapping("/input")
	@ResponseBody
	public String createCommentStarRate(@RequestBody Map<String, Object> inputData) {
		return itemService.createCommentStarRate(inputData);
	}
	
	// 유저의 코멘트 및 별점 삭제 컨트롤러
	@DeleteMapping("/delete")
	@ResponseBody
	public String deleteCommentStarRate(@RequestBody List<Map<String, Object>> deleteData) {
		return itemService.deleteCommentStarRate(deleteData);
	}

	// 문화재 개별 등록된 댓글 및 별점 가져오기
	@GetMapping("/output")
	public List<Map<String, Object>> loadCommentStarRate(@RequestParam("ccbaAsno") String ccbaAsno) {
		return itemService.loadCommentStarRate(ccbaAsno);
	}

}
