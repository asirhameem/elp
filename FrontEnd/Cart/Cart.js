$(document).ready(function() {
    window.sessionStorage;
    // if (sessionStorage.getItem("Auth") != "Ok") {
    //     location.href = "Login.html";
    // }
    $.ajax({
        type: 'GET',
        url: "https://localhost:44390/api/Cart/1",
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

                let p = document.createElement("p");
                p.classList.add("ml-3");
                p.innerText = data[i].Course.C_Description;

                let tdpr = document.createElement("td");
                tdpr.innerText = data[i].Course.Price;

                let tdbtn = document.createElement("td");
                tdbtn.classList.add("actions");

                let btnTrash = document.createElement("button");
                btnTrash.classList.add("btn", "btn-danger", "btn-sm");

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


        },
        error: function(data) {
            alert("Wrong Credentials");
        }
    });
});