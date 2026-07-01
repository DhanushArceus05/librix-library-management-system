const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [300, "Title cannot exceed 300 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      minlength: [2, "Author name must be at least 2 characters"],
      maxlength: [200, "Author name cannot exceed 200 characters"],
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      maxlength: [100, "Category cannot exceed 100 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number",
      },
    },
    availableQuantity: {
      type: Number,
      min: [0, "Available quantity cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Available quantity must be a whole number",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Set availableQuantity to quantity on new book creation
bookSchema.pre("save", function (next) {
  if (this.isNew) {
    this.availableQuantity = this.quantity;
  }
  next();
});

// Remove __v from output
bookSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model("Book", bookSchema);
