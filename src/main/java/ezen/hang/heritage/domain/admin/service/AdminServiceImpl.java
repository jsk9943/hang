package ezen.hang.heritage.domain.admin.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ezen.hang.heritage.domain.admin.mapper.AdminMapper;

/**
 * 회원 관련 비즈니스 메소드 service implement 구현
 */
@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminMapper adminMapper;

	/**
	 * 코멘트가 등록된 전체 유저 정보를 가져와 게시판에 보여주고 선택된 데이터가 request되면 DB에서 삭제
	 */
	@Override
	public List<Map<String, Object>> allCommentList(Map<String, Object> useridData) throws Exception {
		List<Map<String, Object>> data = null;
		String adminid = useridData.get("adminid").toString();
		if (adminMapper.adminIdConfirm(adminid).equals("Y")) {
			data = adminMapper.allCommentList();
		} else {
			return data;
		}
		return data;
	}

	@Override
	public List<Map<String, Object>> keywordCommentFind(Map<String, Object> keyword) throws Exception {
		List<Map<String, Object>> data = null;
		String adminid = keyword.get("adminid").toString();
		if (adminMapper.adminIdConfirm(adminid).equals("Y")) {
			data = adminMapper.keywordCommentFind(keyword);
		} else {
			return data;
		}
		return data;
	}

	@Override
	public void checkCommentDelete(List<Map<String, Object>> deleteCommentList) throws Exception {
		for (Map<String, Object> map : deleteCommentList) {
			String adminid = map.get("adminid").toString();
			String filename = map.get("filename").toString();
			if (adminMapper.adminIdConfirm(adminid).equals("Y")) {
				adminMapper.checkCommentDelete(map);
				if (!filename.equals("undefined")) {
					deleteImage(filename);
				}
			}
		}
	}

	@Override
	public void deleteImage(String filename) throws Exception {
		String filePath = "/userfile/" + filename;
		File fileToDelete = new File(filePath);
		System.out.println(fileToDelete);
		if (fileToDelete.exists()) {
			fileToDelete.delete();
		} else {
			throw new FileNotFoundException("삭제할 파일이 존재하지 않습니다.");
		}
	}

	/**
	 * 유저의 권한부여 기능으로 관리자권한과 댓글쓰기,금지 권한을 변경 할 수 있음
	 */
	@Override
	public List<Map<String, Object>> allUserAuthority(Map<String, Object> useridData) throws Exception {
		List<Map<String, Object>> data = null;
		String adminid = useridData.get("adminid").toString();
		if (adminMapper.adminIdConfirm(adminid).equals("Y")) {
			data = adminMapper.allUserAuthority();
		} else {
			return data;
		}
		return data;
	}

	@Override
	public List<Map<String, Object>> keywordUserAuthorityFind(Map<String, Object> keyword) throws Exception {
		List<Map<String, Object>> data = null;
		String adminid = keyword.get("adminid").toString();
		if (adminMapper.adminIdConfirm(adminid).equals("Y")) {
			data = adminMapper.keywordUserAuthorityFind(keyword);
		} else {
			return data;
		}
		return data;
	}

	@Override
	public void userAuthorityChange(List<Map<String, Object>> userData) throws Exception {
		for (Map<String, Object> map : userData) {
			String adminid = map.get("adminid").toString();
			if (adminMapper.adminIdConfirm(adminid).equals("Y")) {
				adminMapper.userAuthorityChange(map);
			}
		}
	}

	/**
	 * 유저를 강제 탈퇴시킬 수 있는 기능
	 */
	@Override
	public List<Map<String, Object>> allUserForcedWithdrawal(Map<String, Object> useridData) throws Exception {
		List<Map<String, Object>> data = null;
		String adminid = useridData.get("adminid").toString();
		if (adminMapper.adminIdConfirm(adminid).equals("Y")) {
			data = adminMapper.allUserForcedWithdrawal();
		} else {
			return data;
		}
		return data;
	}

	@Override
	public List<Map<String, Object>> keywordUserForcedWithdrawalFind(Map<String, Object> keyword) {
		List<Map<String, Object>> data = null;
		String adminid = keyword.get("adminid").toString();
		if (adminMapper.adminIdConfirm(adminid).equals("Y")) {
			data = adminMapper.keywordUserForcedWithdrawalFind(keyword);
		} else {
			return data;
		}
		return data;
	}

	@Override
	public void deleteUserForcedWithdrawal(Map<String, Object> useridData) throws Exception {
		String adminid = useridData.get("adminid").toString();
		if (adminMapper.adminIdConfirm(adminid).equals("Y")) {
			String userid = useridData.get("userid").toString();
			String uuid = userid + UUID.randomUUID().toString();
			useridData.put("randomUUID", uuid);
			adminMapper.userWithdrawalHERITAGEREVIEW(useridData);
			adminMapper.userWithdrawalRATE(useridData);
			adminMapper.userWithdrawalBOOKMARK(useridData);
			adminMapper.userWithdrawalPROFILEIMAGE(useridData);
			adminMapper.userWithdrawalAUTHORITY(useridData);
			while (adminMapper.remainingMessageNumberState(useridData).size() != 0) {
				for (Map<String, Object> map : adminMapper.remainingMessageNumberState(useridData)) {
					int mess_no = Integer.parseInt(map.get("mess_no").toString());
					String mess_state = map.get("mess_state").toString();
					if (mess_state.equals("receive")) {
						adminMapper.deleteReceiveMessage(mess_no);
					}
					if (mess_state.equals("send")) {
						adminMapper.deleteSendMessage(mess_no);
					}
					int messageCount = adminMapper.remainingMessageCount(mess_no);
					if (messageCount == 0) {
						adminMapper.deleteMessageContents(mess_no);
					}
				}
			}
			adminMapper.userWithdrawalMEMBER(useridData);
		}
	}

	/**
	 * 공지사항 사용 전 관리자 권한 유무 체크
	 */
	@Override
	public String adminIdConfirm(Map<String, Object> adminId) throws Exception {
		String adminid = adminId.get("adminid").toString();
		return adminMapper.adminIdConfirm(adminid);
	}

}
