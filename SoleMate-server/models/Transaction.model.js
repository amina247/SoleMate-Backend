const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    // buyer: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "Buyer is required."],
    // },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller is required."],
    },
    shoe: {
      type: Schema.Types.ObjectId,
      ref: "Shoe",
      required: [true, "Shoe is required."],
    },
    transactionDate: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    status: {
      type: String,
      enum: ["pending", "completed",], //cancelled can be added later as a Bonus
      default: "pending",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);
module.exports = Transaction;
