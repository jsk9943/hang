package ezen.hang.heritage.domain.notice.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ezen.hang.heritage.domain.notice.dto.Notice;
import ezen.hang.heritage.domain.notice.mapper.NoticeMapper;

@Service
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private NoticeMapper noticeMapper;

	@Override
	public Notice showPreviousNotice() {
		Notice notice = new Notice();
		if(noticeMapper.showPreviousNotice() != null) {			
			notice = noticeMapper.showPreviousNotice();
			Date getDate = notice.getNoticeDate();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String formattedDate = formatter.format(getDate);
			notice.setStringConvertNoticeDate(formattedDate);
		}
		return notice;
	}

	@Override
	public void noticeShowStop() throws Exception {
		noticeMapper.noticeShowStop();
	}
	
	@Override
	public void showPreviousNoticeReuse(List<Map<String, Object>> noticeData) throws Exception {
		Notice notice = new Notice();
		for (Map<String, Object> map : noticeData) {
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
			notice.setNoticeDate(format.parse(map.get("noticeDate").toString()));
			notice.setNoticeTitle(map.get("noticeTitle").toString());
			notice.setNoticeContents(map.get("noticeContents").toString());
			notice.setNoticeUse("Y");
			noticeMapper.showPreviousNoticeReuse(notice);
		}
	}

	@Override
	public void newNoticeInsert(List<Map<String, Object>> noticeData) throws Exception {
		Notice notice = new Notice();
		for (Map<String, Object> map : noticeData) {
			notice.setNoticeNum(noticeMapper.noticeCount() + 1);
			notice.setNoticeTitle(map.get("noticeTitle").toString());
			notice.setNoticeContents(map.get("noticeContents").toString());
			noticeMapper.noticeShowStop();
			noticeMapper.newNoticeInsert(notice);
		}
	}


}
