const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    fee_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    fees_type: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    paid_date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unpaid",
    },
  },
  { timestamps: true }
);

module.exports = model("Fees_collection", schema);
