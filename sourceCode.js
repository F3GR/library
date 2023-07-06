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

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

document.addEventListener('DOMContentLoaded', function() {
    let exampleBook = new Book('foo', 'fooer', 100, 'read');
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

function updateLibrary(row, book) {
    const titleCell = row.querySelector('.title');
    const authorCell = row.querySelector('.author');
    const pagesCell = row.querySelector('.pages');
    const statusSelect = row.querySelector('#read-status');
  
    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    statusSelect.value = book.read;
}

selectedSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    let object = new Book(submitTitle.value, submitAuthor.value, 
        submitPages.value, submitStatus.value);
    myLibrary.push(object);
    submitTitle.value = '';
    submitAuthor.value = '';
    submitPages.value = "";

    const newRow = createRow(myLibrary);
    newRow.querySelector('.title').textContent = object.title;
    newRow.querySelector('.author').textContent = object.author;
    newRow.querySelector('.pages').textContent = object.pages;
    newRow.querySelector('#read-status').value = object.read;
    document.querySelector('tbody').appendChild(newRow);
});

function updateTable(rows) {
    rows.forEach((row, index) => {
      const book = myLibrary[index];
      updateLibrary(row, book);
    });
}

function createRow(array) {
    const newRow = document.createElement('tr');
    newRow.classList.add('row');
    newRow.setAttribute('data-number', array.length - 1);
  
    const titleCell = document.createElement('td');
    titleCell.classList.add('title');
    newRow.appendChild(titleCell);

    titleCell.addEventListener('focusout', function() {
        const selectedRow = titleCell.closest('tr');
        const dataIndex = parseInt(selectedRow.getAttribute('data-number'));

        if (titleCell.textContent !== myLibrary[dataIndex].title) {
            myLibrary[dataIndex].title = titleCell.textContent;
        }
    });
  
    const authorCell = document.createElement('td');
    authorCell.classList.add('author');
    newRow.appendChild(authorCell);

    authorCell.addEventListener('focusout', function() {
        const selectedRow = authorCell.closest('tr');
        const dataIndex = parseInt(selectedRow.getAttribute('data-number'));

        if (authorCell.textContent !== myLibrary[dataIndex].author) {
            myLibrary[dataIndex].author = authorCell.textContent;
        }
    });
  
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

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    optionsCell.appendChild(deleteButton);

    deleteButton.addEventListener('click', function(e) {
        const selectedRow = deleteButton.closest('tr');
        const dataIndex = parseInt(selectedRow.getAttribute('data-number'));
        selectedRow.remove();
        myLibrary.splice(dataIndex, 1);
        updateTable(selectedRows);
    });
  
    return newRow;
}

updateTable(selectedRows);

