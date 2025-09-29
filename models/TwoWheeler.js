const mongoose = require('mongoose');

const TwoWheelerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Electric'],
        required: true
    },
    mileage: {
        type: Number,
        required: function() { return this.fuelType === 'Petrol'; } // Required only for Petrol bikes
    },
    batteryRange: {
        type: Number,
        required: function() { return this.fuelType === 'Electric'; } // Required only for Electric bikes
    },
    engineCapacity: {
        type: Number,
        required: function() { return this.fuelType === 'Petrol'; } // Required only for Petrol bikes
    },
    power: {
        type: Number,
        required: function() { return this.fuelType === 'Electric'; } // Required only for Electric bikes
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            url: String,
            alt: String
        }
    ],
    type: {
        type: String,
        enum: ['Bike', 'Scooter', 'EV'],
        required: true
    },
    condition: {
        type: String,
        enum: ['new', 'used'],
        default: 'new'
    },
    sellerContact: {
        type: String,
        required: function() { return this.condition === 'used'; }
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    upcomingLaunch: {
        type: Boolean,
        default: false
    },
    launchDate: {
        type: Date,
        required: function() { return this.upcomingLaunch === true; }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TwoWheeler', TwoWheelerSchema);
