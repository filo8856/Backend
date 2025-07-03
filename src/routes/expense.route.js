const express = require("express");
const router = express.Router();
const ExpenseController=require ('../controllers/expense.controller');

router.post("/create",ExpenseController.createExpense);
router.get("/all",ExpenseController.getExpenses);
router.put("/update/:expenseId",ExpenseController.updateExpense);
router.delete("/delete/:expenseId",ExpenseController.deleteExpense);
module.exports=router;