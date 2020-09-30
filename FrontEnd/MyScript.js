$(document).ready(function() {
    window.sessionStorage;
    if (sessionStorage.getItem("Auth") == "Ok") {
        alert("You are already Logged In");
        location.href = "Home.html";
    } else {

    }

    var split;
    var url = "https://localhost:44390/api/";

    $("#btnLogin").click(function() {
        validation();
    });


    function validation() {

        var email = $("#uname").val();

        var password = $("#password").val();
        $.ajax({
            type: 'GET',
            url: "https://localhost:44390/api/Authentication",
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + btoa(email + ':' + password)
            },
            success: function(data) {
                var flag = 0;


                for (let i = 0; i < data.length; i++) {

                    if (data[i].Email == email && data[i].Status != "Inactive") {
                        var utype = data[i].Type;
                        var id = data[i].Id;
                        var name = data[i].Name;

                        break;

                    } else if (data[i].Email == email && data[i].Status == "Inactive") {
                        flag = 1;
                        break;
                    }
                };
                if (flag == 1) {
                    alert("You are Banned");
                    location.href = "Login.html"
                }
                if (utype == "Admin") {
                    sessionStorage.setItem("Auth", "Ok");
                    sessionStorage.setItem("Token", btoa(email + ':' + password));
                    sessionStorage.setItem("href", "Home.html");
                    sessionStorage.setItem("Type", utype);
                    sessionStorage.setItem("Id", id);
                    sessionStorage.setItem("Name", name);
                    sessionStorage.setItem("Email", email);
                    location.href = "index.html";

                } else if (utype == "Teacher") {
                    sessionStorage.setItem("Auth", "Ok");
                    sessionStorage.setItem("Token", btoa(email + ':' + password));
                    sessionStorage.setItem("href", "Home.html");
                    sessionStorage.setItem("Type", utype);
                    sessionStorage.setItem("Id", id);
                    sessionStorage.setItem("Name", name);
                    sessionStorage.setItem("Email", email);
                    location.href = "Home.html";
                    alert(sessionStorage.getItem("Type"));

                } else {
                    sessionStorage.setItem("Auth", "Ok");
                    sessionStorage.setItem("Token", btoa(email + ':' + password));
                    sessionStorage.setItem("href", "Home.html");
                    sessionStorage.setItem("Type", utype);
                    sessionStorage.setItem("Id", id);
                    sessionStorage.setItem("Name", name);
                    sessionStorage.setItem("Email", email);
                    location.href = "Home.html";
                }

            },
            error: function(data) {
                alert("Unauthorized");
                location.href = "Home.html";

            }
        });
    }


});