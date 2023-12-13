import { Schema, model } from "mongoose";

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  category: {
    type: String,
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

const productModel = model("Product", productSchema);

export { productModel };