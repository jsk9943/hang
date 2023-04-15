/**
 * 회원이 입력한 아이디와 비밀번호로 로그인 및 로그아웃 기능 제공
 */
import { loginDo, logoutDo } from './fetch.js';
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
if(lostMyIdButton !== null){
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
if(lostMyPasswordChangeButton !== null){
	lostMyPasswordChangeButton.addEventListener('click',() => {
		var width = 420; // 팝업 창의 너비
        var height = 710; // 팝업 창의 높이
        var left = (window.innerWidth - width) / 2; // 가로 중앙 위치 계산
        var top = (window.innerHeight - height) / 2; // 세로 중앙 위치 계산

        // 팝업 창을 화면 중앙에 열기
        window.open("changeMyPassword", "changeMyPassword.html", "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top);
	})
}

// 어사이드 바에서 로그인 버튼 눌렀을 시 사이드바 닫기
let logbtnButton = document.querySelector('.offcanvasLogin');
if (logbtnButton !== null) {
	logbtnButton.addEventListener('click', () => {
		document.querySelector('.offcanvasClose').click();
	})
}