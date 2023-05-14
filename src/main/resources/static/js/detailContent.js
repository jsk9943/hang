/**
 * 디테일 설명 메뉴 확인
 */
import { bookmarkConfirmRegistration, heritageCommentList, commentStaRateCreate, bookmarkAdd, bookmarkClear, heritageReviewPhotoLoading } from './fetch.js';
export function detailContentLoad(data) {
	let markerLongitude = Number(data.longitude);
	let markerLatitude = Number(data.latitude);
	let moveLatLon; // 마커 이동할 좌표
	if (markerLongitude === 0) {
		moveLatLon = new kakao.maps.LatLng(37.559975, 126.975312);
		var markerImage2 = new kakao.maps.MarkerImage('./img/koreaimg.png', new kakao.maps.Size(35, 35));
		// 마커 이미지 변경
		marker.setImage(markerImage2);
	} else {
		moveLatLon = new kakao.maps.LatLng(markerLatitude, markerLongitude);
		var markerImage = new kakao.maps.MarkerImage('./img/ping.gif', new kakao.maps.Size(35, 35));
		marker.setImage(markerImage);
	}
	marker.setPosition(moveLatLon);
	marker.setMap(map);
	map.panTo(moveLatLon); // 지도 부드럽게 움직이기
	var itemContent = data.content;
	// 문화재 평균 별점
	var star = `
  <div class="rate">
  <input type="radio" class="star_radio" id="rating10" name="rating" value="10"><label for="rating10" title="5점"></label>
  <input type="radio" class="star_radio" id="rating9" name="rating" value="9"><label class="half" for="rating9" title="4.5점"></label>
  <input type="radio" class="star_radio" id="rating8" name="rating" value="8"><label for="rating8" title="4점"></label>
  <input type="radio" class="star_radio" id="rating7" name="rating" value="7"><label class="half" for="rating7" title="3.5점"></label>
  <input type="radio" class="star_radio" id="rating6" name="rating" value="6"><label for="rating6" title="3점"></label>
  <input type="radio" class="star_radio" id="rating5" name="rating" value="5"><label class="half" for="rating5" title="2.5점"></label>
  <input type="radio" class="star_radio" id="rating4" name="rating" value="4"><label for="rating4" title="2점"></label>
  <input type="radio" class="star_radio" id="rating3" name="rating" value="3"><label class="half" for="rating3" title="1.5점"></label>
  <input type="radio" class="star_radio" id="rating2" name="rating" value="2"><label for="rating2" title="1점"></label>
  <input type="radio" class="star_radio" id="rating1" name="rating" value="1"><label class="half" for="rating1" title="0.5점"></label>
  </div>
`;
	//문화재 설명 컨텐츠 창
	var content = `
    <div class="bAddr" style="overflow: hidden; width:400px; background-color:#f5f5f5; border:2px solid rgb(140, 145, 236); max-height:400px; padding:10px;">
    <div style="float:left; width: 100%; height:100%;">
      <div style="height:10%; width: 100%; font-size:1.2em; font-weight:800; margin-bottom:5px;">
        ${data.ccbaMnm1} <button type="button" class="btn-close infowindowClose" style="float: right;"></button>
        <p style="font-size:0.8em; font-weight: 800;">${data.ccmaName}</p>
      </button></p>
      </div>
      <div style="font-size: 0.7em; color:gray; width:100%;">지번 주소 : <span id="address1"></span></div>
      <div style="font-size: 0.7em; color:gray; width:100%; margin-bottom:10px;">도로명 주소 : <span id="address2"></span></div>
      <div style="overflow:hidden; width:100%; font-size:0.7em; color:gray; margin-bottom: 10px;line-height:100%;">
        총 리뷰(<span style="color:blue;">${data.starRate.count}</span>)<div id="buttonPlus"></div>
        <br>
        ${star}
      </div>
      <div class="scrollBarDesign" style="width:100%; max-height:140px; font-size:0.7em; overflow: auto; border:2px solid rgba(140, 145, 236, 0.5); padding: 1%; text-align: justify;">
        ${itemContent.replace(/\. /g, ".<br><br>")}
      </div>
      <div style="font-size: 1em; color:gray; text-align:center;">
      <a type="button" class="btn btn-outline-secondary" id="detailContentButton" style="font-family:'moonhwa'; font-size:0.9em; margin-top:10px; padding:5px 20px;">톺아보기</a>
      </div>
    </div>
  </div>
        	    `;
	// 주소 받기
	var geocoder = new kakao.maps.services.Geocoder();
	var callback = function(result, status) {
		var addressinfo1 = document.querySelector('#address1');
		var addressinfo2 = document.querySelector('#address2');
		if (status === kakao.maps.services.Status.OK) {
			if (result[0] && result[0].address && result[0].address.address_name) {
				addressinfo1.innerHTML = result[0].address.address_name;
			}
			if (result[0] && result[0].road_address && result[0].road_address.address_name) {
				addressinfo2.innerHTML = result[0].road_address.address_name;
			} else {
				addressinfo2.innerHTML = '도로명 주소가 없는 지역입니다.';
			}
		}
	};
	geocoder.coord2Address(markerLongitude, markerLatitude, callback);

	// 정보창 출력
	infowindow.setZIndex(10001);
	infowindow.setContent(content);
	infowindow.open(map, marker);

	// 문화재에 따른 등록된 별점 가져오기
	let ratingPoint = data.starRate.starpoint;
	// 가져온 별점을 별점 순서대로 마킹
	document.querySelector(`#rating${ratingPoint}`).checked = true;
	for (let i = 1; i <= 10; i++) {
		if (i !== ratingPoint) {
			document.querySelector(`#rating${i}`).disabled = true;
		}
	};

	// 로그인 시 보여지는 리뷰쓰기 버튼
	if (sessionStorage.getItem("userid") === null) { // 로그인이 아니면
		document.querySelector('#buttonPlus').innerHTML = `<a type="button" class="btn btn-warning loginPlease" style="font-family:'moonhwa'; font-size:0.9em; float: right;">로그인 후 리뷰쓰기</a>`;
	} else { // 로그인 이면
		document.querySelector('#buttonPlus').innerHTML = `<a type="button" class="btn btn-outline-success commentPopup reviewbackimg" data-bs-toggle="modal" data-bs-target="#commentPopupModal" style="font-family:'moonhwa'; font-size:0.9em; float: right; background-color: transparent; margin-right:5px;">리뷰쓰기 / 보기</a>
				<div style="float: right;"><button class="heart-button"><span class="heart-icon"></span></button></div>
				`;
	};
	// 북마크 등록 여부 로드
	var heartButton = document.querySelector('.heart-button'); // 실제 버튼
	var heartIcon = document.querySelector('.heart-icon'); // 버튼 위 이미지
	if (heartButton !== null) {
		bookmarkConfirmRegistration(sessionStorage.getItem("userid"), data.ccbaAsno)
		heartButton.addEventListener('click', () => {
			let myBookmarkAddButton = heartIcon.classList.toggle('liked');
			if (myBookmarkAddButton === true) {
				bookmarkAdd(sessionStorage.getItem("userid"), data.ccbaKdcd, data.ccbaAsno, data.ccbaCtcd, data.ccbaMnm1);
			} else if (myBookmarkAddButton === false) {
				bookmarkClear(sessionStorage.getItem("userid"), data.ccbaAsno, data.ccbaMnm1);
			}
		});
	}
	document.querySelector('#bookmarkModalClose').click();
	let infowindowCloseButton = document.querySelector('.infowindowClose');
	infowindowCloseButton.addEventListener('click', () => {
		markerClose();
	})
	//로그인 후 리뷰쓰기 클릭시 로그인 창 호출
	let loginPleaseButton = document.querySelector('.loginPlease');
	if (loginPleaseButton !== null) {
		loginPleaseButton.addEventListener('click', () => {
			document.querySelector('.logbtn').click();
		})
	}

	// 세부내용 출력
	var content2 = `
				
				<div style="z-index:9999;" class="modal fade" id="detailcontentmodal" tabindex="-1" aria-labelledby="detailcontentmodaltitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content" style="box-shadow: 1px 1px 5px rgb(98, 107, 233);">
      <div class="modal-header">
        <h1 style="font-family: 'moonhwa'; " class="modal-title fs-5" id="detailcontentmodaltitle">톺아보기</h1>
        <button type="button" class="btn-close content2ModalClose" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body scrollBarDesign">
        <p style="font-family: 'moonhwa';">문화재(국문) : ${data.ccbaMnm1}</p>
        <p style="font-family: 'moonhwa';">문화재(한자) : ${data.ccbaMnm2}</p>
        <p style="font-family: 'moonhwa';">문화재종목 : ${data.ccmaName}</p>
        <p style="font-family: 'moonhwa';">시대 : ${data.ccceName}</p>
        <p style="font-family: 'moonhwa';">소유자 : ${data.ccbaPoss}</p>
        <p style="font-family: 'moonhwa';">분류 : ${data.gcodeName} ${data.scodeName}</p>
        <img style="width:100%; display:block;" src="${data.imageUrl}">
        <p style="margin-top:2%; padding: 1%; text-align: justify; font-size:0.9em; border:2px solid rgba(140, 145, 236, 0.5); line-height:120%;">${itemContent.replace(/\. /g, ".<br><br>")}</p>
      </div>
    </div>
  </div>
</div>
  
`;

	// 모달 초기화
	if (document.querySelector('#modalDetail').childElementCount > 0) {
		document.querySelector('#modalDetail').innerHTML = "";
	}
	document.querySelector('#modalDetail').innerHTML += content2;
	var myModalEl = document.querySelector('#detailcontentmodal');
	// 톺아보기 버튼 클릭 시
	document.querySelector('#detailContentButton').addEventListener('click', function() {
		var myModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
		myModal.show();
		searchResultMenu();
		// 톺아보기 창에서 x버튼 눌러서 창 닫을 때
		let content2ModalCloseButton = document.querySelector('.content2ModalClose');
		if (content2ModalCloseButton !== null) {
			// 닫기 버튼 눌렀을 때
			content2ModalCloseButton.addEventListener('click', () => {
				let menuicon = document.getElementById('menuicon');
				if (menuicon.checked == false) {
					menuicon.click();
				}
			})
			// ESC 키를 눌렀을 때 이벤트 핸들러 등록
			document.addEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					let menuicon = document.getElementById('menuicon');
					if (menuicon.checked == false) {
						menuicon.click();
					}
				}
			});
		}
	});

	// 코멘트 및 별점 등록 모달 창 붙이기
	var commentContentModal = `
					
      <div class="modal fade" id="commentPopupModal" data-bs-backdrop="static" tabindex="-1"
  aria-labelledby="staticBackdropLabel" aria-hidden="true" style="z-index:9999;">
  <form>
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content" style="box-shadow: 1px 1px 5px rgb(98, 107, 233);">
      <div class="modal-header">
        <p class="modal-title fs-5" id="staticBackdropLabel" style="font-weight: bold; font-size:1.5em; font-family:'moonhwa';">${data.ccbaMnm1}의 리뷰 내역</p>
        <button type="button" class="btn-close commentCreateTopClose" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body table-container" style="max-height:70%;">
      </div>
      <hr>
      <div style="margin:0;">
        <p style="font-weight: bold; font-size:1em; padding-left:10px; font-family:'moonhwa';">${sessionStorage.getItem("userid")}님의 댓글 및 별점 남기기</p>
      </div>
      <div class="modal-body">
        <div class="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm" style="font-size:0.7em;">댓글입력<br>(50자 이내)</span>
          <input type="text" class="form-control" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" id="commentInputText">
        </div>
        <label for="customRange2" class="form-label" style="font-weight:bold; font-size:1em; font-family:'moonhwa';">별점등록</label>
        <div style="display:flex; justify-content:space-between; width:100%; font-size:0.8em;">
		  <p style="width:5%; text-align:left;">1점</p>
		  <p style="width:8%; text-align:center;">2점</p>
		  <p style="width:8%; text-align:center;">3점</p>
		  <p style="width:8%; text-align:center;">4점</p>
		  <p style="width:10%; text-align:center;">5점</p>
		  <p style="width:8%; text-align:center;">6점</p>
		  <p style="width:8%; text-align:center;">7점</p>
		  <p style="width:8%; text-align:center;">8점</p>
		  <p style="width:8%; text-align:center;">9점</p>
		  <p style="width:5%; text-align:right;">10점</p>
		</div>
        <input type="range" class="form-range" min="1" max="10" id="customRange2" value="1">
      </div>
      <label style="font-weight: bold; font-size:1em; padding-left:10px; font-family:'moonhwa';">문화재 리뷰 사진 올리기</label>
      <div style="padding:20px 20px;">
        <input type="file" id="fileupload" name="file">
        <p style="color:red; font-size:0.7em;">파일은 최대 10MB을 초과할 수 없습니다 (jpg, png 파일만 가능)</p>
      </div>
      <div class="modal-footer">
        <button id="commentStarpointConfirmButton" class="btn btn-primary" style="width:20%;">등록</button>
        <button id="commentStarpointCalcelButton" type="button" class="btn btn-secondary commentCreateClose" data-bs-dismiss="modal" style="width:20%;">닫기</button>
      	<input id="heritageccbaKdcd" type="hidden" value="${data.ccbaKdcd}">
      	<input id="heritageccbaAsno" type="hidden" value="${data.ccbaAsno}">
      	<input id="heritageccbaCtcd" type="hidden" value="${data.ccbaCtcd}">
      	<input id="heritageccbaMnm1" type="hidden" value="${data.ccbaMnm1}">
      </div>
    </div>
  </div>
  </form>
</div>
     
     `;
	if (sessionStorage.getItem("userid") !== null) {
		if (document.querySelector('#modalPoint').childElementCount > 0) {
			document.querySelector('#modalPoint').innerHTML = "";
		}
		document.querySelector('#modalPoint').innerHTML += commentContentModal;
		var myModalEl2 = document.querySelector('#commentPopupModal');
		// 리뷰쓰기 버튼 클릭 시 코멘트 입력 모달
		let commentPopupButton = document.querySelector('.commentPopup');
		commentPopupButton.addEventListener('click', function() {
			var modal2 = bootstrap.Modal.getOrCreateInstance(myModalEl2);
			modal2.show();
			searchResultMenu();
			// 문화재에 등록된 코멘트 가져오기
			heritageCommentList(data.ccbaKdcd, data.ccbaAsno, data.ccbaCtcd)
				.then(data => {
					/**
					 * 모달 내 게시판 페이징 시 새로운 데이터 생길 때 리프래쉬 되지 않아
					 * table 자체를 삭제 후 새로 생성하게 끔 DOM 형태로 재구성
					 * */

					// 테이블 요소와 테이블 컨테이너 요소 가져오기
					var table = document.querySelector('.table');
					var tableContainer = document.querySelector('.table-container');
					if (table) {
						// 테이블 삭제
						table.remove();
					}
					// 새로운 테이블 요소 생성
					var newTable = document.createElement('table');
					newTable.className = 'table table-hover';
					newTable.style.fontSize = '0.8em';
					newTable.style.textAlign = 'center';
					// 테이블 헤더 생성
					var thead = document.createElement('thead');
					var tr = document.createElement('tr');
					tr.innerHTML = `
							  <th scope="col" style="width:15%; font-size:0.8em;">아이디</th>
				              <th scope="col" style="width:5%; font-size:0.8em;">점수</th>
				              <th scope="col" style="width:50%; font-size:0.8em;">코멘트</th>
				              <th scope="col" style="width:20%; font-size:0.8em;">작성일자</th>
				              <th scope="col" style="width:10%; font-size:0.8em;">사진보기</th>
							`;
					thead.appendChild(tr);
					newTable.appendChild(thead);
					// 테이블 바디 생성
					var tbody = document.createElement('tbody');
					tbody.id = 'dyn_tbody';
					newTable.appendChild(tbody);
					// 테이블 컨테이너에 새로운 테이블 추가
					tableContainer.innerHTML = ''; // 기존의 내용을 비우고 새로 추가
					tableContainer.appendChild(newTable);
					// Pagination 요소 가져오기
					var pagination = document.querySelector('.pagination');
					// Pagination 삭제
					if (pagination) {
						// Pagination 삭제
						pagination.remove();
					}
					// 새로운 Pagination 요소 생성
					var newPagination = document.createElement('nav');
					newPagination.setAttribute('aria-label', 'Page navigation example');
					newPagination.innerHTML = `
						  <ul id="dyn_ul" class="pagination" style="justify-content:center;"></ul>
									`;
					// 테이블 컨테이너에 새로운 Pagination 추가
					tableContainer.appendChild(newPagination);
					heritageCommentStart(data);
					// 저장된 유저 사진 버튼 클릭 시 불러오기
					document.querySelectorAll('.userphotoviewButton').forEach(button => {
						button.addEventListener('click', (event) => {
							let reviewPhoto = event.target.value.replace("/userfile/", "");
							heritageReviewPhotoLoading(reviewPhoto)
								.then(imageData => {
									const userphotoviewElements = document.querySelectorAll('.userphotoview');
									userphotoviewElements.forEach(userphotoviewElement => {
										userphotoviewElement.innerHTML = '';
										if (imageData === null || imageData === undefined) {
											const text = document.createElement('p');
											text.textContent = '사진이 없습니다';
											text.style.fontWeight = 'bold';
											userphotoviewElement.appendChild(text);
										} else if (imageData.startsWith('data:image/png;base64,')) {
											if (imageData.length === 22) { // Only 'data:image/png;base64,' without image data
												const text = document.createElement('p');
												text.textContent = '사진이 없습니다';
												text.style.fontSize = '0.8em';
												text.style.fontWeight = 'bold';
												userphotoviewElement.appendChild(text);
											} else {
												const img = document.createElement('img');
												img.style.width = '100%';
												img.src = imageData;
												const text = document.createElement('p');
												text.textContent = '이미지 클릭 시 확대';
												text.style.fontSize = '0.8em';
												userphotoviewElement.appendChild(text);
												userphotoviewElement.appendChild(img);
												img.addEventListener('click', () => {
													openPopup(imageData);
												});
											}
										} else {
											const text = document.createElement('p');
											text.textContent = '올바른 형식의 이미지가 아닙니다';
											text.style.fontSize = '0.8em';
											text.style.fontWeight = 'bold';
											userphotoviewElement.appendChild(text);
										}
									});
								});

							function openPopup(imageUrl) {
								const windowWidth = 800;
								const windowHeight = 600;
								const image = new Image();
								image.src = imageUrl;
								image.onload = () => {
									const imageWidth = image.width;
									const imageHeight = image.height;
									let scale = 1;
									if (imageWidth > windowWidth) {
										scale = windowWidth / imageWidth;
									}
									if (imageHeight * scale > windowHeight) {
										scale = windowHeight / imageHeight;
									}
									const popupWidth = imageWidth * scale;
									const popupHeight = imageHeight * scale;
									const left = (screen.width / 2) - (popupWidth / 2);
									const top = (screen.height / 2) - (popupHeight / 2);
									const windowOptions = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`;
									const imageWindow = window.open('', 'ImagePopup', windowOptions);
									const container = imageWindow.document.createElement('div');
									container.style.textAlign = 'center';
									image.style.width = `${popupWidth}px`;
									image.style.height = `${popupHeight}px`;
									container.appendChild(image);
									imageWindow.document.body.appendChild(container);
								};
							}
						});
					});
				})
				.catch(error => {
					alert(`관리자에게 문의해주세요\n${error}`);
				})
			// 별점 등록창 종료 시 검색결과 창 다시 보여주기
			let commentCreateTopCloseButton = document.querySelector('.commentCreateTopClose');
			if (commentCreateTopCloseButton !== null) {
				commentCreateTopCloseButton.addEventListener('click', () => {
					let menuicon = document.getElementById('menuicon');
					if (menuicon.checked == false) {
						menuicon.click();
					}
				})
			}
			let commentCreateCloseButton = document.querySelector('.commentCreateClose');
			if (commentCreateCloseButton !== null) {
				commentCreateCloseButton.addEventListener('click', () => {
					let menuicon = document.getElementById('menuicon');
					if (menuicon.checked == false) {
						menuicon.click();
					}
				})
			}
			// 리뷰 쓰기 창에서 별점주기 점수 저장 스크립트
			var starPointInputResult = 0;
			let starPointInput = document.querySelector('#customRange2');
			if (starPointInput !== null) {
				starPointInput.addEventListener('change', (event) => {
					starPointInputResult = event.target.value;
				});
			}

			//댓글 저장하기
			var commentInputResult = "";
			let commentInputtype = document.querySelector('#commentInputText');
			if (commentInputtype !== null) {
				commentInputtype.addEventListener('input', function() {
					commentInputResult = commentInputtype.value;
				});
			}

			// 리뷰내용과 별점을 담아서 전송하는 버튼 실행 스크립트
			let cspcb = document.querySelector('#commentStarpointConfirmButton');
			if (commentInputtype !== null) {
				cspcb.addEventListener("click", function(event) {
					event.preventDefault()
					let heritageCcbaKdcd = document.querySelector('#heritageccbaKdcd').value // 문화재 번호
					let heritageCcbaAsno = document.querySelector('#heritageccbaAsno').value // 문화재 번호
					let heritageCcbaCtcd = document.querySelector('#heritageccbaCtcd').value // 문화재 번호
					let heritageCcbaMnm1 = document.querySelector('#heritageccbaMnm1').value // 문화재 이름
					let files = document.querySelector('#fileupload').files; // 업로드 할 사진 파일
					if (commentInputResult === '') {
						alert('공백으로 등록 할 수 없습니다');
						return;
					} else if (commentInputResult.length >= 50) {
						alert('댓글은 50자 이내로 작성해주세요');
						return;
					} else if (starPointInputResult == 0) {
						alert('별점을 선택해주세요');
						return;
					} else {
						commentInputtype.value = '';
						if (files.length > 0) {
							if (files[0].type !== 'image/jpeg' && files[0].type !== 'image/png') {
								alert('파일 형식은 jpg나 png만 업로드 가능합니다.');
								return;
							}
						}
						if (files.length > 0) {
							commentStaRateCreate(sessionStorage.getItem("userid"), heritageCcbaKdcd, heritageCcbaAsno, heritageCcbaCtcd, heritageCcbaMnm1, commentInputResult, starPointInputResult, files[0]);
						} else {
							commentStaRateCreate(sessionStorage.getItem("userid"), heritageCcbaKdcd, heritageCcbaAsno, heritageCcbaCtcd, heritageCcbaMnm1, commentInputResult, starPointInputResult, null);
						}
						markerClose();
						// 별점 등록창 종료 시 검색결과 창 다시 보여주기
						commentCreateCloseButton.click();
						commentCreateCloseButton.addEventListener('click', () => {
							let menuicon = document.getElementById('menuicon');
							if (menuicon.checked == false) {
								menuicon.click();
							}
						})
					}
				});
			}
		});
	}
	// 지도 마커 삭제
	function markerClose() {
		marker.setMap(null);
		infowindow.close();
	}
	// 검색결과 왼쪽 어사이드 불러오기
	function searchResultMenu() {
		let menuicon = document.getElementById('menuicon');
		if (menuicon.checked == true) {
			menuicon.click();
		}
	}
}

