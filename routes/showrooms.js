const express = require('express');
const router = express.Router();
const Showroom = require('../models/Showroom');
const auth = require('../middleware/auth');

// @route   GET api/showrooms
// @desc    Get all showrooms
// @access  Public
router.get('/', async (req, res) => {
    try {
        const showrooms = await Showroom.find();
        res.json(showrooms);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/showrooms/:id
// @desc    Get single showroom by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const showroom = await Showroom.findById(req.params.id).populate('availableTwoWheelers');
        if (!showroom) {
            return res.status(404).json({ msg: 'Showroom not found' });
        }
        res.json(showroom);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Showroom not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   POST api/showrooms
// @desc    Add new showroom
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
    const { name, address, city, state, pincode, phone, email, location, availableTwoWheelers } = req.body;

    try {
        const newShowroom = new Showroom({
            name, address, city, state, pincode, phone, email, location, availableTwoWheelers
        });

        const showroom = await newShowroom.save();
        res.json(showroom);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/showrooms/:id
// @desc    Update showroom
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
    const { name, address, city, state, pincode, phone, email, location, availableTwoWheelers } = req.body;

    // Build showroom object
    const showroomFields = {};
    if (name) showroomFields.name = name;
    if (address) showroomFields.address = address;
    if (city) showroomFields.city = city;
    if (state) showroomFields.state = state;
    if (pincode) showroomFields.pincode = pincode;
    if (phone) showroomFields.phone = phone;
    if (email) showroomFields.email = email;
    if (location) showroomFields.location = location;
    if (availableTwoWheelers) showroomFields.availableTwoWheelers = availableTwoWheelers;

    try {
        let showroom = await Showroom.findById(req.params.id);
        if (!showroom) return res.status(404).json({ msg: 'Showroom not found' });

        showroom = await Showroom.findByIdAndUpdate(
            req.params.id,
            { $set: showroomFields },
            { new: true }
        );

        res.json(showroom);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/showrooms/:id
// @desc    Delete showroom
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const showroom = await Showroom.findById(req.params.id);
        if (!showroom) return res.status(404).json({ msg: 'Showroom not found' });

        await Showroom.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Showroom removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
