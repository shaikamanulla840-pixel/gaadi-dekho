const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const users = require('./data/users');
const twoWheelers = require('./data/twoWheelers');
const showrooms = require('./data/showrooms');
const User = require('./models/User');
const TwoWheeler = require('./models/TwoWheeler');
const Showroom = require('./models/Showroom');
const Review = require('./models/Review');
const TestRide = require('./models/TestRide');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Review.deleteMany();
        await TestRide.deleteMany();
        await TwoWheeler.deleteMany();
        await Showroom.deleteMany();
        await User.deleteMany();

        const hashedUsers = users.map(user => {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(user.password, salt);
            return { ...user, password: hashedPassword };
        });

        const createdUsers = await User.insertMany(hashedUsers);

        const dealerUser = createdUsers.find(u => u.role === 'dealer');

        if (!dealerUser) {
            console.error('Could not find dealer user. Please add a user with role "dealer" to your users.js data file.');
            process.exit(1);
        }

        const sampleTwoWheelers = twoWheelers.map(tw => {
            return { ...tw, seller: dealerUser._id };
        });

        await TwoWheeler.insertMany(sampleTwoWheelers);
        await Showroom.insertMany(showrooms);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Review.deleteMany();
        await TestRide.deleteMany();
        await TwoWheeler.deleteMany();
        await Showroom.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
