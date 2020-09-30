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
                    if (data[i].Type == "Student" && data[i].Status == "Active") {

                        let tr = document.createElement("tr");

                        let tdName = document.createElement("td");
                        tdName.innerText = data[i].Name;
                        let name = data[i].Name;

                        let tEmail = document.createElement("td");
                        tEmail.innerText = data[i].Email;
                        let email = data[i].Email;

                        let tdStatus = document.createElement("td");
                        tdStatus.innerText = data[i].Status;
                        let type = data[i].Type;
                        let password = data[i].Password;

                        let btnBan = document.createElement("button");
                        btnBan.classList.add("btn", "btn-primary");
                        btnBan.Type = "button";
                        //btnBan.id = "ban";
                        btnBan.innerText = "Ban";
                        let id = data[i].Id;
                        btnBan.onclick = function() { Ban(name, email, password, type, id) };
                        // if(btnBan.innerText=="Ban")
                        // {
                        // 	btnBan.innerText = "UnBan";
                        // }
                        // else
                        // {
                        // 	btnBan.innerText="Ban";
                        // } 


                        let btnEdit = document.createElement("button");
                        btnEdit.classList.add("btn", "btn-primary");
                        btnEdit.Type = "button";
                        btnEdit.innerText = "Edit";
                        btnEdit.onclick = function() { // (name,email,password,type,id)

                            location.href = "userEdit.html?/" + id + "";
                        };


                        table.appendChild(tbody);
                        tbody.appendChild(tr);
                        tr.appendChild(tdName);
                        tr.appendChild(tEmail);
                        tr.appendChild(tdStatus);
                        tr.appendChild(btnBan);
                        tr.appendChild(btnEdit);


                    }
                }
            },
            error: function(data) {
                alert("Something Went Wrong");
            }
        });

    }

    function Ban(name, email, password, type, id) {
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
                Status: "Inactive",
                Type: type
            },

            success: function(data) {
                alert("User Banned");
                location.href = "BannedStudentList.html";
            },
            error: function(data) {
                alert("Something Went Wrong");
            }
        });

    }


});