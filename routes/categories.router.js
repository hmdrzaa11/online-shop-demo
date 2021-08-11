let categoryRouter = require("express").Router();
let categoryController = require("../controllers/categories.controller");
let userController = require("../controllers/users.controller");

categoryRouter.post(
  "/",
  userController.protect,
  userController.restrictedTo("operator"),
  categoryController.createCategory
);

categoryRouter.get("/", categoryController.getAllCategories);

module.exports = categoryRouter;
