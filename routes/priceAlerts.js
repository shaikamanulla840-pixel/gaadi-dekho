const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PriceAlert = require('../models/PriceAlert');
const TwoWheeler = require('../models/TwoWheeler');

// @route   POST api/price-alerts
// @desc    Create a price alert
// @access  Private
router.post('/', auth, async (req, res) => {
    const { twoWheelerId } = req.body;

    if (!twoWheelerId) {
        return res.status(400).json({ msg: 'Vehicle ID is required.' });
    }

    try {
        const twoWheeler = await TwoWheeler.findById(twoWheelerId);
        if (!twoWheeler) {
            return res.status(404).json({ msg: 'Vehicle not found' });
        }

        // Check if an active alert already exists for this user and vehicle
        const existingAlert = await PriceAlert.findOne({ user: req.user.id, twoWheeler: twoWheelerId, status: 'active' });
        if (existingAlert) {
            return res.status(400).json({ msg: 'An active price alert for this vehicle already exists.' });
        }

        const newAlert = new PriceAlert({
            user: req.user.id,
            twoWheeler: twoWheelerId,
            initialPrice: twoWheeler.price
        });

        await newAlert.save();
        res.status(201).json(newAlert);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/price-alerts/my-alerts
// @desc    Get all alerts for a user
// @access  Private
router.get('/my-alerts', auth, async (req, res) => {
    try {
        const alerts = await PriceAlert.find({ user: req.user.id })
            .populate('twoWheeler', ['name', 'brand', 'price', 'images'])
            .sort({ createdAt: -1 });
        res.json(alerts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/price-alerts/:id
// @desc    Delete a price alert
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const alert = await PriceAlert.findById(req.params.id);

        if (!alert) {
            return res.status(404).json({ msg: 'Alert not found' });
        }

        // Make sure user owns the alert
        if (alert.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await PriceAlert.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Price alert removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
