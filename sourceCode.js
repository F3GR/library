const selectedRows = document.querySelectorAll('tbody tr');
const selectedTitles = document.querySelectorAll('td.title');
const selectedAuthors = document.querySelectorAll('td.author');
const selectedPages = document.querySelectorAll('td.pages');
const selectedStatus = document.querySelectorAll('#read-status');

console.dir(selectedRows);
console.dir(selectedTitles);
console.dir(selectedAuthors);
console.dir(selectedPages);
console.dir(selectedStatus);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let myLibrary = [];

for (let i = 0; i < selectedRows.length; i++) {
    let obj = new Book(selectedTitles[i].textContent, selectedAuthors[i].textContent, 
        selectedPages[i].textContent, selectedStatus[i].textContent);
    myLibrary += obj;
}

console.log(myLibrary);

function addBookToLibrary() {
  
}