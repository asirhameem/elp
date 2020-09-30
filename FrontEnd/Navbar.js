$(document).ready(function() {
    window.sessionStorage;

    if (sessionStorage.getItem("Auth") == "Ok") {
        let btnLogout = document.getElementById("btnLogin");
        let a = document.createElement("button");
        a.classList.add("btn", "btn-warning");
        a.onclick = function() {
            sessionStorage.clear();
            sessionStorage.setItem("Auth", "");
            sessionStorage.setItem("Token", "");
            sessionStorage.setItem("href", "");
            sessionStorage.setItem("Type", "");
            sessionStorage.setItem("Id", "");
            sessionStorage.setItem("Name", "");
            sessionStorage.setItem("Email", "");
            location.href = "Login.html";
        }
        a.innerText = "LogOut";
        let drop = document.getElementById("drop");
        let dropdown1 = document.createElement("a");
        dropdown1.classList.add("dropdown-item");
        dropdown1.href = "Forum.html";
        dropdown1.innerText = "Discussion Prompt";

        let dropdown2 = document.createElement("a");
        dropdown2.classList.add("dropdown-item");
        dropdown2.href = "ShowCourses.html";
        dropdown2.innerText = "See Courses";

        drop.appendChild(dropdown1);
        drop.appendChild(dropdown2);
        btnLogout.appendChild(a);
    } else {
        let btnLogin = document.getElementById("btnLogin");
        let an = document.createElement("a");
        an.classList.add("btn", "btn-warning");
        an.href = "Login.html";
        an.innerText = "Login";
        btnLogin.appendChild(an);
    }
});