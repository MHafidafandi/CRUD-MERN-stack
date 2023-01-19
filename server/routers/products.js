const Product = require("../models/productModel");
const fs = require("fs");
const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      status: "success",
      message: "Get data successfully",
      products,
    });
  } catch (error) {
    return res.status(501).json({
      status: "failed",
      error_message: "Internal Server Error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(401).json({
        status: "failed",
        error_message: "product undefined",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Get data by id successfully",
      product,
    });
  } catch (error) {
    return res.status(501).json({
      status: "failed",
      error_message: "Internal Server Error",
    });
  }
};

const addProduct = async (req, res) => {
  if (!req.files) {
    return res.status(401).json({
      status: "failed",
      error_message: "Please upload a picture for your product",
    });
  }
  const file = req.files.product_img;
  const fileSize = file.size;
  const fileName = new Date().getTime() + "-" + file.name;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = ["image/png", "image/jpg", "image/jpeg"];

  if (!allowedType.includes(file.mimetype)) {
    return res.status(401).json({
      status: "failed",
      error_message: "Please upload a picture with format .png/.jpg/.jpeg",
    });
  }
  if (fileSize > 30000000) {
    return res.status(401).json({
      status: "failed",
      error_message: "image must be less than 3MB",
    });
  }
  await file.mv(`./public/images/${fileName}`);

  try {
    const product = await Product.insertMany({
      ...req.body,
      product_img: fileName,
      url_img: url,
    });
    return res.status(200).json({
      status: "success",
      message: "Add data successfully",
      product,
    });
  } catch (error) {
    return res.status(501).json({
      status: "failed",
      error_message: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  const updated_at = Date.now();
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return res.status(401).json({
      status: "failed",
      error_message: "product undefined",
    });
  }
  let fileName = "";
  if (!req.files) {
    fileName = product.product_img;
  } else {
    const file = req.files.product_img;
    const fileSize = file.size;
    fileName = new Date().getTime() + "-" + file.name;
    const allowedType = ["image/png", "image/jpg", "image/jpeg"];

    if (!allowedType.includes(file.mimetype)) {
      return res.status(401).json({
        status: "failed",
        error_message: "Please upload a picture with format .png/.jpg/.jpeg",
      });
    }
    if (fileSize > 30000000) {
      return res.status(401).json({
        status: "failed",
        error_message: "image must be less than 3MB",
      });
    }
    const filePath = `./public/images/${product.product_img}`;
    fs.unlinkSync(filePath);
    await file.mv(`./public/images/${fileName}`);
  }
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Product.updateOne(product, {
      $set: { ...req.body, product_img: fileName, url_img: url, updated_at },
    });
    return res.status(200).json({
      status: "success",
      message: "Update data successfully",
    });
  } catch (error) {
    return res.status(501).json({
      status: "failed",
      error_message: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return res.status(401).json({
      status: "failed",
      error_message: "product undefined",
    });
  }
  try {
    await Product.deleteOne(product);
    return res.status(200).json({
      status: "success",
      message: "Delete data successfully",
    });
  } catch (error) {
    return res.status(501).json({
      status: "failed",
      error_message: "Internal Server Error",
    });
  }
};

module.exports = {
  getProduct,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
