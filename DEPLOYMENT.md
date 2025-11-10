# 🚀 Production Deployment Guide - Radiance Camp Registration

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Setup

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Then fill in your credentials:

- **MongoDB URI**: Already configured
- **Cloudinary Credentials**: Sign up at https://cloudinary.com (free tier)
  - Get Cloud Name, API Key, and API Secret from your dashboard

### 2. File Upload Strategy

**Current Setup**: Files saved to `/public/uploads/` (⚠️ Not suitable for production)

**Recommended: Use Cloudinary**

#### Why Cloudinary?
✅ Cloud-based storage (files persist across deployments)
✅ Free tier: 25GB storage + 25GB bandwidth/month
✅ Automatic image optimization
✅ CDN delivery (faster loading worldwide)
✅ No server storage needed

#### Setup Steps:

1. **Sign up**: https://cloudinary.com/users/register/free
2. **Get credentials** from Dashboard → Settings → Account
3. **Add to `.env`**:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=your_secret_key
   ```

4. **Server already configured** to use Cloudinary when env vars are set!

### 3. Deployment Platforms (Choose One)

#### Option A: Render.com (Recommended - Easiest)

**Pros**: Free tier, auto-deploy from GitHub, persistent storage with Cloudinary
**Cons**: Free tier sleeps after 15 mins of inactivity

**Steps**:
1. Push code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add all from `.env`
5. Deploy!

**Cost**: Free (with Cloudinary)

---

#### Option B: Railway.app

**Pros**: Simple deployment, good free tier, auto HTTPS
**Cons**: $5/month credit limit on free tier

**Steps**:
1. Push to GitHub
2. Go to https://railway.app → New Project → Deploy from GitHub
3. Select your repo
4. Add environment variables
5. Deploy!

**Cost**: Free tier ($5 credit/month)

---

#### Option C: Heroku

**Pros**: Industry standard, lots of add-ons
**Cons**: No free tier anymore

**Steps**:
1. Install Heroku CLI
2. `heroku login`
3. `heroku create radiance-camp`
4. `heroku config:set MONGODB_URI=your_uri`
5. `heroku config:set CLOUDINARY_CLOUD_NAME=...` (add all env vars)
6. `git push heroku main`

**Cost**: $7/month (Eco Dyno)

---

#### Option D: DigitalOcean App Platform

**Pros**: Reliable, scalable, good performance
**Cons**: Starts at $5/month

**Steps**:
1. Push to GitHub
2. Go to DigitalOcean → Apps → Create App
3. Connect GitHub repo
4. Configure environment variables
5. Deploy!

**Cost**: $5/month (Basic plan)

---

## 🔒 Security Checklist

### Before going live:

- [ ] Add `.env` to `.gitignore` (check if already there)
- [ ] Never commit MongoDB credentials to GitHub
- [ ] Use strong passwords for MongoDB
- [ ] Enable MongoDB IP whitelist (currently allowing all IPs)
- [ ] Set up HTTPS (automatic on Render/Railway/Heroku)
- [ ] Add rate limiting (optional but recommended)

---

## 📝 MongoDB Atlas Production Setup

### Secure Your Database:

1. **Go to MongoDB Atlas** → Network Access
2. **Current**: Allowed from anywhere (0.0.0.0/0) ⚠️
3. **Recommended for Production**:
   - Option A: Add your deployment platform's IP addresses
   - Option B: Keep "Allowed from anywhere" but ensure strong password

### Backup Strategy:
- MongoDB Atlas automatically backs up (on free tier too!)
- Backups retained for 2 days on free tier

---

## 🧪 Testing Before Production

### Local Production Test:

```bash
# 1. Set environment
NODE_ENV=production npm start

# 2. Test all features:
# - Registration form
# - File upload
# - Payment screenshot
# - Admin dashboard
# - Approve/Reject workflow

# 3. Check MongoDB Atlas to verify data is saving correctly
```

---

## 📊 Monitoring (Optional but Recommended)

### Free Monitoring Tools:

1. **UptimeRobot** (https://uptimerobot.com)
   - Monitor if your site is online
   - Email alerts if it goes down
   - Free for 50 monitors

2. **MongoDB Atlas Monitoring**
   - Built-in monitoring in your MongoDB dashboard
   - Check connection stats, query performance

---

## 🚦 Deployment Recommendation

**Best for your use case**: **Render.com + Cloudinary**

**Why?**
✅ Completely free
✅ Easiest to set up (5 minutes)
✅ Auto-deploy from GitHub
✅ SSL/HTTPS included
✅ Files stored safely in Cloudinary
✅ Perfect for event registration sites

**Only limitation**: Free tier sleeps after 15 mins inactivity (wakes up in ~30 seconds on first visit)

---

## 📋 Quick Deployment Steps (Render + Cloudinary)

### 1. Set up Cloudinary (2 minutes)
- Sign up at cloudinary.com
- Copy Cloud Name, API Key, API Secret

### 2. Set up GitHub (1 minute)
```bash
cd /Users/sahadchad/Desktop/sahityotsava
git init
git add .
git commit -m "Initial commit - Radiance Camp Registration"
git branch -M main
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/radiance-camp.git
git push -u origin main
```

### 3. Deploy on Render (2 minutes)
- Go to render.com → Sign up with GitHub
- New Web Service → Connect your repo
- Add environment variables from `.env.example`
- Click Deploy!

### Done! 🎉
Your site will be live at: `https://radiance-camp.onrender.com` (or similar)

---

## 🆘 Common Issues & Solutions

### Issue: "Cannot GET /"
**Solution**: Make sure `npm start` command is correct in deployment settings

### Issue: MongoDB connection failed
**Solution**: 
- Check if MongoDB URI in environment variables is correct
- Ensure password is URL-encoded (@ becomes %40)
- Whitelist deployment platform IP in MongoDB Atlas

### Issue: File uploads not working
**Solution**:
- Verify Cloudinary credentials are correct
- Check Cloudinary dashboard for upload activity
- Ensure `.env` variables are set on deployment platform

### Issue: Site is slow to load
**Solution**:
- Free tier on Render sleeps - this is normal
- First visit after sleep takes ~30 seconds
- Upgrade to paid tier ($7/month) for always-on

---

## 📞 Need Help?

1. Check deployment platform logs
2. Check MongoDB Atlas logs
3. Check Cloudinary dashboard
4. Test locally first with production environment variables

---

## 🎯 Success Metrics

After deployment, test:
- [ ] Can register with all fields
- [ ] Upload screenshot works
- [ ] Screenshot appears in admin dashboard
- [ ] Can approve/reject registrations
- [ ] Export CSV works
- [ ] Mobile responsive works
- [ ] All Kannada text displays correctly

---

**Your app is production-ready!** 🚀

The codebase is solid. Just need to:
1. Set up Cloudinary account (5 mins)
2. Push to GitHub (2 mins)
3. Deploy on Render (3 mins)

Total time: ~10 minutes to go live! 🎉
