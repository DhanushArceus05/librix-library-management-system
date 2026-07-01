const Book = require("../models/Book");
const Borrow = require("../models/Borrow");

/**
 * Borrow a book
 */
const borrowBook = async (bookId, memberId) => {
  // 1. Check book exists
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error("Book not found.");
    error.statusCode = 404;
    throw error;
  }

  // 2. Check availability
  if (book.availableQuantity <= 0) {
    const error = new Error("Book is currently unavailable.");
    error.statusCode = 400;
    throw error;
  }

  // 3. Check if member already has this book borrowed
  const existingBorrow = await Borrow.findOne({ memberId, bookId, status: "borrowed" });
  if (existingBorrow) {
    const error = new Error("You have already borrowed this book. Please return it before borrowing again.");
    error.statusCode = 400;
    throw error;
  }

  // 4. Create borrow record and decrease availableQuantity atomically
  const borrow = await Borrow.create({ memberId, bookId, borrowDate: new Date() });

  await Book.findByIdAndUpdate(bookId, { $inc: { availableQuantity: -1 } });

  // Return populated borrow record
  const populatedBorrow = await Borrow.findById(borrow._id)
    .populate("bookId", "title author isbn category")
    .populate("memberId", "name email");

  return populatedBorrow;
};

/**
 * Return a borrowed book
 */
const returnBook = async (bookId, memberId) => {
  // 1. Find the active borrow record
  const borrow = await Borrow.findOne({ memberId, bookId, status: "borrowed" });
  if (!borrow) {
    const error = new Error("No active borrow record found. You have not borrowed this book or it has already been returned.");
    error.statusCode = 400;
    throw error;
  }

  // 2. Update borrow record status and returnDate
  borrow.status = "returned";
  borrow.returnDate = new Date();
  await borrow.save();

  // 3. Increase availableQuantity
  await Book.findByIdAndUpdate(bookId, { $inc: { availableQuantity: 1 } });

  // Return populated record
  const populatedBorrow = await Borrow.findById(borrow._id)
    .populate("bookId", "title author isbn category")
    .populate("memberId", "name email");

  return populatedBorrow;
};

module.exports = { borrowBook, returnBook };
