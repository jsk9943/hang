package ezen.hang;


import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.domain.visitor.service.VisitorService;

@SpringBootTest
class VisitorTest {
	
	@Autowired
	private VisitorService visitorService;	
	
	@Test
	@Disabled
	void test2() {
		Map<String, Object> map = new HashMap<>();
		map.put("day", "2023-05-19");
		System.out.println("전달한 데이터 : " + map);
		try {
			visitorService.dayVisitorExiste(map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("이게 뜨면 성공");
	}

}
