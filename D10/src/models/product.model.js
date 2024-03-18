import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
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
  oldPrice: {
    type: Number,
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
    type: Array,
  },
  updated: {
    type: Date,
    default: Date.now()
  },
  owner: {
    type: String,
    default: 'admin'
  },
});

productSchema.plugin(mongoosePaginate);
const productModel = model("Product", productSchema);

export { productModel };