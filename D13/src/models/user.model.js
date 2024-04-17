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
  documents: [{
    tipo: String,
    name: String,
    reference: String
  }],
  last_connection: Date,
  resetToken: String,
  resetTokenExpiration: Date
});

userSchema.methods.login = function() {
  this.last_connection = new Date();
  return this.save();
};

userSchema.methods.logout = function() {
  this.last_connection = new Date();
  return this.save();
};

const userModel = model('User', userSchema);

export { userModel };