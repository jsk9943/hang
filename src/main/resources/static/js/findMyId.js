/**
 * 잃어버린 아이디 찾기
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

	document.getElementById('lostMyIdSearch').addEventListener('click', () => {
		var userName = document.querySelector('.userName').value;
		var userPh = document.querySelector('.userPh').value;
		if (userName === '' && userPh === '') {
			document.getElementById('lostMyIdResult').value = '입력값이 비어있습니다';
			return;
		} else if (userName === '') {
			document.getElementById('lostMyIdResult').value = '가입자 이름이 비어있습니다';
			return;
		} else if (userPh === '') {
			document.getElementById('lostMyIdResult').value = '가입자 연락처가 비어있습니다';
			return;
		}
		fetch(`/member/idCheck?userName=${userName}&userPh=${userPh}`, {
			method: 'GET'
		})
			.then(response => {
				if (response.ok) {
					return response.text();
				}
			})
			.then(data => {
				if (data === 'false') {
					document.getElementById('lostMyIdResult').value = `요청하신 ${userName}님은 아이디가 확인되지 않습니다`;
				} else if (data) {
					document.getElementById('lostMyIdResult').value = `${userName}님의 아이디는 ${data} 입니다`;
				}
			})
			.catch(error => {
				alert(`아이디 찾기 도중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
			})
	});

	document.getElementById('lostMyIdPopupClose').addEventListener('click', () => {
		window.close();
	});
});