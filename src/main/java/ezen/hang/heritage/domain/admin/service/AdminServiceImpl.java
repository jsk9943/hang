package ezen.hang.heritage.domain.admin.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ezen.hang.heritage.domain.admin.mapper.AdminMapper;

/**
 * 회원 관련 비즈니스 메소드 구현
 */
@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminMapper adminMapper;

	// 모든 댓글 가져오기
	@Override
	public List<Map<String, Object>> allCommentList(Map<String, Object> useridData) throws Exception{
		List<Map<String, Object>> data = null;
		String userid = useridData.get("adminid").toString();
		if (adminMapper.adminIdConfirm(userid).equals("Y")) {
			data = adminMapper.allCommentList();
		} else {
			return data;
		}
		return data;
	}

	// 검색단어로 등록된 댓글 가져오기
	@Override
	public List<Map<String, Object>> keywordCommentFind(Map<String, Object> keyword) throws Exception{
		List<Map<String, Object>> data = null;
		String userid = keyword.get("adminid").toString();
		if (adminMapper.adminIdConfirm(userid).equals("Y")) {
			data = adminMapper.keywordCommentFind(keyword);
		} else {
			return data;
		}
		return data;
	}

	// 선택한 리뷰 삭제하기
	@Override
	public void checkCommentDelete(List<Map<String, Object>> deleteCommentList) throws Exception {
		for (Map<String, Object> map : deleteCommentList) {
			String userid = map.get("adminid").toString();
			if (adminMapper.adminIdConfirm(userid).equals("Y")) {
				adminMapper.checkCommentDelete(map);
			}
		}
	}
	// 가입된 유저의 관리자권한과 댓글쓰기권한 가져오기
	@Override
	public List<Map<String, Object>> allUserAuthority(Map<String, Object> useridData) throws Exception{
		List<Map<String, Object>> data = null;
		String userid = useridData.get("adminid").toString();
		if (adminMapper.adminIdConfirm(userid).equals("Y")) {
			data = adminMapper.allUserAuthority();
		} else {
			return data;
		}
		return data;
	}

}
