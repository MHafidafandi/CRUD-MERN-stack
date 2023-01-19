const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    default: 0,
  },
  product_stok: {
    type: Number,
    default: 0,
  },
  product_rate: {
    type: Number,
    default: 0,
  },
  product_desc: {
    type: String,
    default: "",
  },
  product_img: {
    type: String,
    required: true,
  },
  url_img: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
