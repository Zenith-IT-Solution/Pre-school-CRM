const { Router } = require("express");

const {
  createExpenses,
  readExpenses,
  removeExpenses,
  updateExpenses,
  pagination_Expenses,
  outputData_Expenses,
} = require("../controllers/accounts/expenses.controller");

const {
  createFees_collection,
  readFees_collection,
  removeFees_collection,
  updateFees_collection,
  statusFees_collection,
  pagination_Fees_collection,
  outputData_Fees_collection,
} = require("../controllers/accounts/feesCollection.controller");

const {
  createSalary,
  readSalary,
  removeSalary,
  updateSalary,
  status_Salary,
  pagination_Salary,
  outputData_Salary,
} = require("../controllers/accounts/salary.controller");
const route = new Router();

route.post("/expens", createExpenses);
route.get("/expens", readExpenses);
route.put("/expen/:id", updateExpenses);
route.delete("/expen/:id", removeExpenses);
route.post("/expen_pagination/", pagination_Expenses);
route.post("/expen_entries/:number", outputData_Expenses);

route.post("/fees", createFees_collection);
route.get("/fees", readFees_collection);
route.put("/fee/:id", updateFees_collection);
route.delete("/fee/:id", removeFees_collection);
route.put("/fee_status/:id", statusFees_collection);
route.post("/fees_pagination/", pagination_Fees_collection);
route.post("/fees_entries/:number", outputData_Fees_collection);

route.post("/salary", createSalary);
route.get("/salary", readSalary);
route.put("/salary/:id", updateSalary);
route.delete("/salary/:id", removeSalary);
route.put("/salary_status/:id", status_Salary);
route.post("/salary_pagination/", pagination_Salary);
route.post("/salary_entries/:number", outputData_Salary);

module.exports = route;
