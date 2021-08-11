let jwt = require("jsonwebtoken");
const User = require("../models/user.model");
let sendJwt = require("../utils/sendJwt");

exports.signup = async (req, res, next) => {
  try {
    let { username, password, passwordConfirm, email } = req.body;
    let user = await User.create({
      username,
      email,
      password,
      passwordConfirm,
      roles: [{ name: "customer" }],
    });
    sendJwt(user, res, 201);
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        status: "failed",
        msg: "email and password are required",
      });

    let user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        status: "failed",
        msg: "invalid email or password",
      });

    //compare passwords
    let isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch)
      return res.status(404).json({
        status: "failed",
        msg: "invalid email or password",
      });

    //generate token

    sendJwt(user, res, 200);
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    token = req.headers["authorization"].split(" ")[1];
  }

  if (!token)
    return res
      .status(401)
      .json({ status: "failed", msg: "to get access you need to login" });

  let { _id } = jwt.verify(token, process.env.JWT_SECRET);
  let user = await User.findOne({ _id });
  if (!user)
    return res
      .status(401)
      .json({ status: "failed", msg: "invalid token please login again" });

  req.user = user;
  next();
};

exports.restrictedTo = (...roles) => {
  return async function (req, res, next) {
    if (roles.includes("operator")) {
      let log = `
      username : ${req.user?.username}
      method  : ${req.method}
      route   : ${req.originalUrl}
      hostname : ${req.hostname}
    `;
      console.log(log);
    }
    let user = await User.findOne({
      _id: req.user._id,
      "roles.name": { $in: roles },
    });
    if (!user)
      return res.status(401).json({
        status: "failed",
        msg: "you are not authorized for access",
      });

    next();
  };
};
