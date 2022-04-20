﻿# node Test simple 
# ndexe v1.4 

1. 개요 
- 기능 :  클라우드서버 구성 테스트  

2. 참여자  
- 작성자 : C.W.Jung ( cwjung123@gmail.com )

3. 설치 및 환경 (as ubuntu) 

- AWS EC2 micro freetier 설치   

- 서버최신화   

  sudo apt-get update

- 노드 V14. 설치

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -  

sudo apt-get install yarn  

sudo apt-get install -y nodejs  

- 익스프레스 설치
sudo npm install -g express
 
 - 프로세스 관리도구 PM2설치 
sudo npm install pm2 -g
 
- 설치확인
 nodejs -v    > v14.15.3  --> v14.16.0 (2021. 03. 25 )  

 
4. 소스복제 
- 홈디렉토리 이동 (as ubuntu)
cd ~
- git 클론   
  sudo git clone https://github.com/GaussJung/ndexe 

- 라이브러리 설치 
cd ~/ndexe
sudo npm install   
 
5. 기본 접속 
  cd ~/ndexe

6. 기동      
  1) 개발모드  : 아래중 한가지    
  sudo node server.js ( 80번 포트 )   
  sudo node server3000.js ( 3000번 포트 )   
  sudo node sslserver.js  ( SSL적용 )   

  2) 운영모드  : 아래중 한가지 
  - 기본80접속  
  sudo pm2 start ecosystem.config.js   
  - 3000번포트 접속     
  sudo pm2 start ecosystem_3000.config.js   
  - SSL접속     
  sudo pm2 start ecosystem_ssl.config.js   

  ※ PM2기본 설정파일 :  ecosystem.config.js   

7. 종료 ( 기동중인 모든 Node종료 )         
  sudo killall node     
   
# 환경설정에 따른 기동 정지 
https://pm2.keymetrics.io/docs/usage/application-declaration/

- Start all applications  
sudo pm2 start ecosystem.config.js  

- Stop all  
sudo pm2 stop ecosystem.config.js

- Restart all   
sudo pm2 restart ecosystem.config.js

- Reload all  
sudo pm2 reload ecosystem.config.js

- Delete all  
sudo pm2 delete ecosystem.config.js 

- 로그보기
sudo pm2 logs 서비스명  
( ex : sudo pm2 logs ndmulti )

6. 동작확인   
http://도메인  or http://IP 
  