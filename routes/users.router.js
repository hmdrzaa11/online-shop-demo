let userRouter = require("express").Router();
let userController = require("../controllers/users.controller");

userRouter.post("/signup", userController.signup);
userRouter.post("/signin", userController.signin);

module.exports = userRouter;
