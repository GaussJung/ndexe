console.log("S-110 mainscript V1.1");  
 
const loadButton = document.getElementById("imgLoadBtn");
 
// F10. 저장 주소확인 
function checkImageURL() { 
 
    // 자동로그인 확인 
    if ( (typeof localStorage.getItem("imageBoxURL") ) !== 'undefined' && localStorage.getItem("imageBoxURL") !== null ) {
        let  initImageURL =  localStorage.getItem("imageBoxURL");
        document.getElementById("imgUrlInput").value = initImageURL;  // 입력상자 채우기 
        document.getElementById("imgBox").src = initImageURL;  // 이미지 박스 출력 
        console.log("L1-A Yes initial imageURL=" + initImageURL); 
    }
    else {
        console.log("L1-B No initial imageURL"); 
    };
    
};


// F20. 이미지 로더 버튼 대기 
loadButton.addEventListener("click", function() {
    loadImage(); // 이미지 로딩 호출 
});


// F30. 이미지주소에 해당하는 이미지 채우기 
function loadImage() {

    // 이미지입력상자의 값을 확인 
    let imgURL = document.getElementById("imgUrlInput").value;

    // 이미지 주소가 채워졌는지 여부 확인 
    if ( imgURL !== undefined && imgURL.length > 0 ) {
        // 이미지박스 채우기 
        console.log("L2-A Yes Input imageURL=" + imgURL); 
        localStorage.setItem("imageBoxURL", imgURL);
        document.getElementById("imgBox").src = imgURL; 
    }
    else {
        console.log("L2. No Input imageURL"); 
    }; 

}; 


