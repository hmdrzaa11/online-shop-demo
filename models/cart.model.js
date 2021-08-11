let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
});

productSchema.pre(/^find/, function (next) {
  this.populate("product");
  next();
});

let cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [productSchema],
  total: { type: Number, default: 0 },
});

let Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
