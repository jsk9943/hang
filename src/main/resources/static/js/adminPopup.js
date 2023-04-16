/**
 * 
 */
let adminid = sessionStorage.getItem('userid'); //접속한 아이디
let commentPageButton = document.querySelector('#commentPageButton'); // 댓글 페이지 보기 버튼
let userAuthorityButton = document.querySelector('#userAuthorityButton'); // 권한 페이지 보기 버튼
let commentPageDiv = document.querySelector('#commentPage'); // 댓글 페이지
let adminAuthorityPageDiv = document.querySelector('#adminAuthorityPage'); // 댓글 페이지
let toastContent = document.getElementById('liveToast'); // 토스트창

// commentPageButton 버튼 클릭 시 commentPage 보이게 처리
if(commentPageButton !== null){
	commentPageButton.addEventListener('click', () => {
		commentPageDiv.style.display = 'block';
		adminAuthorityPageDiv.style.display = 'none';
	});	
}

// userAuthorityButton 버튼 클릭 시 adminAuthorityPage 보이게 처리
if(userAuthorityButton !== null){
	userAuthorityButton.addEventListener('click', () => {
		commentPageDiv.style.display = 'none';
		adminAuthorityPageDiv.style.display = 'block';
	});	
}

//코멘트 삭제 전 최종확인 토스트
let commentDeleteButton = document.querySelector('.adminCommentDelete'); // 삭제버튼
if (commentDeleteButton !== null) {
	commentDeleteButton.addEventListener('click', () => {
		let toast = bootstrap.Toast.getOrCreateInstance(toastContent);
		toast.show();
	})
}

//코멘트 삭제 버튼 클릭 시 코멘트 삭제 처리
let toastDeleteButton = document.querySelector('#finalDeleteButton'); // 토스트창 안에 최종 삭제버튼
if (toastDeleteButton !== null) {
	toastDeleteButton.addEventListener('click', () => {
		let checkboxes = document.querySelectorAll('.deleteCommentCheckbox');
		let list = [];
		checkboxes.forEach(function(checkbox) {
			if (checkbox.checked == true) {
				let deleteData = checkbox.value;
				let splitData = deleteData.split(' ');
				let userid = splitData[0];
				let ccbaAsno = splitData[1];
				let data = {
					"adminid": adminid,
					"userid": userid,
					"ccbaAsno": ccbaAsno
				}
				list.push(data);
			}
		});
		if (list.length !== 0) {
			fetch('/admin/clist', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(list)
			})
				.then(response => {
					return response.text();
				})
				.then(data => {
					if (data === 'true') {
						alert('정상적으로 삭제되었습니다');
						document.querySelector('#toastCloseButton').click();
						location.reload();
					} else {
						alert(`삭제가 실패하였습니다\n이미 삭제되었을 수 있습니다`);
					}
				})
				.catch(error => {
					alert(`삭제 도중 오류가 발생하였습니다\n${error}`);
				})
		}
	})
}



//유저권한 변경 전 최종확인 토스트
let userAuthoritychangeButton = document.querySelector('#userAuthoritychange'); // 유저권한 변경 버튼
if (userAuthoritychangeButton !== null) {
	userAuthoritychangeButton.addEventListener('click', () => {
		let toast = bootstrap.Toast.getOrCreateInstance(toastContent);
		toast.show();
	})
}

