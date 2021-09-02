console.log("S-110 mainscript V1.0");  
 
alert("TM Init 1.0"); 

$(function() { 
	 
    // P1. 테스트 
    $("#btnTest").bind("click", function(event, ui) { 
          alert("TM2 clickTest"); 
    }); 

    // P2. 페이지이동 
    $(".tbSubClass").bind("click", function(event, ui) { 
        
        let tbmcd = $(this).attr("id"); 

        console.log("TM3 tbmcd=" + tbmcd); 

    }); 

});  

