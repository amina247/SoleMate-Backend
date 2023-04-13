const { Schema, model } = require("mongoose");

const shoeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Shoe name is required."],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required."],
      trim: true,
    },
    size: {
      type: Number,
      required: [true, "Size is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Shoe owner is required."],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Shoe = model("Shoe", shoeSchema);

module.exports = Shoe;
