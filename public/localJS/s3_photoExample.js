console.log("S3-picture V2.19");  

// Amazon Cognito 인증 공급자 초기화 
var albumBucketName = "album.nuriblock.com";  // 버킷명 
var bucketRegion = "ap-northeast-2";  // 리전명 
var IdentityPoolId = "ap-northeast-2:2416fa55-2cb2-49fd-abf6-93d7c6a84a22"; // Cognito증명풀Id 

// S3구성 설정 
AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

// S3객체 전역선언 
var s3Obj = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName }
});

// LA. 앨범목록 리스트업 
function listAlbums() {

    // T1. S3객체 리스트업 
    s3Obj.listObjects({ Delimiter: "/" }, function(err, data) {

        // if T1-1. 리스트확인  
        if (err) {
            // T1-1A. 오류 
            return alert("There was an error listing your albums: " + err.message);
        }
        else {
            // T1-1B. 정상적으로 S3내의 객체 호출이 진행됨. 
            let albums = data.CommonPrefixes.map(function(commonPrefix) {

                let prefix = commonPrefix.Prefix;
                let albumName = decodeURIComponent(prefix.replace("/", ""));

                return getHtml([
                  "<li>",
                      "<span onclick=\"deleteAlbum('" + albumName + "')\">X</span>",
                      "<span onclick=\"viewAlbum('" + albumName + "')\">",
                      albumName,
                      "</span>",
                  "</li>"
                ]);

            });

            // 앨범보기 메시지 
            let message = albums.length
              ? getHtml([
                "<p>Click on an album name to view it.</p>",
                "<p>Click on the X to delete the album.</p>"
              ])
              : "<p>You do not have any albums. Please Create album.";

            // 템플릿 출력 
            let htmlTemplate = [
              "<h2>Albums</h2>",
                message,
              "<ul>",
              getHtml(albums),
              "</ul>",
              "<button onclick=\"createAlbum(prompt('Enter Album Name:'))\">",
              "Create New Album",
              "</button>"
            ];

            // "app" DOM에 html생성 
            document.getElementById("app").innerHTML = getHtml(htmlTemplate);

        }; 
        // EOF T1-1 
    });
    // EOF T1  
};
// EOF LA(listAlbums) 


// CA. 앨범만들기 
function createAlbum(albumParamName) {

    // 앨범명칭에서 공백제거 
    let albumName = albumParamName.trim();

    // 앨범명칭이 필히 입력되어야 함.  
    if (!albumName) {
        return alert("Album names must contain at least one non-space character.");
    };

    // 앨범명에서 슬래시 불가 
    if (albumName.indexOf("/") !== -1) {
        return alert("Album names cannot contain slashes.");
    }; 

    // 앨범키 인코딩 
    let albumKey = encodeURIComponent(albumName);

    // CA2. 객체헤더정보 확인 
    s3Obj.headObject({ Key: albumKey }, function(err, data) {

        // 오류발생시 종료 
        if (!err) {
            return alert("Album already exists.");
        }; 

        // 기타오류 발생 
        if (err.code !== "NotFound") {
            return alert("There was an error creating your album: " + err.message);
        }; 

        // CA2-1. S3객체 등록 
        s3Obj.putObject({ Key: albumKey }, function(err, data) {

            if (err) {
                return alert("There was an error creating your album: " + err.message);
            }
            else {
                alert("Successfully created album.");
                // 앨범생성후에 화면내에 앨범 출력 
                viewAlbum(albumName);
            }; 
 
         });
         // EOF CA2-1. 

    });
    // EOF CA2. 
}; 
// EOF CA ( createAlbum  ) 


// VA 앨범내용 보기 
function viewAlbum(albumParamName) {
 
    let albumName = albumParamName.trim();
    let albumPhotosKey = encodeURIComponent(albumName) + "/";
 
    // START of LO1. 객체목록 리스트업  
    s3Obj.listObjects({ Prefix: albumPhotosKey }, function(err, data) {

        if (err) {
            return alert("There was an error viewing your album: " + err.message);
        }; 

        // 'this' references the AWS.Response instance that represents the response
        let href = this.request.httpRequest.endpoint.href;
        let bucketUrl = href + albumBucketName + "/";
        
        // 사진출력 
        let photos = data.Contents.map(function(photo) {

            let photoKey = photo.Key;
            let photoUrl = bucketUrl + encodeURIComponent(photoKey);
            
            return getHtml([
                "<span>",
                    "<div>",
                        '<img style="width:512px;height:auto;" src="' + photoUrl + '"/>',
                    "</div>",
                    "<div>",
                      "<span onclick=\"deletePhoto('" +
                        albumName +
                      "','" +
                      photoKey +
                      "')\">",
                      "X",
                      "</span>",
                      "<span>",
                      photoKey.replace(albumPhotosKey, ""),
                      "</span>",
                  "</div>",
                "</span>"
            ]);

        });
        // EOF photos

        let message = photos.length
          ? "<p>Click on the X to delete the photo</p>"
          : "<p>You do not have any photos in this album. Please add photos.</p>";

        let htmlTemplate = [
          "<h2>",
              "Album: " + albumName,
          "</h2>",
          message,
          "<div>",
              getHtml(photos),
          "</div>",
          '<input id="photoupload" type="file" accept="image/*">',
          '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
            "Add Photo",
          "</button>",
          '<button onclick="listAlbums()">',
              "Back To Albums",
          "</button>"
          ];

        // 보기내용 채움 
        document.getElementById("app").innerHTML = getHtml(htmlTemplate);

    });
    // EOF LO1 
}; 
// EOF VA (viewAlbum) 


// AP. 사진추가 
function addPhoto(albumParamName) {
    // 앨범명칭 트리밍 
    let albumName = albumParamName.trim();
    // 업로드대상파일 
    let files = document.getElementById("photoupload").files;

    if (!files.length) {
        return alert("Please choose a file to upload first.");
    }; 

    let file = files[0];   // 파일객체 
    let fileName = file.name; // 파일명칭 
    let albumPhotosKey = encodeURIComponent(albumName) + "/";  // 앨범사진키값 

    let photoKey = albumPhotosKey + fileName;  // 사진키값 

    // 멀티파트업로드 진행 ( Use S3 ManagedUpload class as it supports multipart uploads ) 
    let uploadToS3 = new AWS.S3.ManagedUpload({
        params: {
          Bucket: albumBucketName,
          Key: photoKey,
          Body: file
        }
    });

    // 사진업로드 프라미스 
    let uploadPromise = uploadToS3.promise();

    uploadPromise.then(
        function(data) {
            alert("Successfully uploaded photo.");
            // 정상사진 업로드 완료 
            viewAlbum(albumName);
        },
        function(err) {
            // 업로드 오류 
            return alert("There was an error uploading your photo: ", err.message);
        }
    );
};
// EOF AP (addPhoto) 


// DP. 사진삭제 
function deletePhoto(albumParamName, photoKey) {

    // 앨범명칭 트리밍 
    let albumName = albumParamName.trim();

    // START of DO 
    s3Obj.deleteObject({ Key: photoKey }, function(err, data) {
        // if D1. 
        if (err) {
            return alert("There was an error deleting your photo: ", err.message);
        }
        else {
            // 사진정상 삭제후에 앨범보기 
            alert("Successfully deleted photo.");
            viewAlbum(albumName);
        };
        // EOF D1. 

    });
    // EOF DO 

}; 
// EOF DP(deletePhoto)


// DA. 앨범삭제 
function deleteAlbum(albumParamName) {
 
    // 앨범명칭 트리밍 
    let albumName = albumParamName.trim();

    let albumKey = encodeURIComponent(albumName) + "/";

    // L0. 목록리스트 
    s3Obj.listObjects({ Prefix: albumKey }, function(err, data) {

        if (err) {
            return alert("There was an error deleting your album: ", err.message);
        }; 
 
        let s3Objects = data.Contents.map(function(object) {
            return { Key: object.Key };
        });

        // START of D0 
        s3Obj.deleteObjects(
            {
              Delete: { Objects: s3Objects, Quiet: true }
            },
            function(err, data) {
                // if D1. 
                if (err) {
                    return alert("There was an error deleting your album: ", err.message);
                }
                else {
                    // 정상호출 
                  alert("Successfully deleted album.");
                  listAlbums();
                }; 
                // EOF D1. 
            }
        );
        // EOF Do 
    });
    // EOF L0. 
};
// EOF DA (deleteAlbum)