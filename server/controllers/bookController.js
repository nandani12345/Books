// controllers/bookController.js
const Book = require("../model/Book");

exports.createBook = async (req, res) => {
  const { title, author, condition, imageURL } = req.body;

  if (!title || !author || !condition || !imageURL) {
    return res.status(400).json({
      error:
        "Please provide all required fields: title, author, condition, imageURL",
    });
  }

  try {
    const book = await Book.create({
      title,
      author,
      condition,
      imageURL,
      user: req.user.id,
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/bookController.js
exports.getBooks = async (req, res) => {
  try {
    const { search } = req.query;

    const query = {}; // Ab koi user filter nahi hai

    if (search) {
      query.$or = [
        { title: { $regex: search.trim(), $options: "i" } },
        { author: { $regex: search.trim(), $options: "i" } },
      ];
    }

    const books = await Book.find(query).populate("user", "name");

    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Server error. Could not fetch books." });
  }
};

exports.getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
