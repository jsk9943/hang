package ezen.hang.heritage.domain.item.dto;

import java.sql.Date;

/**
 * 개별 문화재에 등록될 댓글과 별점 객체 
 */
public class CommentStarRate {
	private String ccbaKdcd, ccbaAsno, ccbaCtcd, ccbaMnm1, comment, userid;
	private int starpoint, count;
	private Date commentDate;

	public CommentStarRate() {}

	public CommentStarRate(String ccbaKdcd, String ccbaAsno, String ccbaCtcd, String ccbaMnm1, String comment,
						   String userid, int starpoint, int count, Date commentDate) {
		this.ccbaKdcd = ccbaKdcd;
		this.ccbaAsno = ccbaAsno;
		this.ccbaCtcd = ccbaCtcd;
		this.ccbaMnm1 = ccbaMnm1;
		this.comment = comment;
		this.userid = userid;
		this.starpoint = starpoint;
		this.count = count;
		this.commentDate = commentDate;
	}

	public String getCcbaKdcd() {
		return ccbaKdcd;
	}

	public void setCcbaKdcd(String ccbaKdcd) {
		this.ccbaKdcd = ccbaKdcd;
	}

	public String getCcbaAsno() {
		return ccbaAsno;
	}

	public void setCcbaAsno(String ccbaAsno) {
		this.ccbaAsno = ccbaAsno;
	}

	public String getCcbaCtcd() {
		return ccbaCtcd;
	}

	public void setCcbaCtcd(String ccbaCtcd) {
		this.ccbaCtcd = ccbaCtcd;
	}

	public String getCcbaMnm1() {
		return ccbaMnm1;
	}

	public void setCcbaMnm1(String ccbaMnm1) {
		this.ccbaMnm1 = ccbaMnm1;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public int getStarpoint() {
		return starpoint;
	}

	public void setStarpoint(int starpoint) {
		this.starpoint = starpoint;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public Date getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}

	@Override
	public String toString() {
		return "CommentStarRate [ccbaKdcd=" + ccbaKdcd + ", ccbaAsno=" + ccbaAsno + ", ccbaCtcd=" + ccbaCtcd
				+ ", ccbaMnm1=" + ccbaMnm1 + ", comment=" + comment + ", userid=" + userid + ", starpoint=" + starpoint
				+ ", count=" + count + ", commentDate=" + commentDate + "]";
	}


}
