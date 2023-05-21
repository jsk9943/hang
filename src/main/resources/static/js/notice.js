/*
 *
 */
function getNoticeFetch() {
	return fetch('/notice/show', {
		method: 'GET'
	})
		.then(response => {
			return response.json();
		})
}

window.addEventListener('DOMContentLoaded', function() {
	getNoticeFetch()
		.then(data => {
			if (data.noticeUse === 'Y') {
				let noticeTextDom = `
					<div class="notice-text">
				      <input class="noticeDate" type="hidden" value="${data.stringConvertNoticeDate}">
				      <input class="noticeTitle" type="hidden" value="${data.noticeTitle}">
				      <input class="noticeContents" type="hidden" value="${data.noticeContents}">
				      <a class="noticeShow"></a>
				    </div>
				`;
				var noticeContainer = document.querySelector('.notice-container');
				noticeContainer.innerHTML = noticeTextDom;
				let noticeTitleInput = document.querySelector('.noticeTitle');
				let noticeShowLink = document.querySelector('.noticeShow');
				noticeShowLink.textContent = noticeTitleInput.value;
				let noticeText = document.querySelector('.notice-text');
				let displayWidth = noticeContainer.offsetWidth;
				let noticeKeyframes = '@keyframes marquee { 0% { transform: translateX(' + displayWidth + 'px); } 100% { transform: translateX(-100%); } }';
				let style = document.createElement('style');
				style.innerHTML = noticeKeyframes;
				noticeText.appendChild(style);
				let noticeDate = document.querySelector('.noticeDate').value;
				let noticeTitle = document.querySelector('.noticeTitle').value;
				let noticeContents = document.querySelector('.noticeContents').value;
				let openPopup = () => {
					let url = `/notice?stringConvertNoticeDate=${encodeURIComponent(noticeDate)}&noticeTitle=${encodeURIComponent(noticeTitle)}&noticeContents=${encodeURIComponent(noticeContents)}`;
					let width = 400;
					let height = 600;
					let left = (window.screen.width - width) / 2;
					let top = (window.screen.height - height) / 2;
					let options = `width=${width},height=${height},left=${left},top=${top}`;
					window.open(url, 'Notice', options);
				};
				noticeContainer.addEventListener('click', openPopup);
				noticeShowLink.addEventListener('click', openPopup);
			} else if (data.noticeUse === 'N') {
				let noticeContainer = document.querySelector('.notice-container');
				noticeContainer.style.display = 'none';
			}
		})
		.catch(error => {
			alert(`공지를 가져오는 도중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`)
		})
});

