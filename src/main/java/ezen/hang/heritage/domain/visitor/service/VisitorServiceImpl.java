package ezen.hang.heritage.domain.visitor.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ezen.hang.heritage.domain.visitor.mapper.VisitorMapper;

@Service
@Transactional
public class VisitorServiceImpl implements VisitorService{

	@Autowired
	private VisitorMapper visitorMapper;
	
	@Override
	public Map<String, Object> dayVisitorExiste(Map<String, Object> todayVisitorData) {
		Map<String, Object> map = new HashMap<>();
		if(visitorMapper.dayVisitorExiste(todayVisitorData) == null) {
			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.DAY_OF_YEAR, -1);
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String yesterday = dateFormat.format(calendar.getTime());
			map.put("day", yesterday);
			visitorMapper.insertTodayVisitorCount(visitorMapper.dayVisitorExiste(map).get("visitor_totalcount").toString());
		}
		return visitorMapper.dayVisitorExiste(todayVisitorData);
	}

	@Override
	public void updateTodayVisitorCount(Map<String, Object> todayData) throws Exception {
		Map<String, Object> updateVisitorCountData = new HashMap<>();
		int visitor_count = Integer.parseInt(dayVisitorExiste(todayData).get("visitor_count").toString());
		int visitor_totalcount = Integer.parseInt(dayVisitorExiste(todayData).get("visitor_totalcount").toString());
		String date = todayData.get("day").toString();
		updateVisitorCountData.put("visit_date", date);
		updateVisitorCountData.put("visitor_count", visitor_count + 1);
		updateVisitorCountData.put("visitor_totalcount", visitor_totalcount + 1);
		visitorMapper.updateTodayVisitorCount(updateVisitorCountData);
	}
	
}
