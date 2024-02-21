import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ticketSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  purchase_datetime: {
    type: Date,
    required: true,
    default: Date.now()
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  }
});


ticketSchema.plugin(mongoosePaginate);
const ticketModel = model("Ticket", ticketSchema);

export { ticketModel };