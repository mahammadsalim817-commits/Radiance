# 📋 Production Deployment Checklist

## Step 1: Set Up Cloudinary (5 minutes)

### 1.1 Create Account
- [ ] Go to https://cloudinary.com/users/register/free
- [ ] Sign up with email
- [ ] Verify email address
- [ ] Login to dashboard

### 1.2 Get Credentials
- [ ] Go to Dashboard → Settings → Account
- [ ] Copy **Cloud Name** (e.g., `dxyz123abc`)
- [ ] Copy **API Key** (e.g., `123456789012345`)
- [ ] Copy **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

### 1.3 Create .env File
```bash
# In your project root, create .env file:
cp .env.example .env
```

Then edit `.env` and replace placeholders with real values:
```
MONGODB_URI=mongodb+srv://mahammadsalim817:Saad%40123@sahityotsava.esgv7o5.mongodb.net/sahityotsava
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
PORT=3000
NODE_ENV=production
```

### 1.4 Test Cloudinary Locally
```bash
# Start server
npm start

# You should see: "☁️ Using Cloudinary cloud storage"
# If you see "💻 Using local disk storage" - check your .env file
```

- [ ] Test registration with file upload
- [ ] Check Cloudinary dashboard → Media Library
- [ ] Verify image appears in Cloudinary
- [ ] Check admin dashboard shows Cloudinary URL (https://res.cloudinary.com/...)

---

## Step 2: Prepare GitHub Repository (2 minutes)

### 2.1 Initialize Git (if not done)
```bash
cd /Users/sahadchad/Desktop/sahityotsava
git init
git add .
git commit -m "Initial commit - Radiance Camp Registration System"
```

### 2.2 Create GitHub Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: `radiance-camp` (or your choice)
- [ ] Make it **Private** (recommended, contains sensitive setup)
- [ ] Don't initialize with README (you already have files)
- [ ] Click "Create repository"

### 2.3 Push to GitHub
```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/radiance-camp.git
git branch -M main
git push -u origin main
```

**Important**: Never commit `.env` file to GitHub! (Already in `.gitignore`)

---

## Step 3: Deploy on Render.com (3 minutes)

### 3.1 Create Render Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub (easiest)
- [ ] Authorize Render to access your GitHub

### 3.2 Create Web Service
- [ ] Click "New +" → "Web Service"
- [ ] Connect your GitHub repository (`radiance-camp`)
- [ ] Configure:
  - **Name**: `radiance-camp` (or your choice)
  - **Region**: Singapore (closest to India)
  - **Branch**: `main`
  - **Runtime**: Node
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Instance Type**: Free

### 3.3 Add Environment Variables
Click "Advanced" → Add these environment variables:

```
MONGODB_URI = mongodb+srv://mahammadsalim817:Saad%40123@sahityotsava.esgv7o5.mongodb.net/sahityotsava
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
NODE_ENV = production
```

⚠️ **Important**: Copy values from your `.env` file exactly!

### 3.4 Deploy!
- [ ] Click "Create Web Service"
- [ ] Wait 2-3 minutes for deployment
- [ ] Check logs for "✅ MongoDB Connected Successfully"
- [ ] Check logs for "☁️ Using Cloudinary cloud storage"

Your site will be live at: `https://radiance-camp.onrender.com` (or your chosen name)

---

## Step 4: Configure MongoDB Atlas (2 minutes)

### 4.1 Whitelist Render's IPs
Since Render uses dynamic IPs, you have 2 options:

**Option A: Allow All IPs (Simpler)**
- [ ] Go to MongoDB Atlas → Network Access
- [ ] Click "Add IP Address"
- [ ] Select "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"
- [ ] **Security Note**: Use strong password (already done ✅)

**Option B: Specific IPs (More Secure)**
- [ ] Go to Render dashboard → Your service → Settings
- [ ] Look for "Outbound IP Addresses"
- [ ] Copy all IPs
- [ ] Go to MongoDB Atlas → Network Access
- [ ] Add each IP address

### 4.2 Verify Connection
- [ ] Check your Render logs
- [ ] Should see "✅ MongoDB Connected Successfully"
- [ ] If you see connection errors, recheck IP whitelist

---

## Step 5: Test Production Site (5 minutes)

### 5.1 Registration Flow
- [ ] Open your production URL: `https://your-app.onrender.com`
- [ ] Fill out registration form
- [ ] Upload payment screenshot
- [ ] Submit registration
- [ ] Check for success message

### 5.2 File Upload
- [ ] Check Cloudinary dashboard → Media Library
- [ ] Verify image was uploaded
- [ ] Image should be in `radiance-camp-payments/` folder

### 5.3 Admin Dashboard
- [ ] Go to: `https://your-app.onrender.com/admin/dashboard`
- [ ] Verify registration appears
- [ ] Check screenshot is displayed (should be Cloudinary URL)
- [ ] Test "Approve" button
- [ ] Test "Reject" button
- [ ] Test "Export CSV" button

### 5.4 Mobile Testing
- [ ] Open site on mobile phone
- [ ] Test registration form
- [ ] Test file upload from camera
- [ ] Verify responsive design works

---

## Step 6: Share Links

### Public Registration Link
```
https://your-app.onrender.com
```
Share this with participants for registration.

### Admin Dashboard Link
```
https://your-app.onrender.com/admin/dashboard
```
⚠️ **Security Note**: This link has no password protection!
Add authentication if sharing publicly.

---

## 🎯 Success Checklist

- [ ] Site loads at production URL
- [ ] Registration form works
- [ ] File upload saves to Cloudinary
- [ ] Admin dashboard shows registrations
- [ ] Approve/Reject buttons work
- [ ] CSV export works
- [ ] Mobile responsive
- [ ] HTTPS enabled (automatic on Render)
- [ ] MongoDB connection stable

---

## ⚠️ Important Notes

### Free Tier Limitations (Render)
- Site sleeps after 15 minutes of inactivity
- First visit after sleep takes ~30 seconds to wake up
- 750 hours/month free (sufficient for most events)
- Upgrade to $7/month for always-on

### Free Tier Limitations (Cloudinary)
- 25 GB storage
- 25 GB bandwidth/month
- Sufficient for ~8,000 images (if 3MB each)
- Upgrade if you exceed limits

### MongoDB Atlas Free Tier
- 512 MB storage
- Sufficient for ~50,000 registrations
- Automatic backups (2-day retention)

---

## 🚨 Troubleshooting

### "Cannot connect to MongoDB"
1. Check MongoDB Atlas → Network Access
2. Ensure 0.0.0.0/0 is whitelisted OR add Render's IPs
3. Check environment variables in Render dashboard
4. Verify MONGODB_URI is correct

### "File upload failed"
1. Check Cloudinary credentials in Render environment variables
2. Verify Cloudinary dashboard shows your cloud name
3. Check Render logs for Cloudinary errors
4. Ensure you're using exact credentials (no extra spaces)

### "Site is very slow"
1. This is normal on free tier (sleep mode)
2. First visit takes ~30 seconds after 15 mins idle
3. Upgrade to $7/month for always-on service
4. Or use UptimeRobot to ping every 5 minutes (keeps it awake)

### "Site shows old version"
1. Render auto-deploys on git push
2. Check Render dashboard → "Events" tab
3. Manually trigger deploy: Render dashboard → "Manual Deploy"
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

## 🔐 Security Recommendations

### High Priority
- [ ] Add admin password protection (see below)
- [ ] Never commit `.env` to GitHub
- [ ] Use strong MongoDB password (already done ✅)
- [ ] Keep Cloudinary credentials secret

### Medium Priority
- [ ] Add rate limiting (prevent spam)
- [ ] Add CORS restrictions
- [ ] Add input sanitization
- [ ] Add Helmet.js for security headers

### Admin Password Protection (Quick Fix)
Add to `server.js` before admin routes:

```javascript
// Simple admin authentication middleware
const adminAuth = (req, res, next) => {
  const password = req.query.pwd || req.body.pwd;
  if (password === 'your_secret_password_here') {
    next();
  } else {
    res.status(401).send('Unauthorized. Contact admin for password.');
  }
};

// Apply to admin routes
app.get('/admin/dashboard', adminAuth, async (req, res) => {
  // ... existing code
});
```

Then access with: `https://your-app.onrender.com/admin/dashboard?pwd=your_secret_password_here`

---

## 📞 Support

If you encounter issues:
1. Check Render logs (Render dashboard → Logs tab)
2. Check MongoDB Atlas logs (Atlas dashboard → Monitoring)
3. Check Cloudinary dashboard (Media Library)
4. Check browser console (F12 → Console tab)

---

## ✅ You're Live!

Once all checkboxes are ticked, your registration system is production-ready! 🎉

**Total Setup Time**: ~15-20 minutes
**Cost**: $0/month (free tier)
**Capacity**: ~8,000 registrations with free tiers

Share the registration link with participants and monitor the admin dashboard for registrations!
