const selectedRows = document.querySelectorAll('tbody tr');
const selectedTitles = document.querySelectorAll('td.title');
const selectedAuthors = document.querySelectorAll('td.author');
const selectedPages = document.querySelectorAll('td.pages');
const selectedStatus = document.querySelectorAll('#read-status');

const selectedDeleteButtons = document.querySelectorAll('tbody tr .delete');

selectedDeleteButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        const selectedRow = button.closest('tr');
        selectedRow.remove();
    });
});

const selectedEditButtons = document.querySelectorAll('tbody tr .edit');



let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

for (let i = 0; i < selectedRows.length; i++) {
    let obj = new Book(selectedTitles[i].textContent, selectedAuthors[i].textContent, 
        selectedPages[i].textContent, selectedStatus[i].value);
    myLibrary.push(obj);
}


function addBookToLibrary() {
  
}



function removeBook() {
  
}