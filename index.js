
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/twoWheelers', require('./routes/twoWheelers'));
app.use('/api/showrooms', require('./routes/showrooms'));
app.use('/api/test-rides', require('./routes/testRides'));
app.use('/api/price-alerts', require('./routes/priceAlerts'));
app.use('/api/notifications', require('./routes/notifications'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
