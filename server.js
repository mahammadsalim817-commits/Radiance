require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const Registration = require('./models/Registration');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure storage based on environment
let storage;
let upload;

if (process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET) {
  // ☁️ PRODUCTION: Use Cloudinary cloud storage
  console.log('☁️  Using Cloudinary cloud storage');
  
  const cloudinary = require('cloudinary').v2;
  const { CloudinaryStorage } = require('multer-storage-cloudinary');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'radiance-camp-payments',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 1000, quality: 'auto' }]
    }
  });

  upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB limit
    }
  });
} else {
  // 💻 DEVELOPMENT: Use local disk storage
  console.log('💻 Using local disk storage (development mode)');
  console.log('⚠️  For production, add Cloudinary credentials to .env');
  
  const uploadsDir = path.join(__dirname, 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'payment-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  });
}

// Middleware
app.use(cors());
// Don't use bodyParser for multipart/form-data - multer will handle it
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes

// Home Page - Registration Form
app.get('/', (req, res) => {
  res.render('index');
});

// Submit Registration (after QR code payment)
app.post('/api/register', upload.single('paymentScreenshot'), async (req, res) => {
  try {
    console.log('📝 Registration request received');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      console.log('❌ MongoDB not connected');
      return res.status(503).json({ 
        error: 'Database connection error. Please contact the administrator.',
        details: 'MongoDB is not connected. Admin needs to whitelist IP address.'
      });
    }

    const { name, age, unit, sector, phoneNumber } = req.body;

    // Validate input
    if (!name || !age || !unit || !sector || !phoneNumber) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!req.file) {
      console.log('❌ Validation failed: No file uploaded');
      return res.status(400).json({ error: 'Payment screenshot is required' });
    }

    console.log('✅ Validation passed, saving to database...');

    // Save registration to MongoDB
    const registration = new Registration({
      name: name.trim(),
      age: parseInt(age),
      unit: unit.trim(),
      sector: sector.trim(),
      phoneNumber: phoneNumber.trim(),
      // Cloudinary returns full URL in req.file.path, local storage returns filename
      paymentScreenshot: req.file.path || ('/uploads/' + req.file.filename),
      amount: 30,
      paymentStatus: 'pending'
    });

    await registration.save();

    console.log('✅ Registration saved successfully:', registration._id);

    res.json({
      success: true,
      message: 'Registration submitted successfully! Awaiting admin verification.',
      registrationId: registration._id
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'Failed to complete registration: ' + error.message });
  }
});

// Success Page
app.get('/success', (req, res) => {
  res.render('success');
});

// Admin Dashboard
app.get('/admin/dashboard', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.render('dashboard', { 
        registrations: [], 
        stats: { total: 0, totalAmount: 0, pending: 0, verified: 0, rejected: 0 },
        error: 'MongoDB not connected. Please whitelist your IP address in MongoDB Atlas.'
      });
    }

    const registrations = await Registration.find()
      .sort({ registeredAt: -1 });
    
    const stats = {
      total: registrations.length,
      totalAmount: registrations.filter(r => r.paymentStatus === 'verified').length * 30,
      pending: registrations.filter(r => r.paymentStatus === 'pending').length,
      verified: registrations.filter(r => r.paymentStatus === 'verified').length,
      rejected: registrations.filter(r => r.paymentStatus === 'rejected').length
    };

    res.render('dashboard', { registrations, stats, error: null });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.render('dashboard', { 
      registrations: [], 
      stats: { total: 0, totalAmount: 0, pending: 0, verified: 0, rejected: 0 },
      error: 'Error loading dashboard data. Please try again.'
    });
  }
});

// API endpoint to get all registrations (JSON)
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ registeredAt: -1 });
    res.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// Admin: Verify/Approve Registration
app.post('/api/admin/verify/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, transactionId } = req.body; // status: 'verified' or 'rejected'

    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    registration.paymentStatus = status;
    registration.verifiedAt = new Date();
    registration.verifiedBy = 'admin'; // You can add admin authentication later
    
    if (transactionId) {
      registration.transactionId = transactionId;
    }

    await registration.save();

    res.json({
      success: true,
      message: `Registration ${status} successfully`
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Failed to verify registration' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin/dashboard`);
});
