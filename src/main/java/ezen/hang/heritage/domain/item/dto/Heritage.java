package ezen.hang.heritage.domain.item.dto;
/**
 * 문화재 객체 자체 생성
 * "ccbaKdcd", "ccbaAsno", "ccbaCtcd", "ccbaCpno", "longitude", "latitude", "ccmaName", "crltsnoNm", "ccbaMnm1", "ccbaMnm2", "gcodeName", "bcodeName", "mcodeName", "scodeName", "ccbaQuan", "ccbaAsdt", "ccbaCtcdNm", "ccsiName", "ccbaLcad", "ccceName", "ccbaPoss", "ccbaAdmin", "ccbaCncl", "ccbaCndt", "imageUrl", "content"
 * @author 김정석
 * @date   2023. 3. 27.
 */

public class Heritage {
    private String sn, no, ccbaKdcd, ccbaAsno, ccbaCtcd, ccbaCpno, longitude, latitude, ccmaName, crltsnoNm, ccbaMnm1, ccbaMnm2, gcodeName, bcodeName, mcodeName, scodeName, ccbaQuan, ccbaAsdt, ccbaCtcdNm, ccsiName, ccbaLcad, ccceName, ccbaPoss, ccbaAdmin, ccbaCncl, ccbaCndt, imageUrl, content;
	private CommentStarRate starRate;
	
	
	public Heritage() {
	}
	
	// 검색 단어
	public Heritage(String ccbaMnm1) {
		this.ccbaMnm1 = ccbaMnm1;
	}

	// 검색바를 통한 검색객체
	public Heritage(String sn, String no, String ccbaKdcd, String ccbaAsno, String ccbaCtcd, String ccbaCpno, String longitude,
			String latitude, String ccmaName, String crltsnoNm, String ccbaMnm1, String ccbaMnm2, String gcodeName,
			String bcodeName, String mcodeName, String scodeName, String ccbaQuan, String ccbaAsdt, String ccbaCtcdNm,
			String ccsiName, String ccbaLcad, String ccceName, String ccbaPoss, String ccbaAdmin, String ccbaCncl,
			String ccbaCndt, String imageUrl, String content, CommentStarRate starRate) {
		this.sn = sn;
		this.no = no;
		this.ccbaKdcd = ccbaKdcd;
		this.ccbaAsno = ccbaAsno;
		this.ccbaCtcd = ccbaCtcd;
		this.ccbaCpno = ccbaCpno;
		this.longitude = longitude;
		this.latitude = latitude;
		this.ccmaName = ccmaName;
		this.crltsnoNm = crltsnoNm;
		this.ccbaMnm1 = ccbaMnm1;
		this.ccbaMnm2 = ccbaMnm2;
		this.gcodeName = gcodeName;
		this.bcodeName = bcodeName;
		this.mcodeName = mcodeName;
		this.scodeName = scodeName;
		this.ccbaQuan = ccbaQuan;
		this.ccbaAsdt = ccbaAsdt;
		this.ccbaCtcdNm = ccbaCtcdNm;
		this.ccsiName = ccsiName;
		this.ccbaLcad = ccbaLcad;
		this.ccceName = ccceName;
		this.ccbaPoss = ccbaPoss;
		this.ccbaAdmin = ccbaAdmin;
		this.ccbaCncl = ccbaCncl;
		this.ccbaCndt = ccbaCndt;
		this.imageUrl = imageUrl;
		this.content = content;
		this.starRate = starRate;
	}
	
	public String getSn() {
		return sn;
	}
	
	public void setSn(String sn) {
		this.sn = sn;
	}
	
	public String getNo() {
		return no;
	}
	
	public void setNo(String no) {
		this.no = no;
	}


	public String getCcbaKdcd() {
		return ccbaKdcd;
	}


	public void setCcbaKdcd(String ccbaKdcd) {
		this.ccbaKdcd = ccbaKdcd;
	}


	public String getCcbaAsno() {
		return ccbaAsno;
	}


	public void setCcbaAsno(String ccbaAsno) {
		this.ccbaAsno = ccbaAsno;
	}


	public String getCcbaCtcd() {
		return ccbaCtcd;
	}


	public void setCcbaCtcd(String ccbaCtcd) {
		this.ccbaCtcd = ccbaCtcd;
	}


	public String getCcbaCpno() {
		return ccbaCpno;
	}


	public void setCcbaCpno(String ccbaCpno) {
		this.ccbaCpno = ccbaCpno;
	}


	public String getLongitude() {
		return longitude;
	}


	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}


	public String getLatitude() {
		return latitude;
	}


	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}


	public String getCcmaName() {
		return ccmaName;
	}


	public void setCcmaName(String ccmaName) {
		this.ccmaName = ccmaName;
	}


	public String getCrltsnoNm() {
		return crltsnoNm;
	}


	public void setCrltsnoNm(String crltsnoNm) {
		this.crltsnoNm = crltsnoNm;
	}


	public String getCcbaMnm1() {
		return ccbaMnm1;
	}


	public void setCcbaMnm1(String ccbaMnm1) {
		this.ccbaMnm1 = ccbaMnm1;
	}


	public String getCcbaMnm2() {
		return ccbaMnm2;
	}


	public void setCcbaMnm2(String ccbaMnm2) {
		this.ccbaMnm2 = ccbaMnm2;
	}


	public String getGcodeName() {
		return gcodeName;
	}


	public void setGcodeName(String gcodeName) {
		this.gcodeName = gcodeName;
	}


	public String getBcodeName() {
		return bcodeName;
	}


	public void setBcodeName(String bcodeName) {
		this.bcodeName = bcodeName;
	}


	public String getMcodeName() {
		return mcodeName;
	}


	public void setMcodeName(String mcodeName) {
		this.mcodeName = mcodeName;
	}


	public String getScodeName() {
		return scodeName;
	}


	public void setScodeName(String scodeName) {
		this.scodeName = scodeName;
	}


	public String getCcbaQuan() {
		return ccbaQuan;
	}


	public void setCcbaQuan(String ccbaQuan) {
		this.ccbaQuan = ccbaQuan;
	}


	public String getCcbaAsdt() {
		return ccbaAsdt;
	}


	public void setCcbaAsdt(String ccbaAsdt) {
		this.ccbaAsdt = ccbaAsdt;
	}


	public String getCcbaCtcdNm() {
		return ccbaCtcdNm;
	}


	public void setCcbaCtcdNm(String ccbaCtcdNm) {
		this.ccbaCtcdNm = ccbaCtcdNm;
	}


	public String getCcsiName() {
		return ccsiName;
	}


	public void setCcsiName(String ccsiName) {
		this.ccsiName = ccsiName;
	}


	public String getCcbaLcad() {
		return ccbaLcad;
	}


	public void setCcbaLcad(String ccbaLcad) {
		this.ccbaLcad = ccbaLcad;
	}


	public String getCcceName() {
		return ccceName;
	}


	public void setCcceName(String ccceName) {
		this.ccceName = ccceName;
	}


	public String getCcbaPoss() {
		return ccbaPoss;
	}


	public void setCcbaPoss(String ccbaPoss) {
		this.ccbaPoss = ccbaPoss;
	}


	public String getCcbaAdmin() {
		return ccbaAdmin;
	}


	public void setCcbaAdmin(String ccbaAdmin) {
		this.ccbaAdmin = ccbaAdmin;
	}


	public String getCcbaCncl() {
		return ccbaCncl;
	}


	public void setCcbaCncl(String ccbaCncl) {
		this.ccbaCncl = ccbaCncl;
	}


	public String getCcbaCndt() {
		return ccbaCndt;
	}


	public void setCcbaCndt(String ccbaCndt) {
		this.ccbaCndt = ccbaCndt;
	}


	public String getImageUrl() {
		return imageUrl;
	}


	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}
	
	
	public CommentStarRate getStarRate() {
		return starRate;
	}

	public void setStarRate(CommentStarRate starRate) {
		this.starRate = starRate;
	}

	@Override
	public String toString() {
		return "Heritage [sn=" + sn + ", no=" + no + ", ccbaKdcd=" + ccbaKdcd + ", ccbaAsno=" + ccbaAsno + ", ccbaCtcd="
				+ ccbaCtcd + ", ccbaCpno=" + ccbaCpno + ", longitude=" + longitude + ", latitude=" + latitude
				+ ", ccmaName=" + ccmaName + ", crltsnoNm=" + crltsnoNm + ", ccbaMnm1=" + ccbaMnm1 + ", ccbaMnm2="
				+ ccbaMnm2 + ", gcodeName=" + gcodeName + ", bcodeName=" + bcodeName + ", mcodeName=" + mcodeName
				+ ", scodeName=" + scodeName + ", ccbaQuan=" + ccbaQuan + ", ccbaAsdt=" + ccbaAsdt + ", ccbaCtcdNm="
				+ ccbaCtcdNm + ", ccsiName=" + ccsiName + ", ccbaLcad=" + ccbaLcad + ", ccceName=" + ccceName
				+ ", ccbaPoss=" + ccbaPoss + ", ccbaAdmin=" + ccbaAdmin + ", ccbaCncl=" + ccbaCncl + ", ccbaCndt="
				+ ccbaCndt + ", imageUrl=" + imageUrl + ", content=" + content + ", starRate=" + starRate + "]";
	}

}
