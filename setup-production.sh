#!/bin/bash

# 🚀 Quick Production Setup Script

echo "================================================"
echo "🎯 Radiance Camp - Production Setup"
echo "================================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file and add your Cloudinary credentials!"
    echo ""
    echo "To get Cloudinary credentials:"
    echo "1. Sign up at https://cloudinary.com/users/register/free"
    echo "2. Go to Dashboard → Settings → Account"
    echo "3. Copy Cloud Name, API Key, and API Secret"
    echo "4. Paste them into .env file"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Check if Cloudinary credentials are configured
if grep -q "your_cloud_name_here" .env 2>/dev/null; then
    echo "⚠️  WARNING: Cloudinary credentials not configured in .env"
    echo "   Please edit .env file and add your actual credentials"
    echo ""
else
    echo "✅ Cloudinary credentials appear to be configured"
    echo ""
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Summary
echo "================================================"
echo "📋 Next Steps:"
echo "================================================"
echo ""
echo "1. Edit .env file with your Cloudinary credentials"
echo "   (Get them from https://cloudinary.com/console)"
echo ""
echo "2. Start the server:"
echo "   npm start"
echo ""
echo "3. Test locally:"
echo "   Open http://localhost:3000"
echo "   Submit a registration with image"
echo "   Check Cloudinary dashboard for uploaded image"
echo ""
echo "4. Deploy to production:"
echo "   Follow PRODUCTION-CHECKLIST.md"
echo ""
echo "================================================"
echo ""
