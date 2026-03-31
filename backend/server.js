const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Admin = require('./models/Admin');

dotenv.config();

const app = express();

// Robust CORS for local development & production
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://ace-interiors.com'
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                     origin.startsWith('http://localhost:') || 
                     origin.startsWith('http://127.0.0.1:');
                     
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('❌ CORS Blocked for Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin']
}));

app.use(express.json({ limit: '50mb' })); 
app.use(cookieParser());

// Serve Static Frontend Files from dist folder in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));


const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mohanakrishnandevin_db_user:ui7ZOvBZ06OwxKct@cluster0.ism1uek.mongodb.net/?appName=Cluster0';
const JWT_SECRET = process.env.JWT_SECRET || 'ace_interiors_super_secret_key_2468';
const NODE_ENV = process.env.NODE_ENV || 'development';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Production'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Auth Middleware
const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- AUTH ROUTES ---

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '24h' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

app.get('/api/auth/me', protect, (req, res) => {
  res.json({ status: 'authenticated' });
});

// Utility to aggregate all data for the frontend
const getFullContent = async () => {
    const meta = await SiteMeta.findOne();
    const offeringsItems = await Offering.find();
    const projectsItems = await Project.find();
    const blogsItems = await Blog.find();

    if (!meta) return null;

    return {
        _id: meta._id,
        hero: meta.hero,
        stats: meta.stats,
        pricing: meta.pricing,
        faqs: meta.faqs,
        offerings: {
            title: meta.offerings_meta.title,
            description: meta.offerings_meta.description,
            items: offeringsItems
        },
        projects: {
            title: meta.projects_meta.title,
            description: meta.projects_meta.description,
            items: projectsItems
        },
        blogs: {
            title: meta.blogs_meta.title,
            description: meta.blogs_meta.description,
            items: blogsItems
        },
        testimonials: meta.testimonials
    };
};

const SiteMeta = require('./models/SiteMeta');
const Offering = require('./models/Offering');
const Project = require('./models/Project');
const Blog = require('./models/Blog');
const Lead = require('./models/Lead');

// GET Full Site Content (Aggregated)
app.get('/api/content', async (req, res) => {
  try {
    const content = await getFullContent();
    if (!content) {
      return res.status(404).json({ error: 'No content found. Please seed the database.' });
    }
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// UPDATE Content (Distributed back to collections) - PROTECTED
const stripIds = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(stripIds);
    const newObj = {};
    for (const key in obj) {
        // Explicitly skip internal fields and empty _id fields
        if (key !== '_id' && key !== '__v') {
            newObj[key] = stripIds(obj[key]);
        }
    }
    return newObj;
};

app.put('/api/content', protect, async (req, res) => {
  try {
    const data = req.body;
    console.log('🔄 Sanitizing content update...');
    
    // 1. Update SiteMeta
    const cleanMeta = {
        hero: stripIds(data.hero),
        stats: stripIds(data.stats),
        pricing: stripIds(data.pricing),
        faqs: stripIds(data.faqs),
        blogs_meta: { title: data.blogs.title, description: data.blogs.description },
        offerings_meta: { title: data.offerings.title, description: data.offerings.description },
        projects_meta: { title: data.projects.title, description: data.projects.description },
        testimonials: stripIds(data.testimonials)
    };
    
    await SiteMeta.updateOne({}, cleanMeta, { upsert: true });

    // 2. Update Offerings (Batch sync)
    if (data.offerings && data.offerings.items) {
        for (const item of data.offerings.items) {
            const { _id, ...updateData } = item;
            await Offering.updateOne({ id: item.id }, updateData, { upsert: true });
        }
    }

    // 3. Update Projects
    if (data.projects && data.projects.items) {
        for (const item of data.projects.items) {
            const { _id, ...updateData } = item;
            await Project.updateOne({ id: item.id }, updateData, { upsert: true });
        }
    }

    // 4. Update Blogs
    if (data.blogs && data.blogs.items) {
        for (const item of data.blogs.items) {
            const { _id, ...updateData } = item;
            await Blog.updateOne({ id: item.id }, updateData, { upsert: true });
        }
    }

    const updated = await getFullContent();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// SUBMIT Lead (Public)
app.post('/api/leads', async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.status(201).json({ message: 'Lead saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save lead' });
    }
});

// MANAGE Leads (Protected)
app.get('/api/leads', protect, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
});

app.delete('/api/leads/:id', protect, async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lead deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete lead' });
    }
});

// Catch-all route to serve React's index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
