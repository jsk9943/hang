/**
 * 
 */
var container = document.getElementById('map');
var options = {
	center: new kakao.maps.LatLng(37.578559, 126.977007),
	level: 9
};
var map = new kakao.maps.Map(container, options);
var marker = new kakao.maps.Marker();
var infowindow = new kakao.maps.InfoWindow({ disableAutoPan: true });

let menuicon = document.querySelector('#menuicon');
let sidebar = document.querySelector('.sidebar');
let searchTop = document.querySelector('.searchTop');

if (menuicon && sidebar) {
	menuicon.addEventListener('click', () => {
		if (menuicon.checked) {
			sidebar.style.left = '0';
			searchTop.style.left = '0';
		} else {
			sidebar.style.left = '-100%';
			searchTop.style.left = '-100%';
		}
	});
}
var searchTopHeight = document.querySelector('.searchTop').offsetHeight;
var searchCountHeight = document.querySelector('#searchCount').offsetHeight;
var maxHeight = document.querySelector('.sidebar').offsetHeight - (searchTopHeight + searchCountHeight);
document.getElementById('searchResult').style.maxHeight = maxHeight + 'px';
document.getElementById('searchResult').style.marginTop = (searchTopHeight + searchCountHeight) + 'px';

function refreshPage() {
	location.reload();
}

let burgers = document.querySelectorAll('.menu-trigger');
burgers.forEach(function(burger) {
  burger.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('active-' + (7));
  });
});


let offcanvasCloseButton = document.querySelector('.offcanvasCloseButton');
if(offcanvasCloseButton !== null) {
	offcanvasCloseButton.addEventListener('click', () => {
		burger.click();
	})
}

/**
 * 나의리뷰 게시판
 */
var tableList = [];
var pageList = 10;
var pageMax = 5;
var idx = 0;
var page = 1;

function myreviewsTableInsert(data) {
	tableList = [];
	for (var i = 0; i < data.length; i++) {
		var jsonObject = {
			"idx": i + 1,
			"writerCCBAASNO": data[i].CCBAASNO,
			"writerCCBAMNM1": data[i].CCBAMNM1,
			"writerStarpoint": data[i].STARPOINT,
			"writerComment": data[i].COMMENT,
			"writerCommentDate": data[i].COMMENTDATE,
			"writerReviewphoto": data[i].REVIEWPHOTO
		};
		tableList.push(jsonObject);
	}
	myreviewsPageInsert(page);
};

function myreviewsPageInsert(value) {
	$("#dyn_ul").empty();
	var startIndex = value;
	var endIndex = tableList.length;
	var pageCount = 0;
	var pagePlus = 0;
	if (endIndex > pageList) {
		pageCount = Math.floor(endIndex / pageList);
		pagePlus = endIndex % pageList;
		if (pagePlus > 0) {
			pageCount = pageCount + 1;
		}
	}
	if (startIndex > pageCount) {
		startIndex = page;
	}
	else if (startIndex < 0) {
		startIndex = page;
	}
	else {
		page = startIndex;
	}
	if (pageCount == 1) {
		var insertUl = "<li class='page-item'>";
		insertUl += insertUl + "<a class='page-link' href='javascript:void(0)' onclick='myreviewsNewPage(1);'>";
		insertUl += insertUl + i;
		insertUl += insertUl + "</a></li>";
		$("#dyn_ul").append(insertUl);
	}
	else if (pageCount >= 2) {
		var insertSTR = "<li class='page-item'>"; // 변수 선언
		insertSTR = insertSTR + "<a class='page-link' href='javascript:void(0)' onclick='myreviewsNewPage(" + "-1" + ");'>";
		insertSTR = insertSTR + "이전";
		insertSTR = insertSTR + "</a></li>";
		$("#dyn_ul").append(insertSTR);
		var count = 1;
		for (var i = startIndex; i <= pageCount; i++) {
			if (count > pageMax) {
				page = i - pageMax;
				break;
			}
			var insertUl = "<li class='page-item'>";
			insertUl = insertUl + "<a class='page-link' href='javascript:void(0)' onclick='myreviewsNewPage(" + i + ");'>";
			insertUl = insertUl + String(i);
			insertUl = insertUl + "</a></li>";
			$("#dyn_ul").append(insertUl);
			count++;
		}

		var insertEND = "<li class='page-item'>";
		insertEND = insertEND + "<a class='page-link' href='javascript:void(0)' onclick='myreviewsNewPage(" + "0" + ");'>";
		insertEND = insertEND + "다음";
		insertEND = insertEND + "</a></li>";
		$("#dyn_ul").append(insertEND);
	}
	$("#dyn_tbody").empty();
	myreviewsNewPage(startIndex);
};

function myreviewsNewPage(pageCurrent) {
	if (pageCurrent == -1) {
		$("#dyn_tbody").empty();
		var newIdx = page - pageMax;
		myreviewsPageInsert(newIdx);
	}
	else if (pageCurrent == 0) {
		$("#dyn_tbody").empty();
		var newIdx = page + pageMax;
		myreviewsPageInsert(newIdx);
	}
	else {
		$("#dyn_tbody").empty();
		idx = (pageCurrent * pageList) - pageList;
		var checkCount = 1;
		for (var i = idx; i < tableList.length; i++) {
			if (checkCount > pageList) {
				return;
			}
			var dataParsingComment = JSON.parse(JSON.stringify(tableList[i]));
			var writerCCBAASNO = dataParsingComment.writerCCBAASNO;
			var writerCCBAMNM1 = dataParsingComment.writerCCBAMNM1;
			var writerStarpoint = dataParsingComment.writerStarpoint;
			var writerComment = dataParsingComment.writerComment;
			var writerCommentDate = dataParsingComment.writerCommentDate;
			var writerReviewphoto = dataParsingComment.writerReviewphoto;
			var insertTr = "";
			insertTr += "<tr>";
			insertTr += `<td><input type="checkbox" id="myreviewCheckbox${writerCCBAASNO}" class="checkAll" value="${writerCCBAASNO}"></td>`;
			insertTr += `<td><label for="myreviewCheckbox${writerCCBAASNO}">${writerCCBAMNM1}</label></td>`;
			insertTr += `<td><label for="myreviewCheckbox${writerCCBAASNO}">${writerStarpoint}</label></td>`;
			insertTr += `<td><label for="myreviewCheckbox${writerCCBAASNO}">${writerComment}</label></td>`;
			insertTr += `<td><label for="myreviewCheckbox${writerCCBAASNO}">${writerCommentDate}</label></td>`;
			insertTr += `<td>
							<div class="btn-group">
							  <button type="button" class="btn btn-secondary btn-sm dropdown-toggle userphotoviewButton" data-bs-toggle="dropdown" aria-expanded="false" value="${writerReviewphoto}">
							    사진
							  </button>
							  <ul class="dropdown-menu" style="z-index:10000;">
							    <li class="userphotoview" style="text-align:center;"></li>
							  </ul>
							</div>
						</td>`;
			insertTr += "</tr>";
			document.getElementById("dyn_tbody").innerHTML += insertTr;
			checkCount++;
		}
	}
};


/**
 * 문화재별 리뷰 게시판
 */
function heritageCommentStart(data) {
	for (var k = 0; k < data.length; k++) {
		if (data[k].USERID === sessionStorage.getItem("userid")) {
			document.querySelector('#commentInputText').value = '이미 작성하였습니다';
			document.querySelector('#commentInputText').disabled = true;
			document.querySelector('#customRange2').disabled = true;
			document.querySelector('#commentStarpointConfirmButton').disabled = true;
		}
	}
	tableInsert(data);
}
function tableInsert(data) {
	tableList = [];
	for (var i = 0; i < data.length; i++) {
		var jsonObject = {
			"idx": i,
			"writer": data[i].USERID,
			"writerStarpoint": data[i].STARPOINT,
			"writerComment": data[i].COMMENT,
			"writerCommentDate": data[i].COMMENTDATE,
			"writerReviewphoto": data[i].REVIEWPHOTO
		};
		tableList.push(jsonObject);
	}
	pageInsert(page);
};

function pageInsert(value) {
	$("#dyn_ul").empty();
	var startIndex = value;
	var endIndex = tableList.length;
	var pageCount = 0;
	var pagePlus = 0;
	if (endIndex > pageList) {
		pageCount = Math.floor(endIndex / pageList);
		pagePlus = endIndex % pageList;
		if (pagePlus > 0) {
			pageCount = pageCount + 1;
		}
	}
	if (startIndex > pageCount) {
		startIndex = page;
	}
	else if (startIndex < 0) {
		startIndex = page;
	}
	else {
		page = startIndex;
	}
	if (pageCount == 1) {
		var insertUl = "<li class='page-item'>";
		insertUl += insertUl + "<a class='page-link' href='javascript:void(0)' onclick='newPage(1);'>";
		insertUl += insertUl + i;
		insertUl += insertUl + "</a></li>";
		$("#dyn_ul").append(insertUl);
	}
	else if (pageCount >= 2) {
		var insertSTR = "<li class='page-item'>";
		insertSTR = insertSTR + "<a class='page-link' href='javascript:void(0)' onclick='newPage(" + "-1" + ");'>";
		insertSTR = insertSTR + "이전";
		insertSTR = insertSTR + "</a></li>";
		$("#dyn_ul").append(insertSTR);
		var count = 1;
		for (var i = startIndex; i <= pageCount; i++) {
			if (count > pageMax) {
				page = i - pageMax;
				break;
			}
			var insertUl = "<li class='page-item'>";
			insertUl = insertUl + "<a class='page-link' href='javascript:void(0)' onclick='newPage(" + i + ");'>";
			insertUl = insertUl + String(i);
			insertUl = insertUl + "</a></li>";
			$("#dyn_ul").append(insertUl);
			count++;
		}
		var insertEND = "<li class='page-item'>";
		insertEND = insertEND + "<a class='page-link' href='javascript:void(0)' onclick='newPage(" + "0" + ");'>";
		insertEND = insertEND + "다음";
		insertEND = insertEND + "</a></li>";
		$("#dyn_ul").append(insertEND);
	}
	$("#dyn_tbody").empty();
	newPage(startIndex);
};

function newPage(pageCurrent) {
	if (pageCurrent == -1) {
		$("#dyn_tbody").empty();
		var newIdx = page - pageMax;
		pageInsert(newIdx);
	}
	else if (pageCurrent == 0) {
		$("#dyn_tbody").empty();
		var newIdx = page + pageMax;
		pageInsert(newIdx);
	}
	else {
		$("#dyn_tbody").empty();
		idx = (pageCurrent * pageList) - pageList;
		var checkCount = 1;
		for (var i = idx; i < tableList.length; i++) {
			if (checkCount > pageList) {
				return;
			}
			var dataParsingComment = JSON.parse(JSON.stringify(tableList[i]));
			var writer = dataParsingComment.writer;
			var writerStarpoint = dataParsingComment.writerStarpoint;
			var writerComment = dataParsingComment.writerComment;
			var writerCommentDate = dataParsingComment.writerCommentDate;
			var writerReviewphoto = dataParsingComment.writerReviewphoto;
			var insertTr = "";
			insertTr += "<tr>";
			insertTr += "<td>" + writer + "</td>";
			insertTr += "<td>" + writerStarpoint + "</td>";
			insertTr += "<td>" + writerComment + "</td>";
			insertTr += "<td>" + writerCommentDate + "</td>";
			insertTr += `<td>
							<div class="btn-group">
							  <button type="button" class="btn btn-secondary btn-sm dropdown-toggle userphotoviewButton" data-bs-toggle="dropdown" aria-expanded="false" value="${writerReviewphoto}">
							    사진
							  </button>
							  <ul class="dropdown-menu" style="z-index:10000;">
							    <li class="userphotoview" style="text-align:center;"></li>
							  </ul>
							</div>
						</td>`;
			insertTr += "</tr>";
			document.getElementById("dyn_tbody").innerHTML += insertTr;
			checkCount++;
		}
	}
};


/**
 * 세션 초기화
 */
function sessionStorageClear() {
	sessionStorage.clear();
}