let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let commentSchema = new Schema({
  user: { ref: "User", type: Schema.Types.ObjectId, required: true },
  product: { ref: "Product", type: Schema.Types.ObjectId, required: true },
  content: { type: String, required: [true, "comment need content"] },
  ratings: { type: Number, default: 4 },
});

commentSchema.index({ user: 1, product: 1 }, { unique: true }); //makes sure that user can comment only one time

let Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
