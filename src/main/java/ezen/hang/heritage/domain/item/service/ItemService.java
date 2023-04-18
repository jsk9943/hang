package ezen.hang.heritage.domain.item.service;

import java.util.List;
import java.util.Map;

import ezen.hang.heritage.domain.item.dto.Heritage;
import ezen.hang.heritage.domain.item.dto.CommentStarRate;

public interface ItemService {

	// 문화재 이름으로 검색
	public List<Heritage> searchHeritageParsing(String keyword);

	// 문화재 이름, 고유번호, 지역으로 상세 검색
	public Heritage detailSearchHeritageParsing(String ccbaKdcd, String ccbaAsno, String ccbaCtcd);
	
	// 문화재에 등록할 별점 및 코멘트
	public String createCommentStarRate(Map<String, Object> inputData) ;
	
	// 문화재에 대한 평균 별점 가져오기
	public CommentStarRate rateAvgPoint(String ccbaKdcd, String ccbaAsno, String ccbaCtcd);
	
	// 문화재에 대한 등록된 코멘트와 별점 리스트 가져오기
	public List<Map<String, Object>> commentStarRateLoad(String ccbaKdcd, String ccbaAsno, String ccbaCtcd);
	
	// 유저가 작성한 문화재 리스트
	public List<CommentStarRate> userHeritageList(String userid);
	
	// 등록된 코멘트, 별점 삭제
	public String deleteCommentStarRate(List<Map<String, Object>> deleteData);
}
