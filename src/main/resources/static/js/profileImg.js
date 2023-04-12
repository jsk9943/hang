/**
 * 
 */
let profileUserid = sessionStorage.getItem("userid");
let profileImgname = sessionStorage.getItem("imagefilename");
let rightMenuButton = document.querySelector('.hangtoggler'); // 오른쪽 사이드바 불러오는 네비버튼
let myImageDiv = document.querySelector('#myImage'); // 오른쪽 사이드바 안에 프로필 사진
// 이미지 변경하는 모달
var profileImgModalContent = `

<div class="modal fade" id="profileImgModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true" style="z-index:10000;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">프로필 사진</h1>
          <button type="button" class="btn-close profileImgClose" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label for="formFileMultiple" class="form-label" style="font-weight: bold; font-size:1em;">기존 프로필 사진</label>
          <div style="text-align: center;">
            <div id="profileChangeImgDiv"style="text-align: center; width:50%; display:inline-block; padding:5%; border:2px solid black;">
            
            <img id="profileChangeImg" src="/img/user2.png" style="width:100%">
          
            </div>
          </div>
        </div>
        <hr>
        <div class="modal-body">
          <div class="mb-3">
            
              <label for="formFileMultiple" class="form-label" style="font-weight: bold; font-size:1em;">프로필 사진
                바꾸기 (최대 64KB)</label>
              <input class="form-control" type="file" id="formFileMultiple" style="width:100%;">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="profileImgSend">프로필 사진 변경하기</button>
          <button type="button" class="btn btn-secondary profileImgClose" data-bs-dismiss="modal">닫기</button>
        </div>
      </div>
    </div>
  </div>

`;


var modalPoint3 = document.querySelector('#modalPoint3'); // 모달이 붙을 main div
var profileOptionButton = document.querySelector('#profileOption'); // 모달을 호출할 버튼(톱니바퀴)
//모달 등록 후 진행
if (profileUserid !== null) {
	if (modalPoint3.childElementCount > 0) {
		modalPoint3.innerHTML = "";
	}
	modalPoint3.innerHTML += profileImgModalContent;
	var profileImgModalload = document.querySelector('#profileImgModal'); // 모달
	var profileImgCloseButton = document.querySelector('.profileImgClose'); // 모달창 취소 버튼
	var profileChangeImgDiv = document.querySelector('#profileChangeImg'); // 변경 전 이미지
	if (profileOptionButton !== null) {
		profileOptionButton.addEventListener('click', () => {
			let profileImgModalloadModal = bootstrap.Modal.getOrCreateInstance(profileImgModalload);
			profileImgModalloadModal.show();
			// 기존 등록된 이미지 불러오기
			if (profileImgname === null || profileImgname === "") {
				profileChangeImgDiv.remove();
				document.querySelector('#profileChangeImgDiv').innerHTML = '기존 이미지 파일이<br>없습니다.';
			} else {
				profileChangeImgDiv.src = sessionStorage.getItem('profileImage');
			}

		})
	}
}


// 사진 전송버튼 누르면 반응
if(document.querySelector('#profileImgSend')){
	document.querySelector('#profileImgSend').addEventListener('click', () => {
		// 선택한 파일의 정보를 받아오기
		let files = document.getElementById('formFileMultiple').files;
		if (files.length === 0) {
			alert('파일이 선택되지 않았습니다') // 파일이 선택되지 않은 경우 처리
		} else if (files.length > 1) {
			alert('파일은 1개만 선택 가능합니다') // 파일이 너무 많을 경우
		} else if (files.length === 1) {
			let file = files[0];
			let fileSize = file.size; // 파일 크기 (단위: bytes)
			let maxSizeInBytes = 64 * 1024; // 64KB를 bytes로 변환

			if (fileSize > maxSizeInBytes) {
				alert('파일 크기는 64KB 이하로 선택해주세요.'); // 파일 크기가 64KB 이상인 경우 처리
			} else {
				let reader = new FileReader();
				reader.readAsDataURL(files[0]);
				reader.onload = function(event) {
					let imgBase64Data = event.target.result; // 저장된 파일 정보
					let profileimgData = {
						"imgBase64Data": imgBase64Data,
						"imagefilename": profileImgname,
						"userid": profileUserid
					}
					fetch('/member/profileimg/upload', {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(profileimgData)
					})
						.then(response => {
							return response.text();
						})
						.then(data => {
							if (data === 'false') {
								alert('등록에 실패하였습니다');
							} else {
								alert('정상적으로 등록되었습니다');
								profileImgCloseButton.click();
								rightMenuButton.click();
								sessionStorage.setItem('imagefilename', data);
								profileImgname = sessionStorage.getItem('imagefilename');
								let profileLoadData = {
									"userid": profileUserid,
									"imagefilename": profileImgname
								}
								fetch('/member/profileimg/loading', {
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
										let imageFilenameResult = profileImgname;
										if (imageFilenameResult !== null && imageFilenameResult !== "") {
											sessionStorage.setItem("profileImage", URL.createObjectURL(blob));
										}
									})
									.catch(error => {
										alert(`이미지 재생성에 실패하였습니다\n관리자에게 문의해주세요\n${error}`);
									})
							}
						})
						.catch(error => {
							alert(`파일전송에 실패하였습니다\n관리자에게 문의해주세요\n${error}`);
						})
				}
			}
		}
	})
}



// 로그인 시 프로필 사진 로드
if (profileImgname !== null) {
	let profileLoadData = {
		"userid": profileUserid,
		"imagefilename": profileImgname
	}
	fetch('/member/profileimg/loading', {
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

	// 오른쪽 사이드 프로필 사진 불러오기
	rightMenuButton.addEventListener('click', () => {
		if (profileImgname !== null && profileImgname !== "") {
			myImageDiv.src = sessionStorage.getItem('profileImage');
		}
	})
}


