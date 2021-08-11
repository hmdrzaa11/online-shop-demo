let express = require("express");
let userRouter = require("./routes/users.router");
let productRouter = require("./routes/products.router");
let commentRouter = require("./routes/comments.router");
let categoryRouter = require("./routes/categories.router");
let orderRouter = require("./routes/orders.router");

let app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/orders", orderRouter);

//global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "failed",
    error: err.message,
  });
});

module.exports = app;
