package ezen.hang.heritage.domain.visitor.service;

import java.util.Map;
/**
 * 실시간 방문자 수 기록 및 조회
 * @author 김정석
 */
public interface VisitorService {
	
	public Map<String, Object> dayVisitorExiste(Map<String, Object> todayVisitorData) throws Exception;
	
	public void updateTodayVisitorCount(Map<String, Object> visitorCountData) throws Exception;
	
}
