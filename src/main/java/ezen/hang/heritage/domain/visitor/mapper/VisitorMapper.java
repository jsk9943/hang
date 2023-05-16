package ezen.hang.heritage.domain.visitor.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VisitorMapper {
	
	public Map<String, Object> dayVisitorExiste(Map<String, Object> todayVisitorData);
	
	public int insertTodayVisitorCount(String totalVisitorCount);
	
	public void updateTodayVisitorCount(Map<String, Object> updateVisitorCountData);
}
