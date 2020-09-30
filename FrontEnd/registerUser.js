$(document).ready(function() {
    window.sessionStorage;



    $("#btnCreate").click(function() {
        createUser();
    });

    $("#inputFirstName").keyup(function() {
            var firstName = $("#inputFirstName").val();
            if (firstName.length < 3) {
                $("#msg").html("please provide valid name");
            } else {
                $("#msg").html.html("");
            }
        }

    );

    // $("#inputLastName").keyup(function () {
    //         var lastName = $("#inputLastName").val();
    //         if (lastName.length < 3) {
    //             $("#msg").html("please provide valid name");
    //         } else {
    //             $("#nameValid").html("");
    //         }
    //     }

    // );


    $("#inputEmailAddress").keyup(function() {
            var email = $("#inputEmailAddress").val();
            if (email.indexOf("@") == -1 || email.lastIndexOf(".") == -1) {
                $("#msg").html("please provide valid email");
            } else {
                $("#msg").html.html("");
            }
        }

    );


    $("#inputPassword").keyup(function() {
            var pass = $("#inputPassword").val();
            if (pass.length < 8) {
                $("#msg").html("please provide atleast 8 character");
            } else {
                $("#msg").html("");
            }
        }

    );


    $("#inputConfirmPassword").keyup(function() {
            var pass = $("#inputPassword").val();
            var confPass = $("#inputConfirmPassword").val();
            if (confPass.length < 8 || confPass != pass) {
                $("#msg").html("Password is invalid");
            } else {
                $("#msg").html("");
            }
        }

    );

    function createUser() {
        $.ajax({
            url: "https://localhost:44390/api/Admin",
            method: "post",
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token"),
                contentType: "application/json"
            },
            data: {
                Name: $("#name").val(),
                Email: $("#email").val(),
                Password: $("#password").val(),
                Type: "Admin",
                Status: "Active"

            },

            success: function(data) {
                alert("User Added");
            },
            error: function(data) {
                alert("Something Went Wrong");
            }
        });
    };




});