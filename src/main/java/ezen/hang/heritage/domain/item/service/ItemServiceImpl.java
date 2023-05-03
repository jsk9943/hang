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

/**
 * Dao에서 받아온 문화재청 정보를 객체에 담아 Web과 DB에 저장하고 문화재, 유저 별 등록된 별점과 댓글목록을 가져와 Web과 DB에
 * 저장하는 ServiceImplements
 */
@Service
@Transactional
public class ItemServiceImpl implements ItemService {

	@Autowired
	private DataSearchDao dsd;

	@Autowired
	private ItemMapper itemMapper;

	/**
	 * 검색요청하는 문화재 명에 따라 결과값을 List로 반환하고 추가로 상세검색을 위한 객체반환 ServiceImplements
	 */
	@Override
	public List<Heritage> searchHeritageParsing(String ccbaMnm1) throws Exception {
		//dsd.setCcbaMnm1(keyword);
		return dsd.searchHeritage(ccbaMnm1);
	}

	@Override
	public Heritage detailSearchHeritageParsing(String ccbaKdcd, String ccbaAsno, String ccbaCtcd) throws Exception {
		Heritage heritage = new Heritage();
		CommentStarRate commentStarRate = new CommentStarRate();
		//dsd.setCcbaKdcd(ccbaKdcd);
		//dsd.setCcbaAsno(ccbaAsno);
		//dsd.setCcbaCtcd(ccbaCtcd);
		heritage = dsd.detailSearchHeritage(ccbaKdcd, ccbaAsno, ccbaCtcd);
		commentStarRate.setCcbaKdcd(ccbaKdcd);
		commentStarRate.setCcbaAsno(ccbaAsno);
		commentStarRate.setCcbaCtcd(ccbaCtcd);
		List<CommentStarRate> list = itemMapper.rateAvgPoint(commentStarRate);
		int totalPoint = 0;
		int count = list.size();
		if (count == 0) {
			commentStarRate.setStarpoint(1);
		} else {
			for (CommentStarRate starRateResult : list) {
				int point = starRateResult.getStarpoint();
				totalPoint += point;
			}
			int avgPoint = totalPoint / count;
			commentStarRate.setStarpoint(avgPoint);
		}
		commentStarRate.setCount(count);
		heritage.setStarRate(commentStarRate);
		return heritage;
	}

	/**
	 * 문화재에 등록된 유저들의 별점과 댓글을 등록하고 삭제, 가져오는 ServiceImplements
	 */
	@Override
	public void createCommentStarRate(Map<String, Object> inputData) throws Exception {
		String userid = inputData.get("userid").toString();
		String ccbaKdcd = inputData.get("ccbaKdcd").toString();
		String ccbaAsno = inputData.get("ccbaAsno").toString();
		String ccbaCtcd = inputData.get("ccbaCtcd").toString();
		String ccbaMnm1 = inputData.get("ccbaMnm1").toString();
		String comment = inputData.get("comment").toString();
		int starpoint = Integer.parseInt(inputData.get("starpoint").toString());
		if (itemMapper.userAccess(userid).equals("Y")) {
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
		} else {
			throw new Exception();
		}
	}

	@Override
	public List<Map<String, Object>> commentStarRateLoad(String ccbaKdcd, String ccbaAsno, String ccbaCtcd) {
		Map<String, Object> map = new HashMap<>();
		map.put("ccbaKdcd", ccbaKdcd);
		map.put("ccbaAsno", ccbaAsno);
		map.put("ccbaCtcd", ccbaCtcd);
		return itemMapper.commentStarRateLoad(map);
	}

	@Override
	public List<CommentStarRate> userHeritageList(String userid) {
		return itemMapper.userHeritageList(userid);
	}

	@Override
	public void deleteCommentStarRate(List<Map<String, Object>> deleteData) throws Exception {
		for (Map<String, Object> map : deleteData) {
			for (int i = 0; i <  map.size(); i++) {
				String userid = map.get("userid").toString();
				String ccbaAsno = map.get("ccbaAsno").toString();
				CommentStarRate commentStarRate = new CommentStarRate();
				commentStarRate.setUserid(userid);
				commentStarRate.setCcbaAsno(ccbaAsno);
				itemMapper.deleteCommentStarRateMapper(commentStarRate);
			}
		}
	}

}
