import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  userSender: {
    type: String,
    required: true,
  },
  userReceiver: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const messageModel = model("Message", messageSchema);

export { messageModel };