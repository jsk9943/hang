package ezen.hang.heritage.domain.item.service;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import ezen.hang.heritage.domain.item.dao.DataSearchDao;
import ezen.hang.heritage.domain.item.dto.Heritage;
import ezen.hang.heritage.domain.item.dto.CommentStarRate;
import ezen.hang.heritage.domain.item.mapper.ItemMapper;

/**
 * Dao에서 받아온 문화재청 정보를 객체에 담아 Web과 DB에 저장하고 문화재, 유저 별 등록된 별점과 댓글목록을 가져와 Web과 DB에
 * 저장하는 ServiceImplements
 */
@Service
@Transactional
public class ItemServiceImpl implements ItemService {

	@Autowired
	private DataSearchDao dsd;

	@Autowired
	private ItemMapper itemMapper;

	/**
	 * 검색요청하는 문화재 명에 따라 결과값을 List로 반환하고 추가로 상세검색을 위한 객체반환 ServiceImplements
	 */
	@Override
	public List<Heritage> searchHeritageParsing(String ccbaMnm1) throws Exception {
		return dsd.searchHeritage(ccbaMnm1);
	}

	@Override
	public Heritage detailSearchHeritageParsing(String ccbaKdcd, String ccbaAsno, String ccbaCtcd) throws Exception {
		Heritage heritage = new Heritage();
		CommentStarRate commentStarRate = new CommentStarRate();
		heritage = dsd.detailSearchHeritage(ccbaKdcd, ccbaAsno, ccbaCtcd);
		commentStarRate.setCcbaKdcd(ccbaKdcd);
		commentStarRate.setCcbaAsno(ccbaAsno);
		commentStarRate.setCcbaCtcd(ccbaCtcd);
		List<CommentStarRate> list = itemMapper.rateAvgPoint(commentStarRate);
		int totalPoint = 0;
		int count = list.size();
		if (count == 0) {
			commentStarRate.setStarpoint(1);
		} else {
			for (CommentStarRate starRateResult : list) {
				int point = starRateResult.getStarpoint();
				totalPoint += point;
			}
			int avgPoint = totalPoint / count;
			commentStarRate.setStarpoint(avgPoint);
		}
		commentStarRate.setCount(count);
		heritage.setStarRate(commentStarRate);
		return heritage;
	}

	/**
	 * 문화재에 등록된 유저들의 별점과 댓글을 등록하고 삭제, 가져오는 ServiceImplements
	 */
	@Override
	public void createCommentStarRate(Map<String, Object> inputData, MultipartFile file) throws Exception {
		String userid = inputData.get("userid").toString();
		String ccbaKdcd = inputData.get("ccbaKdcd").toString();
		String ccbaAsno = inputData.get("ccbaAsno").toString();
		String ccbaCtcd = inputData.get("ccbaCtcd").toString();
		String ccbaMnm1 = inputData.get("ccbaMnm1").toString();
		String comment = inputData.get("comment").toString();
		int starpoint = Integer.parseInt(inputData.get("starpoint").toString());
		if (itemMapper.userAccess(userid).equals("Y")) {
			CommentStarRate commentStarRate = new CommentStarRate();
			commentStarRate.setUserid(userid);
			commentStarRate.setCcbaKdcd(ccbaKdcd);
			commentStarRate.setCcbaAsno(ccbaAsno);
			commentStarRate.setCcbaCtcd(ccbaCtcd);
			commentStarRate.setCcbaMnm1(ccbaMnm1);
			commentStarRate.setComment(comment);
			commentStarRate.setStarpoint(starpoint);
			if (file != null && !file.isEmpty()) {
				String uploadDirPath = "/userfile/";
				File uploadDir = new File(uploadDirPath);
				if (!uploadDir.exists()) {
					uploadDir.mkdirs();
				}
				UUID uuid = UUID.randomUUID();
				String originalFilename = file.getOriginalFilename();
				@SuppressWarnings("null")
				String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
				String newFileName = userid + uuid.toString() + "." + fileExtension;
				File dest = new File(uploadDirPath + newFileName);
				String filePath = dest.getAbsolutePath();
				file.transferTo(dest);
				itemMapper.commentCreate(commentStarRate, filePath);
				itemMapper.starRatingCreate(commentStarRate);
			} else if (file == null || file.isEmpty()) {
				itemMapper.commentCreate(commentStarRate, null);
				itemMapper.starRatingCreate(commentStarRate);
			}
		} else {
			throw new NullPointerException();
		}
	}

	@Override
	public List<Map<String, Object>> commentStarRateLoad(String ccbaKdcd, String ccbaAsno, String ccbaCtcd) {
		Map<String, Object> map = new HashMap<>();
		map.put("ccbaKdcd", ccbaKdcd);
		map.put("ccbaAsno", ccbaAsno);
		map.put("ccbaCtcd", ccbaCtcd);
		return itemMapper.commentStarRateLoad(map);
	}

	@Override
	public List<Map<String, Object>> userHeritageList(String userid) {
		return itemMapper.userHeritageList(userid);
	}

	@Override
	public void deleteCommentStarRate(List<Map<String, Object>> deleteData) throws Exception {
		List<String> filenamesToDelete = new ArrayList<>();
		for (Map<String, Object> map : deleteData) {
		    String userid = map.get("userid").toString();
		    String ccbaAsno = map.get("ccbaAsno").toString();
		    String filename = map.get("filename").toString();
		    CommentStarRate commentStarRate = new CommentStarRate();
		    commentStarRate.setUserid(userid);
		    commentStarRate.setCcbaAsno(ccbaAsno);
		    itemMapper.deleteCommentStarRateMapper(commentStarRate);
		    filenamesToDelete.add(filename);
		}
		for (String filename : filenamesToDelete) {
			deleteImage(filename);
		}
	}

	@Override
	public ResponseEntity<ByteArrayResource> getImage(String filename) throws Exception {
		UrlResource resource = new UrlResource("file:/userfile/" + filename);
		if (resource.exists() && resource.isReadable()) {
	        BufferedImage image = ImageIO.read(resource.getInputStream());
	        int width = image.getWidth() / 2;
	        int height = image.getHeight() / 2;
	        BufferedImage resizedImage = new BufferedImage(width, height, image.getType());
	        Graphics2D g2d = resizedImage.createGraphics();
	        g2d.drawImage(image, 0, 0, width, height, null);
	        g2d.dispose();
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();

	        Path path = Paths.get(filename);
	        String extension = "";
	        if (filename.contains(".")) {
	            extension = path.getFileName().toString().substring(filename.lastIndexOf(".") + 1);
	        }
	        
	        if (extension.equalsIgnoreCase("png")) {
	            ImageIO.write(resizedImage, "png", baos);
	        } else if (extension.equalsIgnoreCase("jpg") || extension.equalsIgnoreCase("jpeg")) {
	            ImageIO.write(resizedImage, "jpg", baos);
	        }
	        
	        byte[] imageBytes = baos.toByteArray();
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.IMAGE_PNG);
	        return ResponseEntity.ok().headers(headers).body(new ByteArrayResource(imageBytes));
		} else {
			throw new RuntimeException(filename);
		}
	}

	@Override
	public void deleteImage(String filename) throws Exception {
		String filePath = "/userfile/" + filename;
		File fileToDelete = new File(filePath);
		if (fileToDelete.exists()) {
			fileToDelete.delete();
		} else {
			throw new FileNotFoundException("삭제할 파일이 존재하지 않습니다.");
		}
	}

}
