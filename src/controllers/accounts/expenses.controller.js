const Expenses = require("../../models/Accounts/Expenses");
const Joi = require("joi");

// create Expenses
const createExpenses = async (req, res) => {
  const {
    expen_id,
    item_name,
    item_quality,
    purchase_source,
    amount,
    purchase_date,
    purchase_by,
  } = req.body;

  
  // VALIDATION
  const schema = Joi.object({
    expen_id: Joi.string().required(),
    item_name: Joi.string().required(),
    item_quality: Joi.number().required(),
    purchase_source: Joi.string().required(),
    amount: Joi.string().required(),
    purchase_date: Joi.string().required(),
    purchase_by: Joi.string().required(),
  });
  const { error } = schema.validate({
    expen_id,
    item_name,
    item_quality,
    purchase_source,
    amount,
    purchase_date,
    purchase_by,
  });
  if (error) {
    console.log(error);
    return res.status(403).json({ error: error.message });
  }

  Expenses.create({
    expen_id,
    item_name,
    item_quality,
    purchase_source,
    amount,
    purchase_date,
    purchase_by,
  });
  res.status(201).json({ message: "created" });
};

// read Expenses

const readExpenses = async (req, res) => {
  const feesCollections = await Expenses.find();
  res.status(200).json({ message: feesCollections });
};

// update Expenses
const updateExpenses = async (req, res) => {
  const { id } = req.params;
  const {
    expen_id,
    item_name,
    item_quality,
    purchase_source,
    amount,
    purchase_date,
    purchase_by,
  } = req.body;

  // VALIDATION
  const schema = Joi.object({
    expen_id: Joi.string().required(),
    item_name: Joi.string().required(),
    item_quality: Joi.number().required(),
    purchase_source: Joi.string().required(),
    amount: Joi.string().required(),
    purchase_date: Joi.string().required(),
    purchase_by: Joi.string().required(),
  });
  const { error } = schema.validate({
    expen_id,
    item_name,
    item_quality,
    purchase_source,
    amount,
    purchase_date,
    purchase_by,
  });
  if (error) {
    return res.status(403).json({ error: error.message });
  }

  await Expenses.findByIdAndUpdate(id, {
    $set: {
      expen_id,
      item_name,
      item_quality,
      purchase_source,
      amount,
      purchase_date,
      purchase_by,
    },
  });
  res.status(200).json({ message: "Updated" });
};

// delete
const removeExpenses = async (req, res) => {
  const { id } = req.params;
  await Expenses.findByIdAndDelete(id);

  res.status(200).json({ message: "deleted" });
};

// pagination frontdan hozirgi page va necha page chiqishini yuborishi kerak

const pagination_Expenses = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
  const pageSize = parseInt(req.query.pageSize) || 10; // Number of documents per page (default: 10)

  try {
    const totalCount = await Expenses.countDocuments(); // Get the total number of documents in the collection

    const totalPages = Math.ceil(totalCount / pageSize); // Calculate the total number of pages

    const documents = await Expenses.find()
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

const outputData_Expenses = async (req, res) => {
  const number = parseInt(req.params.number); // Incoming number

  try {
    const data = await Expenses.find().limit(number).exec(); // Query the collection with limit

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createExpenses, readExpenses, removeExpenses, updateExpenses, pagination_Expenses, outputData_Expenses };
