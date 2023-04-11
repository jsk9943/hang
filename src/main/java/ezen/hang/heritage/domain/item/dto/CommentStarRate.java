package ezen.hang.heritage.domain.item.dto;

import java.sql.Date;

public class CommentStarRate {
	private String ccbaAsno, ccbaMnm1, comment, userid;
	private int starpoint, count;
	private Date commentDate;

	public CommentStarRate() {}
	
	public CommentStarRate(String ccbaAsno) {
		this.ccbaAsno = ccbaAsno;
	}
	
	public CommentStarRate(String ccbaAsno, String userid) {
		this.ccbaAsno = ccbaAsno;
		this.userid = userid;
	}

	public CommentStarRate(String ccbaAsno, String userid, String ccbaMnm1, String comment, int starpoint, int count) {
		this.ccbaAsno = ccbaAsno;
		this.ccbaMnm1 = ccbaMnm1;
		this.comment = comment;
		this.userid = userid;
		this.starpoint = starpoint;
		this.count = count;
	}
	
	public CommentStarRate(String ccbaAsno, String userid, String ccbaMnm1, String comment, int starpoint, Date commentDate) {
		this.ccbaAsno = ccbaAsno;
		this.ccbaMnm1 = ccbaMnm1;
		this.comment = comment;
		this.userid = userid;
		this.starpoint = starpoint;
		this.commentDate = commentDate;
	}


	public String getCcbaAsno() {
		return ccbaAsno;
	}

	public void setCcbaAsno(String ccbaAsno) {
		this.ccbaAsno = ccbaAsno;
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

	public int getStarpoint() {
		return starpoint;
	}

	public void setStarpoint(int starpoint) {
		this.starpoint = starpoint;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
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
		return "CommentStarRate [ccbaAsno=" + ccbaAsno + ", ccbaMnm1=" + ccbaMnm1 + ", comment=" + comment + ", userid="
				+ userid + ", starpoint=" + starpoint + ", count=" + count + ", commentDate=" + commentDate + "]";
	}


}
