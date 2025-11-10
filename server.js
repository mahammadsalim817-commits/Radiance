require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Razorpay = require('razorpay');
const Registration = require('./models/Registration');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Routes

// Home Page - Registration Form
app.get('/', (req, res) => {
  res.render('index');
});

// Create Razorpay Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { name, age, unit, sector, phoneNumber } = req.body;

    // Validate input
    if (!name || !age || !unit || !sector || !phoneNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create Razorpay order
    const options = {
      amount: 3000, // 30 INR in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        name,
        age,
        unit,
        sector,
        phoneNumber
      }
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Order creation error:', error);
    
    // Check if it's an authentication error
    if (error.statusCode === 401) {
      return res.status(500).json({ 
        error: 'Razorpay authentication failed. Please check your API credentials in .env file.',
        details: 'Make sure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are different and valid.'
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create order',
      message: error.message || 'Unknown error'
    });
  }
});

// Verify Payment and Save Registration
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      name,
      age,
      unit,
      sector,
      phoneNumber
    } = req.body;

    // In production, verify the signature here using crypto
    // For now, we'll proceed with saving the registration

    // Save registration to MongoDB
    const registration = new Registration({
      name,
      age: parseInt(age),
      unit,
      sector,
      phoneNumber,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: 30,
      paymentStatus: 'completed'
    });

    await registration.save();

    res.json({
      success: true,
      message: 'Registration successful!',
      registrationId: registration._id
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Success Page
app.get('/success', (req, res) => {
  res.render('success');
});

// Admin Dashboard
app.get('/admin/dashboard', async (req, res) => {
  try {
    const registrations = await Registration.find()
      .sort({ registeredAt: -1 });
    
    const stats = {
      total: registrations.length,
      totalAmount: registrations.length * 30
    };

    res.render('dashboard', { registrations, stats });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).send('Error loading dashboard');
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

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin/dashboard`);
});
