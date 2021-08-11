let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  totalPrice: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
});

let Order = mongoose.model("Order", orderSchema);

module.exports = Order;
