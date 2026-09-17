import express from "express";
import booksController from "../controllers/booksController.js";

const router = express.Router();

// Get all books
router.get("/", booksController.getAllBooks);

// Get a single book
router.get("/:id", booksController.getSingleBook);

export default router;