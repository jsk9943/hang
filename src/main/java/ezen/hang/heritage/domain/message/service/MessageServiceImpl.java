package ezen.hang.heritage.domain.message.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ezen.hang.heritage.domain.message.dto.Message;
import ezen.hang.heritage.domain.message.mapper.MessageMapper;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageMapper messageMapper;

	@Override
	public List<Map<String, Object>> myReceiveMessage(Map<String, Object> useridData) {
		String userid = useridData.get("userid").toString();
		List<Map<String, Object>> resultData = messageMapper.myReceiveMessage(userid);
		for (Map<String, Object> map : resultData) {
			int messageNumber = Integer.parseInt(map.get("mess_no").toString());
			messageMapper.readMessageStateChange(messageNumber);
		}
		return resultData;
	}

	@Override
	public List<Map<String, Object>> mySendMessage(Map<String, Object> useridData) {
		String userid = useridData.get("userid").toString();
		return messageMapper.mySendMessage(userid);
	}

	@Override
	public int newMessageCheck(String userid) {
		return messageMapper.newMessageCheck(userid);
	}

	@Override
	public void newSendMessage(Map<String, Object> messageData) throws Exception {
		Message newMessage = new Message();
		newMessage.setMess_from(messageData.get("sendUserid").toString());
		newMessage.setMess_to(messageData.get("receiveUserid").toString());
		newMessage.setMess_contents(messageData.get("sendMessage").toString());
		if(messageMapper.reciveUserCheck(newMessage) > 0) {
			messageMapper.newSendMessageContents(newMessage);
			int mess_no = messageMapper.registMessageNumber(newMessage);
			newMessage.setMess_no(mess_no);
			messageMapper.newSendMessage(newMessage);
		} else {
			throw new Exception();
		}
	}

	@Override
	public String withdrawMessage(Map<String, Object> withdrawMessageData) throws Exception {
		String result = "true";
		for (int i = 0; i < withdrawMessageData.size(); i++) {
			int mess_no = messageMapper.withdrawMessageCheck(withdrawMessageData.get("mess_no").toString());
			if(mess_no == 2) {
				if(messageMapper.withdrawBeforeReadCheck(withdrawMessageData.get("mess_no").toString()).equals("N")) {
					messageMapper.withdrawMessage(withdrawMessageData);
					messageMapper.withdrawMessageStateChange(withdrawMessageData);
				} else if(messageMapper.withdrawBeforeReadCheck(withdrawMessageData.get("mess_no").toString()).equals("Y")) {
					result = "mess_no ALREADY READ";
				}
			} else if(mess_no == 1) {
				result = "mess_no NOT ENOUGH";
			} else if(mess_no == 0) {
				result = "mess_no NOT EXIST";
			}
		}
		return result;
	}
}
