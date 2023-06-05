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
	public Map<String, Object> dayVisitorExiste(Map<String, Object> todayData) throws Exception {
		Map<String, Object> returnVisitorData = visitorMapper.dayVisitorExiste(todayData);
		if(returnVisitorData == null) {
			Map<String, Object> yesterdayMap = new HashMap<>();
			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.DAY_OF_YEAR, -1);
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String yesterday = dateFormat.format(calendar.getTime());
			yesterdayMap.put("day", yesterday);
			int visitor_totalcount = 0;
			if(visitorMapper.dayVisitorExiste(yesterdayMap) == null) {
				int minusDay = -1;
				while(visitor_totalcount == 0) {
					calendar.add(Calendar.DAY_OF_YEAR, minusDay);
					yesterday = dateFormat.format(calendar.getTime());
					yesterdayMap.put("day", yesterday);
					try {
						visitor_totalcount = Integer.parseInt(visitorMapper.dayVisitorExiste(yesterdayMap).get("visitor_totalcount").toString());						
					} catch (Exception e) {
						minusDay--;
					}
				}
			} else if (visitorMapper.dayVisitorExiste(yesterdayMap) != null) {
				visitor_totalcount = Integer.parseInt(visitorMapper.dayVisitorExiste(yesterdayMap).get("visitor_totalcount").toString());
			}
			visitorMapper.insertTodayVisitorCount(String.valueOf(visitor_totalcount));
			Map<String, Object> map = new HashMap<>();
	        map = visitorMapper.dayVisitorExiste(todayData);
	        returnVisitorData = new HashMap<>();
	        returnVisitorData.putAll(map);
		}
		return returnVisitorData;
	}

	@Override
	public Map<String, Object> updateTodayVisitorCount(Map<String, Object> todayData) throws Exception {
		Map<String, Object> updateVisitorCountData = new HashMap<>();
		int visitor_count = Integer.parseInt(dayVisitorExiste(todayData).get("visitor_count").toString());
		int visitor_totalcount = Integer.parseInt(dayVisitorExiste(todayData).get("visitor_totalcount").toString());
		String date = todayData.get("day").toString();
		updateVisitorCountData.put("visit_date", date);
		updateVisitorCountData.put("visitor_count", visitor_count + 1);
		updateVisitorCountData.put("visitor_totalcount", visitor_totalcount + 1);
		visitorMapper.updateTodayVisitorCount(updateVisitorCountData);
		Map<String, Object> returnVisitorData = visitorMapper.dayVisitorExiste(todayData);
		return returnVisitorData;
	}
	
}
