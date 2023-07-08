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

let myLibrary = [];
let originalTitles = new Map();
let originalAuthors = new Map();

class Book {
    constructor(title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let exampleBook = new Book('Example', 'NewAuthor', 100, 'read', 0);
    myLibrary.push(exampleBook);

    for (let i = 0; i < myLibrary.length; i++) {
        let object = myLibrary[i];
        const newRow = createRow(myLibrary);
        newRow.querySelector('.title').textContent = object.title;
        newRow.querySelector('.author').textContent = object.author;
        newRow.querySelector('.pages').textContent = object.pages;
        newRow.querySelector('#read-status').value = object.read;
        document.querySelector('tbody').appendChild(newRow);
    }
});

selectedSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    let newBook = new Book(submitTitle.value, submitAuthor.value, 
        submitPages.value, submitStatus.value, (myLibrary.length + 1));

    if (!ifDuplicate(newBook, myLibrary)) {
        myLibrary.push(newBook);
        submitTitle.value = '';
        submitAuthor.value = '';
        submitPages.value = "";
    
        const newRow = createRow(myLibrary);
        newRow.querySelector('.title').textContent = newBook.title;
        newRow.querySelector('.author').textContent = newBook.author;
        newRow.querySelector('.pages').textContent = newBook.pages;
        newRow.querySelector('#read-status').value = newBook.read;
        document.querySelector('tbody').appendChild(newRow);
    } else {
        alert('This book was already added!');
    }
});

function createRow(array) {
    const newRow = document.createElement('tr');
    newRow.classList.add('row');
    newRow.setAttribute('data-number', array.length - 1);
  
    const titleCell = document.createElement('td');
    titleCell.classList.add('title');
    newRow.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.classList.add('author');
    newRow.appendChild(authorCell);
  
    const pagesCell = document.createElement('td');
    pagesCell.classList.add('pages');
    newRow.appendChild(pagesCell);
  
    pagesCell.addEventListener('focusout', function() {
        const selectedRow = pagesCell.closest('tr');
        const dataIndex = parseInt(selectedRow.getAttribute('data-number'));

        if (pagesCell.textContent !== myLibrary[dataIndex].pages) {
            myLibrary[dataIndex].pages = pagesCell.textContent;
        }
    });

    const statusCell = document.createElement('td');
    statusCell.classList.add('read-box');
    newRow.appendChild(statusCell);

    const statusSelect = document.createElement('select');
    statusSelect.id = 'read-status';
    statusSelect.name = 'read-status';
    statusSelect.disabled = true;
    statusCell.appendChild(statusSelect);

    statusSelect.addEventListener('focusout', function() {
        const selectedRow = statusSelect.closest('tr');
        const dataIndex = parseInt(selectedRow.getAttribute('data-number'));

        if (statusSelect.value !== myLibrary[dataIndex].read) {
            myLibrary[dataIndex].read = statusSelect.value;
        }
    });

    const readOption = document.createElement('option');
    readOption.value = 'read';
    readOption.textContent = 'Read';
    statusSelect.appendChild(readOption);

    const unreadOption = document.createElement('option');
    unreadOption.value = 'unread';
    unreadOption.textContent = 'Unread';
    statusSelect.appendChild(unreadOption);

    const optionsCell = document.createElement('td');
    optionsCell.classList.add('options');
    newRow.appendChild(optionsCell);

    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'Edit';
    optionsCell.appendChild(editButton);

    editButton.addEventListener('click', function(e) {
        const selectedRow = editButton.closest('tr');
        const selectedStatus = selectedRow.querySelector('#read-status');
        const textCells = selectedRow.querySelectorAll('td:not(.options):not(.read-box)');
        const dropMenuCell = selectedRow.querySelector('td.read-box');
        const dataIndex = parseInt(selectedRow.getAttribute('data-number'));

        if (selectedStatus.hasAttribute('disabled')) {
            originalTitles.set(selectedRow.getAttribute('data-number'), selectedRow.querySelector('.title').textContent);
            originalAuthors.set(selectedRow.getAttribute('data-number'), selectedRow.querySelector('.author').textContent);

            dropMenuCell.classList.add('editable');
            selectedStatus.removeAttribute('disabled');
            textCells.forEach(cell => {
                cell.setAttribute('contenteditable', 'true');
              });
        } else {
            const editedTitle = selectedRow.querySelector('.title').textContent;
            const editedAuthor = selectedRow.querySelector('.author').textContent;
            const editedBook = new Book(editedTitle, editedAuthor, 0, 'read');
            const id = myLibrary[selectedRow.getAttribute('data-number')].id;

            if (ifDuplicate(editedBook, myLibrary, id)) {
                alert('This book was already added!');
                selectedRow.querySelector('.title').textContent = originalTitles.get(selectedRow.getAttribute('data-number'));
                selectedRow.querySelector('.author').textContent = originalAuthors.get(selectedRow.getAttribute('data-number'));
            } else {
                selectedRow.querySelector('.title').textContent = editedTitle;
                selectedRow.querySelector('.author').textContent = editedAuthor;
                myLibrary[selectedRow.getAttribute('data-number')].title = editedTitle;
                myLibrary[selectedRow.getAttribute('data-number')].author = editedAuthor;

                originalTitles.delete(selectedRow.getAttribute('data-number'));
                originalAuthors.delete(selectedRow.getAttribute('data-number'));
                dropMenuCell.classList.remove('editable');
                selectedStatus.setAttribute('disabled', 'disabled');
                textCells.forEach(cell => {
                    cell.removeAttribute('contenteditable');
                });
            }
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    optionsCell.appendChild(deleteButton);

    deleteButton.addEventListener('click', function(e) {
        const selectedRow = deleteButton.closest('tr');
        const dataIndex = parseInt(selectedRow.getAttribute('data-number'));
        selectedRow.remove();
        myLibrary.splice(dataIndex, 1);
    });
  
    return newRow;
}

function ifDuplicate(book, library, currentRowIndex) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].id !== currentRowIndex && library[i].title === book.title && library[i].author === book.author) {
            return true;
        }
    }
    return false;
}
