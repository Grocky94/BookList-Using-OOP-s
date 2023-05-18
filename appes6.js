class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
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

    showAlert(message, className) {
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

    deleteBook(target) {
        if (target.className === "fa-solid fa-trash") {
            target.parentElement.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}



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

    console.log(ui);
    
    //validation
    if (title === "" || author === "" || isbn === "") {
        //  error Alert
        ui.showAlert('Please fill all the field first', 'error');
    } else {
        // Add book to List
        ui.addBookToList(book);

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

    //delete book
    ui.deleteBook(e.target);

    //show alert
    ui.showAlert('Book removed!', 'success');

    e.preventDefault();

})
