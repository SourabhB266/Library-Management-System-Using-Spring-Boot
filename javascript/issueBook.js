let dispRequest = document.getElementById("disp-requests");
let count = 0;

async function displaying() {
    let list = "";
    let res = await fetch("http://localhost:8080/getAllRequest");
    let requests = await res.json();
    for (let r of requests) {
        list += `<tr><td>${++count}</td>
        <td>${r.bookId}</td>
        <td>${r.bookTitle}</td>
        <td>${r.uid}</td>
        <td>${r.uname}</td>
        <td>${r.td}</td>
        <td><button onclick="approve(${r.bookId},${r.uid},${r.id})">Approve</button></td>
        </tr>`;
    }
    dispRequest.innerHTML = list;
}

let dt = new Date().toISOString().substring(0, 10);
let rt = addWeeks(2);
let issuestatus = false;
let returnbook;

async function approve(bookId, uid, rid) {
    console.log("approved");
    let res = await fetch("http://localhost:8080/getAllRequest");
    let requests = await res.json();
    if (true) {
        for (let r of requests) {
            if (uid == r.uid && r.bookId == bookId) {
                let issuebooks = {
                    bookId: r.bookId,
                    bookTitle: r.bookTitle,
                    uid: r.uid,
                    uname: r.uname,
                    issuedate: dt,
                    actualreturndate: rt,
                    issuestatus: true,
                }
                let url = "http://localhost:8080/saveIssueBook";
                let par = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(issuebooks)
                }
                await fetch(url, par);
                await userDetailsUpdate(uid, bookId);
                document.querySelector(".msg").innerHTML = "Book Issued Successfully..!";
                setTimeout(() => document.querySelector(".msg").innerHTML = "", 2000);
                await requestDelete(rid);
                location.reload();
                break;
            }

        }
    }
}

async function requestDelete(rid) {
    console.log("delete")
    await fetch("http://localhost:8080/deleteRequest?id=" + rid, {
        method: "DELETE"
    }).then(() => location.reload());
}

async function userDetailsUpdate(uid, bookId) {
    console.log("user details");
    let res1 = await fetch("http://localhost:8080/getById?id="+uid);
    let user = await res1.json();
    let res2 = await fetch("http://localhost:8080/getBookById?id="+bookId);
    let book = await res2.json();

    if (uid == user.uid) {
        console.log(user.no_of_books_taken + "user");
        user.no_of_books_taken = ++user.no_of_books_taken;
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
        book.no_of_books = --book.no_of_books;
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

}

function addWeeks(numOfWeeks, date = new Date()) {
    date.setDate(date.getDate() + numOfWeeks * 7);
    return date.toISOString().substring(0, 10);
}


