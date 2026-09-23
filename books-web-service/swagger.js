const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Books Web Service API",
        version: "1.0.0",
        description: "CSE341 Week 02 Books and Authors API",
    },
    servers: [
        {
            url: "https://books-web-service.onrender.com",
        },
    ],
    paths: {
        "/api/books": {
            get: {
                summary: "Get all books",
                responses: {
                    200: {
                        description: "List of books",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            post: {
                summary: "Create a new book",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Book",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Book created successfully",
                    },
                    400: {
                        description: "Invalid data or author ID",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },

        "/api/books/{id}": {
            get: {
                summary: "Get one book",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Book found",
                    },
                    404: {
                        description: "Book not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            put: {
                summary: "Update a book",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Book",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Book updated successfully",
                    },
                    400: {
                        description: "Invalid data or author ID",
                    },
                    404: {
                        description: "Book not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            delete: {
                summary: "Delete a book",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    204: {
                        description: "Book deleted successfully",
                    },
                    404: {
                        description: "Book not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },

        "/api/authors": {
            get: {
                summary: "Get all authors",
                responses: {
                    200: {
                        description: "List of authors",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            post: {
                summary: "Create a new author",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Author",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Author created successfully",
                    },
                    400: {
                        description: "Invalid data or duplicate ID",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },

        "/api/authors/{id}": {
            get: {
                summary: "Get one author",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Author found",
                    },
                    404: {
                        description: "Author not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            put: {
                summary: "Update an author",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Author",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Author updated successfully",
                    },
                    400: {
                        description: "Invalid data or duplicate ID",
                    },
                    404: {
                        description: "Author not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
            delete: {
                summary: "Delete an author",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    204: {
                        description: "Author deleted successfully",
                    },
                    400: {
                        description: "Author cannot be deleted while books reference the author",
                    },
                    404: {
                        description: "Author not found",
                    },
                    500: {
                        description: "Server error",
                    },
                },
            },
        },
    },

    components: {
        schemas: {
            Book: {
                type: "object",
                required: [
                    "id",
                    "authorId",
                    "title",
                    "publicationDate",
                ],
                properties: {
                    id: {
                        type: "string",
                        example: "b6",
                    },
                    authorId: {
                        type: "string",
                        example: "a5",
                    },
                    title: {
                        type: "string",
                        example: "The Silmarillion",
                    },
                    publicationDate: {
                        type: "string",
                        example: "1977-09-15",
                    },
                },
            },

            Author: {
                type: "object",
                required: [
                    "id",
                    "name",
                    "birthYear",
                ],
                properties: {
                    id: {
                        type: "string",
                        example: "a6",
                    },
                    name: {
                        type: "string",
                        example: "C.S. Lewis",
                    },
                    birthYear: {
                        type: "integer",
                        example: 1898,
                    },
                },
            },
        },
    },
};

export default swaggerDocument;