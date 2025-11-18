# How to Test the Payment Fix

## Quick Start

1. **Start your server** (if not already running):
   ```bash
   node server.js
   ```

2. **Open in browser**:
   - Go to http://localhost:3000
   - Fill out the registration form
   - Click "Continue to Payment"

## Testing Payment Buttons

### On Mobile Device (Recommended)

1. **Access from your phone**:
   - Find your computer's IP address:
     ```bash
     ifconfig | grep "inet " | grep -v 127.0.0.1
     ```
   - Open `http://YOUR_IP:3000` on your phone
   
2. **Test each payment button**:
   - ✅ **PhonePe Button**: Should open PhonePe app with:
     - UPI ID: 9746294802@ybl
     - Amount: ₹30
     - Payee: MOHAMMAD SALIM
     
   - ✅ **Google Pay Button**: Should open Google Pay with pre-filled details
   
   - ✅ **Paytm Button**: Should open Paytm with pre-filled details

3. **Test Copy UPI ID**:
   - Click "Copy UPI ID" button
   - Should show "Copied!" for 2 seconds
   - Paste in any app to verify

### On Desktop (Limited Testing)

Desktop browsers may not open UPI apps, but you can:
1. Click buttons to see the intent URLs in browser console
2. Test the QR code scanning functionality
3. Test the copy UPI ID feature

## What Should Happen

### ✅ Success Scenario:
1. Click PhonePe/GPay/Paytm button
2. Phone asks "Open in [App Name]?"
3. App opens with payment details pre-filled
4. Complete payment
5. Take screenshot
6. Upload screenshot
7. Submit registration

### ⚠️ If App Doesn't Open:
1. You'll see an alert with instructions
2. Use alternative methods:
   - Scan QR code
   - Copy UPI ID manually
   - Pay through any UPI app

## Testing Checklist

- [ ] PhonePe button opens PhonePe app
- [ ] Google Pay button opens Google Pay app
- [ ] Paytm button opens Paytm app
- [ ] Copy UPI ID button copies to clipboard
- [ ] QR code is visible and scannable
- [ ] File upload works for screenshots
- [ ] Form submits successfully
- [ ] Success page displays after submission

## Common Test Issues

### Issue 1: "App not installed"
**Solution**: 
- Install the UPI app or use QR code method
- Try other UPI apps

### Issue 2: "Browser blocks the link"
**Solution**:
- Allow pop-ups for this site
- Use Chrome/Safari (better deep link support)
- Use QR code as fallback

### Issue 3: "Amount not showing in app"
**Solution**:
- This means parameters aren't being passed
- Check browser console for errors
- Use manual payment with copied UPI ID

## Browser Console Commands

Open browser console (F12) and test:

```javascript
// Test UPI configuration
console.log(UPI_CONFIG);

// Test payment function
payViaUPI('phonepe');
payViaUPI('gpay');
payViaUPI('paytm');

// Test copy function
copyUpiId();
```

## Verification Steps

After fixing, verify in admin dashboard:
1. Go to http://localhost:3000/admin/dashboard
2. Check if registrations appear
3. Verify payment screenshots are uploaded
4. Test approve/reject functionality

## Mobile Testing Tips

1. **Use Chrome on Android**: Best deep link support
2. **Clear browser cache**: Force refresh with Ctrl+Shift+R
3. **Check UPI app versions**: Update to latest
4. **Try different browsers**: Chrome, Firefox, Samsung Internet
5. **Enable pop-ups**: Some browsers block deep links

## Success Indicators

You know it's working when:
- ✅ Button click opens UPI app immediately
- ✅ Amount (₹30) is pre-filled
- ✅ Payee name shows "MOHAMMAD SALIM"
- ✅ UPI ID shows "9746294802@ybl"
- ✅ Transaction note shows "Radiance Camp Registration"

## Fallback Methods Always Work

Even if buttons don't work:
1. **QR Code**: Always reliable, works with any UPI app
2. **Manual UPI ID**: Copy and paste in any UPI app
3. **Screenshot Upload**: Provides proof of payment

## Need Help?

If nothing works:
1. Check server logs for errors
2. Check browser console for JavaScript errors
3. Verify MongoDB connection
4. Check file permissions for uploads
5. Test QR code with multiple UPI apps

## Production Deployment

Before deploying:
- [ ] Test on multiple mobile devices
- [ ] Verify QR code is correct
- [ ] Test all payment methods
- [ ] Check admin dashboard access
- [ ] Verify MongoDB connection
- [ ] Test file uploads in production
