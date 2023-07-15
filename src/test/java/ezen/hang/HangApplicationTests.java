package ezen.hang;

import java.util.Map;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.domain.visitor.mapper.VisitorMapper;

@SpringBootTest
class HangApplicationTests {
	@Autowired
	private VisitorMapper vm;

	@Test
//	@Disabled
	void contextLoads() {
			Map<String, Object> data = vm.latestDateData();
			int visitor_totalcount = Integer.parseInt(data.get("visitor_totalcount").toString());
			System.out.println(visitor_totalcount);
	}

}
