console.log("S-110 homescript V1.32");  
  
$(function() { 
   
    // S1. 사용자 확인 
    function checkValidUser() { 

        let tmpPwd; 
 
        let targetURL = "https://adm2.soystudy.com/comm/auth/authKeyHandler.jsp";  
        
        let idVal = $("#userId").val().trim(); 

        let inPwd = $("#pwd").val().trim(); 

        if ( idVal.length === 0 || inPwd.length === 0 ) {

            alert("사용자ID 혹은 비밀번호를 확인해 주세요!"); 

            return false; 
        }
        else {
            // 인증값을 확인하여 후속처리 

            $.ajax({
                url: targetURL,
                type:'post',
                dataType: 'json',
                cache: false,
                async: true,
                data: {
                    chcode:'getTempPwd',
                    id:idVal,
                    pwd:inPwd
                },
                success: function(fdata) {
    
                    if ( fdata.cupd === true ) {
                        $("#loginFormWrap").hide(); 
                        sessionStorage.setItem("tempAuthValid","PASS"); 
                        $(".viewBoxWrap").show(); 
   
                    }
                    else {
                        sessionStorage.removeItem("tempAuthValid"); 
                        alert("비밀번호가 일치하지 않습니다!");
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
 
    }; 




    // S2. 초기환경 
    function initEnvSet() { 
   
        $(".viewBoxWrap").hide(); 
        $("#loginFormWrap").hide(); 

        if ( (typeof sessionStorage.getItem("tempAuthValid") ) !== 'undefined' && sessionStorage.getItem("tempAuthValid") !== null ) {
            // 인증완료상태  
            $(".viewBoxWrap").show(); 
        }
        else {
            // 인증미완상태 
            $("#loginFormWrap").show(); 
          }; 
    }; 

    // 초기접속환경 확인 
    initEnvSet(); 
 

    // P2-1. 홈접속
    function connectTestBank (tbmcd) {
 
        // console.log("TB1 tbid=" + tbmcd); 

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


    // P3. 비밀번호 확인 진행 
    $("#btnLogin").bind("click", function(event, ui) { 
    
        checkValidUser(); 

    }); 

    // P4. 로그 아웃 
    $("#btnLogout").bind("click", function(event, ui) { 
    
        sessionStorage.removeItem("tempAuthValid"); 
        location.reload();  

    }); 

    

});  

