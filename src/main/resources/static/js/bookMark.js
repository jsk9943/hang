let userLogin = sessionStorage.getItem("userid");
let bookMarkHtml = `
  <!-- Modal -->
  <div class="modal fade" id="bookMarkModalDiv" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:10000;">
    <div class="modal-dialog">
      <div class="modal-content" style="border: 2px solid rgb(150, 142, 252); background: #f5f5f5; font-family: 'moonhwa';">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${userLogin}님의 북마크</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>북마크 목록</p>
          <hr>
          
          <div id="bookmarkContent"></div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" id="bookmarkCheckboxAll">전체선택</button>
            <button type="button" class="btn btn-danger" id="bookmarkDelete">삭제</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="bookmarkModalClose">닫기</button>
            
            <div class="toast-container bottom-50 d-flex justify-content-center align-items-center w-100" style="font-family: Arial, sans-serif;">
	          <div id="bookmarkliveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
	            <div class="toast-header">
	              <strong class="me-auto">최종확인</strong>
	              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
	            </div>
	            <div class="toast-body">
	              정말로 삭제하시겠습니까?<br>
	              <button type="button" class="btn btn-danger btn-sm" id="finalBookmarkDelete" data-bs-dismiss="modal">삭제</button>
	              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast" id="bookmarktoastCloseButton">닫기</button>
	            </div>
	          </div>
	        </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// 즐겨찾기 버튼 클릭 시 모달 띄우기
let bookMarkBtn = document.querySelector('#bookMarkBtn'); // 즐겨찾기 버튼
let bookmarkModalDiv = document.querySelector('#modalBookmark'); // 모달이 붙을 div
if (bookmarkModalDiv.childElementCount > 0) {
	bookmarkModalDiv.innerHTML = "";
}
bookmarkModalDiv.innerHTML += bookMarkHtml;
let bookmarkCheckboxAllButton = document.querySelector('#bookmarkCheckboxAll'); // 모달 안에 전체선택 버튼
let bookmarkDeleteButton = document.querySelector('#bookmarkDelete'); // 토스트 호출버튼
let bookmarkModal = document.querySelector('#bookMarkModalDiv'); // 모달창
let bookmarkModalCloseButton = document.querySelector('#bookmarkModalClose')// 모달창 닫는 버튼
if (bookMarkBtn !== null) {
	let toastContent2 = document.querySelector('#bookmarkliveToast'); // 토스트창
	let finalBookmarkDeleteButton = document.querySelector('#finalBookmarkDelete'); // 토스트 최종 삭제버튼
	bookMarkBtn.addEventListener('click', () => {
		let bookMarkModal = bootstrap.Modal.getOrCreateInstance(bookmarkModal);
		bookMarkModal.show();
		fetch(`/member/bookmark?userid=${userLogin}`, {
			method: "GET",
			headers: {
				"Content-Type": "text/plain"
			}
		})
			.then(response => response.json())
			.then(data => {
				let bookmarkContentDiv = document.querySelector('#bookmarkContent');
				if (bookmarkContentDiv.childElementCount > 0) {
					bookmarkContentDiv.innerHTML = "";
				}
				for (var i = 0; i < data.length; i++) {
					let bookmarkContent = `
					
									<div class="form-check">
						              <input class="form-check-input bookmarkCheckBox" type="checkbox" value="${data[i].CCBAASNO}">
						              <div>
						                <p class="moonhwaName">${data[i].CCBAMNM1}</p>
						                <button class="gobtn Shortcut">
						                  바로가기
						                  <input type="hidden" value="${data[i].CCBAASNO}" name="bookmarkCCBAASNO">
						                <input type="hidden" value="${data[i].CCBAKDCD}" name="bookmarkCCBAKDCD">
						                <input type="hidden" value="${data[i].CCBACTCD}" name="boolmarkCCBACTCD">
						                </button>
						                
						              </div>
						            </div>
						           
							`;

					bookmarkContentDiv.innerHTML += bookmarkContent;
				}

				let shortcutButton = document.querySelectorAll('.Shortcut');
				shortcutButton.forEach(function(button) {
					button.addEventListener('click', (event) => {
						event.preventDefault();
						let ccbaKdcd = event.target.querySelector('input[name="bookmarkCCBAKDCD"]').value;
						let ccbaAsno = event.target.querySelector('input[name="bookmarkCCBAASNO"]').value;
						let ccbaCtcd = event.target.querySelector('input[name="boolmarkCCBACTCD"]').value;
						fetch(`/heritage/item/search/detail?ccbaKdcd=${ccbaKdcd}&ccbaAsno=${ccbaAsno}&ccbaCtcd=${ccbaCtcd}`, {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json'
							},
						})
							.then(response => response.json())
							.then(data => {
								let markerLongitude = Number(data.longitude);
								let markerLatitude = Number(data.latitude);
								let moveLatLon; // 마커 이동할 좌표
								if (markerLongitude === 0) {
									moveLatLon = new kakao.maps.LatLng(37.559975, 126.975312);
								} else {
									moveLatLon = new kakao.maps.LatLng(markerLatitude, markerLongitude);
								}

								marker.setPosition(moveLatLon);
								marker.setMap(map);
								map.panTo(moveLatLon); // 지도 부드럽게 움직이기
								var itemContent2 = data.content;

								// 문화재 평균 별점
								var star2 = `
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
								var content2 = `
          
    <div class="bAddr" style="overflow: hidden; width:400px; background-color:#f5f5f5; border:2px solid rgb(140, 145, 236); max-height:400px; padding:10px;">
    <div style="float:left; width: 100%; height:100%;">
      <div style="height:10%; width: 100%; font-size:1.2em; font-weight:800; margin-bottom:5px;">
        ${data.ccbaMnm1} <button type="button" class="btn-close infowindowClose" onclick="markerClose()" style="float: right;"></button>
        <p style="font-size:0.8em; font-weight: 800;">${data.ccmaName}</p>
      </button></p>
      </div>
      <div style="font-size: 0.7em; color:gray; width:100%;">지번 주소 : <span id="address1"></span></div>
      <div style="font-size: 0.7em; color:gray; width:100%; margin-bottom:10px;">도로명 주소 : <span id="address2"></span></div>
      <div style="overflow:hidden; width:100%; font-size:0.7em; color:gray; margin-bottom: 10px;line-height:100%;">
        총 리뷰(<span style="color:blue;">${data.starRate.count}</span>)<div id="buttonPlus"></div>
        <br>
        ${star2}
      </div>
      <div class="scrollBarDesign" style="width:100%; max-height:140px; font-size:0.7em; overflow: auto; border:2px solid rgba(140, 145, 236, 0.5); padding: 1%; text-align: justify;">
        ${itemContent2.replace(/\. /g, ".<br><br>")}
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
								infowindow.setContent(content2);
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
								if (userLogin === null) {
									document.querySelector('#buttonPlus').innerHTML = `<a type="button" class="btn btn-warning" style="font-family:'moonhwa'; font-size:0.9em; float: right;">로그인 후 리뷰쓰기</a>`;
								} else {
									document.querySelector('#buttonPlus').innerHTML = `<a type="button" class="btn btn-outline-success commentPopup reviewbackimg" data-bs-toggle="modal" data-bs-target="#commentPopupModal" style="font-family:'moonhwa'; font-size:0.9em; float: right; background-color: transparent; margin-right:5px;">리뷰쓰기 / 보기</a>
				<div style="float: right;"><button class="heart-button"><span class="heart-icon"></span></button></div>
				`;
								};
								// 북마크 등록 여부 로드
								var heartButton = document.querySelector('.heart-button'); // 실제 버튼
								var heartIcon = document.querySelector('.heart-icon'); // 버튼 위 이미지
								var infowindowCcbaKdcd = data.ccbaKdcd; // 인포윈도우 떠있는 문화재 지정종목번호
								var infowindowCcbaAsno = data.ccbaAsno; // 인포윈도우 떠있는 문화재 고유번호
								var infowindowCcbaCtcd = data.ccbaCtcd; // 인포윈도우 떠있는 문화재 시도번호
								var infowindowCcbaMnm1 = data.ccbaMnm1; // 인포윈도우 떠있는 문화재 고유번호
								if (heartButton !== null) {
									fetch(`/member/bookmark?userid=${loginUseridViews}`, {
										method: "GET",
										headers: {
											"Content-Type": "text/plain"
										}
									})
										.then(response => response.json())
										.then(data => {
											for (var i = 0; i < data.length; i++) {
												if (data[i].CCBAASNO === infowindowCcbaAsno) {
													heartIcon.classList.toggle('liked', true);
												}
											}
										})
										.catch(error => {
											alert(`즐겨찾기 결과 로드 중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
										})
									heartButton.addEventListener('click', () => {
										let myBookmarkAddButton = heartIcon.classList.toggle('liked');
										if (myBookmarkAddButton === true) {
											let bookmarkData = {
												"userid": loginUseridViews,
												"ccbaKdcd": infowindowCcbaKdcd,
												"ccbaAsno": data.ccbaAsno,
												"ccbaCtcd": infowindowCcbaCtcd,
												"ccbaMnm1": data.ccbaMnm1
											};
											fetch('/member/bookmark/add', {
												method: "POST",
												headers: {
													"Content-Type": "application/json"
												},
												body: JSON.stringify(bookmarkData)
											})
												.then(response => response.text())
												.then(data => {
													if (data === 'true') {
														alert(`${infowindowCcbaMnm1}의\n즐겨찾기 등록되었습니다`);
														document.querySelector('.infowindowClose').click();
													}
												})
												.catch(error => {
													alert(`즐겨찾기 등록이 실패하였습니다.\n관리자에게 문의해주세요\n${error}`);
												})
										} else if (myBookmarkAddButton === false) {
											let bookmarkData = {
												"userid": loginUseridViews,
												"ccbaAsno": data.ccbaAsno,
												"ccbaMnm1": data.ccbaMnm1
											};
											fetch('/member/bookmark/clear', {
												method: "DELETE",
												headers: {
													"Content-Type": "application/json"
												},
												body: JSON.stringify(bookmarkData)
											})
												.then(response => {
													return response.text();
												})
												.then(data => {
													if (data === 'true') {
														alert(`${infowindowCcbaMnm1}의\n즐겨찾기가 해제되었습니다`);
														document.querySelector('#bookmarktoastCloseButton').click();
														bookmarkModalCloseButton.click();
													} else if (data === 'false') {
														alert('실패!');
													}
												})
												.catch(error => {
													alert(`삭제 중 문제가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
												})
										}
									});
								}
								bookmarkModalCloseButton.click();
								document.querySelector('.hangtoggler').click();
							})

					})
				})

			})
			.catch(error => {
				alert(`북마크를 불러오던 도중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
			})
	});

	// 모든 체크박스 일괄선택 버튼기능
	if (bookmarkCheckboxAllButton !== null) {
		bookmarkCheckboxAllButton.addEventListener('click', function() {
			let pageCheckboxs = document.getElementsByClassName('bookmarkCheckBox');
			for (var i = 0; i < pageCheckboxs.length; i++) {
				pageCheckboxs[i].checked = !pageCheckboxs[i].checked;
			}
		});
	}

	// 삭제버튼 클릭 시 토스트 창 보여주기
	if (bookmarkDeleteButton !== null) {
		bookmarkDeleteButton.addEventListener('click', function() {
			let toast = bootstrap.Toast.getOrCreateInstance(toastContent2);
			toast.show();
		});
	}
	if (finalBookmarkDeleteButton !== null) {
		finalBookmarkDeleteButton.addEventListener('click', () => {
			let pageCheckboxs = document.getElementsByClassName('bookmarkCheckBox');
			var checkedCount = 0; // 체크된 체크박스 갯수
			for (var i = 0; i < pageCheckboxs.length; i++) {
				if (pageCheckboxs[i].checked) { // 체크된 체크박스인 경우
					checkedCount++; // 체크된 체크박스의 개수를 1 증가
				}
			}
			if (checkedCount === 0) {
				alert('선택된 체크박스가 없습니다');
				document.querySelector('#bookmarktoastCloseButton').click();
				return;
			}
			var userCommentDeleteDataArray = [];
			for (var j = 0; j < pageCheckboxs.length; j++) {
				if (pageCheckboxs[j].checked === true) {
					let ccbaAsno = pageCheckboxs[j].value;
					let userCommentDeleteData = {
						"userid": loginUserid,
						"ccbaAsno": ccbaAsno
					}
					userCommentDeleteDataArray.push(userCommentDeleteData);
				}
			}

			fetch('/member/bookmark/delete', {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(userCommentDeleteDataArray)
			})
				.then(response => {
					return response.text();
				})
				.then(data => {
					if (data === 'true') {
						alert('정상적으로 삭제되었습니다');
						document.querySelector('#bookmarktoastCloseButton').click();
						bookmarkModalCloseButton.click();
					} else if (data === 'false') {
						alert('실패!');
					}
				})
				.catch(error => {
					alert(`삭제 중 문제가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
				})
		})
	}

}







