package ezen.hang;


import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.domain.item.dto.CommentStarRate;
import ezen.hang.heritage.web.item.controller.ItemController;


@SpringBootTest
class UserHeritageListTest {

	@Autowired
	private ItemController test;
	
	@Test
	void test() {
		List<CommentStarRate> list = new ArrayList<>();
		list.addAll(test.userHeritageList("jsk9943"));
		System.out.println("테스트 실행");
		System.out.println(list);
		for (CommentStarRate commentStarRate : list) {
			System.out.println(commentStarRate.toString());
		}
	}

}
