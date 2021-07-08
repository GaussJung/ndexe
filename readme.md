# node Test simple 
# ndexe 

1. 개요 
- 기능 :  클라우드서버 구성 테스트  

2. 참여자  
- 작성자 : C.W.Jung ( cwjung123@gmail.com )

3. 설치 및 환경 (as ubuntu) 

- AWS EC2 micro freetier 설치   
- 서버 기본계정 ( ex : ubuntu ) 으로 설치진행시에 sudo 붙일것 (화면오류시 sudo 확인 )
- 서버최신화   
  sudo apt-get update

- 노드 V14. 설치

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -  

sudo apt-get install yarn  

sudo apt-get install -y nodejs  

- 익스프레스 설치
sudo npm install -g express
 
- 설치확인
 nodejs -v    > v14.15.3  --> v14.16.0 (2021. 03. 25 )  

- 백그라운드 기동 forever 설치

sudo npm install -g forever  


4. 소스복제 

- 기본디렉토리 생성 
- 최종 설치위치 : /svdata/work/ndexe   
  ( 비고 : 설치 디렉토리는 예시임.  기타 디렉토리 /home/ubuntu/ndexe 에 만들어도 됨 )  

sudo mkdir /svdata   

cd /svdata  

sudo mkdir work   ( 디렉토리가 없을 경우 )  

- 기본디렉토리 이동 ( /svdata/work )

- git 클론   

  git clone https://github.com/GaussJung/ndexe     

- 라이브러리 설치 

 sudo npm install   

- 기동   

  cd /svdata/work/ndexe   

5. 기본 접속 데모 

- 기동   

  sudo forever start server.js ( 영구동작 )  
  or 
  sudo npm start server.js ( ssh 접속중 동작, 로그 콘솔확인  )   
  or 
  sudo node server.js ( ssh 접속중 동작, 로그 콘솔확인 )   

6. 접속  

http://도메인:3000 or IP:3000/  
  