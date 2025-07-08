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