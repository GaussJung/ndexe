# Node Basic App
# ndexe v2.89

1. 개요 
- 기능 :  클라우드서버 구성 테스트  

2. 참여자  
- 작성자 : C.W.Jung ( cwjung123@gmail.com )

3. 설치 및 환경 (as ubuntu) 

- AWS EC2 micro freetier 설치   

- 서버최신화   

  sudo apt-get update

- 노드 V14. 설치 방법

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -  

sudo apt-get install -y yarn   (자바스크립트 패키지 관리자)

sudo apt-get install -y nodejs  

- 익스프레스 설치
sudo npm install -g express
 
- 프로세스 관리도구 PM2설치 
sudo npm install pm2 -g
 
- 설치확인
 node -v    
v14.21.3 (2023. 04. 21)  

 
4. 소스복제 
- 홈디렉토리 이동 (as ubuntu)
cd ~
- git 클론 (as ubnutu)
git clone https://github.com/GaussJung/ndexe 

- 라이브러리 설치     
cd ~/ndexe    
npm install      
 
5. 기본 접속 
  cd ~/ndexe

6. 기동      
    A. 개발모드  : 아래중 한가지    
      sudo node server.js ( 80번 포트 )   
      sudo node server3000.js ( 3000번 포트 )   
      sudo node server8000.js ( 3000번 포트 )   
      sudo node sslserver.js  ( SSL적용 )   

    B. 운영모드  : 아래중 한가지 
    - 기본80 접속  
      sudo pm2 start ecosystem.config.js   
    - 3000번포트 접속     
      sudo pm2 start ecosystem_3000.config.js   
    - 8000번포트 접속     
      sudo pm2 start ecosystem_8000.config.js 
    - SSL접속 (인증서있는 경우)   
      sudo pm2 start ecosystem_ssl.config.js   

    ※ PM2기본 설정파일 :  ecosystem.config.js   
    ※ 두개의 포트를 돌릴수 있음. (명령어 2회)   

7. 동작확인     
http://도메인  or http://IP 
https://도메인 ( SSL접속 )

8. PM2 환경설정 명령어 
https://pm2.keymetrics.io/docs/usage/application-declaration/

- 전체 명령어    
sudo pm2 start ecosystem.config.js      
sudo pm2 stop ecosystem.config.js   
sudo pm2 restart ecosystem.config.js  
sudo pm2 reload ecosystem.config.js 
sudo pm2 delete ecosystem.config.js   

9. 상태보기 : sudo pm2 status 

10. ID별 명령어 (Status상의 Name myservice3000 가정 )
sudo pm2 start myservice3000   
sudo pm2 stop myservice3000    (pm2 status에서 출력됨 )
sudo pm2 delete myservice3000  (pm2 status에서 제외됨 )
sudo pm2 reload myservice3000   
 
11.  로그보기
(전체로그) sudo pm2 logs    
(특정서비스로그) sudo pm2 logs 서비스명     
( ex : sudo pm2 logs ndmulti )    

12. 간단한 설정 예시 (3000번 + 8000번 포트 서비스 확인 )
sudo pm2 start ecosystem_3000.config.js 
sudo pm2 start ecosystem_8000.config.js 

- 접속 확인 
  http://111.120.100.222:3000 
  http://111.120.100.222:8000 

------- 아래는 추가로 운영상 필요시 --------- 
13. 자동부팅 ( 80포트 + 3000번포트 )
: as ubuntu 
sudo pm2 start ecosystem.config.js 
sudo pm2 start ecosystem_3000.config.js 
 
pm2 startup     
(출력되는 문구 확인후 붙여넣음 - root로 실행시 자동진행 )   
ex : sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

sudo pm2 save
sudo reboot -i 
재부팅후에 서비스 바로 올라오는지 확인  ( sudo reboot -i)

14. 자동부팅 해제 
pm2 unstartup systemd
 