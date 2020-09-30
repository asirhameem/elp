$(document).ready(function() {

    window.sessionStorage;
    if (sessionStorage.getItem("Auth") != "Ok") {
        alert("Please Login to Continue");
        location.href = "Login.html";
    } else {

    }

    url = window.location.href;

    var id = url.substring(url.lastIndexOf('/') + 1);


    $("#upload_btn").click(function() {
        UploadAssignment();
        CreateAssignmentinDB();
    });

    $("#video_btn").click(function() {
        UploadVideo();
        CreateVideoDB();
    });

    function UploadAssignment() {

        var data = new FormData();
        var file = $("#uploadfile").get(0).files;

        if (file.length > 0) {
            data.append("UploadFile", file[0]);
            data.append("File_Name", $("#fileName").val());
            data.append("File_Path", $("#uploadfile").val());
        }

        var xhr = new XMLHttpRequest();
        (xhr.upload || xhr).addEventListener('progress', function(e) {
            var done = e.position || e.loaded
            var total = e.totalSize || e.total;
            console.log('xhr progress: ' + Math.round(done / total * 100) + '%');
        });

        xhr.addEventListener('load', function(e) {
            console.log('xhr upload complete', e, this.responseText);
        });

        xhr.open('post', "https://localhost:44390/api/Content/Save", true);
        xhr.send(data);

    }



    // let f = .split("\");


    function CreateAssignmentinDB() {

        $.ajax({
            url: "https://localhost:44390/api/Content",
            method: "post",
            headers: {
                contentType: "application/json"
            },
            data: {
                Course_Id: id,

                File_Name: $("#fileName").val()
                    //File_Path: fileName

            },
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 201) {
                    // $("#uploadmessage").html("File Uploaded!");
                    alert("File Uploaded");
                } else {
                    // $("#uploadmessage").html("Error");

                    alert("File Uploaded");

                    console.log(xmlHttp.status + ":" + xmlHttp.statusText);
                }
            }
        });
    }

    // Video fil file 

    function UploadVideo() {

        var data = new FormData();
        var file = $("#videoFile").get(0).files;

        if (file.length > 0) {
            data.append("videoFile", file[0]);
            data.append("Video_Name", $("#videoName").val());
            data.append("Video_Path", $("#videoFile").val());
        }

        var xhr = new XMLHttpRequest();
        (xhr.upload || xhr).addEventListener('progress', function(e) {
            var done = e.position || e.loaded
            var total = e.totalSize || e.total;
            console.log('xhr progress: ' + Math.round(done / total * 100) + '%');
        });

        xhr.addEventListener('load', function(e) {
            console.log('xhr upload complete', e, this.responseText);
        });

        xhr.open('post', "https://localhost:44390/api/Video/Save", true);
        xhr.send(data);

    }



    // let f = .split("\");


    function CreateVideoDB() {

        $.ajax({
            url: "https://localhost:44390/api/Video",
            method: "post",
            headers: {
                contentType: "application/json"
            },
            data: {
                Course_Id: id,

                Video_Name: $("#videoName").val()
                    //File_Path: fileName

            },
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 201) {
                    // $("#uploadmessage").html("File Uploaded!");
                    alert("Video Uploaded");
                } else {
                    // $("#uploadmessage").html("Error");

                    alert("Video Uploaded");

                    console.log(xmlHttp.status + ":" + xmlHttp.statusText);
                }
            }
        });
    }

});