const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    expen_id: {
      type: String,
      required: true,
    },
    item_name: {
      type: String,
      required: true,
    },
    item_quality: {
      type: Number,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    purchase_source: {
      type: String,
      required: true,
    },
    purchase_date: {
      type: String,
      required: true,
    },
    purchase_by: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Expenses", schema);
