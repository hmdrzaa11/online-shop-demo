let generateJwt = require("./generateJwt");

module.exports = (user, res, statusCode) => {
  let token = generateJwt(user._id);
  res.status(statusCode).json({
    user,
    token,
  });
};
