package ezen.hang.heritage.domain.item.service;

import java.util.List;
import java.util.Map;


import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import ezen.hang.heritage.domain.item.dto.Heritage;

/**
 *  Dao에서 받아온 문화재청 정보를 객체에 담아 Web과 DB에 저장하고
 *  문화재, 유저 별 등록된 별점과 댓글목록을 가져와 Web과 DB에 저장하는 Service 
 */
public interface ItemService {

	/**
	 * 검색요청하는 문화재 명에 따라 결과값을 List로 반환하고 추가로 상세검색을 위한 객체반환 Service 
	 */
	public List<Heritage> searchHeritageParsing(String ccbaMnm1) throws Exception;

	public Heritage detailSearchHeritageParsing(String ccbaKdcd, String ccbaAsno, String ccbaCtcd) throws Exception;
		
	/**
	 * 문화재에 등록된 유저들의 별점과 댓글을 등록하고 삭제, 가져오는 Service
	 */
	public void createCommentStarRate(Map<String, Object> inputData, MultipartFile file) throws Exception;
	
	public List<Map<String, Object>> commentStarRateLoad(String ccbaKdcd, String ccbaAsno, String ccbaCtcd);
	
	public List<Map<String, Object>> userHeritageList(String userid);
	
	public void deleteCommentStarRate(List<Map<String, Object>> deleteData) throws Exception;
	
	public ResponseEntity<UrlResource> getImage(String filename) throws Exception;
	
	public void deleteImage(String filename) throws Exception;
	
}
