const memberService = require("../services/memberService");
const { sendSuccess } = require("../utils/apiResponse");

const getAllMembers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const { members, meta } = await memberService.getAllMembers({ page, limit });
    return sendSuccess(res, 200, "Members retrieved successfully.", { members }, meta);
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    await memberService.deleteMember(req.params.id);
    return sendSuccess(res, 200, "Member deleted successfully.");
  } catch (error) {
    next(error);
  }
};

const getMyBooks = async (req, res, next) => {
  try {
    const borrows = await memberService.getMyBooks(req.user._id);
    return sendSuccess(res, 200, "Borrowed books retrieved successfully.", { borrows });
  } catch (error) {
    next(error);
  }
};

const getMemberBorrowedBooks = async (req, res, next) => {
  try {
    const result = await memberService.getMemberBorrowedBooks(req.params.id);
    return sendSuccess(res, 200, "Member borrowed books retrieved successfully.", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMembers,
  deleteMember,
  getMyBooks,
  getMemberBorrowedBooks,
};