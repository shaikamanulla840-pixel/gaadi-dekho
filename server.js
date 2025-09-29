const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Two-wheelers endpoint with image URLs
app.get('/api/twoWheelers', (req, res) => {
    const twoWheelers = [
        {
            id: 1,
            name: 'Honda CBR',
            brand: 'Honda',
            price: 150000,
            imageUrl: '/images/honda-cbr.jpg'  // Path relative to static directory
        },
        {
            id: 2,
            name: 'Yamaha R15',
            brand: 'Yamaha',
            price: 180000,
            imageUrl: '/images/yamaha-r15.jpg'
        }
    ];
    res.json(twoWheelers);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Images available at http://localhost:${PORT}/images/`);
});