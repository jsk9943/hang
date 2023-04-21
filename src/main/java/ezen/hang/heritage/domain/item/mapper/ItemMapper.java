package ezen.hang.heritage.domain.item.mapper;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import ezen.hang.heritage.domain.item.dto.CommentStarRate;

/**
 * ServiceImplements에서 사용하는 mapper 
 */
@Mapper
public interface ItemMapper {
	
	public List<CommentStarRate> rateAvgPoint(CommentStarRate rate);
	
	public String userAccess(String userid);
	
	public void starRatingCreate(CommentStarRate rate);
	
	public void commentCreate(CommentStarRate rate);
	
	public List<Map<String, Object>> commentStarRateLoad(Map<String, Object> commentStarRateData);
	
	public List<CommentStarRate> userHeritageList(String userid);
	
	public void deleteCommentStarRateMapper(CommentStarRate rate);
	
}
