

/*
- 프로그램 : sslserver.js 
- Version : 1.53 
- Date : 2021. 09. 01  
- Creator : C.W.Jung(cwjung123@gmail.com)
- 용도 : SSL 웹서버  Port 443 
- 기동1 : sudo node sslserver.js 
- 기동2 : ( 선수행 sudo su  ) pm2 start ecosystem_ssl.config.js
- 확인 : https://서버IP   or https://서버DNS 
- pm2는 root로 기동 ( sudo su ) 
- 일반 사용자 기동시 문제발행  ( Error: bind EACCES null:443 )
https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/#allow-pm2-to-bind-applications-on-ports-80-443-without-root

1) authbind설치 ( 80번 포트 혹은 443포트 )
sudo apt-get install authbind
sudo touch /etc/authbind/byport/443
sudo chown %user% /etc/authbind/byport/443
( 예시 : sudo chown ubuntu /etc/authbind/byport/443 )
sudo chmod 755 /etc/authbind/byport/443

2) 별칭설정 
~/.bashrc
아래 한줄 끝에 추가 
+alias pm2='authbind --deep pm2'

3) 명령어갱신 
authbind --deep pm2 update

- SSL 읽기 오류 
https://localcoder.org/lets-encrypt-ssl-couldnt-start-by-error-eacces-permission-denied-open-et 
(가장쉬운방법)
$ sudo chmod +x /etc/letsencrypt/live
$ sudo chmod +x /etc/letsencrypt/archive

*/ 

let totalConnectCnt = 0;  // 서버 접속 횟수 
 
const express = require('express');     // 익스프레스 
const app   = express();                
const PORT = process.env.PORT = 443;   // 개방포트 
const fs = require('fs');               // 파일처리 (인증서읽기)
const httpsConnect = require('https');  // 보안접속 
const httpConnect = require('http');    // 일반접속 (not 보안)

const cors = require('cors');           // 자원공유설정 

// ============================================== F15. 인증서설정    ==============================================
const privateKey = fs.readFileSync('/etc/letsencrypt/live/sanw.soystudy.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sanw.soystudy.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sanw.soystudy.com/chain.pem', 'utf8');
 

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// F16. 공유자원설정 
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
  
app.options('*',cors(corsOptions));
app.use(cors(corsOptions));
app.use(cors({origin : "https://www.soystudy.com"}));
// app.use(cors({origin : "https://adm.soystudy.com"}));


  
// 라이브러리 유틸 
require('date-utils');                  // 일자/시간 유틸리티 

// ejs 파일을 오픈 
app.set('view engine', 'ejs');
app.use(express.static('public'));

// 홈접속 기본 
function connectHome(req, res, actVal) {
    // 접속시간 정보 설정 a
    let todayDate = new Date(); 
    let currTime = todayDate.toFormat('YYYY-MM-DD HH24:MI:SS');
    let tbidVal = "S10020"; 
    let titleVal = "산운초등학교 문제은행 접속홈"
    let versionVal  = "v1.2"; 
    let backColor   = "#012e5c"; 

    // 접속횟수 추가 
    totalConnectCnt++; 

    // 렌더링 
    res.render("home", {
        title: titleVal,
        ctime: currTime,
        totalcnt : totalConnectCnt,
        tbid:tbidVal,
        version : versionVal,
        bgcolor: backColor,
        actcode: actVal
    });
  
    console.log("Connected! V1.6 WebPage HOME Time=" + currTime + " / Count=" + totalConnectCnt + " / actcode=" + actVal); 
}; 



// 홈접속 Pilot
function connectHomeTest(req, res, actVal) {
    // 접속시간 정보 설정 a
    let todayDate = new Date(); 
    let currTime  = todayDate.toFormat('YYYY-MM-DD HH24:MI:SS');
    let tbidVal     = "S10010"; 
    let titleVal    = " >> 소이초등학교 문제은행 접속홈 <<"
    let versionVal  = "V0.9"; 
    let backColor   = "#f340bd";
     
    // 접속횟수 추가 
    totalConnectCnt++; 

    // 렌더링 
    res.render("home", {
        title: titleVal,
        ctime: currTime,
        totalcnt : totalConnectCnt,
        tbid:tbidVal,
        version : versionVal,
        bgcolor: backColor,
        actcode: actVal
    });
  
    console.log("H2 Connected! V1.6 WebPage HOME Time=" + currTime + " / Count=" + totalConnectCnt + " / actcode=" + actVal); 
}; 
 
// ps.1-1 시작 페이지  
app.get('/', (req, res) => {

    let actVal = ""; 
    
    if( req.secure === false ){
        // 보안접속이 아닐 경우에 리다이렉트 
        let moveURL = "https://" + req.headers.host;
        // console.log("C1-A http To moveURL=" + moveURL);
        return res.redirect(moveURL);
    }
    else {
        connectHome(req, res, actVal); 
        // console.log("C1-B https host=" + req.headers.host);
    };
 
});
 

// ps.1-1 test 시작 페이지  
app.get('/test', (req, res) => {

    let actVal = ""; 
    
    if( req.secure === false ){
        // 보안접속이 아닐 경우에 리다이렉트 
        let moveURL = "https://" + req.headers.host;
        // console.log("C1-A http To moveURL=" + moveURL);
        return res.redirect(moveURL);
    }
    else {
        connectHomeTest(req, res, actVal); 
        // console.log("C1-B https host=" + req.headers.host);
    };
 
});


// ps.1-2 로그아웃 페이지 ( actcode에 logout 이 올 경우 로그아웃 진행 )
app.get('/:actcode', (req, res) => {

    let actVal = req.params.actcode; 

    if( req.secure === false ){
        // 보안접속이 아닐 경우에 리다이렉트 
        let moveURL = "https://" + req.headers.host;
        // console.log("D1-A http To moveURL=" + moveURL);
        return res.redirect(moveURL);
    }
    else {
        connectHome(req, res, actVal); 
        // console.log("D1-B https host=" + req.headers.host);
    };
 
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
	 console.log('Sanw V1.1  HTTPS Server running on port 443');
});

// 일반서버 접속 
const httpServer = httpConnect.createServer(app);
 
httpServer.listen(80, () => {
	 console.log('Sanw V1.1 HTTP Server running on port 80');
});


