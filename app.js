// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor 
function UI() { };

// Store constructor
function Store() { };


// addbooktolist prototype
UI.prototype.addBookToList = function (book) {

    const list = document.getElementById('book-list');
    // create table row element (tr)
    const row = document.createElement('tr');

    //insert colums (table data = td) in table row 
    row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href="#"><i class="fa-solid fa-trash"></i></a></td>
    `;

    // append tr into list
    list.appendChild(row);


}

//show Alert prototype
UI.prototype.showAlert = function (message, className) {

    //create div element
    const div = document.createElement('div');
    // add class
    div.className = ` alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('#container');
    // get form
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);
    // timeout after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}
//delete book prototype 
UI.prototype.deleteBook = function (target) {
    if (target.className === "fa-solid fa-trash") {
        target.parentElement.parentElement.parentElement.remove();
    }
}

//Clear fields prototype
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}



// get books from Ls
Store.prototype.getBooks = function () {

    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books
}


//add books to LS
Store.prototype.addBooks = function (book) {

    const books = store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

// display books from LS
Store.prototype.displayBooks = function () {
    const books = store.getBooks();

    books.forEach(function (book) {
        const ui = new UI;
        //add book to ui
        ui.addBookToList(book);
    });

}

// remove book from LS
Store.prototype.removeBook = function (isbn) {
    const books = store.getBooks();
    books.forEach(function (book, index) {
        if (book.isbn === isbn) {
            books.splice(index, 1)
        }
    });
    localStorage.setItem('books', JSON.stringify(books));

}

// DOM Load event
let store = new Store();
document.addEventListener('DOMContentLoaded', store.displayBooks);


//Event Listeners for adding book
document.getElementById('book-form').addEventListener('submit', function (e) {
    // get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    //instantiate book 
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();

    // instantiate Store
    const store = new Store();

    //validation
    if (title === "" || author === "" || isbn === "") {
        //  error Alert
        ui.showAlert('Please fill all the field first', 'error');
    } else {
        // Add book to List
        ui.addBookToList(book);

        // add to LS
        store.addBooks(book);

        // success alert
        ui.showAlert('Book added', 'success');

        //clear fields
        ui.clearFields();
    }

    e.preventDefault();
})

// event Listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {

    //instantiate UI
    const ui = new UI();

    //instantiate Store
    const store = new Store();

    //delete book
    ui.deleteBook(e.target);

    //remove from LS
    store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);

    //show alert
    ui.showAlert('Book removed!', 'success');

    e.preventDefault();

})
