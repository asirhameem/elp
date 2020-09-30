$(document).ready(function() {

    $("#btnCreate").click(function() {
        createUser();
    });

    // $("#inputFirstName").keyup(function () {
    //         var firstName = $("#inputFirstName").val();
    //         if (firstName.length < 3) {
    //             $("#nameValid").html("please provide valid name");
    //         } else {
    //             $("#nameValid").html("");
    //         }
    //     }

    // );

    // $("#inputLastName").keyup(function () {
    //         var lastName = $("#inputLastName").val();
    //         if (lastName.length < 3) {
    //             $("#nameValid").html("please provide valid name");
    //         } else {
    //             $("#nameValid").html("");
    //         }
    //     }

    // );


    // $("#inputEmailAddress").keyup(function () {
    //         var email = $("#inputEmailAddress").val();
    //         if (email.indexOf("@") == -1 || email.lastIndexOf(".") == -1) {
    //             $("#emailValid").html("please provide valid email");
    //         } else {
    //             $("#emailValid").html("");
    //         }
    //     }

    // );


    // $("#inputPassword").keyup(function () {
    //         var pass = $("#inputPassword").val();
    //         if (pass.length < 8) {
    //             $("#passValid").html("please provide atleast 8 character");
    //         } else {
    //             $("#passValid").html("");
    //         }
    //     }

    // );


    // $("#inputConfirmPassword").keyup(function () {
    //         var pass = $("#inputPassword").val();
    //         var confPass = $("#inputConfirmPassword").val();
    //         if (confPass.length < 8 || confPass != pass) {
    //             $("#passValid").html("Password is invalid");
    //         } else {
    //             $("#passValid").html("");
    //         }
    //     }

    // );

    function createUser() {
        $.ajax({
            type: 'POST',
            url: "https://localhost:44390/api/Admin/",
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token"),
            },
            data: {
                Name: $("#name").val(),
                Email: $("#email").val(),
                Password: $("#password").val(),
                Type: "Instructor",
                Status: "Active"

            },

            success: function(data) {
                alert("Instructor Added");
                location.href = "InstructorList.html";
            },
            error: function(data) {
                alert("Something Went Wrong");
            }
        });
    };




});