let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productSchema = new Schema({
  title: { type: String, required: [true, "product name is required"] },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: [true, "product price is required"] },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

let Product = mongoose.model("Product", productSchema);

module.exports = Product;
