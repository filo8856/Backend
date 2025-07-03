const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User ID is required"]
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount cannot be negative"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  category: {
    type: String,
    required: [true, "Category is required"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
