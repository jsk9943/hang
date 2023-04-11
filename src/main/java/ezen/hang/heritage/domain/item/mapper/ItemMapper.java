package ezen.hang.heritage.domain.item.mapper;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import ezen.hang.heritage.domain.item.dto.CommentStarRate;

@Mapper
public interface ItemMapper {
	
	// 별점 가져오기
	public List<CommentStarRate> starRatingAvg(CommentStarRate rate);
	
	// 별점 등록
	public void starRatingCreate(CommentStarRate rate);
	
	// 코멘트 등록
	public void commentCreate(CommentStarRate rate);
	
	// 별점 및 코멘트 게시판에 뿌려주기
	public List<Map<String, Object>> commentStarRateLoad(String ccbaAsno);
	
	// 유저가 작성한 문화재 목록
	public List<CommentStarRate> userHeritageList(String userid);
	
	// 별점 및 코멘트 삭제
	public void deleteCommentStarRateMapper(CommentStarRate rate);
	
}
