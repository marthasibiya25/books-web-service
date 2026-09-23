import express from "express";

import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} from "../controllers/authorsController.js";

const router = express.Router();

// GET all authors
router.get("/", getAllAuthors);

// GET one author
router.get("/:id", getAuthorById);

// CREATE an author
router.post("/", createAuthor);

// UPDATE an author
router.put("/:id", updateAuthor);

// DELETE an author
router.delete("/:id", deleteAuthor);

export default router;