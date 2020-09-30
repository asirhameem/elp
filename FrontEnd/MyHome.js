$(document).ready(function() {
    window.sessionStorage;
    let divn = document.getElementById("namespace");
    if (sessionStorage.getItem("Auth") != "Ok") {
        //let divn = document.getElementById("namespace");
        // <a href="#" class="btn btn-warning btn-lg">Join For Free!</a>
        let an = document.createElement("a");
        an.href = "Registration.html";
        an.classList.add("btn", "btn-warning", "btn-lg");
        an.innerText = "Join For Free!";
        an.href = "Register.html";

        divn.appendChild(an);



    } else if (sessionStorage.getItem("Auth") == "Ok") {
        //let divn = document.getElementById("namespace");
        // <p style="text-align:center" class="text-light">Start learning on Porashuna!</p>
        let pn = document.createElement("p");
        pn.style = "text-align:center";
        pn.classList.add("text-light");
        pn.innerText = "Welcome, " + sessionStorage.getItem("Name");
        divn.appendChild(pn);
    } else {
        alert("Server Error");
    }
    if (sessionStorage.getItem("Auth") != "Ok") {
        $.ajax({
            url: "https://localhost:44390/api/Home",
            method: "get",
            complete: function(xmlhttp, status) {
                if (xmlhttp.status == 200) {
                    var data = xmlhttp.responseJSON;

                    let cardContainer = document.getElementById("card");

                    for (var i = 0; i < data.length; i++) {


                        let card = document.createElement("div");
                        card.classList.add("col-lg-3", "col-md-6", "mb-2");

                        let cardContent = document.createElement('div');
                        cardContent.classList.add("card", "h-100");

                        let cardImg = document.createElement('img');
                        cardImg.classList.add("card-img-top");
                        cardImg.src = "http://placehold.it/500x325";
                        cardImg.alt = "";

                        let cardBody = document.createElement("div");
                        cardBody.classList.add("card-body");

                        let title = document.createElement("h4");
                        title.classList.add("card-title");
                        title.innerText = data[i].C_Name;

                        let description = document.createElement("p");
                        description.classList.add("card-text");
                        description.innerText = data[i].C_Description;

                        let footer = document.createElement('div');
                        footer.classList.add("card-footer");

                        // let btn = document.createElement("a");
                        // btn.classList.add("btn", "btn-warning");
                        // btn.href = "CourseDetails.html?x`/" + data[i].C_Id;
                        // // btn.onclick = function() { getCourseDetails(data[i].C_Id) };
                        // btn.innerText = "Details";

                        cardContainer.appendChild(card);

                        card.appendChild(cardContent);

                        cardContent.appendChild(cardImg);
                        cardContent.appendChild(cardBody);
                        cardContent.appendChild(footer);

                        cardBody.appendChild(title);
                        cardBody.appendChild(description);


                        let btn = document.createElement("a");
                        btn.classList.add("btn", "btn-warning");
                        btn.href = "CourseDetails.html?/" + data[i].C_Id;
                        btn.innerText = "Course Details";
                        footer.appendChild(btn);


                    }
                } else {
                    console.log(xmlhttp.status + " : " + xmlhttp.statusText);
                }

            }
        });
    } else if (sessionStorage.getItem("Auth") == "Ok" && sessionStorage.getItem("Type") == "Student") {
        $.ajax({
            type: 'GET',
            url: "https://localhost:44390/api/Enroll",
            datatype: 'json',
            headers: {
                Authorization: 'Basic ' + sessionStorage.getItem("Token")
            },
            success: function(data) {

                let cardContainer = document.getElementById("card");

                for (var i = 0; i < data.length; i++) {

                    if (sessionStorage.getItem("Id") == data[i].Student_Id) {
                        let card = document.createElement("div");
                        card.classList.add("col-lg-3", "col-md-6", "mb-2");

                        let cardContent = document.createElement('div');
                        cardContent.classList.add("card", "h-100");

                        let cardImg = document.createElement('img');
                        cardImg.classList.add("card-img-top");
                        cardImg.src = "http://placehold.it/500x325";
                        cardImg.alt = "";

                        let cardBody = document.createElement("div");
                        cardBody.classList.add("card-body");

                        let title = document.createElement("h4");
                        title.classList.add("card-title");
                        title.innerText = data[i].Course.C_Name;

                        let description = document.createElement("p");
                        description.classList.add("card-text");
                        description.innerText = data[i].Course.C_Description;

                        let footer = document.createElement('div');
                        footer.classList.add("card-footer");

                        // let btn = document.createElement("a");
                        // btn.classList.add("btn", "btn-warning");
                        // btn.href = "CourseDetails.html?x`/" + data[i].C_Id;
                        // // btn.onclick = function() { getCourseDetails(data[i].C_Id) };
                        // btn.innerText = "Details";

                        cardContainer.appendChild(card);

                        card.appendChild(cardContent);

                        cardContent.appendChild(cardImg);
                        cardContent.appendChild(cardBody);
                        cardContent.appendChild(footer);

                        cardBody.appendChild(title);
                        cardBody.appendChild(description);


                        let btn = document.createElement("a");
                        btn.classList.add("btn", "btn-warning");
                        btn.href = "CourseDetails.html?/" + data[i].Course.C_Id;
                        btn.innerText = "View Content";
                        footer.appendChild(btn);

                    }
                }
            },
            error: function(data) {
                alert("Unauthorized");
            }

        });

    } else if (sessionStorage.getItem("Auth") == "Ok" && sessionStorage.getItem("Type") == "Instructor") {
        $.ajax({
            url: "https://localhost:44390/api/Home",
            method: "get",
            complete: function(xmlhttp, status) {
                if (xmlhttp.status == 200) {
                    var data = xmlhttp.responseJSON;

                    let cardContainer = document.getElementById("card");

                    for (var i = 0; i < data.length; i++) {

                        if (sessionStorage.getItem("Id") == data[i].Instructor_Id) {
                            let card = document.createElement("div");
                            card.classList.add("col-lg-3", "col-md-6", "mb-2");

                            let cardContent = document.createElement('div');
                            cardContent.classList.add("card", "h-100");

                            let cardImg = document.createElement('img');
                            cardImg.classList.add("card-img-top");
                            cardImg.src = "http://placehold.it/500x325";
                            cardImg.alt = "";

                            let cardBody = document.createElement("div");
                            cardBody.classList.add("card-body");

                            let title = document.createElement("h4");
                            title.classList.add("card-title");
                            title.innerText = data[i].C_Name;

                            let description = document.createElement("p");
                            description.classList.add("card-text");
                            description.innerText = data[i].C_Description;

                            let footer = document.createElement('div');
                            footer.classList.add("card-footer");

                            // let btn = document.createElement("a");
                            // btn.classList.add("btn", "btn-warning");
                            // btn.href = "CourseDetails.html?x`/" + data[i].C_Id;
                            // // btn.onclick = function() { getCourseDetails(data[i].C_Id) };
                            // btn.innerText = "Details";

                            cardContainer.appendChild(card);

                            card.appendChild(cardContent);

                            cardContent.appendChild(cardImg);
                            cardContent.appendChild(cardBody);
                            cardContent.appendChild(footer);

                            cardBody.appendChild(title);
                            cardBody.appendChild(description);


                            let btn = document.createElement("a");
                            btn.classList.add("btn", "btn-warning");
                            btn.href = "CourseContent.html?/" + data[i].C_Id;
                            btn.innerText = "Course Con";
                            footer.appendChild(btn);

                        }
                    }
                } else {
                    console.log(xmlhttp.status + " : " + xmlhttp.statusText);
                }

            }
        });

    } else {}




});