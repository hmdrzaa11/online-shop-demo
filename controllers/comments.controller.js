let Comment = require("../models/comment.model");

exports.createComment = async (req, res, next) => {
  try {
    let { content, ratings } = req.body;
    let productId = req.params.productId;
    let comment = await Comment.create({
      content,
      ratings,
      user: req.user._id,
      product: productId,
    });
    res.status(201).json({ status: "success", comment });
  } catch (error) {
    next(error);
  }
};
