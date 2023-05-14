package ezen.hang.heritage.web.item.controller;

import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import ezen.hang.heritage.domain.item.dto.Heritage;
import ezen.hang.heritage.domain.item.service.ItemService;

/**
 * hang Web에서 URI 들어오는 요청에 따라 RESTful하게 처리하는 Controller
 */
@RestController
@RequestMapping("/heritage/item")
public class ItemController {

	@Autowired
	private ItemService itemService;

	/**
	 * 검색요청하는 문화재 명에 따라 결과값을 List로 반환하고 추가로 상세검색을 위한 객체반환 Controller
	 */
	@GetMapping("/search")
	public List<Heritage> searchHeritageParsing(@RequestParam("keyword") String ccbaMnm1) {
		List<Heritage> list = null;
		try {
			list = itemService.searchHeritageParsing(ccbaMnm1);
		} catch (Exception e) {
		}
		return list;
	}

	@GetMapping("/search/detail")
	public Heritage detailSearchHeritageParsing(@RequestParam("ccbaKdcd") String ccbaKdcd,
			@RequestParam("ccbaAsno") String ccbaAsno, @RequestParam("ccbaCtcd") String ccbaCtcd) {
		Heritage heritage = new Heritage();
		try {
			heritage = itemService.detailSearchHeritageParsing(ccbaKdcd, ccbaAsno, ccbaCtcd);
		} catch (Exception e) {
			heritage = null;
		}
		return heritage;
	}

	/**
	 * 문화재에 등록된 유저들의 별점과 댓글을 등록하고 삭제, 가져오는 Controller
	 */
	@PostMapping("/input")
	public String createCommentStarRate(@RequestParam("inputData") String inputDataString,
			@RequestParam(value = "file", required = false) MultipartFile file) {
		String result = "DENIED";
		try {
			Map<String, Object> inputData = new ObjectMapper().readValue(inputDataString,
					new TypeReference<Map<String, Object>>() {
					});
			itemService.createCommentStarRate(inputData, file);
			result = "true";
		} catch (Exception e) {
			e.printStackTrace();
			result = "false";
		}
		return result;
	}

	@GetMapping("/output")
	public List<Map<String, Object>> commentStarRateLoad(@RequestParam("ccbaKdcd") String ccbaKdcd,
			@RequestParam("ccbaAsno") String ccbaAsno, @RequestParam("ccbaCtcd") String ccbaCtcd) {
		return itemService.commentStarRateLoad(ccbaKdcd, ccbaAsno, ccbaCtcd);
	}

	@GetMapping
	public List<Map<String, Object>> userHeritageList(@RequestParam("userid") String userid) {
		return itemService.userHeritageList(userid);
	}

	@DeleteMapping("/input")
	public String deleteCommentStarRate(@RequestBody List<Map<String, Object>> deleteData) {
		String result = null;
		try {
			itemService.deleteCommentStarRate(deleteData);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}
	
	@GetMapping("/image")
	public ResponseEntity<UrlResource> getImage(@RequestParam("filename") String filename) {
		try {
			return itemService.getImage(filename);
		} catch (Exception e) {}
		return null;
	}
}
