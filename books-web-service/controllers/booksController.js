import books from "../models/books.js";
import authors from "../models/authors.js";

// GET all books
const getAllBooks = (req, res) => {
    try {
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            error: "Unable to retrieve books.",
        });
    }
};

// GET one book
const getSingleBook = (req, res) => {
    try {
        const book = books.find((item) => item.id === req.params.id);

        if (!book) {
            return res.status(404).json({
                error: "Book not found.",
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            error: "Unable to retrieve the book.",
        });
    }
};

// CREATE a book
const createBook = (req, res) => {
    try {
        const { id, authorId, title, publicationDate } = req.body;

        // Validate required fields
        if (
            !id ||
            typeof id !== "string" ||
            !id.trim() ||
            !authorId ||
            typeof authorId !== "string" ||
            !authorId.trim() ||
            !title ||
            typeof title !== "string" ||
            !title.trim() ||
            !publicationDate ||
            typeof publicationDate !== "string" ||
            !publicationDate.trim()
        ) {
            return res.status(400).json({
                error: "id, authorId, title, and publicationDate are required.",
            });
        }

        // Check for duplicate book ID
        const existingBook = books.find((book) => book.id === id.trim());

        if (existingBook) {
            return res.status(400).json({
                error: "A book with that id already exists.",
            });
        }

        // Check that author exists
        const author = authors.find(
            (item) => item.id === authorId.trim()
        );

        if (!author) {
            return res.status(400).json({
                error: "The specified authorId does not exist.",
            });
        }

        const newBook = {
            id: id.trim(),
            authorId: authorId.trim(),
            title: title.trim(),
            publicationDate: publicationDate.trim(),
        };

        books.push(newBook);

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({
            error: "Unable to create the book.",
        });
    }
};

// UPDATE a book
const updateBook = (req, res) => {
    try {
        const book = books.find((item) => item.id === req.params.id);

        if (!book) {
            return res.status(404).json({
                error: "Book not found.",
            });
        }

        const { id, authorId, title, publicationDate } = req.body;

        // Validate required fields
        if (
            !id ||
            typeof id !== "string" ||
            !id.trim() ||
            !authorId ||
            typeof authorId !== "string" ||
            !authorId.trim() ||
            !title ||
            typeof title !== "string" ||
            !title.trim() ||
            !publicationDate ||
            typeof publicationDate !== "string" ||
            !publicationDate.trim()
        ) {
            return res.status(400).json({
                error: "id, authorId, title, and publicationDate are required.",
            });
        }

        // Prevent duplicate ID
        if (id.trim() !== req.params.id) {
            const duplicateBook = books.find(
                (item) => item.id === id.trim()
            );

            if (duplicateBook) {
                return res.status(400).json({
                    error: "A book with that id already exists.",
                });
            }
        }

        // Check that author exists
        const author = authors.find(
            (item) => item.id === authorId.trim()
        );

        if (!author) {
            return res.status(400).json({
                error: "The specified authorId does not exist.",
            });
        }

        book.id = id.trim();
        book.authorId = authorId.trim();
        book.title = title.trim();
        book.publicationDate = publicationDate.trim();

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            error: "Unable to update the book.",
        });
    }
};

// DELETE a book
const deleteBook = (req, res) => {
    try {
        const bookIndex = books.findIndex(
            (item) => item.id === req.params.id
        );

        if (bookIndex === -1) {
            return res.status(404).json({
                error: "Book not found.",
            });
        }

        books.splice(bookIndex, 1);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            error: "Unable to delete the book.",
        });
    }
};

export default {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook,
};