let dispUsers = document.getElementById("disp-users");
let list = "";
let count = 0;

async function displaying() {

    let resp = await fetch("http://localhost:8080/getall");
    let users = await resp.json();
    for (let user of users) {
        list += `<tr>
        <td> ${++count} </td>
        <td> ${user.uid} </td>
        <td> ${user.fname + " " + user.lname} </td>
        <td> ${user.email} </td>
        <td> ${user.mobilenumber} </td>
        <td> ${user.no_of_books_taken} </td>
        </tr>`;
    }
    dispUsers.innerHTML = list;
}

