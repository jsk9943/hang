/**
 * 
 */
let userid = sessionStorage.getItem("userid");
// 기존 회원정보 불러오기
let usingProfileButton = document.querySelector('#usingProfile');
if (usingProfileButton !== null) {
	usingProfileButton.addEventListener('click', () => {
		fetch('/member/usingprofile', {
			method: 'POST',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: "userid=" + encodeURIComponent(userid)
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				document.querySelector('#usingEmail').innerHTML = data.email;
				document.querySelector('#usingPh').innerHTML = data.userph;
			})
		$('.usermodal').on('hidden.bs.modal', function(e) {
			$(this).find('form')[0].reset();
		})
	})
}

// 수정된 회원정보 등록
let userUpdateConfirmButton = document.querySelector('#updateConfirm');
if (userUpdateConfirmButton !== null) {
	userUpdateConfirmButton.addEventListener('click', () => {
		let updateEmail = document.querySelector('#updateEmail').value;
		let updatePassword = document.querySelector('#updatePassword').value;
		let updatePhone = document.querySelector('#updatePhone').value;
		let updateUserid = sessionStorage.getItem('userid');
		let fetchDate = {
			userid: updateUserid,
			email: updateEmail,
			userpw: updatePassword,
			userph: updatePhone
		};
		fetch('/member/update', {
			method: 'PATCH',
			headers: {
				'Content-Type': "application/json"
			},
			body: JSON.stringify(fetchDate)
		})
			.then(response => {
				return response.text();
			})
			.then(data => {
				if(data === 'true'){
					alert('회원정보가 수정되었습니다');
				}
			})
			.catch(error => {
				alret(`정보 업데이트 도중 오류가 발생했습니다\n관리자에게 문의해주세요\n${error}`);
			})
	});
}




let emailInput = document.getElementById('updateEmail');
let passwordInput = document.getElementById('updatePassword');
let passwordConfirmInput = document.getElementById('updateConfirmPassword');
let submitButton = document.getElementById('updateConfirm');


if (emailInput !== null) {
	emailInput.addEventListener('input', function() {
		const email = emailInput.value;

		if (email === '' || email.includes('@')) {
			submitButton.disabled = false;
		} else {
			submitButton.disabled = true;
		}
	});
}
// 비밀번호 확인 기능
let usingpw = document.querySelector('#updatePassword');
let usingpw2 = document.querySelector('#updateConfirmPassword');

// 비밀번호 이용 가능 여부 확인
function usingpwCheck() {
	let usingPwRealtime = usingpw.value;
	let usingPwRealtime2 = usingpw2.value;
	let pwDiv = document.getElementById("pwMessage");
	if (usingPwRealtime !== usingPwRealtime2 || usingPwRealtime.length < 6 || usingPwRealtime.length > 20 || usingPwRealtime2.length < 6 || usingPwRealtime2.length > 20) {
		pwDiv.innerHTML = "<span style='padding-left:10px; color:red'>비밀번호가 같지 않거나 6자 이상, 20자 미만이어야 합니다</span>";
	} else {
		pwDiv.innerHTML = "<span style='padding-left:10px; color:blue'>사용 가능한 비밀번호 입니다</span>";
	}
}

// 이벤트 리스너 등록
if (usingpw !== null && usingpw2 !== null) {
	usingpw.addEventListener("keyup", usingpwCheck);
	usingpw2.addEventListener("keyup", usingpwCheck);
}

if (emailInput !== null) {
	emailInput.addEventListener('input', function() {
		let email = emailInput.value;
		if (email === '' || email.includes('@')) {
			submitButton.disabled = false;
		} else {
			submitButton.disabled = true;
		}
	});
}

if (passwordInput !== null && passwordConfirmInput !== null) {
	passwordInput.addEventListener('input', validatePassword);
	passwordConfirmInput.addEventListener('input', validatePassword);
}

// 패스워드 실시간 오류 확인
function validatePassword() {
	let password = passwordInput.value;
	let passwordConfirm = passwordConfirmInput.value;
	if (password === '' || password === passwordConfirm && password.length >= 6 && password.length <= 20) {
		submitButton.disabled = false;
	} else {
		submitButton.disabled = true;
	}
}

