console.log("S-110 homescript V1.1");  
  
$(function() { 
 

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

                    alert("TB1 outkey=" + fdata.outkey + " / moveURL=" + moveURL); 

                    window.location.href = moveURL;
                }
                else {
                    alert("E200. 문제은행 계정접속에 실패하였습니다!"); 
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
            alert("ER-123 No tbmcd"); 
            return false; 
        }
        else {
            console.log("TM3-B tbmcd=" + tbmcd); 
            connectTestBank (tbmcd); 
        }; 
    }); 

});  

