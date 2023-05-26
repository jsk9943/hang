package ezen.hang.heritage.web.message.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ezen.hang.heritage.domain.message.service.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@PostMapping
	public List<Map<String, Object>> myReceiveMessage(@RequestBody Map<String, Object> useridData) {
		return messageService.myReceiveMessage(useridData);
	}

	@PostMapping("/send")
	public List<Map<String, Object>> mySendMessage(@RequestBody Map<String, Object> useridData) {
		return messageService.mySendMessage(useridData);
	}

	@GetMapping
	public int newMessageCheck(@RequestParam("userid") String userid) {
		return messageService.newMessageCheck(userid);
	}
	
	@PostMapping("/send.do")
	public String newSendMessage(@RequestBody Map<String, Object> messageData) {
		String result = "false";
		try {
			messageService.newSendMessage(messageData);
			result = "true";
		} catch (Exception e) {}
		return result;
	}
}
