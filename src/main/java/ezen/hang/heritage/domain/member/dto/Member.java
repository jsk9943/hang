package ezen.hang.heritage.domain.member.dto;

import java.sql.Date;

public class Member {
	private String userid, userpw, userph, username, email, imagefilename;
	private Date regdate;
	

	public Member() {
		
	}


	public Member(String userid, String userpw, String userph, String username, String email, Date regdate, String imagefilename) {
		this.userid = userid;
		this.userpw = userpw;
		this.userph = userph;
		this.username = username;
		this.email = email;
		this.regdate = regdate;
		this.imagefilename = imagefilename;
	}


	public String getUserid() {
		return userid;
	}


	public void setUserid(String userid) {
		this.userid = userid;
	}


	public String getUserpw() {
		return userpw;
	}


	public void setUserpw(String userpw) {
		this.userpw = userpw;
	}


	public String getUserph() {
		return userph;
	}


	public void setUserph(String userph) {
		this.userph = userph;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Date getRegdate() {
		return regdate;
	}


	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}


	public String getImagefilename() {
		return imagefilename;
	}


	public void setImagefilename(String profileUUID) {
		this.imagefilename = profileUUID;
	}


	@Override
	public String toString() {
		return "Member [userid=" + userid + ", userpw=" + userpw + ", userph=" + userph + ", username=" + username
				+ ", email=" + email + ", imagefilename=" + imagefilename + ", regdate=" + regdate + "]";
	}

}
