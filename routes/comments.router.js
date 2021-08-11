let commentRouter = require("express").Router({ mergeParams: true });
let commentController = require("../controllers/comments.controller");
let userController = require("../controllers/users.controller");

commentRouter.post(
  "/",
  userController.protect,
  userController.restrictedTo("customer"),
  commentController.createComment
);

module.exports = commentRouter;
