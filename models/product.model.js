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
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

const productModel = model("User", productSchema);

export { productModel };