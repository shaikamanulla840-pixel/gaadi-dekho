const express = require('express');
const router = express.Router();
const TestRide = require('../models/TestRide');
const auth = require('../middleware/auth');

// @route   POST api/test-rides
// @desc    Book a new test ride
// @access  Private (User)
router.post('/', auth, async (req, res) => {
    const { user, twoWheeler, showroom, date, time } = req.body;

    try {
        const newTestRide = new TestRide({
            user,
            twoWheeler,
            showroom,
            date,
            time
        });

        const testRide = await newTestRide.save();
        res.json(testRide);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/test-rides/user/:userId
// @desc    Get all test rides for a specific user
// @access  Private (User)
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const testRides = await TestRide.find({ user: req.params.userId })
            .populate('twoWheeler')
            .populate('showroom');
        res.json(testRides);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/test-rides/:id
// @desc    Get a single test ride by ID
// @access  Private (User/Admin/Dealer)
router.get('/:id', auth, async (req, res) => {
    try {
        const testRide = await TestRide.findById(req.params.id)
            .populate('user')
            .populate('twoWheeler')
            .populate('showroom');
        if (!testRide) {
            return res.status(404).json({ msg: 'Test ride not found' });
        }
        res.json(testRide);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Test ride not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/test-rides/:id
// @desc    Update a test ride's status or details
// @access  Private (Admin/Dealer)
router.put('/:id', auth, async (req, res) => {
    const { date, time, status } = req.body;

    // Build test ride object
    const testRideFields = {};
    if (date) testRideFields.date = date;
    if (time) testRideFields.time = time;
    if (status) testRideFields.status = status;

    try {
        let testRide = await TestRide.findById(req.params.id);
        if (!testRide) return res.status(404).json({ msg: 'Test ride not found' });

        testRide = await TestRide.findByIdAndUpdate(
            req.params.id,
            { $set: testRideFields },
            { new: true }
        );

        res.json(testRide);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/test-rides/:id
// @desc    Cancel/Delete a test ride
// @access  Private (User/Admin/Dealer)
router.delete('/:id', auth, async (req, res) => {
    try {
        const testRide = await TestRide.findById(req.params.id);
        if (!testRide) return res.status(404).json({ msg: 'Test ride not found' });

        await TestRide.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Test ride cancelled' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
