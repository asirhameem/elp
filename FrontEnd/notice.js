$(document).ready(function() {

    url = window.location.href;

    var id = url.substring(url.lastIndexOf('/') + 1);


    GetAllEnrolledStudents(id);

    $("#btnNotice").click(function() {

        CreateNotice(id);
    });

    function CreateNotice(id) {
        $.ajax({
            url: "https://localhost:44390/api/Notice",
            method: "post",
            headers: {
                contentType: "application/json"
            },
            data: {
                // Course_Id: 3,

                // File_Name: 
                //File_Path: fileName
                Notice_Details: $("#postDescription").val(),
                Course_Id: id

            },
            complete: function(xmlHttp, status) {
                if (xmlHttp.status == 201) {
                    alert("Notice Uploaded");
                } else {
                    alert("Can not Uploade");
                    console.log(xmlHttp.status + ":" + xmlHttp.statusText);
                }
            }
        });
    }


    function GetAllEnrolledStudents(id) {
        $.ajax({
            type: 'GET',
            url: "https://localhost:44390/api/Enroll/All/" + id,
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token")
            },
            success: function(data) {
                let table = document.getElementById("StudentList");
                for (var i = 0; i < data.length; i++) {

                    let tb = document.createElement("tbody");

                    let tr = document.createElement("tr");

                    let td = document.createElement("td");


                    let tdSid = document.createElement("td");
                    tdSid.innerText = data[i].Student_Id;

                    let tdSemail = document.createElement("td");
                    tdSemail.innerText = data[i].Student_Email;

                    let tdStatus = document.createElement("td");
                    tdStatus.innerText = data[i].Status;


                    table.appendChild(tb);
                    tb.appendChild(tr);
                    tr.appendChild(tdSid);
                    tr.appendChild(tdSemail);
                    tr.appendChild(tdStatus);
                }

            },
            error: function(data) {
                //alert("Unauthorized");
                location.href = "Home.html";
            }
        });
    }


});