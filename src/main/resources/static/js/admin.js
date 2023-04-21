/**
 * admin 기능이 있는 사용자에게는
 * 회원관리 페이지에서 별도의 아이콘을 생성해주고
 * 해당 아이콘을 클릭했을 때 관리자 페이지가 표시되는 Javascript
 */

// 관리자 페이지 아이콘
if (sessionStorage.getItem('userid') !== null) {
	document.querySelector('.hangtoggler').addEventListener('click', () => {
		var isAdmin = sessionStorage.getItem('admin');
		if (isAdmin === 'Y') {
			document.getElementById('adminButton').style.display = 'block';
		}
		else {
			document.getElementById('adminButton').style.display = 'none';
		}
	})
}

// 관리자 페이지
if (document.getElementById('adminButton') !== null) {
	document.getElementById('adminButton').addEventListener('click', () => {
		fetch('/admin')
			.then(response => {
				if (response.ok) {
					var width = 1000; // 팝업 창의 너비
					var height = 800; // 팝업 창의 높이
					var left = (window.innerWidth - width) / 2; // 가로 중앙 위치 계산
					var top = (window.innerHeight - height) / 2; // 세로 중앙 위치 계산
					// 팝업 창을 화면 중앙에 열기
					window.open("/admin", "Admin", "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top);
				}
			})
			.catch(error => {
				alert(`관리자 페이지 접속에 문제가 발생하였습니다\n${error}`);
			});
	})
}
