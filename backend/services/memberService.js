const User = require("../models/User");
const Borrow = require("../models/Borrow");

/**
 * Get all members (librarian only)
 */
const getAllMembers = async ({ page = 1, limit = 10 }) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const [members, total] = await Promise.all([
    User.find({ role: "member" }).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    User.countDocuments({ role: "member" }),
  ]);

  return {
    members,
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
 * Delete a member (librarian only)
 */
const deleteMember = async (id) => {
  const member = await User.findOne({ _id: id, role: "member" });
  if (!member) {
    const error = new Error("Member not found.");
    error.statusCode = 404;
    throw error;
  }

  // Check if member has active borrows
  const activeBorrows = await Borrow.countDocuments({ memberId: id, status: "borrowed" });
  if (activeBorrows > 0) {
    const error = new Error(
      `Cannot delete member. They have ${activeBorrows} book(s) currently borrowed.`
    );
    error.statusCode = 400;
    throw error;
  }

  await User.findByIdAndDelete(id);
  return member;
};

/**
 * Get books currently borrowed by a member
 */
const getMyBooks = async (memberId) => {
  const borrows = await Borrow.find({ memberId, status: "borrowed" })
    .populate("bookId", "title author isbn category")
    .sort({ borrowDate: -1 });

  return borrows;
};

const getMemberBorrowedBooks = async (memberId) => {
  const member = await User.findOne({ _id: memberId, role: "member" }).select(
    "name email role createdAt"
  );

  if (!member) {
    const error = new Error("Member not found.");
    error.statusCode = 404;
    throw error;
  }

  const borrows = await Borrow.find({ memberId })
    .populate("bookId", "title author isbn category quantity availableQuantity")
    .sort({ borrowDate: -1 });

  const activeBorrows = borrows.filter((borrow) => borrow.status === "borrowed");

  return {
    member,
    summary: {
      totalBorrowedRecords: borrows.length,
      currentlyBorrowed: activeBorrows.length,
      returnedBooks: borrows.length - activeBorrows.length,
    },
    borrows,
  };
};

module.exports = { getAllMembers, deleteMember, getMyBooks, getMemberBorrowedBooks };
