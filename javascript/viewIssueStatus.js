let uid = sessionStorage.getItem("uid");
let password = sessionStorage.getItem("password");

let dispstatus = document.getElementById("disp-status");
let list = "";
let list1 = "";
let count = 0;

async function displaying() {
  let resp = await fetch("http://localhost:8080/getAllIssueBook");
  let issuebooks = await resp.json();
  console.log(issuebooks);
  for (let i of issuebooks) {
    if (uid == i.uid && i.issuestatus == "true") {
      console.log(uid);
      list += `<tr>
            <td>${++count}</td>
            <td>${i.bookId}</td>
            <td>${i.bookTitle}</td>
            <td>Approved</td>
            <td>${i.issuedate}</td>
            <td>${i.actualreturndate}</td>
            <td><button onclick="retn('${i.bookId}', ${i.issueId},${i.uid},'${i.actualreturndate}','${new Date().toISOString().substring(0, 10)}') ">Return</button></td>
            <td id ="fine" class = "f"> </td>
            </tr>`;
    }
  }

  let resp1 = await fetch("http://localhost:8080/getAllRequest");
  let requests = await resp1.json();
  for (let r of requests) {
    if (uid == r.uid) {
      list1 += `<tr>
          <td>${++count}</td>
          <td>${r.bookId}</td>
          <td>${r.bookTitle}</td>
          <td>Pending</td>
          <td>-------</td>
          <td>-------</td>
          <td>-------</td>
          </tr>`;
    }
  }
  dispstatus.innerHTML = list +list1;
}

async function retn(bookId,issueId, uid, actualreturndate, returndate) {
  let fine = 10;
  if ((new Date(actualreturndate) < new Date(returndate))) {
    let diff = (new Date(returndate) - new Date(actualreturndate)) / (1000 * 60 * 60 * 24);
    fine = (fine * diff);
    document.getElementById("fine").innerHTML = fine;
    document.querySelector(".msg").innerHTML = `Late Submission You Need To Pay ${fine} Rupees Fine..!`
  }
  else {
    document.querySelector("#fine").innerHTML = 0;
    document.querySelector(".msg").innerHTML = "Book Returned Successfully..!";
    setTimeout(() => document.querySelector(".msg").innerHTML = "", 2000);

    deleteIssueBook(issueId,bookId,uid);
  }
}

async function deleteIssueBook(issueId,bookId,uid){ 
  await fetch("http://localhost:8080/deleteIssueBook?id=" + issueId, {
    method: "DELETE"
})
userDetailsUpdate(uid, bookId);
}


async function userDetailsUpdate(uid, bookId) {
  console.log("user details");
  let res1 = await fetch("http://localhost:8080/getById?id="+uid);
  let user = await res1.json();
  let res2 = await fetch("http://localhost:8080/getBookById?id="+bookId);
  let book = await res2.json();

  if (uid == user.uid) {
      console.log(user.no_of_books_taken + "user");
      user.no_of_books_taken = --user.no_of_books_taken;
      console.log(user.no_of_books_taken + "user");
      let url2 = 'http://localhost:8080/save';
      let par2 = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
      }
      await fetch(url2, par2);
  }

  if (bookId == book.bookId) {
      console.log(book.no_of_books + "books");
      book.no_of_books = ++book.no_of_books;
      console.log(book.no_of_books + "books");
      let url = "http://localhost:8080/saveBook";
      let par = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(book)
      }
      await fetch(url, par);

  }
  location.reload();

}