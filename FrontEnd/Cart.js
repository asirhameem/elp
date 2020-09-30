$(document).ready(function() {
    window.sessionStorage;
    if (sessionStorage.getItem("Auth") != "Ok") {
        alert("Please Login to Continue");
        location.href = "Login.html";
    } else {

    }

    $("#btnCheckout").click(function() {
        Checkout();
    });
    var items = "";
    var totalPrice = 0;


    $.ajax({
        type: 'GET',
        url: "https://localhost:44390/api/Cart/1", // 1 will be the session id value here 
        datatype: 'json',
        headers: {
            Authorization: 'Basic ' + sessionStorage.getItem("Token")
        },
        success: function(data) {
            let table = document.getElementById("cart");
            for (var i = 0; i < data.length; i++) {

                let tb = document.createElement("tbody");

                let tr = document.createElement("tr");

                let td = document.createElement("td");

                let maindiv = document.createElement("div");
                maindiv.classList.add("row");

                let picdiv = document.createElement("div");
                picdiv.classList.add("col-sm-2", "hidden-xs");

                let img = document.createElement("img");
                img.src = "http://placehold.it/100x100";
                img.alt = data[i].Course.C_Image;
                img.classList.add("img-responsive");

                let cdiv = document.createElement("div");
                cdiv.classList.add("col-sm-10");

                let h4 = document.createElement("h4");
                h4.classList.add("nomargin", "ml-3");
                h4.innerText = data[i].Course.C_Name;
                items += data[i].Course.C_Name + ",";

                let p = document.createElement("p");
                p.classList.add("ml-3");
                p.innerText = data[i].Course.C_Description;

                let tdpr = document.createElement("td");
                tdpr.innerHTML = "$" + data[i].Course.Price;
                totalPrice += data[i].Course.Price;

                let tdbtn = document.createElement("td");
                tdbtn.classList.add("actions");

                let btnTrash = document.createElement("button");
                btnTrash.classList.add("btn", "btn-danger", "btn-sm");
                let cid = data[i].Cart_Id;
                btnTrash.onclick = function() {
                    DeleteFromCart(cid);
                };

                let itr = document.createElement("i");
                itr.classList.add("fa", "fa-trash-o");

                table.appendChild(tb);
                tb.appendChild(tr);
                tr.appendChild(td);
                td.appendChild(maindiv);
                maindiv.appendChild(picdiv);
                picdiv.appendChild(img);
                maindiv.appendChild(cdiv);
                cdiv.appendChild(h4);
                cdiv.appendChild(p);
                tr.appendChild(tdpr);
                tr.appendChild(tdbtn);
                tdbtn.appendChild(btnTrash);
                btnTrash.appendChild(itr);
            }
            let strong = document.getElementById("Total");
            strong.innerText = "$" + totalPrice.toString();


        },
        error: function(data) {
            alert("Unauthorized");
            location.href = "Home.html";
        }
    });

    function DeleteFromCart(id) {
        $.ajax({
            type: 'DELETE',
            url: "https://localhost:44390/api/Cart/" + id, // 1 will be the session id value here 
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token")
            },
            success: function(data) {
                alert("Removed From Cart!!");
                location.href = "Cart.html";

            },
            error: function(data) {
                alert("Wrong Credentials");
            }
        });


    }




    function Checkout() {
        $.ajax({
            type: 'GET',
            url: "https://localhost:44390/api/Cart/" + sessionStorage.getItem("Id"), // 1 will be the session id value here 
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token")
            },
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    CreateEnroll(data[i].Course.C_Id);

                }
                CreateFinancial();
                CreateInvoice();
                RemoveCart();


            },
            error: function(data) {
                alert("Wrong Credentials");
            }
        });

    }


    function CreateEnroll(id) {
        $.ajax({
            type: 'POST',
            url: "https://localhost:44390/api/Enroll", // 1 will be the session id value here 
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token")
            },
            data: {
                Course_Id: id,
                Student_Id: sessionStorage.getItem("Id"), //session storage
                Status: "Ongoing",
                Student_Email: sessionStorage.getItem("Email")
            },
            success: function(data) {

                alert("Successfully Enrolled");

            },
            error: function(data) {
                alert("Wrong Credentials");
            }

        });

    }

    function CreateFinancial() {
        $.ajax({
            type: 'POST',
            url: "https://localhost:44390/api/Financial", // 1 will be the session id value here 
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token")
            },
            data: {
                Courses: items,
                Paid_By: sessionStorage.getItem("Id"), //session storage
                Amount: totalPrice,
                Profit: totalPrice * 0.15

            },
            success: function(data) {

                alert("Successfully Added to Financial");

            },
            error: function(data) {
                alert("Wrong Credentials");
            }

        });

    }


    function CreateInvoice() {
        $.ajax({
            type: 'POST',
            url: "https://localhost:44390/api/Invoice", // 1 will be the session id value here 
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token")
            },
            data: {
                Items: items,
                Student_Id: sessionStorage.getItem("Id"), //session storage
                Price: totalPrice

            },
            success: function(data) {

                alert("Successfully Added to Invoice");

            },
            error: function(data) {
                alert("Wrong Credentials");
            }

        });

    }


    function RemoveCart(id) {
        $.ajax({
            type: 'Get',
            url: "https://localhost:44390/api/Cart/" + sessionStorage.getItem("Id"), // 1 will be the session id value here 
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token")
            },
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    DeleteFromCart(data[i].Cart_Id);
                }
                alert("Removed Cart!!");
                location.href = "Home.html";

            },
            error: function(data) {
                alert("Wrong Credentials");
            }
        });


    }






});