package ezen.hang.heritage.domain.notice.dto;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 공지사항을 DB에서 쓰고 읽기 위한 DTO
 */
public class Notice {
	
	private int noticeNum;
	
	private String noticeTitle, noticeContents, noticeUse, stringConvertNoticeDate;
	
	private Date noticeDate;

	public Notice() {}

	public Notice(int noticeNum, String noticeTitle, String noticeContents, String noticeUse, String stringConvertNoticeDate, Date noticeDate) {
		this.noticeNum = noticeNum;
		this.noticeTitle = noticeTitle;
		this.noticeContents = noticeContents;
		this.noticeUse = noticeUse;
		this.stringConvertNoticeDate = stringConvertNoticeDate;
		this.noticeDate = noticeDate;
	}

	public int getNoticeNum() {
		return noticeNum;
	}

	public void setNoticeNum(int noticeNum) {
		this.noticeNum = noticeNum;
	}

	public String getNoticeTitle() {
		return noticeTitle;
	}

	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}

	public String getNoticeContents() {
		return noticeContents;
	}

	public void setNoticeContents(String noticeContents) {
		this.noticeContents = noticeContents;
	}

	public String getNoticeUse() {
		return noticeUse;
	}

	public void setNoticeUse(String noticeUse) {
		this.noticeUse = noticeUse;
	}
	
	public String getStringConvertNoticeDate() {
		return stringConvertNoticeDate;
	}

	public void setStringConvertNoticeDate(String stringConvertNoticeDate) {
		this.stringConvertNoticeDate = stringConvertNoticeDate;
	}

	public Date getNoticeDate() {
		return noticeDate;
	}

	public void setNoticeDate(Date noticeDate) {
		this.noticeDate = noticeDate;
	}

	@Override
	public String toString() {
		Date noticeDate = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        stringConvertNoticeDate = formatter.format(noticeDate);
		return "[noticeNum=" + noticeNum + "noticeTitle=" + noticeTitle + ", noticeContents=" + noticeContents + ", noticeUse=" + noticeUse
				+ ", noticeDate=" + stringConvertNoticeDate + "]";
	}
}
