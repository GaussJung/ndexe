﻿

/*
- 프로그램 : sslserver.js 
- Version : 1.01 
- Date : 2021. 09. 01  
- Creator : C.W.Jung(cwjung123@gmail.com)
- 용도 : SSL 웹서버  Port 443 
- 기동 : node sslserver.js 
*/ 

let totalConnectCnt = 0;  // 서버 접속 횟수 
 
const express = require('express');     // 익스프레스 
const app   = express();                
const PORT = process.env.PORT = 443;   // 개방포트 
const fs = require('fs');               // 파일처리 (인증서읽기)
const httpsConnect = require('https');  // 보안접속 

// ============================================== F15. 인증서설정    ==============================================
const privateKey = fs.readFileSync('/etc/letsencrypt/live/sanw.soystudy.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sanw.soystudy.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sanw.soystudy.com/chain.pem', 'utf8');
 

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

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
    let tbidVal = "S10010"; 
    let titleVal = "산운초등학교 문제은행 접속홈"
    let versionVal  = "v1.0"; 

    // 접속횟수 추가 
    totalConnectCnt++; 

    // 렌더링 
    res.render("home", {
        title: titleVal,
        ctime: currTime,
        totalcnt : totalConnectCnt,
        tbid:tbidVal,
        version : versionVal
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
 

// 보안접속 서버 생성 
const httpsServer = httpsConnect.createServer(credentials, app);
 
httpsServer.listen(443, () => {
	 console.log('Sanw V1.1 NODE HTTPS Server running on port 443');
});

