const express = require('express');
const router = express.Router();
const TwoWheeler = require('../models/TwoWheeler');
const PriceAlert = require('../models/PriceAlert');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const dealerAuth = require('../middleware/dealerAuth');

// @route   GET api/twoWheelers
// @desc    Get all two-wheelers with filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, brand, fuelType, price, condition, upcomingLaunch } = req.query;
        const query = {};

        if (condition) {
            query.condition = condition;
        }
        if (upcomingLaunch) {
            query.upcomingLaunch = upcomingLaunch === 'true';
        }
        if (brand) {
            query.brand = brand;
        }
        if (fuelType) {
            query.fuelType = fuelType;
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ];
        }
        if (price) {
            const priceRange = price.split('-');
            if (priceRange.length === 2 && priceRange[0] && priceRange[1]) {
                query.price = { $gte: Number(priceRange[0]), $lte: Number(priceRange[1]) };
            } else if (priceRange.length === 1 && priceRange[0]) {
                query.price = { $gte: Number(priceRange[0]) };
            }
        }

        const twoWheelers = await TwoWheeler.find(query);
        res.json(twoWheelers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/twoWheelers/my-listings
// @desc    Get all two-wheelers for the logged-in dealer
// @access  Private (Dealer/Admin)
router.get('/my-listings', dealerAuth, async (req, res) => {
    try {
        const twoWheelers = await TwoWheeler.find({ seller: req.user.id });
        res.json(twoWheelers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/twoWheelers/:id/recommendations
// @desc    Get recommended two-wheelers
// @access  Public
router.get('/:id/recommendations', async (req, res) => {
    try {
        const vehicle = await TwoWheeler.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ msg: 'Vehicle not found' });
        }

        const recommendations = await TwoWheeler.find({
            _id: { $ne: vehicle._id }, // Exclude the current vehicle
            type: vehicle.type, // Match the same type
            price: {
                $gte: vehicle.price * 0.8, // Price is within 20% range
                $lte: vehicle.price * 1.2
            }
        }).limit(4); // Limit to 4 recommendations

        res.json(recommendations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/twoWheelers/:id
// @desc    Get single two-wheeler by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const twoWheeler = await TwoWheeler.findById(req.params.id);
        if (!twoWheeler) {
            return res.status(404).json({ msg: 'Two-wheeler not found' });
        }
        res.json(twoWheeler);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Two-wheeler not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/twoWheelers
// @desc    Add new two-wheeler
// @access  Private (Dealer/Admin)
router.post('/', dealerAuth, async (req, res) => {
    const { name, brand, price, fuelType, mileage, batteryRange, engineCapacity, power, description, images, type, condition, sellerContact, upcomingLaunch, launchDate } = req.body;

    try {
        const newTwoWheeler = new TwoWheeler({
            seller: req.user.id,
            name, brand, price, fuelType, mileage, batteryRange, engineCapacity, power, description, images, type, condition, sellerContact, upcomingLaunch, launchDate
        });

        const twoWheeler = await newTwoWheeler.save();
        res.json(twoWheeler);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/twoWheelers/:id
// @desc    Update two-wheeler
// @access  Private (Dealer/Admin)
router.put('/:id', dealerAuth, async (req, res) => {
    const { name, brand, price, fuelType, mileage, batteryRange, engineCapacity, power, description, images, type, condition, sellerContact, upcomingLaunch, launchDate } = req.body;

    // Build twoWheeler object
    const twoWheelerFields = {};
    if (name) twoWheelerFields.name = name;
    if (brand) twoWheelerFields.brand = brand;
    if (price) twoWheelerFields.price = price;
    if (fuelType) twoWheelerFields.fuelType = fuelType;
    if (mileage) twoWheelerFields.mileage = mileage;
    if (batteryRange) twoWheelerFields.batteryRange = batteryRange;
    if (engineCapacity) twoWheelerFields.engineCapacity = engineCapacity;
    if (power) twoWheelerFields.power = power;
    if (description) twoWheelerFields.description = description;
    if (images) twoWheelerFields.images = images;
    if (type) twoWheelerFields.type = type;
    if (condition) twoWheelerFields.condition = condition;
    if (sellerContact) twoWheelerFields.sellerContact = sellerContact;
    if (upcomingLaunch !== undefined) twoWheelerFields.upcomingLaunch = upcomingLaunch;
    if (launchDate) twoWheelerFields.launchDate = launchDate;

    try {
        let twoWheeler = await TwoWheeler.findById(req.params.id);
        if (!twoWheeler) return res.status(404).json({ msg: 'Two-wheeler not found' });

        // Check if the user owns the two-wheeler (unless they are an admin)
        if (twoWheeler.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const oldPrice = twoWheeler.price;

        const updatedTwoWheeler = await TwoWheeler.findByIdAndUpdate(
            req.params.id,
            { $set: twoWheelerFields },
            { new: true }
        );

        // --- Price Drop Logic ---
        const newPrice = updatedTwoWheeler.price;
        if (newPrice < oldPrice) {
            const alerts = await PriceAlert.find({
                twoWheeler: req.params.id,
                status: 'active',
                initialPrice: { $gt: newPrice } 
            });

            for (const alert of alerts) {
                await Notification.create({
                    user: alert.user,
                    message: `Price drop for ${updatedTwoWheeler.brand} ${updatedTwoWheeler.name}! New price is ₹${newPrice.toLocaleString()}.`,
                    link: `/product/${updatedTwoWheeler._id}`
                });

                alert.status = 'triggered';
                await alert.save();
            }
        }
        // --- End Price Drop Logic ---

        res.json(updatedTwoWheeler);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/twoWheelers/:id
// @desc    Delete two-wheeler
// @access  Private (Dealer/Admin)
router.delete('/:id', dealerAuth, async (req, res) => {
    try {
        const twoWheeler = await TwoWheeler.findById(req.params.id);
        if (!twoWheeler) return res.status(404).json({ msg: 'Two-wheeler not found' });

        // Check if the user owns the two-wheeler (unless they are an admin)
        if (twoWheeler.seller.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await TwoWheeler.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Two-wheeler removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
