﻿

/*
- 프로그램 : server3000.js 
- Version : 1.51 
- Date : 2021. 04. 01  
- Creator : C.W.Jung(cwjung123@gmail.com)
- 용도 : 기본 노드 웹서버 Port : 3000  
- 기동1 : sudo node server3000.js 
- 기동2 : sudo npm start server3000.js  
- 기동3 : sudo pm2 start ecosystem.config_3000.js
- 확인 : http://서버IP:3000 or http://서버DNS:3000
*/ 
 
const express = require('express');     // 익스프레스 
const app   = express();                
const PORT = process.env.PORT = 3000;   // 개방포트 

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
  res.render("main3000", {
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
  console.log('Node WebServer V1.52 is running at:', PORT);
});