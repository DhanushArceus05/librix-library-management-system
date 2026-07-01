const bookService = require("../services/bookService");
const borrowService = require("../services/borrowService");
const { sendSuccess } = require("../utils/apiResponse");

const addBook = async (req, res, next) => {
  try {
    const book = await bookService.addBook(req.body);
    return sendSuccess(res, 201, "Book added successfully.", { book });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const { page, limit, search, category } = req.query;
    const { books, meta } = await bookService.getAllBooks({ page, limit, search, category });
    return sendSuccess(res, 200, "Books retrieved successfully.", { books }, meta);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    return sendSuccess(res, 200, "Book retrieved successfully.", { book });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    return sendSuccess(res, 200, "Book updated successfully.", { book });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    await bookService.deleteBook(req.params.id);
    return sendSuccess(res, 200, "Book deleted successfully.");
  } catch (error) {
    next(error);
  }
};

const borrowBook = async (req, res, next) => {
  try {
    const borrow = await borrowService.borrowBook(req.params.id, req.user._id);
    return sendSuccess(res, 201, "Book borrowed successfully.", { borrow });
  } catch (error) {
    next(error);
  }
};

const returnBook = async (req, res, next) => {
  try {
    const borrow = await borrowService.returnBook(req.params.id, req.user._id);
    return sendSuccess(res, 200, "Book returned successfully.", { borrow });
  } catch (error) {
    next(error);
  }
};

module.exports = { addBook, getAllBooks, getBookById, updateBook, deleteBook, borrowBook, returnBook };
