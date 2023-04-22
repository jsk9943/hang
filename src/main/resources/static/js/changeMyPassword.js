/**
 * 분실된 비밀번호 변경하기
 */
document.addEventListener('DOMContentLoaded', () => {
	let inputs = document.querySelectorAll('.form-control');
	inputs.forEach((input, index) => {
		input.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				let nextInput = inputs[index + 1];
				if (nextInput) {
					nextInput.focus();
				}
			}
		});
	});

	document.querySelector('.userPassword').addEventListener("keyup", passwordLengthCheck);
	document.querySelector('.userPassword2').addEventListener("keyup", passwordLengthCheck);
	function passwordLengthCheck() {
		let userPwRealtimeData = document.querySelector('.userPassword').value;
		let userPwRealtimeData2 = document.querySelector('.userPassword2').value;
		let pwmessageDiv = document.getElementById("pw-message");
		if (userPwRealtimeData !== userPwRealtimeData2 || userPwRealtimeData.length < 6 || userPwRealtimeData.length > 20 || userPwRealtimeData2.length < 6 || userPwRealtimeData2.length > 20) {
			pwmessageDiv.innerHTML = "<span style='padding-left:10px; color:red'>비밀번호가 같지 않거나 6자 이상, 20자 미만이어야 합니다</span>";
		} else {
			pwmessageDiv.innerHTML = "<span style='padding-left:10px; color:blue'>사용 가능한 비밀번호 입니다</span>";
		}
	}

	document.getElementById('lostMyPasswordSearch').addEventListener('click', () => {
		var userId = document.querySelector('.userId').value;
		var userName = document.querySelector('.userName').value;
		var userPh = document.querySelector('.userPh').value;
		var userEmail = document.querySelector('.userEmail').value;
		var userPassword = document.querySelector('.userPassword').value;
		if (passwordLengthCheck() === 0) {
			document.getElementById('lostMyPasswordResult').value = '비밀번호 조건을 충족하지 못했습니다';
		} else if (passwordLengthCheck() === 1) {
			let Data = {
				"userid": userId,
				"username": userName,
				"userph": userPh,
				"email": userEmail,
				"userChangePassword": userPassword
			};
			fetch('/member', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(Data)
			})
				.then(response => {
					if (response.ok) {
						return response.text();
					}
				})
				.then(data => {
					if (data === "ID_DENIED") {
						document.getElementById('lostMyPasswordResult').value = '입력된 아이디를 찾을 수 없습니다';
					} else if (data === "NAME_DENIED") {
						document.getElementById('lostMyPasswordResult').value = '입력된 이름을 찾을 수 없습니다';
					} else if (data === "PHONE_DENIED") {
						document.getElementById('lostMyPasswordResult').value = '입력된 연락처를 찾을 수 없습니다';
					} else if (data === "EMAIL_DENIED") {
						document.getElementById('lostMyPasswordResult').value = '입력된 이메일을 찾을 수 없습니다';
					} else if (data === 'true') {
						document.getElementById('lostMyPasswordResult').value = `${userId}님의 비밀번호가 변경되었습니다`;
					}
				})
				.catch(error => {
					alert(`비밀번호 변경 중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
				})
		}
	});

	document.getElementById('lostMyPasswordPopupClose').addEventListener('click', () => {
		window.close();
	});
});