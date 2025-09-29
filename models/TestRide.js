const mongoose = require('mongoose');

const TestRideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    twoWheeler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TwoWheeler',
        required: true
    },
    showroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Showroom',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TestRide', TestRideSchema);
