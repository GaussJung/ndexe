

/*
- 프로그램 : server.js 
- Version : 1.51 
- Date : 2021. 04. 01  
- Creator : C.W.Jung(cwjung123@gmail.com)
- 용도 : 기본 노드 웹서버 Port : 80  
- 기동1 : sudo node server.js 
- 기동2 : sudo pm2 start ecosystem.config.js
- 확인 : http://서버IP   or http://서버DNS 
- pm2는 root로 기동 ( sudo su )   
- 일반 사용자 기동시 문제발행  ( Error: bind EACCES null:80)
https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/#allow-pm2-to-bind-applications-on-ports-80-443-without-root

1) authbind설치 ( 80번 포트 )
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown %user% /etc/authbind/byport/80
( 예시 : sudo chown ubuntu /etc/authbind/byport/80 )
sudo chmod 755 /etc/authbind/byport/80

2) 별칭설정 
~/.bashrc
아래 한줄 끝에 추가 
+alias pm2='authbind --deep pm2'

3) 명령어갱신 
authbind --deep pm2 update

*/ 
 
const express = require('express');     // 익스프레스 
const app   = express();                
const PORT = process.env.PORT = 80;   // 개방포트 

var totalConnectCnt = 0;

// 라이브러리 유틸 
require('date-utils');                  // 일자/시간 유틸리티 

// ejs 파일을 오픈 
app.set('view engine', 'ejs');
app.use(express.static('public'));


// ps.1 시작 페이지
app.get('/', (req, res) => {

  // 접속시간 정보 설정 
  let todayDate = new Date(); 
  let currTime = todayDate.toFormat('YYYY-MM-DD HH24:MI:SS');
 
  // 접속횟수 추가 
  totalConnectCnt++; 

  // 렌더링 
  res.render("main", {
      title: "Node Home",
      ctime: currTime,
      totalcnt : totalConnectCnt
  });
 
  console.log("Connected! WebPage HOME Time=" + currTime + " / Count=" + totalConnectCnt); 

});


// ps.20 로컬 페이지 감독자 화면
app.get('/admin', (req, res) => {
  res.render('local/admin', {
      title: "ADMIN"
  });
});


// ps.20 로컬 페이지 감독자 화면
app.get('/user', (req, res) => {
  res.render('local/user', {
      title: "Welcome"
  });
});


app.listen(PORT, () => {
  console.log('Node WebServer V1.51 is running at:', PORT);
});