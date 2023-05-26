package ezen.hang;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.domain.visitor.service.VisitorService;

@SpringBootTest
class HangApplicationTests {
	@Autowired
	private VisitorService vs;

	@Test
	@Disabled
	void contextLoads() {
		Map<String, Object> map = new HashMap<>();
		map.put("day", "2023-05-27");
		try {
			System.out.println(vs.dayVisitorExiste(map));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
