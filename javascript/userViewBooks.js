let count = 0;
let dispbooks = document.querySelector("#disp-books");
let tm = new Date().toISOString().substring(0,10);

let uid = sessionStorage.getItem("uid");
let password = sessionStorage.getItem("password");
let list = "";

async function displaying() {
    let count = 0;
    let dispbooks = document.querySelector('#disp-books');
    console.log(dispbooks);
    let resp = await fetch('http://localhost:8080/getAllBooks');
    let books = await resp.json();
    let req =await fetch('http://localhost:8080/getAllRequest');
    let reqs = await req.json();
    let resp1 = await fetch('http://localhost:8080/getAllIssueBook');
    let ib = await resp1.json();

    for (let book of books) {
      let row = document.createElement('tr');
      let slno = document.createElement('td');
      slno.innerText = String(++count);
      row.appendChild(slno);
      let catagory = document.createElement('td');
      catagory.innerText = book.catagory;
      row.appendChild(catagory);
      let bookId = document.createElement('td');
      bookId.innerText = book.bookId;
      row.appendChild(bookId);
      let bookTitle = document.createElement('td');
      bookTitle.innerText = book.bookTitle;
      row.appendChild(bookTitle);
      let author = document.createElement('td');
      author.innerText = book.author;
      row.appendChild(author);
      let edition = document.createElement('td');
      edition.innerText = book.edition;
      row.appendChild(edition);
      let no_of_books = document.createElement('td');
      no_of_books.innerText = book.no_of_books;
      row.appendChild(no_of_books);
  
      let req = document.createElement('td');
      let button = document.createElement('button');
      button.setAttribute("value","Request");
      button.innerText="Request";
      for(let r of reqs){
        if(r.bookId == book.bookId){
          button.disabled= true;
          break;
        }
      }
      for(let i of ib){
        if(i.bookId == book.bookId){
          button.disabled= true;
          break;
        }
      }
      button.addEventListener('click', () => {
        this.requesting(book.bookId);
      });
      req.appendChild(button);
      row.appendChild(req);
      dispbooks.appendChild(row);
    }
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