const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    shoe: {
      type: Schema.Types.ObjectId,
      ref: "Shoe",
      required: true
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    // object that adds extra properties like createdAt and updatedAt
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);
module.exports = Transaction;
