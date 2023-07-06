const selectedRows = document.querySelectorAll('tbody tr');
const selectedTitles = document.querySelectorAll('td.title');
const selectedAuthors = document.querySelectorAll('td.author');
const selectedPages = document.querySelectorAll('td.pages');
const selectedStatus = document.querySelectorAll('#read-status');

const selectedSubmit = document.querySelector('form button');
const submitTitle = document.querySelector('form #title');
const submitAuthor = document.querySelector('form #author');
const submitPages = document.querySelector('form #pages');
const submitStatus = document.querySelector('form #read');

const selectedDeleteButtons = document.querySelectorAll('tbody tr .delete');
selectedDeleteButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        const selectedRow = button.closest('tr');
        selectedRow.remove();
    });
});

const selectedEditButtons = document.querySelectorAll('tbody tr .edit');
selectedEditButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
        const selectedRow = button.closest('tr');
        const selectedStatus = selectedRow.querySelector('#read-status');
        const textCells = selectedRow.querySelectorAll('td:not(.options):not(.read-box)');

        if (selectedStatus.hasAttribute('disabled')) {
            selectedStatus.removeAttribute('disabled');
            textCells.forEach(cell => {
                cell.setAttribute('contenteditable', 'true');
              });
        } else {
            selectedStatus.setAttribute('disabled', 'disabled');
            textCells.forEach(cell => {
                cell.removeAttribute('contenteditable');
              });
        }
    });
});


let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

selectedSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    let object = new Book(submitTitle.value, submitAuthor.value, 
        submitPages.value, submitStatus.value);
    myLibrary.push(object);
    submitTitle.value = '';
    submitAuthor.value = '';
    submitPages.value = "";
});