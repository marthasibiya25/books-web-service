# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model

Book documents will be stored in the `books` collection.

Required book fields:

* `id`: string, required, custom id such as `b1`
* `authorId`: string, required, references the `id` field of an author document
* `title`: string, required
* `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors

Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books

Purpose: Return all books.

Success:

* Status code: `200`
* Response body: an array of book objects

Errors:

* `500` if an unexpected server or database error occurs

#### GET /books/:id

Purpose: Return one book by its custom id.

Success:

* Status code: `200`
* Response body: the matching book object

Errors:

* `404` if no book exists with that id
* `500` if an unexpected server or database error occurs

#### POST /books

Purpose: Create a new book.

Request body:

```
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

Success:

* Status code: `201`
* Response body: the newly created book object

Errors:

* `400` if a required field is missing
* `400` if the `id` already exists
* `400` if the `authorId` does not match an existing author
* `500` if an unexpected server or database error occurs

#### PUT /books/:id

Purpose: Update an existing book.

Request body:

```
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

Success:

* Status code: `200`
* Response body: the updated book object

Errors:

* `400` if a required field is missing
* `400` if the `authorId` does not match an existing author
* `404` if no book exists with that id
* `500` if an unexpected server or database error occurs

#### DELETE /books/:id

Purpose: Delete an existing book.

Success:

* Status code: `204`
* Response body: none

Errors:

* `404` if no book exists with that id
* `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every book route.

### Deployment Expectations

After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

---

# Feature 2: Author CRUD Operations - Version 1

### Goal

Add an `authors` collection to the Books API. The API must support creating, reading, updating, and deleting authors. Every author route must be documented and testable in Swagger.

### Data Model

Author documents will be stored in the `authors` collection.

Required author fields:

* `id`: string, required, custom id such as `a1`
* `name`: string, required
* `birthYear`: number, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

Example author document:

```
{
  "id": "a1",
  "name": "Jane Austen",
  "birthYear": 1775
}
```

### Relationship to Books

Books reference authors through the book `authorId` field.

The value of a book's `authorId` must match the custom `id` of an existing author.

An author must not be deleted while one or more books still reference that author.

When a client attempts to delete an author who still has books, the API should:

* Return status code `400`
* Return a JSON error message explaining that the author cannot be deleted because books still reference the author
* Leave the author and all related books unchanged

An author with no books referencing it may be deleted normally.

### Routes

#### GET /authors

Purpose: Return all authors.

Success:

* Status code: `200`
* Response body: an array of author objects

Errors:

* `500` if an unexpected server or database error occurs

#### GET /authors/:id

Purpose: Return one author by its custom id.

Success:

* Status code: `200`
* Response body: the matching author object

Errors:

* `404` if no author exists with that id
* `500` if an unexpected server or database error occurs

#### POST /authors

Purpose: Create a new author.

Request body:

```
{
  "id": "a1",
  "name": "Jane Austen",
  "birthYear": 1775
}
```

Success:

* Status code: `201`
* Response body: the newly created author object

Errors:

* `400` if a required field is missing
* `400` if the `id` already exists
* `400` if the `birthYear` is not a valid number
* `500` if an unexpected server or database error occurs

#### PUT /authors/:id

Purpose: Update an existing author.

Request body:

```
{
  "name": "Jane Austen Updated",
  "birthYear": 1775
}
```

Success:

* Status code: `200`
* Response body: the updated author object

Errors:

* `400` if a required field is missing
* `400` if the `birthYear` is not a valid number
* `404` if no author exists with that id
* `500` if an unexpected server or database error occurs

#### DELETE /authors/:id

Purpose: Delete an existing author.

Success:

* Status code: `204`
* Response body: none

Errors:

* `400` if the author is still referenced by one or more books
* `404` if no author exists with that id
* `500` if an unexpected server or database error occurs

### Validation

The API should validate author request bodies before writing data to MongoDB.

The following validation rules apply:

* `id` must be a non-empty string.
* `name` must be a non-empty string.
* `birthYear` must be a number representing a valid four-digit year.
* Author ids must be unique.

### Swagger Documentation

Swagger must document every author route.

Each Swagger operation should document:

* The HTTP method and route.
* Required parameters.
* Request body fields for POST and PUT.
* Successful response status codes.
* Error response status codes.
* Response body structure.

Swagger must allow each author route to be tested from the browser.

### Deployment Expectations

After implementation, the author routes must work locally and from the deployed Render application.

The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

### Example Error Response

When attempting to delete an author who is still referenced by books:

```
{
  "error": "Cannot delete author because one or more books still reference this author."
}
```

# Books API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports complete CRUD operations for books. Every book route must be documented and testable through Swagger.

### Data Model

Book documents will be stored in the `books` collection.

Required book fields:

* `id`: string, required, unique, custom id such as `b1`
* `authorId`: string, required, references the `id` field of an author document
* `title`: string, required
* `publicationDate`: string, required

Books will continue to use custom string IDs instead of MongoDB `_id` values for route parameters.

Example:

```
{
  "id": "b1",
  "authorId": "a1",
  "title": "Example Book",
  "publicationDate": "2026-01-15"
}
```

### Validation

The API must validate all book request bodies before writing to MongoDB.

Validation requirements:

* `id` must be a non-empty string.
* `authorId` must be a non-empty string.
* `title` must be a non-empty string.
* `publicationDate` must be a non-empty string representing a valid date.
* Book `id` values must be unique.
* The API must reject incomplete or invalid request bodies with status code `400`.

### Relationship to Authors

Each book identifies its author using the `authorId` field.

The `authorId` value must match the custom `id` value of an existing author document.

When creating or updating a book:

* The API must verify that the referenced author exists before modifying the `books` collection.
* If the author does not exist, the API must return status code `400`.
* The book must not be created or updated when the author reference is invalid.

### Routes

#### GET /books

Purpose: Return all books.

Success:

* Status code: `200`
* Response body: an array of book objects.

Example response:

```
[
  {
    "id": "b1",
    "authorId": "a1",
    "title": "Example Book",
    "publicationDate": "2026-01-15"
  }
]
```

Errors:

* `500` if an unexpected server or database error occurs.
* The response should contain a JSON error message without exposing sensitive database details.

#### GET /books/:id

Purpose: Return one book by its custom id.

Success:

* Status code: `200`
* Response body: the matching book object.

Errors:

* `404` if no book exists with that id.
* `500` if an unexpected server or database error occurs.

Example not-found response:

```
{
  "error": "Book not found."
}
```

#### POST /books

Purpose: Create a new book.

Request body:

```
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

Success:

* Status code: `201`
* Response body: the newly created book object.

Errors:

* `400` if a required field is missing.
* `400` if a field has an invalid value.
* `400` if the `id` already exists.
* `400` if the `authorId` does not match an existing author.
* `500` if an unexpected server or database error occurs.

Example validation error:

```
{
  "error": "Required field is missing or invalid."
}
```

#### PUT /books/:id

Purpose: Replace the existing book data for the specified custom id.

Request body:

```
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

Success:

* Status code: `200`
* Response body: the updated book object.

Errors:

* `400` if a required field is missing.
* `400` if a field has an invalid value.
* `400` if the `authorId` does not match an existing author.
* `404` if no book exists with that id.
* `500` if an unexpected server or database error occurs.

The API must verify that the referenced author exists before updating the book.

#### DELETE /books/:id

Purpose: Delete an existing book.

Success:

* Status code: `204`
* Response body: none.

Errors:

* `404` if no book exists with that id.
* `500` if an unexpected server or database error occurs.

### Error Handling and Security

The API must return appropriate HTTP status codes and JSON error messages.

Unexpected database or server errors must not expose:

* Database connection information.
* Stack traces.
* Environment variables.
* Other sensitive implementation details.

Client-facing error messages should provide enough information to understand the failure without exposing internal server information.

### Swagger Documentation

Swagger must document every book route.

Each route must include:

* HTTP method and route.
* Parameters.
* Request body schema where applicable.
* Required fields.
* Successful response status code.
* Error response status codes.
* Response body schema or example where applicable.

Swagger must allow all book routes to be executed and tested from the browser.

### Deployment Expectations

After implementation:

* All book routes must work locally.
* All book routes must work from the deployed Render application.
* The deployed `/api-docs` page must allow all book routes to be tested from the browser.

---

# Feature 2: Author CRUD Operations - Version 2

### Goal

Add an `authors` collection to the Books API and provide complete CRUD operations for authors. Authors must use custom string IDs so they can be referenced by books through the `authorId` field.

Every author route must be documented and testable through Swagger.

### Data Model

Author documents will be stored in the `authors` collection.

Required author fields:

* `id`: string, required, unique, custom id such as `a1`
* `name`: string, required
* `birthYear`: number, required

Example:

```
{
  "id": "a1",
  "name": "Jane Austen",
  "birthYear": 1775
}
```

Authors will use custom string IDs instead of MongoDB `_id` values for route parameters.

### Validation

The API must validate author request bodies before writing data to MongoDB.

Validation requirements:

* `id` must be a non-empty string.
* `name` must be a non-empty string.
* `birthYear` must be a number.
* `birthYear` must be a valid four-digit year.
* Author `id` values must be unique.
* Invalid or incomplete request bodies must return status code `400`.

### Routes

#### GET /authors

Purpose: Return all authors.

Success:

* Status code: `200`
* Response body: an array of author objects.

Example:

```
[
  {
    "id": "a1",
    "name": "Jane Austen",
    "birthYear": 1775
  }
]
```

Errors:

* `500` if an unexpected server or database error occurs.
* The response should contain a JSON error message without exposing sensitive database details.

#### GET /authors/:id

Purpose: Return one author by the custom id.

Success:

* Status code: `200`
* Response body: the matching author object.

Errors:

* `404` if no author exists with that id.
* `500` if an unexpected server or database error occurs.

Example not-found response:

```
{
  "error": "Author not found."
}
```

#### POST /authors

Purpose: Create a new author.

Request body:

```
{
  "id": "a1",
  "name": "Jane Austen",
  "birthYear": 1775
}
```

Success:

* Status code: `201`
* Response body: the newly created author object.

Errors:

* `400` if a required field is missing.
* `400` if a field has an invalid value.
* `400` if the `id` already exists.
* `500` if an unexpected server or database error occurs.

Example validation error:

```
{
  "error": "Required field is missing or invalid."
}
```

#### PUT /authors/:id

Purpose: Replace the existing author data for the specified custom id.

Request body:

```
{
  "name": "Jane Austen Updated",
  "birthYear": 1775
}
```

Success:

* Status code: `200`
* Response body: the updated author object.

Errors:

* `400` if a required field is missing.
* `400` if a field has an invalid value.
* `404` if no author exists with that id.
* `500` if an unexpect
