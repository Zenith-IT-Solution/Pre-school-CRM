const Fees_collection = require("../../models/Accounts/Fees_collection");
const Joi = require("joi");

// create Fees_collection
const createFees_collection = async (req, res) => {
  const { fee_id, name, gender, fees_type, amount, paid_date } = req.body;

  // VALIDATION
  const schema = Joi.object({
    fee_id: Joi.string().required(),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    fees_type: Joi.string().required(),
    amount: Joi.string().required(),
    paid_date: Joi.string().required(),
  });
  const { error } = schema.validate({
    fee_id,
    name,
    gender,
    fees_type,
    amount,
    paid_date,
  });
  if (error) {
    return res.status(403).json({ error: error.message });
  }

  Fees_collection.create({
    fee_id,
    name,
    gender,
    fees_type,
    amount,
    paid_date,
  });
  res.status(201).json({ message: "created" });
};

// read fees

const readFees_collection = async (req, res) => {
  const feesCollections = await Fees_collection.find();
  res.status(200).json({ message: feesCollections });
};

// update fees
const updateFees_collection = async (req, res) => {
  const { id } = req.params;
  const { fee_id, name, gender, fees_type, amount, paid_date } = req.body;
  // VALIDATION
  const schema = Joi.object({
    fee_id: Joi.string().required(),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    fees_type: Joi.string().required(),
    amount: Joi.string().required(),
    paid_date: Joi.string().required(),
  });
  const { error } = schema.validate({
    fee_id,
    name,
    gender,
    fees_type,
    amount,
    paid_date,
  });
  if (error) {
    return res.status(403).json({ error: error.message });
  }

  await Fees_collection.findByIdAndUpdate(id, {
    $set: {
      fee_id,
      name,
      gender,
      fees_type,
      amount,
      paid_date,
    },
  });
  res.status(200).json({ message: "Updated" });
};

// delete
const removeFees_collection = async (req, res) => {
  const { id } = req.params;
  await Fees_collection.findByIdAndDelete(id);

  res.status(200).json({ message: "deleted" });
};

// status
const statusFees_collection = async (req, res) => {
  const { id } = req.params;
  const findFees = await Fees_collection.findById(id);

  await Fees_collection.findByIdAndUpdate(id, {
    $set: {
      status: findFees.status === "unpaid" ? "paid" : "unpaid",
    },
  });
  res.status(200).json({ message: "Updated" });
};

// pagination frontdan hozirgi page va necha page chiqishini yuborishi kerak

const pagination_Fees_collection = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
  const pageSize = parseInt(req.query.pageSize) || 10; // Number of documents per page (default: 10)

  try {
    const totalCount = await Fees_collection.countDocuments(); // Get the total number of documents in the collection

    const totalPages = Math.ceil(totalCount / pageSize); // Calculate the total number of pages

    const documents = await Fees_collection.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec(); // Execute the query

    res.status(200).json({
      page,
      pageSize,
      totalPages,
      totalCount,
      data: documents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Show_entries

const outputData_Fees_collection = async (req, res) => {
  const number = parseInt(req.params.number); // Incoming number

  try {
    const data = await Fees_collection.find().limit(number).exec(); // Query the collection with limit

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createFees_collection,
  readFees_collection,
  removeFees_collection,
  updateFees_collection,
  statusFees_collection,
  pagination_Fees_collection,
  outputData_Fees_collection,
};
