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
			int count = messageMapper.messageCountCheck(withdrawMessageData.get("mess_no").toString());
			if(count == 2) {
				if(messageMapper.withdrawBeforeReadCheck(withdrawMessageData.get("mess_no").toString()).equals("N")) {
					messageMapper.withdrawMessage(withdrawMessageData);
					messageMapper.withdrawMessageStateChange(withdrawMessageData);
				} else if(messageMapper.withdrawBeforeReadCheck(withdrawMessageData.get("mess_no").toString()).equals("Y")) {
					result = "mess_no ALREADY READ";
				}
			} else if(count == 1) {
				result = "mess_no NOT ENOUGH";
			} else if(count == 0) {
				result = "mess_no NOT EXIST";
			}
		}
		return result;
	}

	@Override
	public void receiveMessageDelete(List<Map<String, Object>> receiveDeleteData) throws Exception {
		for (Map<String, Object> map : receiveDeleteData) {
			String mess_no = map.get("mess_no").toString();
			int count = messageMapper.messageCountCheck(map.get("mess_no").toString());
			if(count == 2) {
				messageMapper.singleReceiveMessageDelete(mess_no);
			} else if (count == 1) {
				messageMapper.deleteRemainingReceiveMessages(map);
			}
		}
	}

	@Override
	public void sendMessageDelete(List<Map<String, Object>> sendDeleteData) throws Exception {
		for (Map<String, Object> map : sendDeleteData) {
			String mess_no = map.get("mess_no").toString();
			int count = messageMapper.messageCountCheck(map.get("mess_no").toString());
			if(count == 2) {
				messageMapper.singleSendMessageDelete(mess_no);
			} else if (count == 1) {
				messageMapper.deleteRemainingSendMessages(map);
			}
		}
	}
}
