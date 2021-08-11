let ordersRoutes = require("express").Router();
let userController = require("../controllers/users.controller");
let ordersController = require("../controllers/orders.controller");

ordersRoutes.get(
  "/submit",
  userController.protect,
  userController.restrictedTo("customer"),
  ordersController.submit
);

module.exports = ordersRoutes;
