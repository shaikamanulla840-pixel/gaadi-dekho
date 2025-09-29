const mongoose = require('mongoose');

const PriceAlertSchema = new mongoose.Schema({
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
    initialPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'triggered'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate active alerts for the same user and vehicle
PriceAlertSchema.index({ user: 1, twoWheeler: 1, status: 1 }, { unique: true, partialFilterExpression: { status: 'active' } });

module.exports = mongoose.model('PriceAlert', PriceAlertSchema);
