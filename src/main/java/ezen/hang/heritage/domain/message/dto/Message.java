package ezen.hang.heritage.domain.message.dto;

import java.util.Date;

/**
 * 쪽지를 보내고 담고 수신자, 발신자 분류하기 위한 DTO
 */

public class Message {

	private int mess_no;

	private String mess_from, mess_to, mess_to_read, mess_contents, mess_state, mess_withdraw;

	private Date mess_date;

	public Message() {
	}

	public Message(int mess_no, String mess_from, String mess_to, String mess_to_read, String mess_contents,
			String mess_state, String mess_withdraw, Date mess_date) {
		this.mess_no = mess_no;
		this.mess_from = mess_from;
		this.mess_to = mess_to;
		this.mess_to_read = mess_to_read;
		this.mess_contents = mess_contents;
		this.mess_state = mess_state;
		this.mess_withdraw = mess_withdraw;
		this.mess_date = mess_date;
	}

	public int getMess_no() {
		return mess_no;
	}

	public void setMess_no(int mess_no) {
		this.mess_no = mess_no;
	}

	public String getMess_from() {
		return mess_from;
	}

	public void setMess_from(String mess_from) {
		this.mess_from = mess_from;
	}

	public String getMess_to() {
		return mess_to;
	}

	public void setMess_to(String mess_to) {
		this.mess_to = mess_to;
	}

	public String getMess_to_read() {
		return mess_to_read;
	}

	public void setMess_to_read(String mess_to_read) {
		this.mess_to_read = mess_to_read;
	}

	public String getMess_contents() {
		return mess_contents;
	}

	public void setMess_contents(String mess_contents) {
		this.mess_contents = mess_contents;
	}

	public String getMess_state() {
		return mess_state;
	}

	public void setMess_state(String mess_state) {
		this.mess_state = mess_state;
	}
	
	public String getMess_withdraw() {
		return mess_withdraw;
	}

	public void setMess_withdraw(String mess_withdraw) {
		this.mess_withdraw = mess_withdraw;
	}

	public Date getMess_date() {
		return mess_date;
	}

	public void setMess_date(Date mess_date) {
		this.mess_date = mess_date;
	}

	@Override
	public String toString() {
		return "Message [mess_no=" + mess_no + ", mess_from=" + mess_from + ", mess_to=" + mess_to + ", mess_to_read="
				+ mess_to_read + ", mess_contents=" + mess_contents + ", mess_state=" + mess_state + ", mess_withdraw="
				+ mess_withdraw + ", mess_date=" + mess_date + "]";
	}

}
