const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Member ID is required"],
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ["borrowed", "returned"],
        message: "Status must be either borrowed or returned",
      },
      default: "borrowed",
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for quick lookups
borrowSchema.index({ memberId: 1, bookId: 1, status: 1 });

// Remove __v from output
borrowSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("Borrow", borrowSchema);
