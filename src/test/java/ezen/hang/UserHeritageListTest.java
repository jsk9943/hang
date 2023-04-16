package ezen.hang;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.domain.admin.mapper.AdminMapper;
import ezen.hang.heritage.domain.admin.service.AdminService;
import ezen.hang.heritage.domain.item.dto.CommentStarRate;
import ezen.hang.heritage.web.admin.controller.AdminController;
import ezen.hang.heritage.web.item.controller.ItemController;
import ezen.hang.heritage.web.member.controller.MemberController;


@SpringBootTest
class UserHeritageListTest {

	@Autowired
	private ItemController test;
	
	@Autowired
	private MemberController mc;
	
	@Autowired
	private AdminController ac;
	
	@Autowired
	private AdminMapper am;
	
	@Autowired
	private AdminService as;
	
	
	@Test
	@Disabled
	void test() {
		List<CommentStarRate> list = new ArrayList<>();
		list.addAll(test.userHeritageList("jsk9943"));
		System.out.println("테스트 실행");
		System.out.println(list);
		for (CommentStarRate commentStarRate : list) {
			System.out.println(commentStarRate.toString());
		}
	}
	
	@Test
	@Disabled
	void test2() {
		System.out.println("테스트 시작");
		Map<String, Object> map = new HashMap<>();
		map.put("adminid", "jsk9943");
		map.put("ccbaAsno", "0001");
		System.out.println(ac.keywordCommentFind(map));
	}
	
	@Test
	@Disabled
	void test3() {
		System.out.println("테스트 시작");
		Map<String, Object> map = new HashMap<>();
		map.put("adminid", "jsk9943");
		System.out.println(ac.allUserAuthority(map));
	}

}
