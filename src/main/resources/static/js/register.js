/**
 * 
 */
// 가입 방지 버튼 잠금 기능을 위한 변수명 선언
var idCheckResult;
var pwCheckResult;

// 회원 가입 기능
let registerButton = document.querySelector("#registerConfirm");
if (registerButton !== null) {
	registerButton.disabled = true;
	// 아이디 중복 확인
	let messageDiv = document.getElementById("id-message");
	let userIdInput = document.querySelector('#useridInput');
	userIdInput.addEventListener("keyup", () => {
		let userIdRealtimeData = userIdInput.value;
		fetch("/member/idCheck", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `userid=${userIdRealtimeData}`
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (data == 1) {
					messageDiv.innerHTML = "<span style='padding-left:10px; color:red'>사용하실 수 없는 아이디입니다.</span>";
					idCheckResult = 1;
					registerButton.disabled = true;
					registerButton.classList.remove("btn-primary");
					registerButton.classList.add("btn-secondary");
				}
				if (data == 0 && userIdRealtimeData.length >= 4 && userIdRealtimeData.length <= 12) {
					messageDiv.innerHTML = "<span style='padding-left:10px; color:blue'>사용 가능한 아이디입니다.</span>";
					idCheckResult = 0;

				}
				if (idCheckResult == 0 && pwCheckResult == 0 && userIdRealtimeData.length >= 4 && userIdRealtimeData.length <= 12) {
					registerButton.disabled = false;
					registerButton.classList.remove("btn-secondary");
					registerButton.classList.add("btn-primary");
				}
			})
			.catch(error => {
				alert(`관리자에게 문의해주세요\n${error}`);
			});
	});

	// 한글 아이디 입력 방지 & 4 ~ 12 길이수 제한
	userIdInput.addEventListener("keyup", function(event) {
		const inputText = event.target.value;
		const pattern = /^[a-zA-Z0-9]*$/; // 허용할 문자 패턴 (영문자와 숫자)

		if (!pattern.test(inputText)) {
			const filteredText = inputText.replace(/[^a-zA-Z0-9]/gi, ""); // 허용된 문자와 숫자 이외의 값은 제거
			event.target.value = filteredText; // 필터링된 값을 입력란에 반영
		} else if (inputText.length < 4 || inputText.length > 12) {
			// 4자 이하 또는 12자 이상인 경우 처리
			messageDiv.innerHTML = "<span style='padding-left:10px; color:red'>아이디가 너무 길거나 짧습니다.</span>";
			registerButton.disabled = true;
			registerButton.classList.remove("btn-primary");
			registerButton.classList.add("btn-secondary");
		}
	});

	// 비밀번호 확인 기능
	let userPwInput = document.querySelector('#userpw');
	let userPwInput2 = document.querySelector('#userpw2');

	// 비밀번호 이용 가능 여부 확인
	function passwordLengthCheck() {
		let userPwRealtimeData = userPwInput.value;
		let userPwRealtimeData2 = userPwInput2.value;
		let pwmessageDiv = document.getElementById("pw-message");
		let pwCheckResult = 0; // 초기값 설정
		if (userPwRealtimeData !== userPwRealtimeData2 || userPwRealtimeData.length < 6 || userPwRealtimeData.length > 20 || userPwRealtimeData2.length < 6 || userPwRealtimeData2.length > 20) {
			pwmessageDiv.innerHTML = "<span style='padding-left:10px; color:red'>비밀번호가 같지 않거나 6자 이상, 20자 미만이어야 합니다</span>";
			pwCheckResult = 1;
			registerButton.disabled = true;
			registerButton.classList.remove("btn-primary");
			registerButton.classList.add("btn-secondary");
		} else {
			pwmessageDiv.innerHTML = "<span style='padding-left:10px; color:blue'>사용 가능한 비밀번호 입니다</span>";
		}
		if (pwCheckResult === 0 && idCheckResult === 0) { // idCheckResult 변수 추가
			registerButton.disabled = false;
			registerButton.classList.remove("btn-secondary");
			registerButton.classList.add("btn-primary");
		}
	}

	// 이벤트 리스너 등록
	if (userPwInput !== null && userPwInput2 !== null) {
		userPwInput.addEventListener("keyup", passwordLengthCheck);
		userPwInput2.addEventListener("keyup", passwordLengthCheck);
	}
}



// 최종 회원가입 전송
function submitForm() {
	let myForm = document.querySelector('#loginForm');
	let formData = new FormData(myForm);
	fetch('/member/register', {
		method: 'POST',
		body: formData
	})
		.then(response => {
			return response.text();
		})
		.then(data => {
			if (data === 'true') {
				alert('회원가입이 완료되었습니다');
				let registerCancelButton = document.querySelector("#registerCancel");
				registerCancelButton.click();
			} else if (data === 'false') {
				alert('기 가입된 회원입니다');
				return;
			}
		})
		.catch(error => {
			alert(`관리자에게 문의해주세요\n${error}`);
		})
}
if (document.querySelector("#registerConfirm") !== null) {
	document.querySelector("#registerConfirm").addEventListener("click", function() {
		submitForm();
	});
}