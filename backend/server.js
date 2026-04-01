const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// GLOBAL CRASH CATCHERS
process.on('uncaughtException', (err) => {
  console.error('🔥 UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 UNHANDLED REJECTION:', reason);
});

dotenv.config();

// Models
const Admin = require('./models/Admin');
const SiteMeta = require('./models/SiteMeta');
const Offering = require('./models/Offering');
const Project = require('./models/Project');
const Blog = require('./models/Blog');
const Lead = require('./models/Lead');

const app = express();

// STARTUP DIAGNOSTICS
console.log('📂 Project Root (CWD):', process.cwd());
const distPath = path.resolve(process.cwd(), 'frontend/dist');
if (fs.existsSync(distPath)) {
  console.log('✅ Frontend Build directory found at:', distPath);
} else {
  console.log('❌ Frontend Build directory NOT FOUND at:', distPath);
}

// Robust CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://ace-interiors.com',
  'https://aceinterioranddesigns.com',
  'http://aceinterioranddesigns.com'
];

const isHostingerPreview = (origin) => origin && origin.includes('.hostingersite.com');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.includes(origin) || 
                     isHostingerPreview(origin) ||
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

// Static Files - Use absolute path from project root
app.use(express.static(distPath));

// PATH LOGGER
app.use((req, res, next) => {
  console.log(`🌐 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime(), serverTime: new Date().toISOString() });
});

// Auth Middleware
const protect = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ace_interiors_prod_secret_88');
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- API ROUTES ---

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'ace_interiors_prod_secret_88', { expiresIn: '24h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
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

// Content Aggregate function
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
        offerings: { title: meta.offerings_meta.title, description: meta.offerings_meta.description, items: offeringsItems },
        projects: { title: meta.projects_meta.title, description: meta.projects_meta.description, items: projectsItems },
        blogs: { title: meta.blogs_meta.title, description: meta.blogs_meta.description, items: blogsItems },
        testimonials: meta.testimonials
    };
};

app.get('/api/content', async (req, res) => {
  try {
    const content = await getFullContent();
    if (!content) return res.status(404).json({ error: 'No content found' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

const stripIds = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(stripIds);
    const newObj = {};
    for (const key in obj) {
        if (key !== '_id' && key !== '__v') {
            newObj[key] = stripIds(obj[key]);
        }
    }
    return newObj;
};

app.put('/api/content', protect, async (req, res) => {
  try {
    const data = req.body;
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
    if (data.offerings && data.offerings.items) {
        for (const item of data.offerings.items) {
            const { _id, ...updateData } = item;
            await Offering.updateOne({ id: item.id }, updateData, { upsert: true });
        }
    }
    if (data.projects && data.projects.items) {
        for (const item of data.projects.items) {
            const { _id, ...updateData } = item;
            await Project.updateOne({ id: item.id }, updateData, { upsert: true });
        }
    }
    if (data.blogs && data.blogs.items) {
        for (const item of data.blogs.items) {
            const { _id, ...updateData } = item;
            await Blog.updateOne({ id: item.id }, updateData, { upsert: true });
        }
    }
    const updated = await getFullContent();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

app.post('/api/leads', async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.status(201).json({ message: 'Lead saved' });
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
});

app.get('/api/leads', protect, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
});

app.delete('/api/leads/:id', protect, async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
});

// --- SPA CATCH-ALL ---
// This MUST be the last route. It serves index.html for any route not matched above (like /admin)
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('❌ Error sending index.html:', err.message);
      res.status(404).send('Frontend build not found. Please run npm run build.');
    }
  });
});

// --- SERVER START ---
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('⚠️ WARNING: MONGO_URI is missing!');
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err.message));

app.listen(PORT, () => {
  console.log(`🚀 Production Server active on port ${PORT}`);
  console.log(`📡 Serving frontend from: ${distPath}`);
});

