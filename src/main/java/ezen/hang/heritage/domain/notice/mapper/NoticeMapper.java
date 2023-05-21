package ezen.hang.heritage.domain.notice.mapper;



import org.apache.ibatis.annotations.Mapper;

import ezen.hang.heritage.domain.notice.dto.Notice;

@Mapper
public interface NoticeMapper {
	
	public int noticeCount();
	
	public Notice showPreviousNotice();
	
	public void noticeShowStop();
	
	public void showPreviousNoticeReuse(Notice notice);
	
	public void newNoticeInsert(Notice notice);
}
