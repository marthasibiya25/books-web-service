import express from "express";
import booksController from "../controllers/booksController.js";

const router = express.Router();

// GET all books
router.get("/", booksController.getAllBooks);

// GET one book
router.get("/:id", booksController.getSingleBook);

// CREATE a book
router.post("/", booksController.createBook);

// UPDATE a book
router.put("/:id", booksController.updateBook);

// DELETE a book
router.delete("/:id", booksController.deleteBook);

export default router;