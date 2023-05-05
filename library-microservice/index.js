const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

function readData(filename = "db.json") {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + "/" + filename, (err, data) => {
            if (err) {
                console.log(err);
                reject(`Failed to read from ${filename}`);
            } else {
                resolve(JSON.parse(data));
            }
        })
    })
};


app.get("/", (req, res) => {
    res.json({
        "endpoints": [
            "/authors",
            "/authors/:id",
            "/authors/:id/books",
            "/authors/:id/books/:book_id",
        ]
    });
});

app.get("/authors", async (req, res) => {
    const data = await readData();

    res.json(data.authors);
});

app.get("/authors/:id", async (req, res) => {
    const author_id = req.params.id;

    const data = await readData();

    const author = data.authors?.filter(author => author.author_id == author_id)?.[0];

    if (author) return res.json(author);

    res.status(404).json({
        status: 404,
        detail: "Author not found!"
    });
});

app.get("/authors/:id/books", async (req, res) => {
    const author_id = req.params.id;

    const data = await readData();

    const books = data.books?.filter(book => book.author_id == author_id);

    res.json(books);
});

app.get("/authors/:id/books/:book_id", async (req, res) => {
    const author_id = req.params.id;
    const book_id = req.params.book_id;

    const data = await readData();

    const book = data.books?.filter(book => ((book.author_id == author_id) && (book.book_id == book_id)))?.[0];

    if (book) return res.json(book);

    res.status(404).json({
        status: 404,
        detail: "Book not found!"
    });
});


const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server listening on port %d...", PORT);
});

