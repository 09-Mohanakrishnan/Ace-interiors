const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const SiteContent = require('./models/SiteContent');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ace_interiors';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB for Seeding');

    try {
      // Clear existing content to prevent duplicates (since we want one master doc)
      await SiteContent.deleteMany({});
      console.log('🗑️ Cleared existing content');

      // Read the JSON file from the frontend src/data directory
      const dataPath = path.join(__dirname, '../src/data/site-content.json');
      const jsonData = fs.readFileSync(dataPath, 'utf-8');
      const content = JSON.parse(jsonData);

      // Insert the content
      const newDoc = new SiteContent(content);
      await newDoc.save();
      
      console.log('🌱 Successfully seeded site-content.json into MongoDB!');
    } catch (err) {
      console.error('❌ Failed to seed data:', err);
    } finally {
      mongoose.disconnect();
      process.exit();
    }
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });
