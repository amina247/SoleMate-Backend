const router = require("express").Router();
const mongoose = require("mongoose");

const Transaction = require("../models/Transaction.model");
const { isAuthenticated } = require("../middlewares");



//CREATE:
// POST /api/transactions
router.post("/", isAuthenticated, (req, res, next) => {
    const { buyer, seller, shoe, transactionDate, price, status } = req.body;

    Transaction.create({ buyer, seller, shoe, transactionDate, price, status })
        .then(transaction => res.status(201).json(transaction))
        .catch(err => {
            console.log("Error creating a new transaction", err);
            res.status(500).json({
                message: "Error creating a new transaction",
                error: err
            });
        });
});




//READ:
// GET /api/transactions
router.get("/", isAuthenticated, (req, res, next) => {
    Transaction.find()
        .populate("buyer seller shoe")
        .then(transactions => res.json(transactions))
        .catch(err => {
            console.log("Error getting transactions", err);
            res.status(500).json({
                message: "Error getting transactions",
                error: err
            });
        });
});





//DETAILS:
// GET /api/transactions/:transactionId
router.get("/:transactionId", isAuthenticated, (req, res, next) => {
    const { transactionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Transaction.findById(transactionId)
        .populate("buyer seller shoe")
        .then(transaction => res.json(transaction))
        .catch(err => {
            console.log("Error getting transaction details", err);
            res.status(500).json({
                message: "Error getting transaction details",
                error: err
            });
        });
});






// DELETE: /api/transactions/:transactionId
router.delete("/:transactionId", isAuthenticated, (req, res, next) => {
    const { transactionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Transaction.findById(transactionId)
        .then(transaction => {
            // Check if the current user is the buyer
            if (transaction.buyer.toString() === req.user._id.toString()) {
                Transaction.findByIdAndRemove(transactionId)
                    .then(() => res.json({ message: `Transaction with ${transactionId} is removed successfully.` }))
                    .catch(err => {
                        console.log("Error deleting transaction", err);
                        res.status(500).json({
                            message: "Error deleting transaction",
                            error: err
                        });
                    });
            } else {
                res.status(403).json({ message: "You are not authorized to delete this transaction" });
            }
        })
        .catch(err => {
            console.log("Error getting transaction details", err);
            res.status(500).json({
                message: "Error getting transaction details",
                error: err
            });
        });
});




module.exports = router;