/**
 * 북마크 된 문화재 리스트 관리 및 바로가기
 */
import { heritageKeywordSearchDetail, bookmarkListLoad, bookmarkListSelectDelete } from './fetch.js';
import { detailContentLoad } from './detailContent.js';
let userLogin = sessionStorage.getItem("userid"); // 로그인한 아이디
let bookMarkHtml = `
  <!-- Modal -->
  <div class="modal fade" id="bookMarkModalDiv" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="z-index:10000;">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content" style="box-shadow: 1px 1px 5px rgb(98, 107, 233); background: #f5f5f5;">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel" style="font-weight:bold;">${userLogin}님의 북마크</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body scrollBarDesign">
          <p style="font-weight:bold;">북마크 목록</p>
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
if (bookMarkBtn !== null) {
	let toastContent2 = document.querySelector('#bookmarkliveToast'); // 토스트창
	let finalBookmarkDeleteButton = document.querySelector('#finalBookmarkDelete'); // 토스트 최종 삭제버튼
	bookMarkBtn.addEventListener('click', () => {
		let bookMarkModal = bootstrap.Modal.getOrCreateInstance(bookmarkModal);
		bookMarkModal.show();
		bookmarkListLoad(userLogin)
			.then(data => {
				let bookmarkContentDiv = document.querySelector('#bookmarkContent');
				if (bookmarkContentDiv.childElementCount > 0) {
					bookmarkContentDiv.innerHTML = "";
				}
				for (var i = 0; i < data.length; i++) {
					let bookmarkContent = `
							<div class="form-check">
				              <input class="bookmarkCheckBox" type="checkbox" value="${data[i].CCBAASNO}">
				              <div>
				                <p class="moonhwaName" style="font-size:0.8em;">${data[i].CCBAMNM1}</p>
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
						// 문화재 상세검색 기능(문화재 지역, 문화재 고유번호, 문화재 종류) fetch
						heritageKeywordSearchDetail(ccbaKdcd, ccbaAsno, ccbaCtcd)
							.then(data => {
								marker.setMap(null);
								infowindow.close();
								detailContentLoad(data);
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
						"userid": userLogin,
						"ccbaAsno": ccbaAsno
					}
					userCommentDeleteDataArray.push(userCommentDeleteData);
				}
			}
			bookmarkListSelectDelete(userCommentDeleteDataArray); // 북마크 선택해서 대량 삭제처리 fetch
		})
	}
}

// 마커 클릭 시 마커 지워짐
kakao.maps.event.addListener(marker, 'click', () => {
	marker.setMap(null);
	infowindow.close();
});