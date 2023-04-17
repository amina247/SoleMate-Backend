const router = require("express").Router();
const mongoose = require("mongoose");

const Transaction = require("../models/Transaction.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");



//CREATE:
// POST /api/transactions
router.post("/", isAuthenticated, (req, res, next) => {
    const { buyer, seller, shoe, price } = req.body;

    Transaction.create({ buyer, seller, shoe, price })
        .then(transaction => res.status(201).json(transaction))
        .catch(err => {
            console.log("Error creating a new transaction", err);
            res.status(500).json({
                message: "Error creating a new transaction",
                error: err
            });
        });
});




// //READ:
// // GET /api/transactions
// router.get("/", (req, res, next) => {
//     Transaction.find()
//         .populate("buyer seller shoe")
//         .then(transactions => res.json(transactions))
//         .catch(err => {
//             console.log("Error getting transactions", err);
//             res.status(500).json({
//                 message: "Error getting transactions",
//                 error: err
//             });
//         });
// });

//READ:
// GET /api/transactions/seller/:sellerId
router.get("/seller/:sellerId", isAuthenticated, (req, res, next) => {
    const { sellerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Transaction.find({ seller: sellerId })
        .populate("shoe buyer")
        .then(transactions => res.json(transactions))
        .catch(err => {
            console.log("Error getting transactions", err);
            res.status(500).json({
                message: "Error getting transactions",
                error: err
            });
        });
});

//READ:
// GET /api/transactions/buyer/:buyerId
router.get("/buyer/:buyerId", isAuthenticated, (req, res, next) => {
    const { buyerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(buyerId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Transaction.findOne({ buyer: buyerId })
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


//DELETE:
//api/transactions/:transactionId
router.delete('/:transactionId', isAuthenticated, (req, res, next) => {
    const { transactionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Transaction.findByIdAndRemove({ _id: transactionId, seller: req.payload._id })
        .then((deletedTransaction) => {
            if (!deletedTransaction) {
                res.status(403).json({ message: 'You are not allowed to delete this offer' });
                return;
            }

            res.json({ message: `Offer with ${transactionId} is removed successfully.` });
        })
        .catch(err => {
            console.log("error deleting offer", err);
            res.status(500).json({
                message: "error deleting offer",
                error: err,
            });
        })
});


//UPDATE:
// PUT /api/transactions/:transactionId
router.put('/:transactionId', isAuthenticated, (req, res, next) => {
    const { transactionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Transaction.findOne({ _id: transactionId, owner: req.payload._id })
        .then(transaction => {
            if (!transaction) {
                res.status(403).json({ message: 'You are not allowed to edit this shoe' });
                return;
            }

            Transaction.findByIdAndUpdate(transactionId, req.body, { new: true })
                .then((updatedTransaction) => res.json(updatedTransaction))
                .catch(err => {
                    console.log("error updating transaction", err);
                    res.status(500).json({
                        message: "error updating transaction",
                        error: err,
                    });
                })
        })
        .catch(err => {
            console.log("error finding transaction", err);
            res.status(500).json({
                message: "error finding transaction",
                error: err
            });
        });
});

module.exports = router;