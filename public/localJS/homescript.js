console.log("S-110 homescript V1.2");  
  
$(function() { 
  

    // S1. 사용자 확인 
    function checkValidUser() { 

        let tmpPwd; 
 
        let targetURL = "https://adm2.soystudy.com/comm/auth/authKeyHandler.jsp";  
 
        $.ajax({
            url: targetURL,
            type:'post',
            dataType: 'json',
            cache: false,
            async: true,
            data: {
                chcode:'getTempPwd'
            },
            success: function(fdata) {

                if ( fdata.cupd === true ) {
                    
                    tmpPwd = fdata.tmpPwd; 

                    let inPwd =  prompt("비밀번호를 입력해 주세요!","정보입력"); 

                    if ( inPWd === tmpPwd ) {
                        sessionStorage.setItem("tempAuthValid","PASS"); 
                        $(".viewBoxWrap").show(); 
                    }
                    else {
                        sessionStorage.removeItem("tempAuthValid"); 
                        alert("비밀번호가 일치하지 않습니다!");
                        location.reload();  
                    }; 

                }
                else {
                    alert("접속불가 합니다! 관리자에게 문의바랍니다.");
                    location.reload();  
                };
            },
            error: function(xhr, errorString, exception) {   // 에러시에 출력
                // console.log(xhr.responseText);
                // console.log("xhr.status = " + xhr.status+" / errorString = " + errorString+" / exception = " + exception);
            }
    
        });  
        // EOF T1-B 
 
    }; 




    // S2. 초기환경 
    function initEnvSet() { 

        $(".viewBoxWrap").hide(); 


        if ( (typeof sessionStorage.getItem("tempAuthValid") ) !== 'undefined' && sessionStorage.getItem("tempAuthValid") !== null ) {
            // 인증완료상태  
        }
        else {
            checkValidUser(); 
        }; 
    }; 

    // 초기접속환경 확인 
    initEnvSet(); 
 

    // P2-1. 홈접속
    function connectTestBank (tbmcd) {


        console.log("TB1 tbid=" + tbmcd); 

        // 키접속 및 이동주소 
        let targetURL = "https://www.soystudy.com/comm/auth/authKeyHandler.jsp";  

        let moveURL = "https://www.soystudy.com/comm/auth/homeTransfer.jsp";  

        // T1-B. 코드 확인후에 접속 주소받아서 이동 
        $.ajax({
            url: targetURL,
            type:'post',
            dataType: 'json',
            cache: false,
            async: true,
            data: {
                chcode:'getAdmHomeKey',
                mcd:tbmcd
            },
            success: function(fdata) {

                if ( fdata.cupd === true ) {
                    
                    moveURL += "?tmcd=" + fdata.outkey;

                    // console.log("TB1 outkey=" + fdata.outkey); 

                    window.location.href = moveURL;
                }
                else {
                    alert("ER-211. 문제은행 계정접속에 실패하였습니다!"); 
                };
            },
            error: function(xhr, errorString, exception) {   // 에러시에 출력
                // console.log(xhr.responseText);
                // console.log("xhr.status = " + xhr.status+" / errorString = " + errorString+" / exception = " + exception);
            }
    
        });  
        // EOF T1-B 
         
    }; 
    
    // P2. 페이지이동 
    $(".tbSubClass").bind("click", function(event, ui) { 
        
        let tbmcd = $(this).attr("id"); 

        if ( tbmcd === undefined || tbmcd  === null ) {
            alert("ER-210 No tbmcd"); 
            return false; 
        }
        else {
            // console.log("TM3-B tbmcd=" + tbmcd); 
            connectTestBank (tbmcd); 
        }; 
    }); 

});  

