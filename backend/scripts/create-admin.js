const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') }); // This targets backend/.env correctly when run from backend/ or backend/scripts/

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ace_interiors_prod';

const createAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const username = 'admin'; // You can change this
        const password = 'admin'; // You can change this

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            console.log('⚠️ Admin user already exists. Updating password...');
            existingAdmin.password = password;
            await existingAdmin.save();
        } else {
            const admin = new Admin({ username, password });
            await admin.save();
            console.log('🌱 Admin user created successfully');
        }

        console.log('---------------------------');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        console.log('---------------------------');
        process.exit();
    } catch (error) {
        console.error('❌ Failed to create admin:', error);
        process.exit(1);
    }
};

createAdmin();
