$(document).ready(function() {
    window.sessionStorage;
    if (sessionStorage.getItem("Auth") != "Ok") {
        alert("Please Login to Continue");
        location.href = "Login.html";
    } else {

    }
    url = window.location.href;

    var id = url.substring(url.lastIndexOf('/') + 1);

    let divCart = document.getElementById("addToCart");
    if (sessionStorage.getItem("Auth") == "Ok") {
        let btnatc = document.createElement("button");
        btnatc.classList.add("btn", "btn-warning");
        btnatc.innerText = "Add To Cart";
        btnatc.style = "margin-left:30%;";
        btnatc.onclick = function() {
            CheckCart();
        };
        divCart.appendChild(btnatc);

    } else {
        let btnrte = document.createElement("button");
        btnrte.classList.add("btn", "btn-warning");
        btnrte.innerText = "Register To Enroll";
        btnrte.style = "margin-left:10%;";
        divCart.appendChild(btnrte);
    }

    LoadCourseDetails(id);

    function AddToCart() {
        $.ajax({
            url: "https://localhost:44390/api/Cart/1/items", // Id value is from session
            method: "POST",
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token"),
                contentType: "application/json"
            },
            data: {
                // Student_Id: 1,

                Item_Id: id //sessionStorage.getItem("Id")
            },
            success: function(data) {
                alert("Item Added");
                location.href = "Cart.html";

            },
            error: function(data) {
                alert("Unauthorized");
                location.href = "Home.html";
            }
        });
    }


    function CheckCart() {
        $.ajax({
            type: 'GET',
            url: "https://localhost:44390/api/Cart/1",
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token")
            },
            success: function(data) {
                let flag = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Item_Id == id) {
                        flag = 1;
                    }
                }
                if (flag == 1) {
                    alert("Item Already added in the Cart");
                } else {
                    AddToCart();
                }

            },
            error: function(data) {
                //alert("Unauthorized");
                location.href = "Home.html";
            }
        });
    }



    function LoadCourseDetails(id) {
        $.ajax({
            url: "https://localhost:44390/api/Course/" + id,
            method: "GET",
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token"),
                contentType: "application/json"
            },
            success: function(data) {
                $("#courseName").html(data.C_Name);
                $("#courseDescription").html(data.C_Description);
                $("#courseCategory").html(data.Category.Category_Name);
                $("#courseStatus").html(data.Status);
                $("#coursePrice").html("$" + (data.Price));
                $("#instructorId").html(data.User.Name);

            },
            error: function(data) {
                //alert("Unauthorized");
                location.href = "Home.html";
            }
        });
    }
});