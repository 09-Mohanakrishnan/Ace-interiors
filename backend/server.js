const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');

// GLOBAL CRASH CATCHERS
process.on('uncaughtException', (err) => {
  console.error('🔥 UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 UNHANDLED REJECTION:', reason);
});

dotenv.config({ path: path.resolve(__dirname, '.env') });

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
  'http://localhost:5001',
  'http://localhost:5173',
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

// Static Files
app.use(express.static(distPath));
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

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

// --- AUTH ROUTES ---

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

// --- FILE UPLOAD ---

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.post('/api/upload', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});


// ============================================================
// PHASE 1: INDIVIDUAL CRUD ENDPOINTS (AMEER PATTERN)
// ============================================================

// --- OFFERINGS CRUD ---
app.get('/api/offerings', async (req, res) => {
  try {
    const items = await Offering.find().sort({ createdAt: 1 });
    res.json(items);
  } catch (error) {
    console.error('❌ GET /api/offerings error:', error);
    res.status(500).json({ error: 'Failed to fetch offerings' });
  }
});

app.post('/api/offerings', protect, async (req, res) => {
  try {
    const item = new Offering(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('❌ POST /api/offerings error:', error);
    res.status(500).json({ error: 'Failed to create offering' });
  }
});

app.put('/api/offerings/:id', protect, async (req, res) => {
  try {
    const item = await Offering.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    console.error('❌ PUT /api/offerings error:', error);
    res.status(500).json({ error: 'Failed to update offering' });
  }
});

app.delete('/api/offerings/:id', protect, async (req, res) => {
  try {
    await Offering.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('❌ DELETE /api/offerings error:', error);
    res.status(500).json({ error: 'Failed to delete offering' });
  }
});

// --- PROJECTS CRUD ---
app.get('/api/projects', async (req, res) => {
  try {
    const items = await Project.find().sort({ createdAt: 1 });
    res.json(items);
  } catch (error) {
    console.error('❌ GET /api/projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', protect, async (req, res) => {
  try {
    const item = new Project(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('❌ POST /api/projects error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', protect, async (req, res) => {
  try {
    const item = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    console.error('❌ PUT /api/projects error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', protect, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('❌ DELETE /api/projects error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// --- BLOGS CRUD ---
app.get('/api/blogs', async (req, res) => {
  try {
    const items = await Blog.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('❌ GET /api/blogs error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

app.post('/api/blogs', protect, async (req, res) => {
  try {
    const item = new Blog(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error('❌ POST /api/blogs error:', error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

app.put('/api/blogs/:id', protect, async (req, res) => {
  try {
    const item = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (error) {
    console.error('❌ PUT /api/blogs error:', error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

app.delete('/api/blogs/:id', protect, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('❌ DELETE /api/blogs error:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// --- SITE META (hero, stats, pricing, faqs, testimonials) ---
app.get('/api/site-meta', async (req, res) => {
  try {
    let meta = await SiteMeta.findOne();
    if (!meta) {
      // Fallback: read from JSON file if DB is empty
      const jsonPath = path.resolve(__dirname, '../frontend/src/data/site-content.json');
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, 'utf8');
        const data = JSON.parse(raw);
        return res.json({
          hero: data.hero || {},
          stats: data.stats || [],
          pricing: data.pricing || {},
          faqs: data.faqs || {},
          testimonials: data.testimonials || {},
          offerings_meta: { title: data.offerings?.title || '', description: data.offerings?.description || '' },
          projects_meta: { title: data.projects?.title || '', description: data.projects?.description || '' },
          blogs_meta: { title: data.blogs?.title || '', description: data.blogs?.description || '' }
        });
      }
      return res.status(404).json({ error: 'No site meta found' });
    }
    res.json(meta);
  } catch (error) {
    console.error('❌ GET /api/site-meta error:', error);
    res.status(500).json({ error: 'Failed to fetch site meta' });
  }
});

app.put('/api/site-meta', protect, async (req, res) => {
  try {
    const data = req.body;
    const update = {};
    // Only update fields that are provided
    if (data.hero) update.hero = data.hero;
    if (data.stats) update.stats = data.stats;
    if (data.pricing) update.pricing = data.pricing;
    if (data.faqs) update.faqs = data.faqs;
    if (data.testimonials) update.testimonials = data.testimonials;
    if (data.offerings_meta) update.offerings_meta = data.offerings_meta;
    if (data.projects_meta) update.projects_meta = data.projects_meta;
    if (data.blogs_meta) update.blogs_meta = data.blogs_meta;

    const meta = await SiteMeta.findOneAndUpdate({}, update, { upsert: true, new: true });
    res.json(meta);
  } catch (error) {
    console.error('❌ PUT /api/site-meta error:', error);
    res.status(500).json({ error: 'Failed to update site meta' });
  }
});


// ============================================================
// BACKWARD COMPAT: Monolithic /api/content (will be deprecated)
// ============================================================
const getFullContent = async () => {
    const meta = await SiteMeta.findOne();
    const offeringsItems = await Offering.find();
    const projectsItems = await Project.find();
    const blogsItems = await Blog.find();
    if (!meta) {
      // Fallback to JSON
      const jsonPath = path.resolve(__dirname, '../frontend/src/data/site-content.json');
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, 'utf8');
        return JSON.parse(raw);
      }
      return null;
    }
    return {
        _id: meta._id,
        hero: meta.hero,
        stats: meta.stats,
        pricing: meta.pricing,
        faqs: meta.faqs,
        offerings: { title: meta.offerings_meta?.title || '', description: meta.offerings_meta?.description || '', items: offeringsItems },
        projects: { title: meta.projects_meta?.title || '', description: meta.projects_meta?.description || '', items: projectsItems },
        blogs: { title: meta.blogs_meta?.title || '', description: meta.blogs_meta?.description || '', items: blogsItems },
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

// --- LEADS ---
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
  console.error('❌ FATAL ERROR: MONGO_URI is missing from environment variables!');
  console.error('💡 TIP: Ensure your .env file is correctly located in the backend/ folder.');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err.message));

app.listen(PORT, () => {
  console.log(`🚀 Production Server active on port ${PORT}`);
  console.log(`📡 Serving frontend from: ${distPath}`);
});
