let Category = require("../models/category.models");

exports.createCategory = async (req, res, next) => {
  try {
    let { name } = req.body;

    let category = await Category.create({ name });
    res.status(201).json({
      category,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    let categories = await Category.find();
    res.json({
      categories,
    });
  } catch (error) {
    next(error);
  }
};
