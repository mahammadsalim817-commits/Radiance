# 🎯 Radiance Camp Registration System

> Professional event registration system with QR payment, cloud storage, and admin verification

## 🌟 Features

✅ **Beautiful Registration Form**
- Custom white dropdowns with professional design
- Cinzel font with elegant shadow effects
- Compact single-page layout (no scrolling)
- Gradient hover effects on dropdown options
- Mobile responsive design

✅ **Payment Integration**
- QR code based payment (₹30 registration fee)
- Payment screenshot upload
- **Cloudinary cloud storage** (production-ready)
- Automatic image optimization

✅ **Admin Dashboard**
- Real-time registration monitoring
- View payment screenshots
- Approve/Reject workflow
- CSV export for offline processing
- Statistics dashboard

✅ **Production Ready**
- Cloud file storage (Cloudinary - no files lost on restart)
- MongoDB Atlas database
- Environment-based configuration (local or cloud)
- Secure credential management

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- Cloudinary account (optional for development, **required for production**)

### Installation

```bash
# 1. Navigate to project
cd sahityotsava

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env with your credentials
# MongoDB URI is already configured
# For production, add Cloudinary credentials

# 5. Start server
npm start
```

**Development Mode**: Files saved to `/public/uploads/` (local disk)  
**Production Mode**: Files saved to Cloudinary (cloud storage)

Server runs at: http://localhost:3000

---

## 📁 Project Structure

```
sahityotsava/
├── models/
│   └── Registration.js      # MongoDB schema
├── public/
│   ├── css/
│   │   └── style.css        # Custom dropdowns, Cinzel font, compact layout
│   ├── js/
│   │   └── main.js          # Dropdown functionality with proper event cleanup
│   └── uploads/             # Local dev files (gitignored, not used in production)
├── views/
│   ├── index.ejs            # Registration form with custom dropdowns
│   ├── dashboard.ejs        # Admin dashboard
│   └── success.ejs          # Success page
├── server.js                # Express server with Cloudinary auto-detection
├── .env.example             # Environment template
├── .gitignore               # Excludes .env and uploads/
├── DEPLOYMENT.md            # Detailed deployment guide
├── PRODUCTION-CHECKLIST.md  # Step-by-step checklist
├── setup-production.sh      # Quick setup script
└── package.json
```

---

## 🎨 Design Highlights

**Font**: Cinzel (Google Fonts) - Professional, elegant serif with text-shadow  
**Color Scheme**: Blue gradients with clean white backgrounds  
**Custom Dropdowns**: JavaScript-based with full style control (no native `<select>`)  
**Spacing**: Optimized for single-page view (no scrolling needed)  
**Hover Effects**: Gradient backgrounds with 4px left border animation  
**Mobile**: Fully responsive design  
**Scrollbar**: Custom 6px gradient scrollbar for dropdowns

**Recent Bug Fixes**:
✅ **Critical**: Sector switching now properly reinitializes unit dropdown  
✅ Event listeners properly cleaned up using `cloneNode()` technique  
✅ Dropdown scrolling smooth with auto-scroll to selected option  
✅ Click-outside detection improved with `closest()` method

---

## 🔧 Configuration

### Environment Variables

Create `.env` file with:

```env
# Database
MONGODB_URI=mongodb+srv://mahammadsalim817:Saad%40123@sahityotsava.esgv7o5.mongodb.net/sahityotsava

# Cloudinary (REQUIRED for production)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=3000
NODE_ENV=production
```

### Storage Modes

**Development Mode** (without Cloudinary env vars):
- Files saved to `/public/uploads/`
- Good for local testing
- Console: `💻 Using local disk storage`
- ⚠️ **NOT suitable for production** (files lost on server restart)

**Production Mode** (with Cloudinary env vars):
- Files saved to Cloudinary cloud
- Console: `☁️ Using Cloudinary cloud storage`
- Automatic image optimization
- CDN delivery worldwide
- Files persist across deployments
- ✅ **Production ready**

**Server automatically detects** which mode to use based on environment variables!

---

## 🌐 Production Deployment

### Quick Deploy (10 minutes total)

#### 1. Set up Cloudinary (5 mins)
```bash
# Sign up at https://cloudinary.com/users/register/free
# Get credentials from Dashboard → Settings → Account
# Add to .env file:
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_actual_secret
```

#### 2. Push to GitHub (2 mins)
```bash
git init
git add .
git commit -m "Initial commit - Radiance Camp Registration"
git remote add origin https://github.com/YOUR_USERNAME/radiance-camp.git
git push -u origin main
```

#### 3. Deploy on Render (3 mins)
- Sign up: https://render.com (free tier)
- New Web Service → Connect GitHub repo
- Add environment variables from `.env`
- Deploy!

**Your site will be live at**: `https://your-app-name.onrender.com`

**Detailed step-by-step guide**: See `PRODUCTION-CHECKLIST.md` ⭐

### Recommended Platform: Render.com

**Why Render?**
✅ Free tier (750 hours/month)  
✅ Auto-deploy from GitHub pushes  
✅ Automatic HTTPS (SSL)  
✅ Easy environment variables  
✅ Perfect for event registration sites  

**Only limitation**: Free tier sleeps after 15 mins of inactivity (wakes up in ~30 seconds on first visit)

**Alternative platforms**: Railway.app, Heroku, DigitalOcean (see `DEPLOYMENT.md` for comparison)

---

## 📊 Admin Dashboard

**Access**: `/admin/dashboard`

**Features**:
- View all registrations in real-time
- See payment screenshots (Cloudinary URLs)
- Approve/Reject registrations
- Export to CSV
- Statistics (total, pending, verified, rejected, total amount)

**Security Note**: Currently no password protection!

**Quick auth fix** (add to server.js):
```javascript
const adminAuth = (req, res, next) => {
  const pwd = req.query.pwd;
  if (pwd === 'your_secret_password') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

app.get('/admin/dashboard', adminAuth, async (req, res) => {
  // existing code
});
```

Access with: `/admin/dashboard?pwd=your_secret_password`

---

## 🔐 Security Checklist

- [x] Environment variables for credentials
- [x] `.env` in `.gitignore`
- [x] MongoDB connection with strong password
- [x] File upload validation (images only, 5MB limit)
- [x] Input validation on registration
- [x] Cloudinary cloud storage (no local file persistence)
- [ ] Add admin authentication (recommended before sharing)
- [ ] Add rate limiting (optional, prevents spam)
- [ ] Add CORS restrictions (optional)

---

## 📱 Testing

### Local Testing
```bash
npm start
# ✅ Check console: "☁️ Using Cloudinary cloud storage" (if env vars set)
# Open http://localhost:3000
# Submit test registration with image
# Check Cloudinary dashboard → Media Library
# Check admin dashboard for registration
```

### Production Testing Checklist
- [ ] Registration form loads
- [ ] Custom dropdowns work smoothly
- [ ] Sector switching works (unit dropdown updates)
- [ ] File upload works (check Cloudinary Media Library)
- [ ] Admin dashboard shows registrations
- [ ] Payment screenshots display (Cloudinary URLs)
- [ ] Approve/Reject buttons work
- [ ] CSV export works
- [ ] Mobile responsive
- [ ] HTTPS enabled (automatic on Render)

---

## 🛠 Tech Stack

- **Backend**: Node.js + Express.js v4.18.2
- **Database**: MongoDB Atlas (cloud database)
- **File Storage**: Cloudinary (production) / Local disk (development)
- **File Upload**: Multer + multer-storage-cloudinary
- **Environment**: dotenv for credential management
- **View Engine**: EJS
- **Frontend**: Vanilla JavaScript (custom dropdowns with cloneNode technique)
- **Styling**: Custom CSS with Google Fonts (Cinzel)

**Key Dependencies**:
- `cloudinary` - Cloud storage SDK
- `multer-storage-cloudinary` - Cloudinary integration for Multer
- `mongoose` - MongoDB ODM
- `express` - Web framework
- `dotenv` - Environment variable management

---

## 📈 Scalability & Costs

### Free Tier Capacity

| Service | Free Tier | Capacity | Upgrade Cost |
|---------|-----------|----------|--------------|
| **Cloudinary** | 25GB storage, 25GB bandwidth/month | ~8,000 images (3MB each) | $0.10/GB overage |
| **MongoDB Atlas** | 512MB storage | ~50,000 registrations | $0.08/GB/month |
| **Render** | 750 hours/month | Sufficient for events | $7/month always-on |

### Total Cost: $0/month (free tier) ✅

Perfect for event registration systems with hundreds of participants!

---

## 🤝 Troubleshooting

### "Cannot connect to MongoDB"
1. Check MongoDB Atlas → Network Access
2. Whitelist 0.0.0.0/0 (allow all IPs) OR add your server's IP
3. Verify `MONGODB_URI` in environment variables
4. Check MongoDB password is URL-encoded (@ becomes %40)

### "File upload failed"
1. Check Cloudinary credentials in `.env` (no extra spaces!)
2. Verify Cloudinary dashboard shows your cloud name
3. Check server logs for Cloudinary errors
4. Test locally first with `npm start`

### "Using local disk storage" (should use Cloudinary)
1. Check `.env` file has all 3 Cloudinary variables
2. Restart server after adding env vars
3. Look for console message: `☁️ Using Cloudinary cloud storage`

### "Site is very slow" (production)
- **Normal on free tier!** Site sleeps after 15 mins of inactivity
- First visit takes ~30 seconds to wake up
- Upgrade to $7/month for always-on service
- Or use UptimeRobot to ping every 5 minutes (keeps it awake)

### "Dropdown not working after changing sector"
- **Fixed!** ✅ This bug was resolved by using `cloneNode()` to remove stale event listeners
- If you still see issues, clear browser cache (Cmd+Shift+R)

**More troubleshooting**: See `PRODUCTION-CHECKLIST.md` section 🚨

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Registration form page |
| `POST` | `/api/register` | Submit registration with file upload |
| `GET` | `/success` | Success confirmation page |
| `GET` | `/admin/dashboard` | Admin dashboard (no auth) |
| `GET` | `/api/registrations` | Get all registrations (JSON) |
| `POST` | `/api/admin/verify/:id` | Approve/Reject registration |

---

## 🎯 Event Details

**Event**: Radiance Camp 2025  
**Date**: 13th March 2025  
**Location**: Puttur Division  
**Registration Fee**: ₹30 per participant  

---

## 🚦 Current Status

✅ **Development**: Complete  
✅ **UI/UX**: Polished with custom dropdowns and Cinzel font  
✅ **Bug Fixes**: Critical sector-switching bug fixed (event listener cleanup)  
✅ **Cloud Storage**: Cloudinary integration complete and tested  
✅ **Production Ready**: All deployment files created  
⏳ **Deployment**: Follow `PRODUCTION-CHECKLIST.md` for step-by-step guide

---

## 📚 Documentation Files

- **`README.md`** (this file) - Project overview and quick start
- **`DEPLOYMENT.md`** - Comprehensive deployment guide with platform comparisons
- **`PRODUCTION-CHECKLIST.md`** - Step-by-step checklist with troubleshooting
- **`.env.example`** - Environment variable template
- **`setup-production.sh`** - Quick setup script

---

## 🎉 Credits

**Built with ❤️ for Radiance Camp (Puttur Division)**

**Technologies**: Node.js • MongoDB Atlas • Cloudinary • Express • EJS

---

**Ready to deploy!** 🚀 Follow the checklist in `PRODUCTION-CHECKLIST.md` for your first deployment.
