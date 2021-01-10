/* variables/selectors */
const table = document.querySelector('.table');
const addButton = document.querySelector('.add-book-btn');
const titleHeader = document.querySelector('.title-header');
const authorHeader = document.querySelector('.author-header');
const pagesHeader = document.querySelector('.pages-header');
const readHeader = document.querySelector('.read-header');
const removeHeader = document.querySelector('.remove-header');
const actionHeader = document.querySelector('.action-header');
/* Form Modal */
const modalWrap = document.querySelector('.modal-container');
const modalForm = document.querySelector('.modal-form');
const closeButton = document.querySelector('.close-btn');
const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const pagesInput = document.querySelector('.pages-input');
const yesInput = document.getElementById('yes-radio');
const noInput = document.getElementById('no-radio');
const submitButton = document.querySelector('.submit-btn');
let formValidated = false;
//Constructor:
function Book(title, author, totalPages, read) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.read = read;
}
/* local storage */
getLibrary = function () {
    const libraryJSON = localStorage.getItem('myLibrary');
    if (libraryJSON !== null) {
        return JSON.parse(libraryJSON);
    } else {
        return [];
    }
}

storeLibrary = function () {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}


/* Library array stored in localStorage */
const myLibrary = getLibrary();

/* functions: */
addBookToLibrary = function () {
    const book = new Book(titleInput.value, authorInput.value, pagesInput.value, yesInput.checked);
    myLibrary.push(book);
}

Book.prototype.render = function () {
    let titleInfo = document.createElement('h3');
    let authorInfo = document.createElement('h3');
    let pagesInfo = document.createElement('h3');
    let readInfo = document.createElement('button');
    let removeButton = document.createElement('button');
    removeButton.classList.add('delete-btn');

    //make read into a button so it updates if read or not: 
    if (this.read) {
        readInfo.classList.add('readInfo-btn');
    }
    if (!this.read) {
        readInfo.classList.add('notread-btn');
    }
    //adding books: 
    titleHeader.appendChild(titleInfo).textContent = this.title;
    authorHeader.appendChild(authorInfo).textContent = this.author;
    pagesHeader.appendChild(pagesInfo).textContent = this.totalPages;
    /* tenary op if read or not */
    this.read ? readHeader.appendChild(readInfo).textContent = 'Read' :
        readHeader.appendChild(readInfo).textContent = 'In progress';
    actionHeader.appendChild(removeButton).textContent = 'delete';
    removeButton.classList.add(`delete-btn-${myLibrary.indexOf(this)}`);
    //Deleting books 
    removeButton.addEventListener('click', (e) => {
        titleHeader.removeChild(titleInfo);
        authorHeader.removeChild(authorInfo);
        pagesHeader.removeChild(pagesInfo);
        readHeader.removeChild(readInfo);
        actionHeader.removeChild(removeButton);
        myLibrary.splice(myLibrary.indexOf(this), 1);
        storeLibrary();
    });
    //If read event - change status: 
    readInfo.addEventListener('click', (e) => {
        this.changeBookStatus(e);
        storeLibrary();
    });

}


function openModal() {
    modalWrap.style.visibility = 'visible';
}

function closeModal() {
    modalWrap.style.visibility = 'hidden';
}

function validateForm() {
    if (titleInput.value === '' || authorInput.value === '' ||
        pagesInput.value === '' || !yesInput.checked && !noInput.checked) {
        alert('You must fill out every field!');
    } else {
        formValidated = true;
    }
}

function clearValues() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    yesInput.checked = false;
    noInput.checked = false;
    formValidated = false;
}

function clickedOutside(e) {
    if (e.target === modalWrap) {
        closeModal();
    }
}

Book.prototype.changeBookStatus = function (e) {

    if ((this.read)) {
        e.target.textContent = 'In progress';
        e.target.classList.remove('readInfo-btn');
        e.target.classList.add('notread-btn');
        this.read = false;
    } else {
        e.target.textContent = 'Read';
        e.target.classList.remove('notread-btn');
        e.target.classList.add('readInfo-btn');
        this.read = true;
    }
    storeLibrary();
}
// events:
addButton.addEventListener('click', (e) => {
    openModal();
});

closeButton.addEventListener('click', (e) => {
    closeModal();
});

window.addEventListener('click', clickedOutside);

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
    if (formValidated) {
        closeModal();
        addBookToLibrary();
        myLibrary[myLibrary.length - 1].render();
        clearValues();
    }
    storeLibrary();
});

function show() {

    myLibrary.forEach((book) => {
        let titleInfo = document.createElement('h3');
        let authorInfo = document.createElement('h3');
        let pagesInfo = document.createElement('h3');
        let readInfo = document.createElement('button');
        let removeButton = document.createElement('button');
        removeButton.classList.add('delete-btn');

        //make read into a button so it updates if read or not: 
        if (book.read) {
            readInfo.classList.add('readInfo-btn');
        }
        if (!book.read) {
            readInfo.classList.add('notread-btn');
        }
        //adding books: 
        titleHeader.appendChild(titleInfo).textContent = book.title;
        authorHeader.appendChild(authorInfo).textContent = book.author;
        pagesHeader.appendChild(pagesInfo).textContent = book.totalPages;
        /* tenary op if read or not */
        book.read ? readHeader.appendChild(readInfo).textContent = 'Read' :
            readHeader.appendChild(readInfo).textContent = 'In progress';
        actionHeader.appendChild(removeButton).textContent = 'delete';
        removeButton.classList.add(`delete-btn-${myLibrary.indexOf(book)}`);
        //Deleting books 
        removeButton.addEventListener('click', (e) => {
            titleHeader.removeChild(titleInfo);
            authorHeader.removeChild(authorInfo);
            pagesHeader.removeChild(pagesInfo);
            readHeader.removeChild(readInfo);
            actionHeader.removeChild(removeButton);
            myLibrary.splice(myLibrary.indexOf(book), 1);
            storeLibrary();
        });
        //If read event - change status: 
        readInfo.addEventListener('click', (e) => {
            if ((book.read)) {
                e.target.textContent = 'In progress';
                e.target.classList.remove('readInfo-btn');
                e.target.classList.add('notread-btn');
                book.read = false;
            } else {
                e.target.textContent = 'Read';
                e.target.classList.remove('notread-btn');
                e.target.classList.add('readInfo-btn');
                book.read = true;
            }
            storeLibrary();
        });
    });
}

if (localStorage.getItem('myLibrary')) {
    show();
}
