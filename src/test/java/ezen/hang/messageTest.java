package ezen.hang;



import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.domain.message.mapper.MessageMapper;

@SpringBootTest
class messageTest {
	@Autowired
	private MessageMapper mm;

	@Test
	@Disabled
	void contextLoads() {
		String userid = "jsk9943";
		System.out.println(mm.myReceiveMessage(userid));
	}

}
