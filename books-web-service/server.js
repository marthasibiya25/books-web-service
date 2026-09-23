import express from "express";
import dotenv from "dotenv";
import booksRoutes from "./routes/booksRoutes.js";
import authorsRoutes from "./routes/authorsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Books Web Service is running!");
});

// Books routes
app.use("/api/books", booksRoutes);

// Authors routes
app.use("/api/authors", authorsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});