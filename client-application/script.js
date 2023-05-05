const base_url = "http://localhost:8000";

const title = document.querySelector("#title");

function getAllAuthors() {
    fetch(base_url + "/authors")
        .then(res => res.json())
        .then(authors => {
            const content = JSON.stringify(authors, null, 4);
            document.getElementById("data").innerHTML = content; // set json data on `pre` element

            authors.forEach(author => {
                const p = document.createElement("p");
                p.innerHTML = `<a href="authors.html?author_id=${author.author_id}">${author.name}</a>`;
                document.querySelector(".links").append(p); // dynamically add anchor element for each author
            });

            title.textContent = "All Authors";
        });
}

function getAuthorById(author_id) {
    fetch(base_url + `/authors/${author_id}`)
        .then(res => res.json())
        .then(author => {
            const content = JSON.stringify(author, null, 4);
            document.getElementById("data").innerHTML = content;

            const p = document.createElement("p");
            p.innerHTML =
                `<a href="authors.html?author_id=${author.author_id}&author_name=${author.name}&books=true">${author.name} Books</a>`;
            document.querySelector(".links").append(p); // dynamically add details for the author

            title.textContent = `Author: ${author.name}`;
        });
}

function getAuthorAllBooks(author_id, author_name) {
    fetch(base_url + `/authors/${author_id}/books`)
        .then(res => res.json())
        .then(books => {
            const content = JSON.stringify(books, null, 4);
            document.getElementById("data").innerHTML = content;

            books.forEach(book => {
                const p = document.createElement("p");
                p.innerHTML =
                    `<a href="authors.html?author_id=${book.author_id}&author_name=${author_name}&books=true&book_id=${book.book_id}">${book.title}</a>`;
                document.querySelector(".links").append(p);
            });

            title.textContent = `${author_name}: All Books`;
        });
}

function getAuthorBook(author_id, author_name, book_id) {
    fetch(base_url + `/authors/${author_id}/books/${book_id}`)
        .then(res => res.json())
        .then(book => {
            const content = JSON.stringify(book, null, 4);
            document.getElementById("data").innerHTML = content;

            const p = document.createElement("p");
            p.innerHTML = `Written by <strong>${author_name}</strong>`;
            document.querySelector(".links").append(p);

            title.textContent = `${book.title}`;
        });
}

const search = window.location.search;
const params = new URLSearchParams(search);
const author_id = params.get("author_id");
const author_name = params.get("author_name");
const books = params.get("books");
const book_id = params.get("book_id");

if (author_id && author_name && books && book_id) getAuthorBook(author_id, author_name, book_id)
else if (author_id && author_name && books) getAuthorAllBooks(author_id, author_name)
else if (author_id) getAuthorById(author_id)
else getAllAuthors();
