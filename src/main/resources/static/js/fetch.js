/**
 * fetch 기능 module 화 진행
 */

// 검색단어로 문화재 검색 기능 fetch
export function heritageKeywordSearch(keyword) {
	return fetch(`/heritage/item/search?keyword=${keyword}`, {
		method: "GET"
	})
		.then(response => {
			return response.json();
		})
}

// 문화재 상세검색 기능(문화재 지역, 문화재 고유번호, 문화재 종류) fetch
export function heritageKeywordSearchDetail(ccbaKdcd, ccbaAsno, ccbaCtcd) {
	return fetch(`/heritage/item/search/detail?ccbaKdcd=${ccbaKdcd}&ccbaAsno=${ccbaAsno}&ccbaCtcd=${ccbaCtcd}`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
}

// 코멘트 및 별점 등록 fetch
export function commentStaRateCreate(userid, ccbaKdcd, ccbaAsno, ccbaCtcd, ccbaMnm1, comment, starpoint, file) {
	let formData = new FormData();
	formData.append('userid', userid);
	if (file) {
		formData.append('file', file);
	}
	let inputData = {
		"userid": userid,
		"ccbaKdcd": ccbaKdcd,
		"ccbaAsno": ccbaAsno,
		"ccbaCtcd": ccbaCtcd,
		"ccbaMnm1": ccbaMnm1,
		"comment": comment,
		"starpoint": starpoint
	};
	formData.append('inputData', JSON.stringify(inputData));
	fetch('/heritage/item/input', {
		method: 'POST',
		body: formData
	})
		.then(response => {
			return response.text();
		})
		.then(data => {
			if (data === 'true') {
				alert('정상적으로 등록되었습니다');
			} else if (data === 'false') {
				alert(`사진이 등록되지 않았습니다.`);
			} else if (data === 'DENIED') {
				alert(`댓글쓰기 기능 접근이 차단되어있습니다\n관리자에게 문의해주세요`);
			}
		})
		.catch(error => {
			alert(`코멘트 등록 중 문제가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
		})

}

// 코멘트 및 별점 리스트 가져오는 fetch
export function heritageCommentList(ccbaKdcd, ccbaAsno, ccbaCtcd) {
	return fetch(`/heritage/item/output?ccbaKdcd=${ccbaKdcd}&ccbaAsno=${ccbaAsno}&ccbaCtcd=${ccbaCtcd}`, {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
}

// 코멘트에 등록된 사진 가져오는 fetch
export function heritageReviewPhotoLoading(reviewphoto) {
	return fetch(`/heritage/item/image?filename=${reviewphoto}`, {
		method: 'GET'
	})
		.then(response => response.arrayBuffer())
		.then(buffer => {
			const base64Flag = 'data:image/png;base64,';
			const imageStr = arrayBufferToBase64(buffer);
			const imgSrc = base64Flag + imageStr;
			const img = document.createElement("img");
			return img.src = imgSrc;
		});
}

function arrayBufferToBase64(buffer) {
	let binary = '';
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}


// 북마크 추가하는 fetch
export function bookmarkAdd(userid, ccbaKdcd, ccbaAsno, ccbaCtcd, ccbaMnm1) {
	let Data = {
		"userid": userid,
		"ccbaKdcd": ccbaKdcd,
		"ccbaAsno": ccbaAsno,
		"ccbaCtcd": ccbaCtcd,
		"ccbaMnm1": ccbaMnm1
	};
	fetch('/member/bookmark/add', {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(Data)
	})
		.then(response => response.text())
		.then(data => {
			alert(`${data}의\n즐겨찾기 등록되었습니다`);
		})
		.catch(error => {
			alert(`즐겨찾기 등록이 실패하였습니다.\n관리자에게 문의해주세요\n${error}`);
		})
}


// 북마크 아이콘으로 해제하는 fetch
export function bookmarkClear(userid, ccbaAsno, ccbaMnm1) {
	let Data = {
		"userid": userid,
		"ccbaAsno": ccbaAsno,
		"ccbaMnm1": ccbaMnm1
	};
	fetch('/member/bookmark', {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(Data)
	})
		.then(response => {
			return response.text();
		})
		.then(data => {
			alert(`${data}의\n즐겨찾기가 해제되었습니다`);
		})
		.catch(error => {
			alert(`삭제 중 문제가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
		})
}


// 북마크 등록여부 확인(유저 아이디, 확인 할 문화재 ccbaAsno 번호)
export function bookmarkConfirmRegistration(userid, ccbaAsno) {
	fetch(`/member/bookmark?userid=${userid}`, {
		method: "GET"
	})
		.then(response => response.json())
		.then(data => {
			for (var i = 0; i < data.length; i++) {
				if (data[i].CCBAASNO === ccbaAsno) {
					document.querySelector('.heart-icon').classList.toggle('liked', true); // 북마크 버튼 위 이미지
				}
			}
		})
		.catch(error => {
			alert(`즐겨찾기 결과 로드 중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
		})
}


//북마크한 문화재 목록 가져오기
export function bookmarkListLoad(userid) {
	return fetch(`/member/bookmark?userid=${userid}`, {
		method: "GET"
	})
		.then(response => {
			return response.json()
		})
}


// 북마크 선택해서 대량 삭제처리 fetch
export function bookmarkListSelectDelete(Data) {
	fetch('/member/bookmark/delete', {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(Data)
	})
		.then(response => {
			return response.text();
		})
		.then(data => {
			if (data === 'true') {
				alert('정상적으로 삭제되었습니다');
				document.querySelector('#bookmarktoastCloseButton').click();
				document.querySelector('#bookmarkModalClose').click();
			}
		})
		.catch(error => {
			alert(`삭제 중 문제가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
		})
}


// 중복 아이디 체크
export function realtimeIdCheck(idKeyword) {
	return fetch("/member/idCheck", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: `userid=${idKeyword}`
	})
		.then(response => {
			return response.json();
		})
}




// 최종 회원가입 처리
export function newRegister(formData) {
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
				document.querySelector("#registerCancel").click();
			} else if (data === 'false') {
				alert('기 가입된 회원입니다');
				return;
			}
		})
		.catch(error => {
			alert(`관리자에게 문의해주세요\n${error}`);
		})
}



// 로그인 기능
export function loginDo(useridData, userpwData) {
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
				sessionStorage.setItem("admin", data.admin);
				window.location.reload();
			}
		})
		.catch(error => {
			alert(`관리자에게 문의해주세요\n${error}`);
		})
}




// 로그아웃 기능
export function logoutDo() {
	fetch('/member/logout', {
		method: "GET"
	})
		.then(() => {
			window.location.reload(); // 창 새로고침
		})
		.catch(function(error) {
			alert(`로그아웃 도중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
		});
}


// 프로필 이미지 불러와 세션스토리지에 경로 담기
export function profileImgLoad(userid, imgFileName) {
	let profileLoadData = {
		"userid": userid,
		"imagefilename": imgFileName
	}
	fetch('/member/profileimg', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(profileLoadData)
	})
		.then(response => {
			return response.blob();
		})
		.then(blob => {
			let imageFilenameResult = sessionStorage.getItem('imagefilename');
			if (imageFilenameResult !== null && imageFilenameResult !== "") {
				sessionStorage.setItem("profileImage", URL.createObjectURL(blob));
			}
		})
		.catch(error => {
			alert(`파일확인에 실패하였습니다\n관리자에게 문의해주세요\n${error}`);
		})
}



// 유저가 작성한 리뷰 리스트 fetch
export function userReviewStarrate(userid) {
	return fetch(`/heritage/item?userid=${userid}`, {
		method: "GET"
	})
		.then(response => {
			return response.json();
		})
}


// 리뷰 및 별점 삭제 fetch (입력 Data는 [{}](json) 구조로 가능)
export function removeUserReviews(Data) {
	fetch('/heritage/item/input', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(Data)
	})
		.then(response => {
			return response.text();
		})
		.then(data => {
			if (data === 'true') {
				alert('정상적으로 삭제되었습니다');
				document.querySelector('#toastCloseButton').click();
			}
		})
		.catch(error => {
			alert(`삭제 중 문제가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
		})
}


// 유저 정보 업데이트 fetch
export function userInfoUpdate(userid, username, userEmail, userPasswod, userPhoneNumber) {
	let updateData = {
		"userid": userid,
		"username": username,
		"email": userEmail,
		"userpw": userPasswod,
		"userph": userPhoneNumber
	};
	fetch('/member/update', {
		method: 'PATCH',
		headers: {
			'Content-Type': "application/json"
		},
		body: JSON.stringify(updateData)
	})
		.then(response => {
			return response.text();
		})
		.then(data => {
			if (data === 'true') {
				alert('회원정보가 수정되었습니다');
			}
		})
		.catch(error => {
			alert(`정보 업데이트 도중 오류가 발생했습니다\n관리자에게 문의해주세요\n${error}`);
		});
}


// 현재 로그인한 유저 정보 불러오기
export function userInfoDataLoad(userid) {
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
			document.querySelector('#usingUsername').innerHTML = data.username;
			document.querySelector('#usingEmail').innerHTML = data.email;
			document.querySelector('#usingPh').innerHTML = data.userph;
		})
}


// 회원탈퇴 요청
export function userWithdrawal(sessionUserid, userid) {
	let withdrawalData = {
		sessionUserid: sessionUserid,
		userid: userid
	};
	fetch('/member', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(withdrawalData)
	})
		.then(response => {
			return response.text();
		})
		.then(data => {
			if (data === 'true') {
				alert('정상적으로 탈퇴되었습니다');
				logoutDo();
			} else if (data === 'false') {
				document.querySelector('#toastCloseButton').click(); //  오류났을 경우 토스트창만 닫기
				alert('탈퇴하실 아이디를 확인해주세요');
			}
		})
		.catch(error => {
			alert(`탈퇴 중 문제가 발생하였습니다\n관리자에게 문의해주세요\n${error}`);
		})
}