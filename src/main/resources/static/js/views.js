/**
 * 검색창을 통한 문화재 검색과 좌측 검색결과의 자세히보기를 통한 지도 마커 등록 및 세부내용 안내
 */
import { heritageKeywordSearch, heritageKeywordSearchDetail } from './fetch.js';
import { detailContentLoad } from './detailContent.js';

// 알아보기 버튼 누르면 소개창 나오게 하기
if (document.querySelector('.introduce') !== null) {
	document.querySelector('.introduce').addEventListener('click', () => {
		fetch('/introduce')
			.then(response => {
				if (response.ok) {
					var width = 600; // 팝업 창의 너비
					var height = 560; // 팝업 창의 높이
					var left = (window.innerWidth - width) / 2; // 가로 중앙 위치 계산
					var top = (window.innerHeight - height) / 2; // 세로 중앙 위치 계산
					// 팝업 창을 화면 중앙에 열기
					window.open("/introduce", "introducePage.html", "width=" + width + ", height=" + height + ", left=" + left + ", top=" + top);
				}
			})
			.catch(error => {
				alert(`관리자 페이지 접속에 문제가 발생하였습니다\n${error}`);
			});
	})
}

let heritageSearch = document.querySelector("#searchInput"); //검색창
//검색 아이콘을 눌렀을 때
document.querySelector("#searchButton").addEventListener("click", (event) => {
	event.preventDefault();
	keywordSearch(heritageSearch.value);
});

// 엔터키를 쳤을 때
document.querySelector("#searchInput").addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		keywordSearch(heritageSearch.value);
	}
});

// 키워드 검색 유효성 검증
function keywordSearch(searchKeyword) {
	if (searchKeyword == null || searchKeyword == '') {
		alert('검색단어가 비어있습니다');
		return;
	} else if (searchKeyword.length < 2) {
		alert('검색단어가 2글자 미만입니다');
		return;
	} else {
		let menuicon = document.getElementById('menuicon');
		searchHeritage(searchKeyword);
		if (menuicon.checked == false) {
			menuicon.click();
		}
	}
}

// 검색결과 사이드바에 보여지게 하기
function searchHeritage(keyword) {
	// 검색단어로 문화재 검색 기능
	heritageKeywordSearch(keyword)
		.then(data => {
			document.querySelector('#searchCount').innerHTML = `${keyword} (${data.length}건)`;
			let html = '';
			if (data.length === 0) {
				html += `
				<div class="card">
				<p class="card-header">검색결과가 없습니다</p>
				</div>
				`
			} else {
				for (let i = 0; i < data.length; i++) {
					let item = data[i];
					if (item.latitude === 0) { // 좌표값이 없을때
						html += `
					        <div class="card">
					        <p class="card-header" style="font-family:'moonhwa';">${item.ccbaMnm1}<br>(${item.ccbaMnm2})</p>
					        <p>종목 : ${item.ccmaName}</p>
					        <p>위치 : ${item.ccbaCtcdNm} ${item.ccbaAdmin}</p>
					        <p style="font-weight:bold; color:red; font-size:0.7em;">※ 해당 문화재는 위치정보가 확인되지 않아<br>ㅤ정상적으로 지도에 마커되지 않습니다</p>
					        <a class="detail-link btn btn-primary" style="cursor: pointer;">
									자세히보기
									<input type="hidden" id="${item.ccbaKdcd}" name="ccbaKdcd" value="${item.ccbaKdcd}">
									<input type="hidden" id="${item.ccbaAsno}" name="ccbaAsno" value="${item.ccbaAsno}">
									<input type="hidden" id="${item.ccbaCtcd}" name="ccbaCtcd" value="${item.ccbaCtcd}">
									<input type="hidden" id="${item.latitude}" name="latitude" value="${item.latitude}">
									<input type="hidden" id="${item.longitude}" name="longitude" value="${item.longitude}">
					        </a>
					        </div>
					        `;
					} else if (item.ccbaMnm2 === null || item.ccbaMnm2 === '') { // 한자명이 없을 때
						html += `
					        <div class="card">
					        <p class="card-header" style="font-family:'moonhwa';">${item.ccbaMnm1}</p>
					        <p>종목 : ${item.ccmaName}</p>
					        <p>위치 : ${item.ccbaCtcdNm} ${item.ccbaAdmin}</p>
					        <p style="font-weight:bold; color:red; font-size:0.7em;">※ 해당 문화재는 위치정보가 확인되지 않아<br>ㅤ정상적으로 지도에 마커되지 않습니다</p>
					        <a class="detail-link btn btn-primary" style="cursor: pointer;">
									자세히보기
									<input type="hidden" id="${item.ccbaKdcd}" name="ccbaKdcd" value="${item.ccbaKdcd}">
									<input type="hidden" id="${item.ccbaAsno}" name="ccbaAsno" value="${item.ccbaAsno}">
									<input type="hidden" id="${item.ccbaCtcd}" name="ccbaCtcd" value="${item.ccbaCtcd}">
									<input type="hidden" id="${item.latitude}" name="latitude" value="${item.latitude}">
									<input type="hidden" id="${item.longitude}" name="longitude" value="${item.longitude}">
					        </a>
					        </div>
					        `;
					} else { // 모두 정상일 때
						html += `
						        <div class="card">
						        <p class="card-header" style="font-family:'moonhwa';">${item.ccbaMnm1}<br>(${item.ccbaMnm2})</p>
						        <p>종목 : ${item.ccmaName}</p>
						        <p>위치 : ${item.ccbaCtcdNm} ${item.ccbaAdmin}</p>
						        <a class="detail-link btn btn-primary" style="cursor: pointer;">
										자세히보기
										<input type="hidden" id="${item.ccbaKdcd}" name="ccbaKdcd" value="${item.ccbaKdcd}">
										<input type="hidden" id="${item.ccbaAsno}" name="ccbaAsno" value="${item.ccbaAsno}">
										<input type="hidden" id="${item.ccbaCtcd}" name="ccbaCtcd" value="${item.ccbaCtcd}">
										<input type="hidden" id="${item.latitude}" name="latitude" value="${item.latitude}">
										<input type="hidden" id="${item.longitude}" name="longitude" value="${item.longitude}">
						        </a>
						        </div>
						        `;
					}
				}
			}
			document.getElementById('searchResult').innerHTML = "";
			document.getElementById('searchResult').innerHTML = html;
			// 자세히 보기 버튼 클릭 시 
			let detailbutton = document.querySelectorAll('.detail-link');
			if (detailbutton !== null) {
				detailbutton.forEach(button => {
					button.addEventListener('click', (event) => {
						detailContent(event);
					});
				});
			}
		})
		.catch(error => {
			alert(`관리자에게 문의해주세요\n${error}`);
		});
}

//자세히 보기 클릭 시 문화재에 대한 세부항목 전송 및 마커 지도에 찍기
function detailContent(event) {
	event.preventDefault();
	let ccbaKdcd = event.target.querySelector('input[name="ccbaKdcd"]').value;
	let ccbaAsno = event.target.querySelector('input[name="ccbaAsno"]').value;
	let ccbaCtcd = event.target.querySelector('input[name="ccbaCtcd"]').value;
	heritageKeywordSearchDetail(ccbaKdcd, ccbaAsno, ccbaCtcd)
		.then(data => {
			marker.setMap(null);
			infowindow.close();
			detailContentLoad(data);
		})
		.catch(error => {
			alert(`관리자에게 문의해주세요\n${error}`);
		})
}

// 마커 클릭 시 마커 지워짐
kakao.maps.event.addListener(marker, 'click', () => {
	marker.setMap(null);
	infowindow.close();
});