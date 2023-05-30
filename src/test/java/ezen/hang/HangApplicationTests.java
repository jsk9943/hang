package ezen.hang;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.domain.admin.service.AdminService;

@SpringBootTest
class HangApplicationTests {
	@Autowired
	private AdminService as;

	@Test
	@Disabled
	void contextLoads() {
		try {
			Map<String, Object> map = new HashMap<>();
			map.put("userid", "456456");
			as.deleteUserForcedWithdrawal(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
