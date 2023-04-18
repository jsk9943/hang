package ezen.hang.heritage.domain.item.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ezen.hang.heritage.domain.item.dao.DataSearchDao;
import ezen.hang.heritage.domain.item.dto.Heritage;
import ezen.hang.heritage.domain.item.dto.CommentStarRate;
import ezen.hang.heritage.domain.item.mapper.ItemMapper;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

	@Autowired
	private DataSearchDao dsd;

	@Autowired
	private ItemMapper itemMapper;

	// 문화재 검색
	@Override
	public List<Heritage> searchHeritageParsing(String keyword) {
		dsd.setCcbaMnm1Value(keyword);
		return dsd.searchHeritage();
	}

	// 문화재 상세검색
	@Override
	public Heritage detailSearchHeritageParsing(String ccbaKdcd, String ccbaAsno, String ccbaCtcd) {
		Heritage heritage = new Heritage();
		dsd.setCcbaKdcd(ccbaKdcd);
		dsd.setCcbaAsno(ccbaAsno);
		dsd.setCcbaCtcd(ccbaCtcd);
		heritage = dsd.detailSearchHeritage();
		heritage.setStarRate(rateAvgPoint(ccbaKdcd, ccbaAsno, ccbaCtcd));
		return heritage;
	}

	// 평균별점 보여주기
	@Override
	public CommentStarRate rateAvgPoint(String ccbaKdcd, String ccbaAsno, String ccbaCtcd) {
		CommentStarRate commentStarRate = new CommentStarRate();
		commentStarRate.setCcbaKdcd(ccbaKdcd);
		commentStarRate.setCcbaAsno(ccbaAsno);
		commentStarRate.setCcbaCtcd(ccbaCtcd);
		List<CommentStarRate> list = itemMapper.rateAvgPoint(commentStarRate);
		int totalPoint = 0;
		int count = list.size();
		if (count == 0) {
			commentStarRate.setStarpoint(1);
			return commentStarRate;
		} else {
			for (CommentStarRate starRateResult : list) {
				int point = starRateResult.getStarpoint();
				totalPoint += point;
			}
			int avgPoint = totalPoint / count;
			commentStarRate.setStarpoint(avgPoint);
		}
		commentStarRate.setCount(count);
		return commentStarRate;
	}

	// 코멘트 및 별점 등록
	@Override
	public String createCommentStarRate(Map<String, Object> inputData) {
		String result = "DENIED";
		String userid = inputData.get("userid").toString();
		String ccbaKdcd = inputData.get("ccbaKdcd").toString();
		String ccbaAsno = inputData.get("ccbaAsno").toString();
		String ccbaCtcd = inputData.get("ccbaCtcd").toString();
		String ccbaMnm1 = inputData.get("ccbaMnm1").toString();
		String comment = inputData.get("comment").toString();
		int starpoint = Integer.parseInt(inputData.get("starpoint").toString());
		if(itemMapper.userAccess(userid).equals("Y")) {
			try {
				CommentStarRate commentStarRate = new CommentStarRate();
				commentStarRate.setUserid(userid);
				commentStarRate.setCcbaKdcd(ccbaKdcd);
				commentStarRate.setCcbaAsno(ccbaAsno);
				commentStarRate.setCcbaCtcd(ccbaCtcd);
				commentStarRate.setCcbaMnm1(ccbaMnm1);
				commentStarRate.setComment(comment);
				commentStarRate.setStarpoint(starpoint);
				itemMapper.starRatingCreate(commentStarRate);
				itemMapper.commentCreate(commentStarRate);
				result = "true";
			} catch (Exception e) {
				result = "false";
			}
		}
		return result;			
	}

	// 문화재에 등록한 코멘트 및 별점 리스트
	@Override
	public List<Map<String, Object>> commentStarRateLoad(String ccbaKdcd, String ccbaAsno, String ccbaCtcd) {
		Map<String, Object> map = new HashMap<>();
		map.put("ccbaKdcd", ccbaKdcd);
		map.put("ccbaAsno", ccbaAsno);
		map.put("ccbaCtcd", ccbaCtcd);		
		return itemMapper.commentStarRateLoad(map);
	}

	// 유저가 작성한 문화재 리스트
	@Override
	public List<CommentStarRate> userHeritageList(String userid) {
		return itemMapper.userHeritageList(userid);
	}

	// 작성한 코멘트 및 별점 삭제 서비스
	@Override
	public String deleteCommentStarRate(List<Map<String, Object>> deleteData) {
		String result = null;
		try {
			for (Map<String, Object> map : deleteData) {
				int deleteDataSize = map.size();
				for (int i = 0; i < deleteDataSize; i++) {
					String userid = map.get("userid").toString();
					String ccbaAsno = map.get("ccbaAsno").toString();
					CommentStarRate commentStarRate = new CommentStarRate();
					commentStarRate.setUserid(userid);
					commentStarRate.setCcbaAsno(ccbaAsno);
					itemMapper.deleteCommentStarRateMapper(commentStarRate);
				}
			}
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

}
