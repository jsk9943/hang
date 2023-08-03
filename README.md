# [ Hang 구현 사이트 ](http://kjnas7486.synology.me)
  

1. 문화재(Heritage)를 카카오 지도를 통해 위치 탐색 및 리뷰 작성
2. 손쉽게 문화재 검색
3. 자세한 설명과 사진으로 정보 탐색
4. 문화재청에서 제공하는 정보로 정확도 높음
5. 방문기록을 사진, 댓글을 통해 남길 수 있음
6. 유저끼리 쪽지를 통해 소통 가능



> 카카오Dev에 제공되는 MAP API를 통해 베이스 화면 구성
> 클라이언트 브라우저는 bootstrap으로 구현
> 클라이언트에서 화면처리를 높이기 위해 javascript 코드로 DOM 및 fetch 비동기화 구현
> Server는 개인용 NAS로 docker를 활용 java11 springboot 실행
> DB는 mariaDB 10(NAS 구축)로 구동되며 SQL 역시 mariaDB 기준
> 문화재 데이터는 문화재청 API로 xml 파일을 받아 JSON type으로 화면에 출력
> profile는 base64를 통해 DB에 BLOB으로 저장하여 로딩속도 개선
> 문화재 이미지는 업로드 시 base64로 docker 컨테이너에 저장 및 관리
> 유저권한을 별도로 부여하여 admin 페이지에서 회원탈퇴, 댓글관리, 유저권한을 수정 및 삭제
