let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let categorySchema = new Schema({
  name: { type: String, required: [true, "category name is required"] },
});

let Category = mongoose.model("Category", categorySchema);

module.exports = Category;
