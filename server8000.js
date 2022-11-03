/*
- 프로그램 : server8000.js 
- Version : 2.01 
- Date : 2022. 04. 01  
- Creator : C.W.Jung(cwjung123@gmail.com)
- 용도 : 기본 노드 웹서버 Port : 8000  
- 기동1 : sudo node server8000.js 
- 기동2 : sudo pm2 start ecosystem_8000.config.js
- 확인 : http://서버IP:8000 or http://서버DNS:8000
*/ 
 
const express = require('express');     // 익스프레스 
const app   = express();                
const PORT = process.env.PORT = 8000;   // 개방포트 

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
    
    let {userId, userName} = req.query;
 
    // 인자값 전달유무에 따른 페이지 분리 
    if ( userId !== undefined  &&  userName !== undefined ) {
        // 호출사례  http://myserver.com:3000/?userId=1001&userName=James
        res.render("main8010", {
            title: "Member Home",
            ctime: currTime,
            totalcnt : totalConnectCnt,
            uid : userId,
            uname : userName,
        });

        console.log("C1-A. Service WebPage HOME Time=" + currTime + " / Count=" + totalConnectCnt + " / userID=" + userId); 
    }
    else {
        // 인자없음
        // 호출사례  http://myserver.com/?userId=1001&userName=James
        res.render("main8000", {
            title: "Service Home",
            ctime: currTime,
            totalcnt : totalConnectCnt,
        });

        console.log("C1-B. Service WebPage HOME Time=" + currTime + " / Count=" + totalConnectCnt); 
    }; 
 
});
 
app.listen(PORT, () => {
  console.log('HTTP V2.05 is running at:', PORT);
});