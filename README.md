# Sahityotsava Registration System

A professional registration system with Razorpay payment integration and MongoDB storage.

## Features

- ✅ Clean and modern registration form
- ✅ Razorpay payment integration (₹30 registration fee)
- ✅ MongoDB storage for all registrations
- ✅ Admin dashboard to view all paid registrations
- ✅ Export functionality (CSV)
- ✅ Responsive design for mobile and desktop
- ✅ Real-time search and filtering in dashboard

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure your `.env` file is configured with:
   - MongoDB connection string
   - Razorpay API keys
   - Port number

## Running the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## Accessing the Application

- **Registration Form**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/admin/dashboard`
- **API Endpoints**: 
  - POST `/api/create-order` - Create payment order
  - POST `/api/verify-payment` - Verify payment and save registration
  - GET `/api/registrations` - Get all registrations (JSON)

## Dashboard Features

- View all registered participants
- See statistics (total registrations, total amount collected)
- Search functionality to filter by name, unit, or sector
- Export data to CSV format
- Print report functionality
- Responsive table design

## Payment Flow

1. User fills the registration form
2. Clicks "Proceed to Payment"
3. Razorpay checkout opens with ₹30 payment
4. After successful payment, data is saved to MongoDB
5. User sees success confirmation
6. Admin can view the registration in dashboard

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Payment**: Razorpay
- **Frontend**: EJS templates, Vanilla JavaScript
- **Styling**: Custom CSS with modern design

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- In production, implement proper payment signature verification
- Add authentication for the admin dashboard
- Use HTTPS in production environment

## Support

For any issues or questions, please contact the development team.
