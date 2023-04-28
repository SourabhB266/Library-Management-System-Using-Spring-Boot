
let dispissuebooks = document.getElementById("disp-issuebooks");
let list = "";
let count = 0;


async function displaying() {
  let resp = await fetch("http://localhost:8080/getAllIssueBook");
  let issuebooks  = await resp.json();
  for (let i of issuebooks) {
    list += `<tr>
     <td>${++count}</td>
     <td>${i.bookId}</td>
     <td>${i.bookTitle}</td>
     <td>${i.uid}</td>
     <td>${i.uname}</td>
     <td>${i.issuedate}</td>
     <td>${i.actualreturndate}</td>
     </tr>`;
  }
  dispissuebooks.innerHTML = list;
}

