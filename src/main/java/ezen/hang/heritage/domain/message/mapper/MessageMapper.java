package ezen.hang.heritage.domain.message.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import ezen.hang.heritage.domain.message.dto.Message;

@Mapper
public interface MessageMapper {
	
	List<Map<String, Object>> myReceiveMessage(String userid);
	
	List<Map<String, Object>> mySendMessage(String userid);
	
	int newMessageCheck(String userid);
	
	void readMessageStateChange(int messageNumber);
	
	int reciveUserCheck(Message newMessage);
	
	void newSendMessageContents(Message newMessage);
	
	int registMessageNumber(Message newMessage);
	
	void newSendMessage(Message newMessage);
	
	int withdrawMessageCheck(String mess_no);
	
	String withdrawBeforeReadCheck(String mess_no);
	
	void withdrawMessage(Map<String, Object> withdrawMessageData);
	
	void withdrawMessageStateChange(Map<String, Object> withdrawMessageData);

}
