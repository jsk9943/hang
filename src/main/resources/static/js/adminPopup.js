/**
 * 공통사항
 */
let adminid = sessionStorage.getItem('userid'); //접속한 아이디
let commentPageButton = document.querySelector('#commentPageButton'); // 댓글 페이지 보기 버튼
let userAuthorityButton = document.querySelector('#userAuthorityButton'); // 권한 페이지 보기 버튼
let userForcedWithdrawalbuttonButton = document.querySelector('#userForcedWithdrawalbutton'); // 강제탈퇴 페이지 보기 버튼
let commentPageDiv = document.querySelector('#commentPage'); // 댓글 페이지
let adminAuthorityPageDiv = document.querySelector('#adminAuthorityPage'); // 권한 페이지
let userForcedWithdrawalPageDiv = document.querySelector('#userForcedWithdrawalPage'); // 권한 페이지
// commentPageButton 버튼 클릭 시 commentPage 보이게 처리
if (commentPageButton !== null) {
	commentPageButton.addEventListener('click', () => {
		commentPageDiv.style.display = 'block';
		adminAuthorityPageDiv.style.display = 'none';
		userForcedWithdrawalPageDiv.style.display = 'none';
		let fetchData = {
			"adminid": commentAdminId
		}
		commentTableStart(fetchData);
	});
}
// userAuthorityButton 버튼 클릭 시 adminAuthorityPage 보이게 처리
if (userAuthorityButton !== null) {
	userAuthorityButton.addEventListener('click', () => {
		commentPageDiv.style.display = 'none';
		adminAuthorityPageDiv.style.display = 'block';
		userForcedWithdrawalPageDiv.style.display = 'none';
		let fetchData = {
			"adminid": userAuthorityAdminId
		}
		userAurhorityTableStart(fetchData);
	});
}
// userForcedWithdrawalbutton 버튼 클릭 시 userForcedWithdrawalPage 보이게 처리
if (userForcedWithdrawalbuttonButton !== null) {
	userForcedWithdrawalbuttonButton.addEventListener('click', () => {
		commentPageDiv.style.display = 'none';
		adminAuthorityPageDiv.style.display = 'none';
		userForcedWithdrawalPageDiv.style.display = 'block';
		let fetchData = {
			"adminid": userForcedWithdrawalAdminId
		}
		userForcedWithdrawalTableStart(fetchData);
	});
}






/**
 * 댓글 관련 페이지
 */
let commentToastContent = document.querySelector('#commentliveToast');
//코멘트 삭제 전 최종확인 토스트
let commentDeleteButton = document.querySelector('.adminCommentDelete'); // 삭제버튼
if (commentDeleteButton !== null) {
	commentDeleteButton.addEventListener('click', () => {
		let toast = bootstrap.Toast.getOrCreateInstance(commentToastContent);
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
				let ccbaKdcd = splitData[1];
				let ccbaAsno = splitData[2];
				let ccbaCtcd = splitData[3];
				let data = {
					"adminid": adminid,
					"userid": userid,
					"ccbaKdcd": ccbaKdcd,
					"ccbaAsno": ccbaAsno,
					"ccbaCtcd": ccbaCtcd
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



/**
 * 유저권한 변경 관련
 */
//유저권한 변경 전 최종확인 토스트
let userAuthorityliveToastContent = document.querySelector('#userAuthorityliveToast');
let userAuthoritychangeButton = document.querySelector('.userAuthoritychange'); // 유저권한 변경 버튼
if (userAuthoritychangeButton !== null) {
	userAuthoritychangeButton.addEventListener('click', () => {
		let toast = bootstrap.Toast.getOrCreateInstance(userAuthorityliveToastContent);
		toast.show();
	})
}

//체크된 유저의 권한내용 가져오기
function checkBoxTrValue() {
	let userAuthorityCheckbox = document.querySelectorAll('.userAuthorityCheckbox');
	let data = [];
	userAuthorityCheckbox.forEach((checkbox) => {
		let tr = checkbox.closest('tr'); // checkbox가 속한 가장 가까운 tr 요소 찾기
		// checkbox가 체크되었을 때
		if (checkbox.checked) {
			let formSelects = tr.querySelectorAll('select.form-select'); // tr 내부의 모든 form-select 요소들 찾기
			let userid = checkbox.value; // userid 값 가져오기
			let selectedOptionValue = [];
			formSelects.forEach(select => {
				selectedOptionValue.push(select.value); // 선택된 option의 value 값 가져오기
			});
			let [value1, value2] = selectedOptionValue;
			let changeUserData = {
				"adminid": adminid,
				"userid": userid,
				"admin": value1,
				"access": value2
			};
			if (changeUserData !== '' || changeUserData !== null) {
				data.push(changeUserData);
			}
		}
	});
	if (data.length === 0) {
		return null;
	} else {
		return data;
	}
}

// 유저권한 최종 변경 버튼 클릭 시 통신
let finalAuthorityButton = document.querySelector('#finalAuthorityButton');
if (finalAuthorityButton !== null) {
	finalAuthorityButton.addEventListener('click', () => {
		let data = checkBoxTrValue();
		if (data === null) {
			document.querySelector('#AuthoritytoastCloseButton').click();
			return alert('체크된 항목이 없습니다');
		}
		fetch('/admin/ulist', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				return response.text();
			})
			.then(data => {
				if (data === 'true') {
					alert('정상적으로 변경되었습니다');
					document.querySelector('#AuthoritytoastCloseButton').click();
					location.reload();
				} else {
					alert(`변경이 실패하였습니다\n이미 변경되었을 수 있습니다`);
				}
			})
			.catch(error => {
				alert(`변경 도중 오류가 발생하였습니다\n${error}`);
			})
		document.querySelector('#AuthoritytoastCloseButton').click();
	})
}
