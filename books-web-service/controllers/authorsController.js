import authors from "../models/authors.js";

// GET all authors
export const getAllAuthors = (req, res) => {
    try {
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({
            error: "Unable to retrieve authors.",
        });
    }
};

// GET one author
export const getAuthorById = (req, res) => {
    try {
        const author = authors.find((item) => item.id === req.params.id);

        if (!author) {
            return res.status(404).json({
                error: "Author not found.",
            });
        }

        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({
            error: "Unable to retrieve the author.",
        });
    }
};

// CREATE an author
export const createAuthor = (req, res) => {
    try {
        const { id, name, birthYear } = req.body;

        if (!id || typeof id !== "string" || !id.trim()) {
            return res.status(400).json({
                error: "Author id is required and must be a non-empty string.",
            });
        }

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                error: "Author name is required and must be a non-empty string.",
            });
        }

        if (
            birthYear === undefined ||
            birthYear === null ||
            !Number.isInteger(Number(birthYear)) ||
            String(birthYear).length !== 4
        ) {
            return res.status(400).json({
                error: "Birth year must be a valid four-digit number.",
            });
        }

        const existingAuthor = authors.find((author) => author.id === id);

        if (existingAuthor) {
            return res.status(400).json({
                error: "An author with that id already exists.",
            });
        }

        const newAuthor = {
            id: id.trim(),
            name: name.trim(),
            birthYear: Number(birthYear),
        };

        authors.push(newAuthor);

        res.status(201).json(newAuthor);
    } catch (error) {
        res.status(500).json({
            error: "Unable to create the author.",
        });
    }
};

// UPDATE an author
export const updateAuthor = (req, res) => {
    try {
        const author = authors.find((item) => item.id === req.params.id);

        if (!author) {
            return res.status(404).json({
                error: "Author not found.",
            });
        }

        const { id, name, birthYear } = req.body;

        if (!id || typeof id !== "string" || !id.trim()) {
            return res.status(400).json({
                error: "Author id is required and must be a non-empty string.",
            });
        }

        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                error: "Author name is required and must be a non-empty string.",
            });
        }

        if (
            birthYear === undefined ||
            birthYear === null ||
            !Number.isInteger(Number(birthYear)) ||
            String(birthYear).length !== 4
        ) {
            return res.status(400).json({
                error: "Birth year must be a valid four-digit number.",
            });
        }

        if (id !== req.params.id) {
            const duplicateAuthor = authors.find((item) => item.id === id);

            if (duplicateAuthor) {
                return res.status(400).json({
                    error: "An author with that id already exists.",
                });
            }
        }

        author.id = id.trim();
        author.name = name.trim();
        author.birthYear = Number(birthYear);

        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({
            error: "Unable to update the author.",
        });
    }
};

// DELETE an author
export const deleteAuthor = (req, res) => {
    try {
        const authorIndex = authors.findIndex(
            (item) => item.id === req.params.id
        );

        if (authorIndex === -1) {
            return res.status(404).json({
                error: "Author not found.",
            });
        }

        authors.splice(authorIndex, 1);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            error: "Unable to delete the author.",
        });
    }
};