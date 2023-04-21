package ezen.hang.heritage.domain.item.dao;

import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.springframework.stereotype.Repository;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import ezen.hang.heritage.domain.item.dto.Heritage;

/**
 * https://www.cha.go.kr/html/HtmlPage.do?pg=/publicinfo/pbinfo3_0202.jsp&mn=NS_04_04_03
 * 문화재청 API 서비스를 통해 실시간 문화재 정보를 xml로 받아와 parsing하여 web 서비스 처리 필요한 객체 정보는 user
 * 정보과 함께 DB에 저장하여 재사용
 */
@Repository
public class DataSearchDao {
	private String ccbaMnm1, ccbaKdcd, ccbaAsno, ccbaCtcd;

	public void setCcbaMnm1Value(String ccbaMnm1) {
		this.ccbaMnm1 = ccbaMnm1;
	}

	public void setCcbaKdcd(String ccbaKdcd) {
		this.ccbaKdcd = ccbaKdcd;
	}

	public void setCcbaAsno(String ccbaAsno) {
		this.ccbaAsno = ccbaAsno;
	}

	public void setCcbaCtcd(String ccbaCtcd) {
		this.ccbaCtcd = ccbaCtcd;
	}

	/**
	 * 문화재청 API로 문화재명 또는 지역명으로 검색 시 xml 반환 받는 URL pageUnit은 받아 올 수 있는 최대 결과값
	 */
	public List<Heritage> searchHeritage() throws Exception {
		String url = "http://www.cha.go.kr/cha/SearchKindOpenapiList.do?ccbaMnm1=" + ccbaMnm1 + "&pageUnit=30";
		List<Heritage> list = new ArrayList<>();
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(url);
		doc.getDocumentElement().normalize();
		NodeList nList = doc.getElementsByTagName("item");
		for (int i = 0; i < nList.getLength(); i++) {
			Node nNode = nList.item(i);
			if (nNode.getNodeType() == Node.ELEMENT_NODE) {
				Element eElement = (Element) nNode;
				Heritage heritage = new Heritage();
				heritage.setSn(eElement.getElementsByTagName("sn").item(0).getTextContent());
				heritage.setNo(eElement.getElementsByTagName("no").item(0).getTextContent());
				heritage.setCcmaName(eElement.getElementsByTagName("ccmaName").item(0).getTextContent());
				heritage.setCrltsnoNm(eElement.getElementsByTagName("crltsnoNm").item(0).getTextContent());
				heritage.setCcbaMnm1(eElement.getElementsByTagName("ccbaMnm1").item(0).getTextContent());
				heritage.setCcbaMnm2(eElement.getElementsByTagName("ccbaMnm2").item(0).getTextContent());
				heritage.setCcbaCtcdNm(eElement.getElementsByTagName("ccbaCtcdNm").item(0).getTextContent());
				heritage.setCcbaAdmin(eElement.getElementsByTagName("ccbaAdmin").item(0).getTextContent());
				heritage.setCcbaKdcd(eElement.getElementsByTagName("ccbaKdcd").item(0).getTextContent());
				heritage.setCcbaCtcd(eElement.getElementsByTagName("ccbaCtcd").item(0).getTextContent());
				heritage.setCcbaAsno(eElement.getElementsByTagName("ccbaAsno").item(0).getTextContent());
				heritage.setCcbaCncl(eElement.getElementsByTagName("ccbaCncl").item(0).getTextContent());
				heritage.setCcbaCpno(eElement.getElementsByTagName("ccbaCpno").item(0).getTextContent());
				heritage.setLongitude(eElement.getElementsByTagName("longitude").item(0).getTextContent());
				heritage.setLatitude(eElement.getElementsByTagName("latitude").item(0).getTextContent());
				list.add(heritage);
			}
		}
		return list;
	}

	/**
	 * 문화재청 API로 받아온 문화재의 자세한 위치값 및 사진, 설명내용을 받아오기 위한 URL
	 */
	public Heritage detailSearchHeritage() throws Exception {
		String url = "http://www.cha.go.kr/cha/SearchKindOpenapiDt.do?ccbaKdcd=" + ccbaKdcd + "&ccbaAsno=" + ccbaAsno
				+ "&ccbaCtcd=" + ccbaCtcd;
		Heritage heritage = new Heritage();
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(url);
		doc.getDocumentElement().normalize();
		NodeList nList = doc.getElementsByTagName("result");
		for (int i = 0; i < nList.getLength(); i++) {
			Node nNode = nList.item(i);
			if (nNode.getNodeType() == Node.ELEMENT_NODE) {
				Element eElement = (Element) nNode;
				heritage.setCcbaKdcd(eElement.getElementsByTagName("ccbaKdcd").item(0).getTextContent());
				heritage.setCcbaAsno(eElement.getElementsByTagName("ccbaAsno").item(0).getTextContent());
				heritage.setCcbaCtcd(eElement.getElementsByTagName("ccbaCtcd").item(0).getTextContent());
				heritage.setCcbaCpno(eElement.getElementsByTagName("ccbaCpno").item(0).getTextContent());
				heritage.setLongitude(eElement.getElementsByTagName("longitude").item(0).getTextContent());
				heritage.setLatitude(eElement.getElementsByTagName("latitude").item(0).getTextContent());
				heritage.setCcmaName(eElement.getElementsByTagName("ccmaName").item(0).getTextContent());
				heritage.setCrltsnoNm(eElement.getElementsByTagName("crltsnoNm").item(0).getTextContent());
				heritage.setCcbaMnm1(eElement.getElementsByTagName("ccbaMnm1").item(0).getTextContent());
				heritage.setCcbaMnm2(eElement.getElementsByTagName("ccbaMnm2").item(0).getTextContent());
				heritage.setGcodeName(eElement.getElementsByTagName("gcodeName").item(0).getTextContent());
				heritage.setBcodeName(eElement.getElementsByTagName("bcodeName").item(0).getTextContent());
				heritage.setMcodeName(eElement.getElementsByTagName("mcodeName").item(0).getTextContent());
				heritage.setScodeName(eElement.getElementsByTagName("scodeName").item(0).getTextContent());
				heritage.setCcbaQuan(eElement.getElementsByTagName("ccbaQuan").item(0).getTextContent());
				heritage.setCcbaAsdt(eElement.getElementsByTagName("ccbaAsdt").item(0).getTextContent());
				heritage.setCcbaCtcdNm(eElement.getElementsByTagName("ccbaCtcdNm").item(0).getTextContent());
				heritage.setCcsiName(eElement.getElementsByTagName("ccsiName").item(0).getTextContent());
				heritage.setCcbaLcad(eElement.getElementsByTagName("ccbaLcad").item(0).getTextContent());
				heritage.setCcceName(eElement.getElementsByTagName("ccceName").item(0).getTextContent());
				heritage.setCcbaPoss(eElement.getElementsByTagName("ccbaPoss").item(0).getTextContent());
				heritage.setCcbaAdmin(eElement.getElementsByTagName("ccbaAdmin").item(0).getTextContent());
				heritage.setCcbaCncl(eElement.getElementsByTagName("ccbaCncl").item(0).getTextContent());
				heritage.setCcbaCndt(eElement.getElementsByTagName("ccbaCndt").item(0).getTextContent());
				heritage.setImageUrl(eElement.getElementsByTagName("imageUrl").item(0).getTextContent());
				heritage.setContent(eElement.getElementsByTagName("content").item(0).getTextContent());
			}
		}
		return heritage;
	}

}
