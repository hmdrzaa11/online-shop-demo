let productRouter = require("express").Router();
let userController = require("../controllers/users.controller");
let productController = require("../controllers/products.controller");
let commentRouter = require("../routes/comments.router");

productRouter.get("/", productController.getAllProducts);

productRouter.get(
  "/:productId/add-to-cart",
  userController.protect,
  productController.addToCart
);

productRouter.post(
  "/:categoryId",
  userController.protect,
  userController.restrictedTo("operator"),
  productController.createProduct
);
//nested route for commenting on a products
productRouter.use("/:productId/comments", commentRouter); //let comment route take care it from here

module.exports = productRouter;
