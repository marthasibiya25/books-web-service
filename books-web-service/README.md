# Books Web Service

## Get a Single Book

The GET /books/:id endpoint retrieves one book from the MongoDB ooks collection using the book's custom id value.

For example:

GET /books/b1

A successful request returns the book with HTTP status 200.

If the book does not exist, the API returns:

{ "message": "Book not found" }

with HTTP status 404.

Unexpected errors return:

{ "message": "Internal server error" }

with HTTP status 500.
