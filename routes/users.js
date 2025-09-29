const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   PUT api/users/favorites/:twoWheelerId
// @desc    Add/Remove two-wheeler from user favorites
// @access  Private
router.put('/favorites/:twoWheelerId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const twoWheelerId = req.params.twoWheelerId;

        // Check if two-wheeler is already in favorites
        const isFavorite = user.favorites.includes(twoWheelerId);

        if (isFavorite) {
            // Remove from favorites
            user.favorites = user.favorites.filter(
                (fav) => fav.toString() !== twoWheelerId
            );
            await user.save();
            return res.json({ msg: 'Two-wheeler removed from favorites' });
        } else {
            // Add to favorites
            user.favorites.push(twoWheelerId);
            await user.save();
            return res.json({ msg: 'Two-wheeler added to favorites' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/users/favorites
// @desc    Get user favorites
// @access  Private
router.get('/favorites', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user.favorites);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
