console.log("S-110 mainscript V1.0");  
 
let imgBtn = document.getElementById("imgLoadBtn");  // 이미지로드버튼 

// F20. 이미지버튼 이벤트 대기 
imgBtn.addEventListener("click", function() { 
    loadImage(); // 이미지 로딩 호출 
});  

// F30. 이미지주소에 해당하는 이미지 채우기 
function loadImage() {
    // 이미지입력상자의 값을 확인 
    let imgURL = document.getElementById("imgUrlInput").value;

    // 이미지 주소가 채워졌는지 여부 확인 
    if ( imgURL !== undefined && imgURL.length > 0 ) {
        // 이미지박스 채우기 
        console.log("L2-A imgURL=" + imgURL); 
        document.getElementById("imgBox").src = imgURL; 
    }
    else {
        console.log("L2. No Image URL"); 
    }; 
         
}; 


