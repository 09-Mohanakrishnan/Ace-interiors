const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const Offering = require('./models/Offering');
const Project = require('./models/Project');
const Blog = require('./models/Blog');
const SiteMeta = require('./models/SiteMeta');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ace_interiors_prod';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB for Production Seeding');

        // 1. Clear All Collections
        await Offering.deleteMany({});
        await Project.deleteMany({});
        await Blog.deleteMany({});
        await SiteMeta.deleteMany({});
        console.log('🗑️ Cleared existing production data');

        // 2. Read site-content.json
        const contentPath = path.join(__dirname, '../src/data/site-content.json');
        const rawData = fs.readFileSync(contentPath, 'utf8');
        const data = JSON.parse(rawData);

        // 3. Seed Offerings
        if (data.offerings && data.offerings.items) {
            await Offering.insertMany(data.offerings.items);
            console.log(`🌱 Seeded ${data.offerings.items.length} Offerings`);
        }

        // 4. Seed Projects
        if (data.projects && data.projects.items) {
            await Project.insertMany(data.projects.items);
            console.log(`🌱 Seeded ${data.projects.items.length} Projects`);
        }

        // 5. Seed Blogs
        if (data.blogs && data.blogs.items) {
            await Blog.insertMany(data.blogs.items);
            console.log(`🌱 Seeded ${data.blogs.items.length} Blogs`);
        }

        // 6. Seed SiteMeta (Hero, Stats, Pricing, FAQ, Meta info)
        const siteMeta = {
            hero: data.hero,
            stats: data.stats,
            pricing: data.pricing,
            faqs: data.faqs,
            blogs_meta: { title: data.blogs.title, description: data.blogs.description },
            offerings_meta: { title: data.offerings.title, description: data.offerings.description },
            projects_meta: { title: data.projects.title, description: data.projects.description },
            testimonials: data.testimonials
        };
        await SiteMeta.create(siteMeta);
        console.log('🌱 Seeded Site Metadata');

        console.log('✨ Production Database Successfully Initialized!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding Failed:', error);
        process.exit(1);
    }
};

seedDatabase();
