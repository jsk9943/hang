let messageStatePoint = document.querySelector('.message_state_point');
let navHangtogglerButton = document.querySelector('.hangtoggler');
if (navHangtogglerButton !== null) {
	navHangtogglerButton.addEventListener('click', () => {
		newMessageCheck()
			.then(data => {
				if (data >= 2) {
					messageStatePoint.classList.add('bg-danger', 'border', 'border-light', 'rounded-circle');
				}
			})
	})
}

function newMessageCheck() {
	return fetch(`/message?userid=${sessionStorage.getItem('userid')}`, {
		method: 'GET'
	})
		.then(response => { return response.text() })
}


let messageButton = document.querySelector('.message_button');
let messageDOM = `
    <div class="modal fade" id="message_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="message_modalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="message_modalLabel">${sessionStorage.getItem('userid')}님의 쪽지함</h1>
            <button type="button" class="btn-close message_modal_close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body message_category">
            <a type="button" class="receiveMessage_button">받은 쪽지함</a>
            <a type="button" class="sendMessage_button">보낸 쪽지함</a>
          </div>
          <div class="modal-body message_box">
          </div>
          <div class="modal-body message_write">
            <h1 class="modal-title fs-5" id="message_sendtitle">쪽지 보내기</h1>
            <div class="mb-3 col-4">
              <label for="receive_userid" class="form-label">받는 사람<br>
              <span style="font-size:0.8em; font-weight:bold; color:gray;">(유저 아이디 클릭 시 자동 복사)</span>
              </label>
              <input type="text" class="form-control" id="receive_userid" placeholder="User ID">
            </div>
            <div class="mb-3">
              <label for="receive_message" class="form-label">내용</label>
              <textarea class="form-control" id="receive_message" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger messageDeleteButton">삭제</button>
            <button type="button" class="btn btn-warning messageWithdrawButton">회수</button>
            <button type="button" class="btn btn-success newMessageSendButton">전송</button>
            <button type="button" class="btn btn-secondary message_modal_close" data-bs-dismiss="modal">닫기</button>
          </div>
        </div>
      </div>
    </div>
`;

let messageModalShow = document.querySelector('.message_modal_show');
if (messageModalShow.childElementCount > 0) {
	messageModalShow.innerHTML = "";
}
messageModalShow.innerHTML += messageDOM;
if (messageButton !== null) {
	messageButton.addEventListener('click', () => {
		messageStatePoint.classList.remove('bg-danger', 'border', 'border-light', 'rounded-circle');
		let messageModalCloseButton = document.querySelectorAll('.message_modal_close');
		messageModalCloseButton.forEach((button) => {
			button.addEventListener('click', () => {
				messageModalShow.innerHTML = "";
				messageModalShow.innerHTML += messageDOM;
			})
		})

		let messageModal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#message_modal'));
		messageModal.show();

		let messageLinks = document.querySelectorAll('.message_category > a');
		messageLinks.forEach(function(link) {
			link.addEventListener('click', function(event) {
				event.preventDefault();
				let clickedLink = event.target;
				messageLinks.forEach(function(link) {
					link.classList.remove('clicked');
				});
				clickedLink.classList.add('clicked');
			});
		});

		let receiveMessageButton = document.querySelector('.receiveMessage_button');
		receiveMessageButton.addEventListener('click', () => {
			let messageBox = document.querySelector('.message_box');
			if (messageBox.childElementCount > 0) {
				messageBox.innerHTML = "";
			}
			receiveMessageBox()
			myReceiveMessage(sessionStorage.getItem('userid'))
				.then(data => {
					receiveTableInsert(data);
				})
				.catch(error => {
					alert(`받은 메세지를 불러오는 도중 오류가 발생했습니다\n관리자에게 문의해주세요\n${error}`)
				})
		})

		let sendMessageButton = document.querySelector('.sendMessage_button');
		sendMessageButton.addEventListener('click', () => {
			let messageBox = document.querySelector('.message_box');
			if (messageBox.childElementCount > 0) {
				messageBox.innerHTML = "";
			}
			sendMessageBox()
			mySendMessage(sessionStorage.getItem('userid'))
				.then(data => {
					sendTableInsert(data)
				})
				.catch(error => {
					alert(`받은 메세지를 불러오는 도중 오류가 발생했습니다\n관리자에게 문의해주세요\n${error}`)
				})
		})

		let messageWithdrawButton = document.querySelector('.messageWithdrawButton');
		if (messageWithdrawButton !== null) {
			messageWithdrawButton.addEventListener('click', () => {
				let sendMessageNumbers = document.querySelectorAll('.sendMessageNumber');
				let withdrawMessageData = {};
				let selectedCount = 0;
				sendMessageNumbers.forEach((element) => {
					if (element.checked) {
						withdrawMessageData.mess_no = element.value;
						selectedCount++;
					}
				});
				if (selectedCount > 1) {
					alert(`한번에 여러개의 쪽지는 회수 할 수 없습니다\n하나씩 회수만 가능합니다`);
					return;
				}
				mySendMessageWithdraw(withdrawMessageData)
					.then(data => {
						if (data === 'true') {
							alert('정상적으로 쪽지가 회수되었습니다');
						} else if (data === 'mess_no ALREADY READ') {
							alert(`사용자가 메세지를 확인하여 회수가 불가능합니다`);
						} else if (data === 'mess_no NOT ENOUGH') {
							alert(`이미 메세지가 회수되어 있습니다`);
						} else if (data === 'mess_no NOT EXIST') {
							alert(`이미 메세지가 삭제되었습니다`);
						} else if (data === 'error') {
							alert(`메세지 회수 도중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`)
						}
					})
					.catch(error => {
						alert(`메세지 회수 도중 오류가 발생하였습니다\n관리자에게 문의해주세요\n${error}`)
					})
			})
		}

		let newMessageSendButton = document.querySelector('.newMessageSendButton');
		if (newMessageSendButton !== null) {
			newMessageSendButton.addEventListener('click', () => {
				let receiveUserid = document.querySelector('#receive_userid');
				let receiveMessage = document.querySelector('#receive_message');
				if (receiveUserid.value === "관리자") {
					alert(`해당 관리자에게 메세지 발송은 어렵습니다\n문의사항은 admin에게 문의 바랍니다`)
					return;
				} else if (receiveUserid.value === sessionStorage.getItem('userid')) {
					alert('자기 자신에게 메세지를 보낼 수 없습니다')
				}
				if (receiveMessage.value === null || receiveMessage.value === '') {
					alert('빈 메세지는 전송 할 수 없습니다')
					return;
				}
				newMessageSending(sessionStorage.getItem('userid'), receiveUserid.value, receiveMessage.value)
					.then(data => {
						if (data === 'true') {
							alert(`정상적으로 ${receiveUserid.value}님에게 메세지를 전송하였습니다`)
							receiveUserid.value = '';
							receiveMessage.value = '';
						} else if (data === 'false') {
							alert(`요청하신 메세지 전송을 실패하였습니다\n아이디를 다시 확인해주세요`)
						}
					})
			})
		}
	})
}

function mySendMessageWithdraw(withdrawMessageData) {
	return fetch('/message', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(withdrawMessageData)
	})
		.then(response => { return response.text() })
}


function myReceiveMessage(userid) {
	return fetch('/message', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userid: userid
		})
	})
		.then(response => { return response.json() })
}


function mySendMessage(userid) {
	return fetch('/message/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"userid": userid
		})
	})
		.then(response => {
			return response.json()
		})
}

var messageTableList = [];
var messagePageList = 5;
var messagePageMax = 5;
var messageIdx = 0;
var messagePage = 1;

function receiveMessageBox() {
	let messageBox = document.querySelector('.message_box');
	const tableContainer = document.createElement('div');
	tableContainer.className = 'table-container';
	tableContainer.style.margin = '0 auto';
	tableContainer.style.width = '90%';
	tableContainer.style.textAlign = 'center';

	const table = document.createElement('table');
	table.className = 'table table-hover';
	table.style.fontSize = '0.9em';

	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	thead.appendChild(tr);

	const th1 = document.createElement('th');
	th1.className = 'table-col-1 receiveMessageTable1';
	th1.textContent = '번호';
	tr.appendChild(th1);

	const th2 = document.createElement('th');
	th2.className = 'table-col-2 receiveMessageTable2';
	th2.textContent = '보낸 유저';
	tr.appendChild(th2);

	const th3 = document.createElement('th');
	th3.className = 'table-col-3 receiveMessageTable3';
	th3.textContent = '내용';
	tr.appendChild(th3);

	const th4 = document.createElement('th');
	th4.className = 'table-col-4 receiveMessageTable4';
	th4.textContent = '전송일자';
	tr.appendChild(th4);

	const tbody = document.createElement('tbody');
	tbody.id = 'recive_dyn_tbody';

	table.appendChild(thead);
	table.appendChild(tbody);
	tableContainer.appendChild(table);

	messageBox.appendChild(tableContainer);

	const paginationContainer = document.createElement('div');
	paginationContainer.innerHTML = `
    <nav aria-label="Page navigation example" style="width: 100%; overflow: hidden;">
      <div id="reciveMessageCount" style="width: 10%; font-size: 0.9em; font-weight: bold; float: left; margin-left: 5%;">
      </div>
      <ul id="recive_dyn_ul" class="pagination" style="justify-content: center; margin-right: 10%;">
      </ul>
    </nav>
  `;

	messageBox.appendChild(paginationContainer);
}

function receiveTableInsert(data) {
	messageTableList = [];
	for (var i = 0; i < data.length; i++) {
		var jsonObject = {
			"messageIdx": i + 1,
			"mess_from": data[i].mess_from,
			"mess_contents": data[i].mess_contents,
			"mess_date": data[i].mess_date
		};
		messageTableList.push(jsonObject);
	}
	receivePageInsert(messagePage);
};

function receivePageInsert(value) {
	$("#recive_dyn_ul").empty();
	var startIndex = value;
	var endIndex = messageTableList.length;
	var pageCount = 0;
	var pagePlus = 0;
	if (endIndex > messagePageList) {
		pageCount = Math.floor(endIndex / messagePageList);
		pagePlus = endIndex % messagePageList;
		if (pagePlus > 0) {
			pageCount = pageCount + 1;
		}
	}
	if (startIndex > pageCount) {
		startIndex = messagePage;
	}
	else if (startIndex < 0) {
		startIndex = messagePage;
	}
	else {
		messagePage = startIndex;
	}
	if (pageCount == 1) {
		var insertUl = "<li class='page-item'>";
		insertUl += insertUl + "<a class='page-link' href='javascript:void(0)' onclick='receiveNewPage(1);'>";
		insertUl += insertUl + i;
		insertUl += insertUl + "</a></li>";
		$("#recive_dyn_ul").append(insertUl);
	}
	else if (pageCount >= 2) {
		var insertSTR = "<li class='page-item'>"; // 변수 선언
		insertSTR = insertSTR + "<a class='page-link' href='javascript:void(0)' onclick='receiveNewPage(" + "-1" + ");'>";
		insertSTR = insertSTR + "이전";
		insertSTR = insertSTR + "</a></li>";
		$("#recive_dyn_ul").append(insertSTR);
		var count = 1;
		for (var i = startIndex; i <= pageCount; i++) {
			if (count > messagePageMax) {
				messagePage = i - messagePageMax;
				break;
			}
			var insertUl = "<li class='page-item'>";
			insertUl = insertUl + "<a class='page-link' href='javascript:void(0)' onclick='receiveNewPage(" + i + ");'>";
			insertUl = insertUl + String(i);
			insertUl = insertUl + "</a></li>";
			$("#recive_dyn_ul").append(insertUl);
			count++;
		}

		var insertEND = "<li class='page-item'>";
		insertEND = insertEND + "<a class='page-link' href='javascript:void(0)' onclick='receiveNewPage(" + "0" + ");'>";
		insertEND = insertEND + "다음";
		insertEND = insertEND + "</a></li>";
		$("#recive_dyn_ul").append(insertEND);
	}
	$("#recive_dyn_tbody").empty();
	receiveNewPage(startIndex);
};

function receiveNewPage(pageCurrent) {
	if (pageCurrent == -1) {
		$("#recive_dyn_tbody").empty();
		var newIdx = messagePage - messagePageMax;
		receivePageInsert(newIdx);
	}
	else if (pageCurrent == 0) {
		$("#recive_dyn_tbody").empty();
		var newIdx = messagePage + messagePageMax;
		receivePageInsert(newIdx);
	}
	else {
		$("#recive_dyn_tbody").empty();
		messageIdx = (pageCurrent * messagePageList) - messagePageList;
		var checkCount = 1;
		for (var i = messageIdx; i < messageTableList.length; i++) {
			if (checkCount > messagePageList) {
				return;
			}
			var receiveMessageData = JSON.parse(JSON.stringify(messageTableList[i]));
			var mess_no = receiveMessageData.messageIdx;
			var mess_from = receiveMessageData.mess_from;
			var mess_contents = receiveMessageData.mess_contents;
			var mess_date = receiveMessageData.mess_date;
			var insertTr = "";
			insertTr += "<tr>";
			insertTr += `<td>${mess_no}</td>`;
			insertTr += `<td>${mess_from}</td>`;
			insertTr += `<td>${mess_contents}</td>`;
			insertTr += `<td>${mess_date}</td>`;
			insertTr += "</tr>";
			document.getElementById("recive_dyn_tbody").innerHTML += insertTr;
			let tdElements = document.querySelectorAll('#recive_dyn_tbody td');
			tdElements.forEach(function(td) {
				td.addEventListener('click', handleTdClick);
			});
			function handleTdClick(event) {
				let clickedTd = event.target;
				let tdIndex = Array.from(clickedTd.parentElement.children).indexOf(clickedTd);
				if (tdIndex === 1) {
					let tdValue = clickedTd.innerText;
					let inputElement = document.getElementById('receive_userid');
					inputElement.value = tdValue;
				}
			}
			checkCount++;
		}
	}
};

function sendMessageBox() {
	let messageBox = document.querySelector('.message_box');
	const tableContainer = document.createElement('div');
	tableContainer.className = 'table-container';
	tableContainer.style.margin = '0 auto';
	tableContainer.style.width = '90%';
	tableContainer.style.textAlign = 'center';

	const table = document.createElement('table');
	table.className = 'table table-hover';
	table.style.fontSize = '0.9em';

	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	thead.appendChild(tr);

	const th1 = document.createElement('th');
	th1.className = 'table-col-1 sendMessageTable1';
	th1.textContent = '선택';
	tr.appendChild(th1);

	const th2 = document.createElement('th');
	th2.className = 'table-col-2 sendMessageTable2';
	th2.textContent = '번호';
	tr.appendChild(th2);

	const th3 = document.createElement('th');
	th3.className = 'table-col-3 sendMessageTable3';
	th3.textContent = '받은 유저';
	tr.appendChild(th3);

	const th4 = document.createElement('th');
	th4.className = 'table-col-4 sendMessageTable4';
	th4.textContent = '내용';
	tr.appendChild(th4);

	const th5 = document.createElement('th');
	th5.className = 'table-col-5 sendMessageTable5';
	th5.textContent = '전송일자';
	tr.appendChild(th5);

	const th6 = document.createElement('th');
	th6.className = 'table-col-6 sendMessageTable6';
	th6.textContent = '확인';
	tr.appendChild(th6);

	const th7 = document.createElement('th');
	th7.className = 'table-col-7 sendMessageTable7';
	th7.textContent = '회수';
	tr.appendChild(th7);

	const tbody = document.createElement('tbody');
	tbody.id = 'send_dyn_tbody';

	table.appendChild(thead);
	table.appendChild(tbody);
	tableContainer.appendChild(table);

	messageBox.appendChild(tableContainer);

	const paginationContainer = document.createElement('div');
	paginationContainer.innerHTML = `
    <nav aria-label="Page navigation example" style="width: 100%; overflow: hidden;">
      <div id="sendMessageCount" style="width: 10%; font-size: 0.9em; font-weight: bold; float: left; margin-left: 5%;">
      </div>
      <ul id="send_dyn_ul" class="pagination" style="justify-content: center; margin-right: 10%;">
      </ul>
    </nav>
  `;

	messageBox.appendChild(paginationContainer);
}


function sendTableInsert(data) {
	messageTableList = [];
	for (var i = 0; i < data.length; i++) {
		var jsonObject = {
			"mess_no": data[i].mess_no,
			"messageIdx": i + 1,
			"mess_to": data[i].mess_to,
			"mess_contents": data[i].mess_contents,
			"mess_date": data[i].mess_date,
			"mess_to_read": data[i].mess_to_read,
			"mess_withdraw": data[i].mess_withdraw
		};
		messageTableList.push(jsonObject);
	}
	sendPageInsert(messagePage);
};

function sendPageInsert(value) {
	$("#recive_dyn_ul").empty();
	var startIndex = value;
	var endIndex = messageTableList.length;
	var pageCount = 0;
	var pagePlus = 0;
	if (endIndex > messagePageList) {
		pageCount = Math.floor(endIndex / messagePageList);
		pagePlus = endIndex % messagePageList;
		if (pagePlus > 0) {
			pageCount = pageCount + 1;
		}
	}
	if (startIndex > pageCount) {
		startIndex = messagePage;
	}
	else if (startIndex < 0) {
		startIndex = messagePage;
	}
	else {
		messagePage = startIndex;
	}
	if (pageCount == 1) {
		var insertUl = "<li class='page-item'>";
		insertUl += insertUl + "<a class='page-link' href='javascript:void(0)' onclick='sendNewPage(1);'>";
		insertUl += insertUl + i;
		insertUl += insertUl + "</a></li>";
		$("#send_dyn_ul").append(insertUl);
	}
	else if (pageCount >= 2) {
		var insertSTR = "<li class='page-item'>"; // 변수 선언
		insertSTR = insertSTR + "<a class='page-link' href='javascript:void(0)' onclick='sendNewPage(" + "-1" + ");'>";
		insertSTR = insertSTR + "이전";
		insertSTR = insertSTR + "</a></li>";
		$("#send_dyn_ul").append(insertSTR);
		var count = 1;
		for (var i = startIndex; i <= pageCount; i++) {
			if (count > messagePageMax) {
				messagePage = i - messagePageMax;
				break;
			}
			var insertUl = "<li class='page-item'>";
			insertUl = insertUl + "<a class='page-link' href='javascript:void(0)' onclick='sendNewPage(" + i + ");'>";
			insertUl = insertUl + String(i);
			insertUl = insertUl + "</a></li>";
			$("#send_dyn_ul").append(insertUl);
			count++;
		}

		var insertEND = "<li class='page-item'>";
		insertEND = insertEND + "<a class='page-link' href='javascript:void(0)' onclick='sendNewPage(" + "0" + ");'>";
		insertEND = insertEND + "다음";
		insertEND = insertEND + "</a></li>";
		$("#send_dyn_ul").append(insertEND);
	}
	$("#send_dyn_tbody").empty();
	sendNewPage(startIndex);
};

function sendNewPage(pageCurrent) {
	if (pageCurrent == -1) {
		$("#send_dyn_tbody").empty();
		var newIdx = messagePage - messagePageMax;
		receivePageInsert(newIdx);
	}
	else if (pageCurrent == 0) {
		$("#send_dyn_tbody").empty();
		var newIdx = messagePage + messagePageMax;
		receivePageInsert(newIdx);
	}
	else {
		$("#send_dyn_tbody").empty();
		messageIdx = (pageCurrent * messagePageList) - messagePageList;
		var checkCount = 1;
		for (var i = messageIdx; i < messageTableList.length; i++) {
			if (checkCount > messagePageList) {
				return;
			}
			var sendMessageData = JSON.parse(JSON.stringify(messageTableList[i]));
			var mess_no = sendMessageData.mess_no;
			var messageIdx = sendMessageData.messageIdx;
			var mess_to = sendMessageData.mess_to;
			var mess_contents = sendMessageData.mess_contents;
			var mess_date = sendMessageData.mess_date;
			var mess_to_read = sendMessageData.mess_to_read;
			var mess_withdraw = sendMessageData.mess_withdraw;
			var readMessageIcon = null;
			if (mess_to_read === 'Y') {
				readMessageIcon = '<img src="./icon/readMessageIcon.png" alt="읽음" style="width:100%;">';
			} else if (mess_to_read === 'N') {
				readMessageIcon = '<img src="./icon/notReadMessageIcon.png" alt="읽지않음" style="width:100%;">';
			}
			var withdrawMessageIcon = null;
			if (mess_withdraw === 'Y') {
				withdrawMessageIcon = '<img src="./icon/OKicon.png" alt="회수" style="width:100%;">';
			} else if (mess_withdraw === 'N') {
				withdrawMessageIcon = '<img src="./icon/Xicon.png" alt="미회수" style="width:100%;">';
			}
			var insertTr = "";
			insertTr += "<tr>";
			insertTr += `<td><input class="sendMessageNumber" type="checkbox" value="${mess_no}"></td>`;
			insertTr += `<td>${messageIdx}</td>`;
			insertTr += `<td>${mess_to}</td>`;
			insertTr += `<td>${mess_contents}</td>`;
			insertTr += `<td>${mess_date}</td>`;
			insertTr += `<td class="messageReadCheckIcon">${readMessageIcon}</td>`;
			insertTr += `<td class="messageWithdrawCheckIcon">${withdrawMessageIcon}</td>`;
			insertTr += "</tr>";
			document.getElementById("send_dyn_tbody").innerHTML += insertTr;
			let tdElements = document.querySelectorAll('#send_dyn_tbody td');
			tdElements.forEach(function(td) {
				td.addEventListener('click', handleTdClick);
			});
			function handleTdClick(event) {
				let clickedTd = event.target;
				let tdIndex = Array.from(clickedTd.parentElement.children).indexOf(clickedTd);
				if (tdIndex === 2) {
					let tdValue = clickedTd.innerText;
					let inputElement = document.getElementById('receive_userid');
					inputElement.value = tdValue;
				}
			}
			checkCount++;
		}
	}
};


function newMessageSending(sendUserid, receiveUserid, sendMessage) {
	return fetch('/message/send.do', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"sendUserid": sendUserid,
			"receiveUserid": receiveUserid,
			"sendMessage": sendMessage
		})
	})
		.then(response => { return response.text() })
}