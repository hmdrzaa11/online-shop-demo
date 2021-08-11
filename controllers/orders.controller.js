let Order = require("../models/order.model");
let Cart = require("../models/cart.model");

exports.submit = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    let newOrder = await Order.create({
      user: req.user._id,
      products: cart.products,
      totalPrice: cart.total,
    });

    //do the payment and empty remove the cart
    // await cart.remove();
    let populatedOrders = await Order.findOne({ _id: newOrder._id }).populate({
      path: "products",
    });
    console.log(populatedOrders);
    res.status(200).json({
      orderSummary: newOrder,
    });
  } catch (error) {
    next(error);
  }
};
