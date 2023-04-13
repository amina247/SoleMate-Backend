const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const router = require("express").Router();
const mongoose = require("mongoose");

const Shoe = require("../models/Shoe.model");



//Create:
// POST /api/shoes
router.post("/", isAuthenticated, (req, res, next) => {
    const { model, brand, size, price, description, imageUrl,  } = req.body;

    Shoe.create({  model, brand, size, price, description, imageUrl,  })
        .then(response => res.status(201).json(response))
        .catch(err => {
            console.log("error creating a new shoe", err);
            res.status(500).json({
                message: "error creating a new shoe",
                error: err
            });
        })
});



//READ:
// Get /api/shoes
router.get("/", (req, res, next) =>{
    Shoe.find()
    .then(shoesFromDb => {
        res.json(shoesFromDb);
    })
    .catch(err => {
        console.log("error getting list of shoes", err);
        res.status(500).json({
            message: "error getting list of shoes",
            error: err
        });
    })
});





//DETAILS:
// GET /api/shoes/:shoeId
router.get('/:shoeId', (req, res, next) => {
    const { shoeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shoeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Shoe.findById(shoeId)
        .then(shoe => res.json(shoe))
        .catch(err => {
            console.log("error getting details of a shoe", err);
            res.status(500).json({
                message: "error getting details of a shoe",
               error: err
            });
        })
});





//UPDATE:
// PUT /api/shoes/:shoeId
router.put('/:shoeId', isAuthenticated, (req, res, next) => {
    const { shoeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shoeId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Shoe.findOne({ _id: shoeId, owner: req.payload._id })
        .then(shoe => {
            if (!shoe) {
                res.status(403).json({ message: 'You are not allowed to edit this shoe' });
                return;
            }

            Shoe.findByIdAndUpdate(shoeId, req.body, { new: true })
                .then((updatedShoe) => res.json(updatedShoe))
                .catch(err => {
                    console.log("error updating shoe", err);
                    res.status(500).json({
                        message: "error updating shoe",
                        error: err,
                    });
                })
        })
        .catch(err => {
            console.log("error finding shoe", err);
            res.status(500).json({
                message: "error finding shoe",
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




//BONUS to be added later:
//LIKE:



//DISLIKE:



//COMMENT:



module.exports = router;