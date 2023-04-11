/**
 * 
 */

//로그인 아이콘을 눌렀을 때
let loginBotton = document.querySelector("#loginBtn");
if (loginBotton) {
	document.querySelector("#loginBtn").addEventListener("click", function(event) {
		event.preventDefault();
		loginDo();
	});
}



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