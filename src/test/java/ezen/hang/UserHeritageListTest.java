package ezen.hang;

import java.util.List;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import ezen.hang.heritage.domain.item.dto.CommentStarRate;
import ezen.hang.heritage.domain.item.mapper.ItemMapper;

@SpringBootTest
class UserHeritageListTest {

	@Autowired
	private ItemMapper im;

	@Test
	@Disabled
	void test() {
		CommentStarRate rate = new CommentStarRate();
		rate.setCcbaAsno("00010000");
		rate.setCcbaCtcd("11");
		rate.setCcbaKdcd("11");
		List<CommentStarRate> list = im.rateAvgPoint(rate);
		
		System.out.println(list.size());
	}

}
