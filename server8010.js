

/*
- 프로그램 : server8010.js 
- Version : 2.02 
- Date : 2022. 04. 27  
- Creator : C.W.Jung(cwjung123@gmail.com)
- 용도 :  S3테스트 기본 노드 웹서버 Port : 8000  
- 기동1 : sudo node server8010.js 
- 기동2 : sudo pm2 start ecosystem_8000.config.js
- 확인 : http://서버IP:8000 or http://서버DNS:8010
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

  // 렌더링 
  res.render("aws8010", {
      title: "AWS API TEST Home",
      ctime: currTime,
      totalcnt : totalConnectCnt
  });
 
  console.log("AWS API TEST WebPage Time=" + currTime + " / Count=" + totalConnectCnt); 

});

// ps.10 S3 테스트 
app.get('/awsS3', (req, res) => {
  res.render('local/aws_s3', {
      title: "AWS S3 Test"
  });
});

 
// ps.20 EC2 테스트 
app.get('/awsEC2', (req, res) => {
  res.render('local/aws_ec2', {
      title: "AWS EC2 Test"
  });
});


app.listen(PORT, () => {
  console.log('AWS API WebServer V2.02 is running at:', PORT);
});