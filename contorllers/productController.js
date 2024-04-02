const asyncWrapper = require("../middelwares/asyncWrapper");
const Product = require("../models/productModel");
const productController = {
  getAllProducts: asyncWrapper(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ status: "success", data: products });
  }),
  createProduct: asyncWrapper(async (req, res) => {
    const images = req.files.map((file) => "/" + file.path.split("\\")[1]);
    const product = await Product.create({ ...req.body, images });
    res.status(200).json({ status: "success", data: product });
  }),
  getSingleProduct: asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: "success", data: product });
  }),
  editProduct: asyncWrapper(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", data: product });
  }),
  deleteProduct: asyncWrapper(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: product });
  }),
};
module.exports = productController;
