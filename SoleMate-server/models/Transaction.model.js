const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },
    shoe: {
      type: Schema.Types.ObjectId,
      ref: "Shoe",
      // required: true
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed",], //cancelled can be added later as a Bonus
      default: "pending",
    },
  },
  {
    // object that adds extra properties like createdAt and updatedAt
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);
module.exports = Transaction;
