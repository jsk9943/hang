/**
 * 
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
      <div class="modal-body scrollBarDesign" >
        <table class="table table-hover" style="font-size:0.8em; text-align: center;">
          <thead>
               <tr>
                 <th scope="col" style="width:10%;">선택</th>
                 <th scope="col" style="width:20%;">문화재명</th>
                 <th scope="col" style="width:10%;">점수</th>
                 <th scope="col" style="width:40%;">코멘트</th>
                 <th scope="col" style="width:20%;">작성일자</th>
               </tr>
             </thead>
             <tbody id="dyn_tbody2">
         
             </tbody>
       </table>
       <nav aria-label="Page navigation example">
             <ul id="dyn_ul2" class="pagination" style="justify-content:center;" >
                
             </ul>
         </nav>
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
				var editDeleteTableList = []; // tableInsert 함수에서 for문을 돌면서 삽입 실시
				var editDeletePageList = 9999; // 한개의 페이지에 보여질 목록 개수
				var editDeletePageMax = 5; // 최대 생성될 페이지 개수 (페이지를 더보려면 이전, 다음 버튼 클릭해야함)	
				var editDeleteIdx = 0; //editDeleteIdx 값 확인 후 동적 페이지 전환 및 데이터 표시
				var editDeletePage = 1; //생성 시작할 페이지 번호
				tableInsert(data);

				function tableInsert(data) {
					// [for 반복문을 돌려서 tr 데이터 임의로 생성 실시]
					for (var i = 0; i < data.length; i++) {
						// JSON 형식으로 리스트에 추가 실시
						var writerData = {
							"editDeleteIdx": i,
							"writerCCBAASNO": data[i].ccbaAsno,
							"writerCCBAMNM1": data[i].ccbaMnm1,
							"writerStarpoint": data[i].starpoint,
							"writerComment": data[i].comment,
							"writerCommentDate": data[i].commentDate
						};
						editDeleteTableList.push(writerData);
					}
					pageInsert(editDeletePage);
				};
				function pageInsert(value) {
					document.getElementById('dyn_ul2').innerHTML = "";
					var startIndex = value; // 생성 시작 페이지    		
					var endIndex = editDeleteTableList.length; // 배열에 있는 길이 확인
					var pageCount = 0;
					var pagePlus = 0;
					if (endIndex > editDeletePageList) { // tr 행 개수가 5 이상인 경우 (임의로 설정)
						pageCount = Math.floor(endIndex / editDeletePageList); //생성될 페이지 수 (소수점 버림)
						pagePlus = endIndex % editDeletePageList; //추가 나머지 자식 수
						if (pagePlus > 0) { //추가 자식수가 있는경우 >> 페이지 추가
							pageCount = pageCount + 1;
						}
					}

					if (startIndex > pageCount) { //길이 초과 시 기존꺼로 다시 저장
						startIndex = editDeletePage;
					}
					else if (startIndex < 0) { //길이 미만 시 기존꺼로 다시 저장
						startIndex = editDeletePage;
					}
					else {
						editDeletePage = startIndex;
					}

					if (pageCount == 1) { //생성해야할 페이지가 1페이지인 경우
						var insertUl = "<li class='page-item'>"; // 변수 선언
						insertUl += insertUl + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage(1);'>";
						insertUl += insertUl + i;
						insertUl += insertUl + "</a></li>";
						document.getElementById("dyn_ul2").innerHTML += insertUl; // 동적으로 추가 실시      			
					}
					else if (pageCount >= 2) { //생성해야할 페이지가 2페이지 이상인 경우
						// 이전 페이지 추가 실시 
						var insertSTR = "<li class='page-item'>"; // 변수 선언
						insertSTR = insertSTR + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage(" + "-1" + ");'>";
						insertSTR = insertSTR + "이전";
						insertSTR = insertSTR + "</a></li>";
						document.getElementById("dyn_ul2").innerHTML += insertSTR; // 동적으로 추가 실시      			

						// 특정 1, 2, 3 .. 페이지 추가 실시
						var count = 1;
						for (var i = startIndex; i <= pageCount; i++) {
							if (count > editDeletePageMax) { //최대로 생성될 페이지 개수가 된 경우 
								editDeletePage = i - editDeletePageMax; //생성된 페이지 초기값 저장 (초기 i값 4 탈출 인경우 >> 1값 저장)
								break; //for 반복문 탈출
							}
							var insertUl = "<li class='page-item'>"; // 변수 선언
							insertUl = insertUl + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage(" + i + ");'>";
							insertUl = insertUl + String(i);
							insertUl = insertUl + "</a></li>";
							document.getElementById("dyn_ul2").innerHTML += insertUl; // 동적으로 추가 실시  
							count++;
						}

						// 다음 페이지 추가 실시
						var insertEND = "<li class='page-item'>"; // 변수 선언
						insertEND = insertEND + "<a class='page-link' href='javascript:void(0)' onclick = 'newPage(" + "0" + ");'>";
						insertEND = insertEND + "다음";
						insertEND = insertEND + "</a></li>";
						document.querySelector('#dyn_ul2').innerHTML += insertEND; //동적으로 추가 실시
					}
					document.getElementById("dyn_tbody2").innerHTML = ""; //tbody tr 전체 삭제 실시
					newPage(startIndex);
				};

				function newPage(pageCurrent) {
					if (pageCurrent == -1) { // 이전 페이지
						document.getElementById("dyn_tbody2").innerHTML = ""; //tbody tr 전체 삭제 실시

						// [새롭게 페이징 처리 실시]
						var newIdx = editDeletePage - editDeletePageMax;

						// [테이블 데이터에 따라 페이징 처리 실시]
						pageInsert(newIdx); //표시될 페이지 번호 전송
					}
					else if (pageCurrent == 0) { // 다음 페이지
						document.getElementById("dyn_tbody2").innerHTML = "";
						var newIdx = editDeletePage + editDeletePageMax;
						pageInsert(newIdx); //표시될 페이지 번호 전송
					}
					else {
						document.querySelector('#dyn_tbody2').innerHTML = "";
						editDeleteIdx = (pageCurrent * editDeletePageList) - editDeletePageList;
						var checkCount = 1;
						for (var i = editDeleteIdx; i < editDeleteTableList
							.length; i++) { //반복문을 수행하면서 tbody에 tr데이터 삽입 실시
							if (checkCount > editDeletePageList) { //한페이지에 표시될 목록을 초과한 경우
								return;
							}
							// json 데이터 파싱 실시
							var dataParsingComment = JSON.parse(JSON.stringify(editDeleteTableList
							[i])); //각 배열에 있는 jsonObject 참조
							var writerCCBAASNO = dataParsingComment.writerCCBAASNO;
							var writerCCBAMNM1 = dataParsingComment.writerCCBAMNM1;
							var writerStarpoint = dataParsingComment.writerStarpoint;
							var writerComment = dataParsingComment.writerComment;
							var writerCommentDate = dataParsingComment.writerCommentDate;
							// 동적으로 리스트 추가
							var insertTr = ""; // 변수 선언
							insertTr += "<tr>"; // body 에 남겨둔 예시처럼 데이터 삽입
							insertTr += `<td><input type="checkbox" id="myreviewCheckbox${writerCCBAASNO}" class="checkAll" value="${writerCCBAASNO}"></td>`;
							insertTr += `<td><label for="myreviewCheckbox${writerCCBAASNO}">${writerCCBAMNM1}</label></td>`;
							insertTr += `<td><label for="myreviewCheckbox${writerCCBAASNO}">${writerStarpoint}</label></td>`;
							insertTr += `<td><label for="myreviewCheckbox${writerCCBAASNO}">${writerComment}</label></td>`;
							insertTr += `<td><label for="myreviewCheckbox${writerCCBAASNO}">${writerCommentDate}</label></td>`;
							insertTr += "</tr>";
							document.getElementById("dyn_tbody2").innerHTML += insertTr;
							checkCount++;
						}
					}
				};
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