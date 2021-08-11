let mongoose = require("mongoose");
let { default: validator } = require("validator");
let bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

let roleSchema = new Schema({
  name: {
    type: String,
    default: "customer",
    enum: {
      values: ["customer", "operator", "admin", "super-admin"],
      message: "invalid role for user",
    },
  },
});

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      lowercase: true,
      minlength: [4, "username can not be lower than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
        message(prop) {
          return `${prop.value} is invalid Email Address`;
        },
      },
    },
    password: {
      type: String,
      minLength: [8, "password must be at least 8 characters long"],
      required: [true, "password is required"],
      trim: true,
    },
    passwordConfirm: {
      type: String,
      required: [true, "password confirmation is required"],
      validate: {
        validator(value) {
          return value === this.password;
        },
        message: "password and password confirmation do not match",
      },
    },
    roles: [roleSchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

//Hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  let hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  this.passwordConfirm = undefined;
  next();
});

//compare password

userSchema.methods.comparePassword = async function (candidatePass) {
  return await bcrypt.compare(candidatePass, this.password);
};

let User = mongoose.model("User", userSchema);

module.exports = User;
