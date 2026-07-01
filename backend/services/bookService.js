const Book = require("../models/Book");

/**
 * Add a new book (librarian only)
 */
const addBook = async (bookData) => {
  const existingBook = await Book.findOne({ isbn: bookData.isbn });
  if (existingBook) {
    const error = new Error(`A book with ISBN '${bookData.isbn}' already exists.`);
    error.statusCode = 409;
    throw error;
  }

  const book = await Book.create(bookData);
  return book;
};

/**
 * Get all books with pagination, search, and category filter
 */
const getAllBooks = async ({ page = 1, limit = 10, search, category }) => {
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const [books, total] = await Promise.all([
    Book.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Book.countDocuments(query),
  ]);

  return {
    books,
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: pageNum < Math.ceil(total / limitNum),
      hasPrevPage: pageNum > 1,
    },
  };
};

/**
 * Get a single book by ID
 */
const getBookById = async (id) => {
  const book = await Book.findById(id);
  if (!book) {
    const error = new Error("Book not found.");
    error.statusCode = 404;
    throw error;
  }
  return book;
};

/**
 * Update book details (librarian only)
 */
const updateBook = async (id, updateData) => {
  // Check for duplicate ISBN if being updated
  if (updateData.isbn) {
    const existingBook = await Book.findOne({ isbn: updateData.isbn, _id: { $ne: id } });
    if (existingBook) {
      const error = new Error(`A book with ISBN '${updateData.isbn}' already exists.`);
      error.statusCode = 409;
      throw error;
    }
  }

  // If quantity is updated, adjust availableQuantity accordingly
  if (updateData.quantity !== undefined) {
    const currentBook = await Book.findById(id);
    if (!currentBook) {
      const error = new Error("Book not found.");
      error.statusCode = 404;
      throw error;
    }

    const borrowedCount = currentBook.quantity - currentBook.availableQuantity;
    const newAvailable = updateData.quantity - borrowedCount;

    if (newAvailable < 0) {
      const error = new Error(
        `Cannot reduce quantity below the number of currently borrowed copies (${borrowedCount}).`
      );
      error.statusCode = 400;
      throw error;
    }

    updateData.availableQuantity = newAvailable;
  }

  const book = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    const error = new Error("Book not found.");
    error.statusCode = 404;
    throw error;
  }

  return book;
};

/**
 * Delete a book (librarian only)
 */
const deleteBook = async (id) => {
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    const error = new Error("Book not found.");
    error.statusCode = 404;
    throw error;
  }
  return book;
};

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook };
