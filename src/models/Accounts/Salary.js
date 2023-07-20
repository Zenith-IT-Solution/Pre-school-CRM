const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    s_id: {
      type: String,
      requied: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    joining_date: {
      type: String,
      required: true,
    },
    amount: {
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

module.exports = model("Salary", schema);
