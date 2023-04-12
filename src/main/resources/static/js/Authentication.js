/**
 * 
 */

let logoutButtons = document.querySelectorAll('.logoutButton'); // 로그아웃 버튼
let loginBotton = document.querySelector("#loginBtn"); // 로그인버튼

// 로그인 아이콘을 눌렀을 때
if (loginBotton !== null) {
	loginBotton.addEventListener("click", function(event) {
		event.preventDefault();
		loginDo();
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



// 로그인 기능
function loginDo() {
	let useridData = document.querySelector('#floatingInput').value;
	let userpwData = document.querySelector('#floatingPassword').value;
	let userloginData = {
		userid: useridData,
		userpw: userpwData
	};
	fetch("/member/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userloginData)
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			if (data.userid == null) {
				alert('로그인이 실패하였습니다.\n 아이디와 비밀번호를 확인해주세요');
				return;
			} else {
				sessionStorage.clear();
				sessionStorage.setItem("userid", data.userid);
				sessionStorage.setItem("username", data.username);
				sessionStorage.setItem("imagefilename", data.imagefilename);
				window.location.reload();
			}
		})
		.catch(error => {
			alert(`관리자에게 문의해주세요\n${error}`);
		})
}

// 로그아웃 기능
function logoutDo() {
	fetch('/member/logout', {
		method: "GET",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	})
		.then(() => {
			window.location.reload(); // 창 새로고침
		})
		.catch(function(error) {
			alert(`로그아웃 도중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
		});
}

