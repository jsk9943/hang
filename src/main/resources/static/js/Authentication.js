/**
 * 회원이 입력한 아이디와 비밀번호로 로그인 및 로그아웃 기능 제공
 */
import { loginDo, logoutDo, userWithdrawal } from './fetch.js';
let logoutButtons = document.querySelectorAll('.logoutButton'); // 로그아웃 버튼
let loginButton = document.querySelector('#loginBtn'); // 로그인버튼
let userIdInput = document.querySelector('#floatingInput');// 아이디 입력 창
let userPasswordInput = document.querySelector('#floatingPassword');// 패스워드 입력 창

// 엔터 입력시 로그인
let inputs = document.querySelectorAll('.form-floating input');
inputs.forEach((input, index) => {
	input.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			let nextInput = inputs[index + 1];
			if (nextInput) {
				nextInput.focus();
			} else {
				document.querySelector('#loginBtn').click();
			}
		}
	});
});

// 로그인 아이콘을 눌렀을 때
if (loginButton !== null) {
	// 아이디 저장버튼 체크
	let userSaveIdData = localStorage.getItem('saveID');
	if (userSaveIdData !== null) {
		userIdInput.value = userSaveIdData;
		document.querySelector('#userIdSave').checked = true;
	}
	loginButton.addEventListener("click", function(event) {
		event.preventDefault();
		// 최종 로그인 시 이중 체크
		if (document.querySelector('#userIdSave').checked === true) {
			let userSaveId = userIdInput.value;
			localStorage.setItem('save', 'Y');
			localStorage.setItem('saveID', userSaveId);
		} else {
			localStorage.clear();
		}
		loginDo(userIdInput.value, userPasswordInput.value); // 로그인
	});
}

// 로그아웃 버튼이 눌렸을 때
if (logoutButtons !== null) {
	logoutButtons.forEach(function(button) {
		button.addEventListener('click', (event) => {
			event.preventDefault();
			logoutDo();
		})
	})
}

// 유저아이디 저장 체크박스
let userIdSaveCheckBox = document.querySelector('#userIdSave');
if (userIdSaveCheckBox !== null) {
	userIdSaveCheckBox.addEventListener('change', (checkbox) => {
		if (checkbox.target.checked == true) {
			let userSaveId = userIdInput.value;
			localStorage.setItem('save', 'Y');
			localStorage.setItem('saveID', userSaveId);
		} else if (checkbox.target.checked == false) {
			localStorage.clear();
			userIdInput.value = "";
		}
	})
}

// 아이디 찾기 버튼 눌렀을 때
let lostMyIdButton = document.querySelector('#lostMyIdSearchButton');// 아이디 찾기 버튼
if (lostMyIdButton !== null) {
	lostMyIdButton.addEventListener('click', () => {
		var width = 400; // 팝업 창의 너비
		var height = 400; // 팝업 창의 높이
		var left = (window.innerWidth - width) / 2; // 가로 중앙 위치 계산
		var top = (window.innerHeight - height) / 2; // 세로 중앙 위치 계산
		// 팝업 창을 화면 중앙에 열기
		window.open("findMyId", "findMyId.html", "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top);
	})
}

//비밀번호 찾기 버튼을 눌렀을 때
let lostMyPasswordChangeButton = document.querySelector('#lostMyPasswordChangeButton');
if (lostMyPasswordChangeButton !== null) {
	lostMyPasswordChangeButton.addEventListener('click', () => {
		var width = 420; // 팝업 창의 너비
		var height = 710; // 팝업 창의 높이
		var left = (window.innerWidth - width) / 2; // 가로 중앙 위치 계산
		var top = (window.innerHeight - height) / 2; // 세로 중앙 위치 계산

		// 팝업 창을 화면 중앙에 열기
		window.open("changeMyPassword", "changeMyPassword.html", "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top);
	})
}
// 상단 네비 바 로그인 버튼 클릭 시 사이드바 닫기
let navLoginButton = document.querySelector('.navLoginBtn');
if (navLoginButton !== null) {
	navLoginButton.addEventListener('click', () => {
		if (menuicon.checked == true) {
			menuicon.click();
		}
	})
}

// 오른쪽 사이드 바 로그인 버튼 클릭 시 사이드바 닫기
let logbtnButton = document.querySelector('.offcanvasLogin');
if (logbtnButton !== null) {
	logbtnButton.addEventListener('click', () => {
		document.querySelector('.offcanvasClose').click();
	})
}

//회원탈퇴 클릭 시 삭제처리
let withdrawalModal = `
			<div class="modal fade" id="withdrawalModal" tabindex="-1" aria-labelledby="withdrawalModalLabel" aria-hidden="true" style="z-index:10000;">
			  <div class="modal-dialog modal-dialog-centered modal-lg">
			    <div class="modal-content ">
			      <div class="modal-header">
			        <h1 class="modal-title fs-5" id="withdrawalModalLabel" style="font-weight:bold;">회원탈퇴</h1>
			        <button type="button" class="btn-close withdrawalCLOSEBUTTON" data-bs-dismiss="modal" aria-label="Close"></button>
			      </div>
			      <div class="modal-body" style="text-align:center;">
			        <p style="margin-bottom:20px;">회원탈퇴 할 경우 저장된 즐겨찾기와 댓글의 권한이 사라집니다</p><br>
			        <p style="font-weight:bold; margin-bottom:20px;">그래도 <span style="color:red;">탈퇴</span> 하시겠습니까?</p><br>
			        <p style="font-weight:bold; font-size:0.7em; margin-bottom:20px;">[탈회 시 작성된 댓글과 별점 정보는 그대로 유지되며 아이디만 탈퇴회원으로 변경처리 됩니다]</p>
			        <p>탈퇴를 원하시면 아이디를 입력 후 <span style="color:red; font-weight:bold;">[탈퇴]</span> 버튼을 눌러주세요</p>
			        <div style="display: flex; justify-content: center; padding-top:20px;">
				  <input class="form-control withdrawalID" type="text" placeholder="아이디 입력" style="width: 50%;">
				</div>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-danger withdrawalInBUTTON">탈퇴</button>
			        <button type="button" class="btn btn-secondary withdrawalCLOSEBUTTON" data-bs-dismiss="modal">닫기</button>
			        
			        
			        <div class="toast-container bottom-50 d-flex justify-content-center align-items-center w-100">
			          <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
			            <div class="toast-header">
			              <strong class="me-auto">최종확인</strong>
			              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
			            </div>
			            <div class="toast-body">
			              정말로 탈퇴하시겠습니까?<br>
			              <button type="button" class="btn btn-danger btn-sm" id="finalWithdrawalInBUTTON" data-bs-dismiss="modal">탈퇴</button>
			              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast" id="toastCloseButton">닫기</button>
			            </div>
			          </div>
			        </div>
			        
			        
			      </div>
			    </div>
			  </div>
			</div>
		`;
let withdrawalButton = document.querySelector('#withdrawal'); // 회원탈퇴 버튼
let modalWithdrawal = document.querySelector('#modalWithdrawal'); // 모달이 붙을 main div
if (modalWithdrawal.childElementCount > 0) {
	modalWithdrawal.innerHTML = "";
}
modalWithdrawal.innerHTML += withdrawalModal;
if (withdrawalButton !== null) {
	let withdrawalModals = document.querySelector('#withdrawalModal'); // 회원탈퇴 모달
	withdrawalButton.addEventListener('click', () => {
		let modalWithdrawalModal = bootstrap.Modal.getOrCreateInstance(withdrawalModals);
		modalWithdrawalModal.show();
	})
}

// 탈퇴 버튼 누르면 토스트 보여주기
let withdrawalInBUTTON = document.querySelector('.withdrawalInBUTTON'); // 모달 안에 탈퇴버튼
if (withdrawalInBUTTON !== null) {
	var toastContent = document.getElementById('liveToast'); // 토스트창
	withdrawalInBUTTON.addEventListener('click', () => {
		let toast = bootstrap.Toast.getOrCreateInstance(toastContent);
		toast.show();
	})
}

// 토스트 탈퇴 버튼 누르면 fetch로 통신
let finalWithdrawalInBUTTON = document.querySelector('#finalWithdrawalInBUTTON'); // 토스트 안에 최종 탈퇴 버튼
if (finalWithdrawalInBUTTON !== null) {
	finalWithdrawalInBUTTON.addEventListener('click', () => {
		let withdrawalID = document.querySelector('.withdrawalID');
		userWithdrawal(sessionStorage.getItem('userid'), withdrawalID.value);
		document.querySelector('#toastCloseButton').click();
	})
}

// 모달 닫을 때 입력창 초기화
let withdrawalCLOSEBUTTON = document.querySelectorAll('.withdrawalCLOSEBUTTON'); //닫기 버튼
if (withdrawalCLOSEBUTTON !== null) {
	withdrawalCLOSEBUTTON.forEach(button => {
		button.addEventListener('click', () => {
			// withdrawalID라는 input 창 초기화
			let withdrawalID = document.querySelector('.withdrawalID');
			if (withdrawalID !== null) {
				withdrawalID.value = '';
			}
			// 토스트창 닫기
			document.querySelector('#toastCloseButton').click();
		});
	});
}