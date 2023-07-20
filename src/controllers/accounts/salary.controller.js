const Salary = require("../../models/Accounts/Salary");
const Joi = require("joi");

// create Salary
const createSalary = async (req, res) => {
  const { s_id, name, gender, amount, joining_date } = req.body;

  // VALIDATION
  const schema = Joi.object({
    s_id: Joi.string().required(),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    joining_date: Joi.string().required(),
    amount: Joi.string().required(),
  });
  const { error } = schema.validate({
    s_id,
    name,
    gender,
    joining_date,
    amount,
  });
  if (error) {
    return res.status(403).json({ error: error.message });
  }

  Salary.create({
    s_id,
    name,
    gender,
    joining_date,
    amount,
  });
  res.status(201).json({ message: "created" });
};

// read Salary

const readSalary = async (req, res) => {
  const salary = await Salary.find();
  res.status(200).json({ message: salary });
};

// update Salary
const updateSalary = async (req, res) => {
  const { id } = req.params;
  const { s_id, name, gender, joining_date, amount } = req.body;
  // VALIDATION
  const schema = Joi.object({
    s_id: Joi.string().required(),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    joining_date: Joi.string().required(),
    amount: Joi.string().required(),
  });
  const { error } = schema.validate({
    s_id,
    name,
    gender,
    joining_date,
    amount,
  });
  if (error) {
    return res.status(403).json({ error: error.message });
  }

  await Salary.findByIdAndUpdate(id, {
    $set: {
      s_id,
      name,
      gender,
      joining_date,
      amount,
    },
  });
  res.status(200).json({ message: "Updated" });
};

// delete
const removeSalary = async (req, res) => {
  const { id } = req.params;
  await Salary.findByIdAndDelete(id);

  res.status(200).json({ message: "deleted" });
};

// status
const status_Salary = async (req, res) => {
  const { id } = req.params;
  const findSalary = await Salary.findById(id);

  await Salary.findByIdAndUpdate(id, {
    $set: {
      status: findSalary.status === "unpaid" ? "paid" : "unpaid",
    },
  });
  res.status(200).json({ message: "Updated" });
};

// pagination frontdan hozirgi page va necha page chiqishini yuborishi kerak

const pagination_Salary = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number (default: 1)
  const pageSize = parseInt(req.query.pageSize) || 10; // Number of documents per page (default: 10)

  try {
    const totalCount = await Salary.countDocuments(); // Get the total number of documents in the collection

    const totalPages = Math.ceil(totalCount / pageSize); // Calculate the total number of pages

    const documents = await Salary.find()
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

const outputData_Salary = async (req, res) => {
  const number = parseInt(req.params.number); // Incoming number

  try {
    const data = await Salary.find().limit(number).exec(); // Query the collection with limit

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSalary,
  readSalary,
  removeSalary,
  updateSalary,
  status_Salary,
  pagination_Salary,
  outputData_Salary,
};
