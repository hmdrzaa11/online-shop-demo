let Product = require("../models/product.model");
let Cart = require("../models/cart.model");

exports.createProduct = async (req, res, next) => {
  try {
    let { title, price, quantity } = req.body;
    let { categoryId } = req.params;
    let product = await Product.create({
      title,
      price,
      quantity,
      category: categoryId,
    });
    res.status(201).json({
      status: "success",
      product,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    let products = await Product.find();
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    let productId = req.params.productId;
    let userCart = await Cart.findOne({ user: req.user._id });
    let product = await Product.findOne({ _id: productId });
    if (product.quantity <= 0)
      return res
        .status(404)
        .json({ status: "failed", msg: "product sold out" });

    if (!userCart) {
      //create a new cart
      let newCart = await Cart.create({
        user: req.user._id,
        products: [{ product: product._id, quantity: 1 }],
        total: product.price,
      });
      //quantity reduced by one
      product.quantity = product.quantity - 1;
      await product.save();

      return res.status(200).json({
        cart: newCart,
      });
    } else {
      // update the old one
      let prodExists = userCart.products.find((prod) =>
        product._id.equals(prod.product)
      );
      if (prodExists) {
        //add to quantity
        prodExists.quantity = prodExists.quantity + 1;
        userCart.total = userCart.total + product.price;
      } else {
        //add a new item to cart
        userCart.products.push({
          product: product._id,
          quantity: 1,
        });
        userCart.total = userCart.total + product.price;
      }
      await userCart.save();
      //reduce quantity of product
      product.quantity = product.quantity - 1;
      await product.save();

      let cart = await Cart.findOne({ user: req.user._id }).populate({
        path: "products.product",
        model: "Product",
      });

      res.status(200).json({
        cart: cart,
      });
    }
  } catch (error) {
    next(error);
  }
};
