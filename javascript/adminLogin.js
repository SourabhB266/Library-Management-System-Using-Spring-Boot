let username = document.querySelector('#username');
let password = document.querySelector('#password');

document.addEventListener("submit", (e) => {
    e.preventDefault()
    login();
});

async function login() {
    let condition = false;

    let resp = await fetch("http://localhost:8080/getAdminByName?name=" + username.value)
    if (resp.status == 200) {
        let admin = await resp.json();
        if (password.value === admin.password) {
            condition = true;
            sessionStorage.setItem("username", username.value);
            sessionStorage.setItem("password", password.value);
        }
        if (condition) {
            document.querySelector(".success").innerHTML = "Logged In Successfully..!";
            setTimeout(() => document.querySelector(".success").innerHTML = "", 2000);
            setTimeout(() => location.href = "/html/adminHome.html", 2000);
        }
        else {
            document.querySelector("#e").innerHTML = "Please Enter Valid Credential ..!";
            setTimeout(() => document.querySelector("#e").innerHTML = "", 2000);
            document.querySelector(".form-input").innerHTML = "";
            setTimeout(() => location.href = "/html/adminlogin.html", 2000);
            return false;
        }
    }
}


