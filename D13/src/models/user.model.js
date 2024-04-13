import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'user'
  },
  rol: {
    type: String,
    default: 'standar'
  },
  resetToken: String,
  resetTokenExpiration: Date
});

const userModel = model('User', userSchema);

export { userModel };