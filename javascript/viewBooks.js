let count = 0;
let dispbooks = document.querySelector("#disp-books");

async function deleteBooks(bookId) {
    let resp = await fetch("http://localhost:8080/deleteBook?id=" + bookId, {
        method: "DELETE"
    });
    displaying();
}

async function displaying() {
    let resp = await fetch("http://localhost:8080/getAllBooks");
    let books = await resp.json();
    let list = "";
    for (let i = 0; i < books.length; i++) {
        list += `<tr>  <td>${++count}</td> 
        <td>${books[i].catagory}</td> 
        <td>${books[i].bookId}</td> 
        <td>${books[i].bookTitle}</td>
        <td>${books[i].author}</td>
        <td>${books[i].edition}</td>
        <td>${books[i].no_of_books}</td> 
        <td> <a > <img src="/img/edit.png" alt="Logo" height="30px" width="30px" onclick = "editBook(${books[i].bookId})" > </a> </td> 
        <td> <img src="/img/delete.jpg" alt="Logo" height="30px" width="30px" style = "cursor :pointer;" onclick = "deleteBooks(${books[i].bookId})" ></td></tr>`
    }
    dispbooks.innerHTML = list;
}

function editBook(bookId) {
    localStorage.setItem("bid", bookId);
    location.href = "/html/editBook.html";
}

let catagory = document.querySelector("#category");
let bookId = document.querySelector("#bookid");
let bookTitle = document.querySelector("#booktitle");
let author = document.querySelector("#author");
let edition = document.querySelector("#edition");
let no_of_books = document.querySelector("#no_of_books");

async function upd() {
    let books = {
        bookId : bookId.value,
        catagory: catagory.value,
        bookTitle: bookTitle.value,
        author: author.value,
        edition: edition.value,
        no_of_books: no_of_books.value
    }
    let url = "http://localhost:8080/saveBook";
    let par = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(books)
    }
    await fetch(url, par);
    document.querySelector(".msg").innerHTML = "Book Updated Successfully..!";
    location.href = "/html/viewBooks.html";
    return;
}
