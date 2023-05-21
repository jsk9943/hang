package ezen.hang;


import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.domain.notice.service.NoticeService;

@SpringBootTest
class NoticeTest {
	
	@Autowired
	private NoticeService ns;

	@Test
	@Disabled
	void test() {
		System.out.println(ns.showPreviousNotice());
	}

}
