/**
 * 회원정보 변경
 */
import { userInfoUpdate, userInfoDataLoad } from './fetch.js';
let userid = sessionStorage.getItem("userid");
// 기존 회원정보 불러오기
let usingProfileButton = document.querySelector('#usingProfile');
if (usingProfileButton !== null) {
	usingProfileButton.addEventListener('click', () => {
		userInfoDataLoad(userid); // 현재 유저 정보 불러오기
	})
}

// 수정된 회원정보 등록
let userUpdateConfirmButton = document.querySelector('#updateConfirm');
if (userUpdateConfirmButton !== null) {
	userUpdateConfirmButton.addEventListener('click', () => {
		let updateUserid = sessionStorage.getItem('userid');
		let updateUsername = document.querySelector('#updateUsername').value;
		let updateEmail = document.querySelector('#updateEmail').value;
		let updatePassword = document.querySelector('#updatePassword').value;
		let updatePhone = document.querySelector('#updatePhone').value;
		userInfoUpdate(updateUserid, updateUsername, updateEmail, updatePassword, updatePhone); // 유저정보 업데이트
	});
}

let usernameInput = document.getElementById('updateUsername');
let emailInput = document.getElementById('updateEmail');
let passwordInput = document.getElementById('updatePassword');
let passwordConfirmInput = document.getElementById('updateConfirmPassword');
let phoneInput = document.querySelector('#updatePhone');
let submitButton = document.getElementById('updateToastBtn');

//변경하기 디폴트 버튼 평소에 닫혀있음
if (submitButton !== null) {
	submitButton.disabled = true;
}

if (usernameInput !== null) {
	usernameInput.addEventListener('input', checkInputs);
}

if (emailInput !== null) {
	emailInput.addEventListener('input', checkInputs);
}

if (passwordInput !== null && passwordConfirmInput !== null) {
	passwordInput.addEventListener('input', checkInputs);
	passwordConfirmInput.addEventListener('input', checkInputs);
}

if (phoneInput !== null) {
	phoneInput.addEventListener('input', checkInputs);
}

function checkInputs() {
	let username = usernameInput.value.trim();
	let email = emailInput.value.trim();
	let password = passwordInput.value.trim();
	let confirmPassword = passwordConfirmInput.value.trim();
	let phone = phoneInput.value.trim();
	let emailDiv = document.getElementById("emailMessage");
	let phoneDiv = document.getElementById("phMessage");
	
	if (email !== '' && !email.includes('@')) {
		submitButton.disabled = true;
		emailDiv.innerHTML = "<span style='color:red'> \"@을\" 입력해주세요</span>";
		return;
	} else {
		emailDiv.innerHTML = "<span></span>"
	}

	function usingpwCheck() {
		let usingPwRealtime = passwordInput.value;
		let usingPwRealtime2 = passwordConfirmInput.value;
		let pwDiv = document.getElementById("pwMessage");
		if (usingPwRealtime !== usingPwRealtime2 || usingPwRealtime.length < 6 || usingPwRealtime.length > 20 || usingPwRealtime2.length < 6 || usingPwRealtime2.length > 20) {
			pwDiv.innerHTML = "<span style='padding-left:10px; color:red'>비밀번호가 같지않거나 6자 이상, 20자 미만이어야 합니다</span>";
		} else {
			pwDiv.innerHTML = "<span style='padding-left:10px; color:blue'>사용 가능한 비밀번호 입니다</span>";
		}
	}
	
	if (passwordInput !== null && passwordConfirmInput !== null) {
		passwordInput.addEventListener("keyup", usingpwCheck);
		passwordConfirmInput.addEventListener("keyup", usingpwCheck);
	}

	if (password !== '' && (password.length < 6 || password.length > 20 || password !== confirmPassword)) {
		submitButton.disabled = true;
		return;
	}

	if (phone !== '' && isNaN(phone)) {
		submitButton.disabled = true;
		phoneDiv.innerHTML = "<span style='color:red'> 번호만 입력해주세요 \"-\" 제외 </span>";
		return;
	} else {
		phoneDiv.innerHTML = "<span></span>"
	}

	if (username === '' && email === '' && password === '' && confirmPassword === '' && phone === '') {
		submitButton.disabled = true;
	} else {
		submitButton.disabled = false;
	}
}


//토스트 보여주는 이벤트
const udatetoastTrigger = document.getElementById('updateToastBtn')
const udatetoastLiveExample = document.getElementById('updateToast')
if (udatetoastTrigger !== null) {
	udatetoastTrigger.addEventListener('click', () => {
		const toast = new bootstrap.Toast(udatetoastLiveExample)
		toast.show()
	})
}


// 토스트 끄면 모달 toast 둘다 닫힘
$(document).ready(function() {
	$('#updateConfirm').on('click', function() {
		$('.modal').modal('hide');
		$('.toast').toast('hide');
	});
});


// 모달 끄면 초기화
$('.usermodal').on('hidden.bs.modal', function(e) {
	var submitButton = $('#updateToastBtn')[0];
	submitButton.disabled = true;
	$(this).find('form')[0].reset();
});
