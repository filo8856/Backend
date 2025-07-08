const Expense = require("../models/Expense");
const mongoose = require('mongoose');

exports.getExpenses = (req, res) => {
    Expense.find({ userId: req.body.userId })
        .sort({ date: -1 })
        .select("amount description category date _id")
        .exec()
        .then((result) => {
            //console.log(result);
            const response = {
                count: result.length,
                expenses: result.map((expense) => {
                    return {
                        _id:expense._id,
                        amount: expense.amount,
                        description: expense.description,
                        category: expense.category,
                        date: expense.date,
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error,
            });
        });
}
exports.createExpense = (req, res) => {
    const expense = new Expense({
        userId: req.body.userId,
        amount: req.body.amount,
        description: req.body.description,
        date: req.body.date,
        category: req.body.category,
    });

    expense
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Created expense successfully!",
                createdExpense: {
                    _id: result._id,
                    amount: result.amount,
                    description: result.description,
                    category: result.category,
                    date: result.date,
                },
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                error: error,
            });
        });
}

exports.updateExpense = (req, res) => {
    const id = req.params.expenseId;
    const updateOps = req.body;

    Expense.updateOne(
        { _id: id, userId: req.body.userId },
        { $set: updateOps }
    )
    .exec()
    .then((result) => {
        res.status(200).json({
            message: "Expense updated successfully",
            result: result
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
};

exports.deleteExpense = (req, res) => {
  const id = req.params.expenseId;

  Expense.deleteOne({
    _id: id,
    userId: req.body.userId
  })
    .exec()
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({
          message: "Expense not found"
        });
      }
      console.log('deleted')
      res.status(200).json({
        message: "Expense deleted"
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    });
};


