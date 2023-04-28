let count = 0;
let dispbooks = document.querySelector("#disp-books");
let tm = new Date().toISOString().substring(0,10);

let uid = sessionStorage.getItem("uid");
let password = sessionStorage.getItem("password");
let list = "";

async function displaying() {
    let resp = await fetch("http://localhost:8080/getAllBooks");
    let books = await resp.json();
    for (let i = 0; i < books.length; i++) {
        list += `<tr>  <td>${++count}</td> 
        <td>${books[i].catagory}</td> 
        <td>${books[i].bookId}</td> 
        <td>${books[i].bookTitle}</td>
        <td>${books[i].author}</td>
        <td>${books[i].edition}</td>
        <td>${books[i].no_of_books}</td> 
        <td><button style="" onclick =request(${books[i].bookId})>Request</button> </td> 
        </tr>`
    }
    dispbooks.innerHTML = list;
}

async function request(bookId) {
    let resp = await fetch("http://localhost:8080/getall");
    let users = await resp.json();
    let resp1 = await fetch("http://localhost:8080/getAllBooks");
    let books = await resp1.json();
    for (let user of users) {
        if (uid == user.uid) {
            for (let book of books) {
                if (bookId == book.bookId) {
                   let requests ={
                        bookId: book.bookId,
                        bookTitle: book.bookTitle,
                        uid: user.uid,
                        uname: user.fname + " " +user.lname,
                        td: tm,
                    };
                    let url = "http://localhost:8080/saveRequest";
                    let par = {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requests)
                    }
                    await fetch(url, par);
                    document.querySelector(".msg").innerHTML = "Request Sent Successfully..!";
                    setTimeout(() => document.querySelector(".msg").innerHTML = "", 2000);
                }
            }

        }
    }
}