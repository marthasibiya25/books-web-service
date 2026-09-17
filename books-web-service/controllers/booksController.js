import books from "../models/books.js";

// Get all books
const getAllBooks = (req, res) => {
    res.status(200).json(books);
};

// Get a single book
const getSingleBook = (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find((book) => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found",
        });
    }

    res.status(200).json(book);
};

export default {
    getAllBooks,
    getSingleBook,
};