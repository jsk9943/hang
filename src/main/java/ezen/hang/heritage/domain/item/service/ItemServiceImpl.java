package ezen.hang.heritage.domain.item.service;

import java.util.ArrayList;
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

	@Override
	public List<Heritage> searchHeritageParsing(String heritagename) {
		dsd.setCcbaMnm1Value(heritagename);
		return dsd.searchHeritage();
	}

	@Override
	public Heritage detailSearchHeritageParsing(Map<String, Object> heritageData) {
		String ccbaKdcd = heritageData.get("ccbaKdcd").toString();
		String ccbaAsno = heritageData.get("ccbaAsno").toString();
		String ccbaCtcd = heritageData.get("ccbaCtcd").toString();
		Heritage heritage = new Heritage();
		dsd.setCcbaKdcd(ccbaKdcd);
		dsd.setCcbaAsno(ccbaAsno);
		dsd.setCcbaCtcd(ccbaCtcd);
		heritage = dsd.detailSearchHeritage();
		heritage.setStarRate(rateAvgPoint(ccbaAsno));
		return heritage;
	}

	@Override
	public CommentStarRate rateAvgPoint(String ccbaAsno) {
		CommentStarRate commentStarRate = new CommentStarRate(ccbaAsno);
		List<CommentStarRate> list = new ArrayList<>();
		list.addAll(itemMapper.starRatingAvg(commentStarRate));
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

	@Override
	public String createCommentStarRate(Map<String, Object> inputData) {
		String result = null;
		String userid = inputData.get("userid").toString();
		String ccbaAsno = inputData.get("number").toString();
		String ccbaMnm1 = inputData.get("name").toString();
		String comment = inputData.get("commentInputResult").toString();
		int starpoint = Integer.parseInt(inputData.get("starPointInputResult").toString());
		try {
			CommentStarRate commentStarRate = new CommentStarRate();
			commentStarRate.setUserid(userid);
			commentStarRate.setCcbaAsno(ccbaAsno);
			commentStarRate.setCcbaMnm1(ccbaMnm1);
			commentStarRate.setComment(comment);
			commentStarRate.setStarpoint(starpoint);
			itemMapper.starRatingCreate(commentStarRate);
			itemMapper.commentCreate(commentStarRate);
			result = "true";
		} catch (Exception e) {
			result = "false";
		}
		return result;
	}

	// 문화재에 등록한 코멘트 및 별점 리스트
	@Override
	public List<Map<String, Object>> loadCommentStarRate(Map<String, Object> outputData) {
		String ccbaAsno = outputData.get("number").toString();
		return itemMapper.commentStarRateLoad(ccbaAsno);
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
