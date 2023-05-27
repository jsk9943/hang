package ezen.hang.heritage.domain.message.service;

import java.util.List;
import java.util.Map;


public interface MessageService {
	
	public List<Map<String, Object>> myReceiveMessage(Map<String, Object> useridData);
	
	public List<Map<String, Object>> mySendMessage(Map<String, Object> useridData);
	
	public int newMessageCheck(String userid);
	
	public void newSendMessage(Map<String, Object> messageData) throws Exception;
	
	public String withdrawMessage(Map<String, Object> withdrawMessageData) throws Exception;

}
