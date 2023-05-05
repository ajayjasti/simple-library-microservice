# Library Microservice

This is a nodejs and express application for a simple library
that holds records of authors and books.

The microservice enables one to get author details, and the details
of the books they have written.

The service uses a simple JSON file as a database.

The service contains docker configurations, enabling it to be built
into a container and deployed independently.
<br>

The app has 4 endpoints.<br>
`/authors` <br>
`/authors/:id` <br>
`/authors/:id/books` <br>
`/authors/:id/books/:book_id` <br>

Examples: <br>
`/authors` <br>
`/authors/2` <br>
`/authors/2/books` <br>
`/authors/2/books/40` <br>

## Building and running container

To build, run

```
docker build -t library-microservice .
```

<br>
Run as a background service

```
docker run -dp 8000:8000 library-microservice
```
