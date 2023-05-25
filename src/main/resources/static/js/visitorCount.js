/**
 * 방문 시 자동으로 방문기록 쿠키 생성 및 카운터 후 DB 저장
 */
// 버튼 클릭 인식 토스트 창 출력
const visitorCountTrigger = document.getElementById('visitorCountBtn')
const visitorCountToast = document.getElementById('visitorCountToast')
if (visitorCountTrigger) {
	visitorCountTrigger.addEventListener('click', () => {
		const toast = new bootstrap.Toast(visitorCountToast)
		toast.show()
		checkVisitorCount()
	})
}

// 쿠키를 설정하는 함수
function setCookie(name, value, days) {
	let expires = "";
	if (days) {
		let date = new Date();
		date.setUTCDate(date.getUTCDate() + days);
		date.setUTCHours(0, 0, 0, 0);
		let dateString = date.toUTCString(); // UTC 기준의 날짜와 시간을 포함한 문자열
		expires = "; expires=" + dateString;
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 쿠키를 가져오는 함수
function getCookie(name) {
	let nameEQ = name + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

// 랜덤 키 생성 함수
function generateRandomKey() {
	let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let keyLength = 10;
	let key = "";
	for (let i = 0; i < keyLength; i++) {
		let randomIndex = Math.floor(Math.random() * chars.length);
		key += chars.charAt(randomIndex);
	}
	return key;
}

// 방문자 수 체크
function checkVisitorCount() {
	let todayOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
	let today = new Date().toLocaleDateString('ko-KR', todayOptions).replaceAll('.', '-').trim();
	today = today.replace(/-$/, '');
	let todayData = {
		"day": today.replace(/\s/g, "")
	};
	if (getCookie("visitorKey") === null) {
		visitorCountFetch(todayData)
			.then(data => {
				plusVisitorCountFetch(todayData)
					.then(data2 => {
						if (data2 === 'true') {
							setCookie("visitorKey", generateRandomKey(), 1);
							visitorCountFetch(todayData)
								.then(data3 => {
									let visitor_count = data3.visitor_count;
									let visitor_totalcount = data3.visitor_totalcount;
									document.querySelector('#total_visitor').innerHTML = visitor_totalcount;
									document.querySelector('#today_visitor').innerHTML = visitor_count;
								})
						} else if (data2 === 'false') {
							alert(`방문자 통계 데이터를 불러오는데 실패하였습니다\n${data2}`);
						}
					})
					.catch(error => {
						alert(`방문자 통계 데이터를 불러오는데 실패하였습니다\n${error}`);
					})
			})
			.catch(error => {
				alert(`방문자 통계 데이터를 불러오는데 실패하였습니다\n${error}`);
			})
	} else if (getCookie("visitorKey") !== null) {
		visitorCountFetch(todayData)
			.then(data => {
				let visitor_count = data.visitor_count;
				let visitor_totalcount = data.visitor_totalcount;
				document.querySelector('#total_visitor').innerHTML = visitor_totalcount;
				document.querySelector('#today_visitor').innerHTML = visitor_count;
			})
			.catch(error => {
				alert(`방문자 통계 데이터를 불러오는데 실패하였습니다\n${error}`);
			})
	}
}
// 당일 첫 방문자 일 경우 방문자수 늘려서 가져오는 fetch 통신
function plusVisitorCountFetch(todayData) {
	return fetch(`/visitor/update`, {
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(todayData)
	})
		.then(response => {
			return response.text();
		})
}

// 기방문자 일 경우 방문자수 가져오는 fetch 통신
function visitorCountFetch(todayData) {
	return fetch(`/visitor`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(todayData)
	})
		.then(response => {
			return response.json()
		})
}

// 페이지 로드 시 방문자 수 체크
window.onload = function() {
	checkVisitorCount();
};