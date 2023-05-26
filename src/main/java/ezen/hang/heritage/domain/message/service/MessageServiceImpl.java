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
		int checkMessageNumber = messageMapper.checkMessageNumber();
		newMessage.setMess_no(checkMessageNumber + 1);
		newMessage.setMess_from(messageData.get("sendUserid").toString());
		newMessage.setMess_to(messageData.get("receiveUserid").toString());
		newMessage.setMess_contents(messageData.get("sendMessage").toString());
		if(messageMapper.reciveUserCheck(newMessage) > 0) {
			messageMapper.newSendMessageContents(newMessage);
			messageMapper.newSendMessage(newMessage);
		} else if (messageMapper.reciveUserCheck(newMessage) == 0){
			throw new NullPointerException();
		}
	}
}
