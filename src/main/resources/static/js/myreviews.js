/**
 * 나의리뷰 모아보는 게시판
 */
import { userReviewStarrate, removeUserReviews } from './fetch.js';
// 로그인 되어있는 유저이름
let loginUserid = sessionStorage.getItem("userid");
var editDeleteContent = `

<div class="modal fade" id="editDeleteModal" tabindex="-1" aria-labelledby="editDeleteModalLabel" aria-hidden="true" style="z-index:10000; ">
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
    <div class="modal-content" style="box-shadow: 1px 1px 5px rgb(98, 107, 233); background-color: #f5f5f5;">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="editDeleteModalLabel" style="font-weight: bold;">${loginUserid}님의 댓글 및 별점 관리</h1>
      </div>
      <div class="modal-body tables-container" >
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning btn-sm" id="checkBoxAllcheckButton">전체선택 / 해제</button>
        <button type="button" class="btn btn-danger btn-sm" id="commentDeleteButton">삭제</button>
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" id="editDeleteModalCloseButton">닫기</button>
        
        <div class="toast-container bottom-50 d-flex justify-content-center align-items-center w-100">
          <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="me-auto">최종확인</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
              정말로 삭제하시겠습니까?<br>
              <button type="button" class="btn btn-danger btn-sm" id="finalDeleteButton" data-bs-dismiss="modal">삭제</button>
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast" id="toastCloseButton">닫기</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </div>
    </div>
    
    `;

var modalPoint2 = document.querySelector('#modalPoint2'); // 모달이 붙을 main div
var myCommentButton = document.querySelector('#myCommentButton'); // 나의리뷰 버튼
if (modalPoint2.childElementCount > 0) {
	modalPoint2.innerHTML = "";
}
modalPoint2.innerHTML += editDeleteContent;
//모달 등록 후 진행
if (myCommentButton !== null) {
	var editDeleteMyModal = document.querySelector('#editDeleteModal'); // 모달창
	var toastContent = document.getElementById('liveToast'); // 토스트창
	var commentDeleteButton = document.querySelector('#commentDeleteButton'); // 삭제버튼
	var allCheckboxButton = document.querySelector('#checkBoxAllcheckButton'); // 전체체크 버튼
	var toastDeleteButton = document.querySelector('#finalDeleteButton'); // 토스트창 안에 최종 삭제버튼
	myCommentButton.addEventListener('click', function() {
		let editDeleteModal = bootstrap.Modal.getOrCreateInstance(editDeleteMyModal);
		editDeleteModal.show();
		userReviewStarrate(loginUserid) // 유저가 작성한 리뷰와 별점 가져오기
			.then(data => {
				/**
				 * 모달 내 게시판 페이징 시 새로운 데이터 생길 때 리프래쉬 되지 않아
				 * table 자체를 삭제 후 새로 생성하게 끔 DOM 형태로 재구성
				 * */
				// 테이블 요소와 테이블 컨테이너 요소 가져오기
				var table = document.querySelector('.table');
				var tableContainer = document.querySelector('.tables-container');
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
						  <th scope="col" style="width:10%;">선택</th>
						  <th scope="col" style="width:20%;">문화재명</th>
						  <th scope="col" style="width:10%;">점수</th>
						  <th scope="col" style="width:40%;">코멘트</th>
						  <th scope="col" style="width:20%;">작성일자</th>
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
				myreviewsTableInsert(data);
			})
			.catch(error => {
				alert(`리뷰를 불러오는 도중 문제가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
			})

	})
	// 삭제버튼 클릭 시 토스트 창 보여주기
	if (commentDeleteButton !== null) {
		commentDeleteButton.addEventListener('click', function() {
			let toast = bootstrap.Toast.getOrCreateInstance(toastContent);
			toast.show();
		});
	}
	// 모든 체크박스 일괄선택 버튼기능
	if (allCheckboxButton !== null) {
		allCheckboxButton.addEventListener('click', function() {
			let pageCheckboxs = document.getElementsByClassName('checkAll');
			let checkboxsCount = 0;
			for (var i = 0; i < pageCheckboxs.length; i++) {
				if (pageCheckboxs[i].checked === true) {
					checkboxsCount++;
				}
			}
			for (var i = 0; i < pageCheckboxs.length; i++) {
				if (checkboxsCount < pageCheckboxs.length) {
					if (pageCheckboxs[i].checked === false) {
						pageCheckboxs[i].checked = !pageCheckboxs[i].checked;
					}
				} else {
					pageCheckboxs[i].checked = false;
				}
			}
		});
	}
	// 최종삭제처리
	if (toastDeleteButton !== null) {
		toastDeleteButton.addEventListener('click', function() {
			let pageCheckboxs = document.getElementsByClassName('checkAll');
			var checkedCount = 0; // 체크된 체크박스 갯수
			for (var i = 0; i < pageCheckboxs.length; i++) {
				if (pageCheckboxs[i].checked) { // 체크된 체크박스인 경우
					checkedCount++; // 체크된 체크박스의 개수를 1 증가
				}
			}
			if (checkedCount === 0) {
				alert('선택된 체크박스가 없습니다');
				document.querySelector('#toastCloseButton').click();
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
			removeUserReviews(userCommentDeleteDataArray); // 등록된 리뷰 및 별점 삭제
		});
	}
}