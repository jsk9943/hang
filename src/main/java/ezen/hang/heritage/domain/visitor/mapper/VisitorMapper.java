package ezen.hang.heritage.domain.visitor.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VisitorMapper {
	
	public Map<String, Object> dayVisitorExiste(Map<String, Object> todayData);
	
	public Map<String,Object> latestDateData();
	
	public int insertTodayVisitorCount(String visitor_totalcount);
	
	public void updateTodayVisitorCount(Map<String, Object> todayData);
}
