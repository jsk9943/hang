package ezen.hang.heritage.domain.notice.service;


import java.util.List;
import java.util.Map;

import ezen.hang.heritage.domain.notice.dto.Notice;

public interface NoticeService {
	
	public Notice showPreviousNotice() ;
	
	public void noticeShowStop() throws Exception;
	
	public void showPreviousNoticeReuse(List<Map<String, Object>> noticeData) throws Exception;
	
	public void newNoticeInsert(List<Map<String, Object>> noticeData) throws Exception;
}
