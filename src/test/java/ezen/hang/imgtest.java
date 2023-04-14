package ezen.hang;


import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.web.member.controller.MemberController;


@SpringBootTest
class imgtest {

	@Autowired
	private MemberController test;
	
	@Test
	void test() {
		Map<String, Object> imgLoadingData = new HashMap<>();
		imgLoadingData.put("userid", "a");
		imgLoadingData.put("imagefilename", "a682b8dd-f8ab-404c-933c-ef708700cb30");
		System.out.println("테스트 실행");
		test.profileImgLoading(imgLoadingData);
	}

}
