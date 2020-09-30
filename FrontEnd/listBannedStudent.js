$(document).ready(function() {
    window.sessionStorage;
    if (sessionStorage.getItem("Auth") != "Ok") {
        alert("Please Login to Continue");
        location.href = "Login.html";
    } else {

    }
    LoadStudentList();

    function LoadStudentList() {
        $.ajax({
            type: 'GET',
            url: "https://localhost:44390/api/Admin",
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token"),
            },
            success: function(data) {

                let table = document.getElementById("dataTable");
                let tbody = document.createElement("tbody");

                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status == "Inactive") {

                        let tr = document.createElement("tr");

                        let tdName = document.createElement("td");
                        tdName.innerText = data[i].Name;
                        let name = data[i].Name;

                        let tEmail = document.createElement("td");
                        tEmail.innerText = data[i].Email;
                        let email = data[i].Email;

                        let tdType = document.createElement("td");
                        tdType.innerText = data[i].Type;

                        let tdStatus = document.createElement("td");
                        tdStatus.innerText = data[i].Status;
                        let type = data[i].Type;
                        let password = data[i].Password;

                        let btnBan = document.createElement("button");
                        btnBan.classList.add("btn", "btn-primary");
                        btnBan.Type = "button";
                        //btnBan.id = "ban";
                        btnBan.innerText = "Unban";
                        let id = data[i].Id;
                        btnBan.onclick = function() { Unban(name, email, password, type, id) };

                        table.appendChild(tbody);
                        tbody.appendChild(tr);
                        tr.appendChild(tdName);
                        tr.appendChild(tEmail);
                        tr.appendChild(tdType);
                        tr.appendChild(tdStatus);
                        tr.appendChild(btnBan);

                    }
                }
            },
            error: function(data) {
                alert("Something Went Wrong");
            }
        });

    }

    function Unban(name, email, password, type, id) {
        $.ajax({
            type: 'PUT',
            url: "https://localhost:44390/api/Admin/" + id,
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token"),
            },
            data: {
                Name: name,
                Email: email,
                Password: password,
                Status: "Active",
                Type: type
            },

            success: function(data) {
                if (type == "Student") {
                    alert("Student Unbanned");
                    location.href = "StudentList.html";
                } else if (type == "Instructor") {
                    alert("Instructor Unbanned");
                    location.href = "InstructorList.html";
                }
            },
            error: function(data) {
                alert("Something Went Wrong");
            }
        });

    }


});