const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

// @route   POST api/reviews
// @desc    Add a new review for a two-wheeler
// @access  Private
router.post('/', auth, async (req, res) => {
    const { twoWheeler, rating, comment } = req.body;

    try {
        const newReview = new Review({
            user: req.user.id,
            twoWheeler,
            rating,
            comment
        });

        const review = await newReview.save();
        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/reviews/:twoWheelerId
// @desc    Get all reviews for a specific two-wheeler
// @access  Public
router.get('/:twoWheelerId', async (req, res) => {
    try {
        const reviews = await Review.find({ twoWheeler: req.params.twoWheelerId }).populate('user', ['username']);
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
