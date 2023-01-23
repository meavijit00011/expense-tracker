const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  title:{
      type:String
  },
  date: {
    type: String,
  },
  description: {
    type: String,
  },
  transactionType: {
    type: String,
  },
  expenseType: {
    type: Number,
  },
  createdBy: {
    type: String,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
