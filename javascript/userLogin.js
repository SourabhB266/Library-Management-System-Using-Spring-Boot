let uid = document.querySelector("#uid");
let password = document.querySelector("#password");

document.addEventListener("submit", (e) => {
    e.preventDefault()
    logIn();
});

async function logIn() {
    let condition = false;
    let resp = await fetch("http://localhost:8080/getById?id=" + uid.value)
    if (resp.status == 200) {
        let user = await resp.json();
        if (password.value === user.password) {
            sessionStorage.setItem("uid", uid.value);
            sessionStorage.setItem("password", password.value);
            condition = true;
        }
        if (condition) {
            document.querySelector(".success").innerHTML = "Logged In Successfully..!";
            setTimeout(() => document.querySelector(".success").innerHTML = "", 2000);
            setTimeout(() => location.href = "/html/userHome.html", 2000);
        } else {
            document.querySelector("#e").innerHTML = "Invalid User ..!";
            setTimeout(() => document.querySelector("#e").innerHTML = "", 2000);
            document.querySelector(".form-input").innerHTML = "";
            setTimeout(() => location.href = "/html/userLogin.html", 2000);
        }
    }
}
