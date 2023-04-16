const { Schema, model } = require("mongoose");

const shoeSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    forSale: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);


shoeSchema.methods.belongsTo = function (user) {
  return this.owner.toString() === user._id.toString();
};


const Shoe = model("Shoe", shoeSchema);
module.exports = Shoe;
