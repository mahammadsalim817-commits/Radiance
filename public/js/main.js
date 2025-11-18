let formData = {};

// UPI Payment Configuration
const UPI_CONFIG = {
  upiId: '9746294802@ybl',
  payeeName: 'MOHAMMAD SALIM',
  amount: '30',
  transactionNote: 'Radiance Camp Registration'
};

// Function to handle UPI payments - Without amount to avoid risk policy
function payViaUPI(app) {
  const { upiId, payeeName, transactionNote } = UPI_CONFIG;
  
  // Encode parameters for URL
  const encodedName = encodeURIComponent(payeeName);
  const encodedNote = encodeURIComponent(transactionNote);
  
  // Use standard UPI intent WITHOUT amount parameter to avoid risk policy blocks
  // Amount will need to be entered manually by the user
  let upiUrl = `upi://pay?pa=${upiId}&pn=${encodedName}&tn=${encodedNote}&cu=INR`;
  
  // Create a temporary link and click it
  const link = document.createElement('a');
  link.href = upiUrl;
  link.style.display = 'none';
  document.body.appendChild(link);
  
  try {
    link.click();
  } catch (error) {
    console.error('Error opening UPI app:', error);
  } finally {
    document.body.removeChild(link);
  }
}

// Show payment error
function showPaymentError(app) {
  const appNames = {
    'phonepe': 'PhonePe',
    'gpay': 'Google Pay',
    'paytm': 'Paytm'
  };
  
  const appName = appNames[app] || 'UPI app';
  
  alert(`Could not open ${appName}.\n\nAlternative methods:\n1. Scan the QR code above with any UPI app\n2. Or manually pay to UPI ID: ${UPI_CONFIG.upiId}\n3. Amount: ₹${UPI_CONFIG.amount}\n4. Upload payment screenshot below`);
}

// Copy UPI ID to clipboard
function copyUpiId() {
  const upiId = UPI_CONFIG.upiId;
  const copyBtnText = document.getElementById('copyBtnText');
  
  // Modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(upiId)
      .then(() => {
        copyBtnText.textContent = 'Copied!';
        setTimeout(() => {
          copyBtnText.textContent = 'Copy UPI ID';
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        fallbackCopy(upiId);
      });
  } else {
    // Fallback for older browsers
    fallbackCopy(upiId);
  }
}

// Fallback copy method for older browsers
function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      const copyBtnText = document.getElementById('copyBtnText');
      copyBtnText.textContent = 'Copied!';
      setTimeout(() => {
        copyBtnText.textContent = 'Copy UPI ID';
      }, 2000);
    }
  } catch (err) {
    console.error('Fallback copy failed:', err);
    alert('Failed to copy. Please copy manually: ' + text);
  }
  
  document.body.removeChild(textArea);
}

// Sector-Unit mapping
const sectorUnits = {
  'ಪುತ್ತೂರು ಸೆಕ್ಟರ್': [
    'ಬನ್ನೂರು',
    'ಕೆಮ್ಮಾಯಿ',
    'ಅಜ್ಜಿಕಟ್ಟೆ',
    'ನರಿಮೊಗರು',
    'ಸಾರ್ಯ',
    'ಬುಳೇರಿಕಟ್ಟೆ',
    'ಸಂಪ್ಯ',
    'ಮುಕ್ವೆ',
    'ಪುತ್ತೂರು ಟೌನ್'
  ],
  'ಕಬಕ ಸೆಕ್ಟರ್': [
    'ಕರಿಮಜಲು',
    'ಕಬಕ',
    'ಕೊಡಿಪ್ಪಾಡಿ',
    'ಬೀಟಿಗೆ',
    'ಹಸನ್ ನಗರ'
  ],
  'ಕುಂಬ್ರ ಸೆಕ್ಟರ್': [
    'ಮೈದಾನಿಮೂಲೆ',
    'ಕುಂಬ್ರ',
    'ಘಟ್ಟಮನೆ',
    'ತಿಂಗಳಾಡಿ',
    'ರೆಂಜಲಾಡಿ'
  ],
  'ಮಾಡಾವು ಸೆಕ್ಟರ್': [
    'ಕಟ್ಟತ್ತಾರ್',
    'ಚೆನ್ನಾರ್',
    'ಅರಿಕ್ಕಿಲ',
    'ಮಾಡಾವು',
    'ಕೊಳ್ತಿಗೆ',
    'ಅಮ್ಚಿನಡ್ಕ'
  ],
  'ಮಾಣಿ ಸೆಕ್ಟರ್': [
    'ಸೂರಿಕುಮೇರ್',
    'ಪಾಟ್ರಕೋಡಿ',
    'ಮಿತ್ತೂರ್',
    'ಸೂರ್ಯ',
    'ಬುಡೋಲಿ',
    'ನೇರಳಕಟ್ಟೆ',
    'ಕಲ್ಲಡ್ಕ'
  ],
  'ಈಶ್ವರ ಮಂಗಳ ಸೆಕ್ಟರ್': [
    'ಪಾಳ್ಯತ್ತಡ್ಕ',
    'ಮೇನಾಲ',
    'ಮೀನಾವು',
    'ಕುಕ್ಕಾಜೆ',
    'ಕೊಯಿಲ',
    'ಮಾಡನ್ನೂರು',
    'ಬಡಗನ್ನೂರು'
  ],
  'ರೆಂಜ ಸೆಕ್ಟರ್': [
    'ಪೇರಲ್ತಡ್ಕ',
    'ಪಾಣಾಜೆ',
    'ರೆಂಜ',
    'ಡೆಮ್ಮಂಗರ',
    'ತಂಬುತ್ತಡ್ಕ'
  ]
};

// Initialize custom dropdowns
function initCustomSelect(selectId, customSelectId, options) {
  const select = document.getElementById(selectId);
  const customSelect = document.getElementById(customSelectId);
  const trigger = customSelect.querySelector('.custom-select-trigger');
  const optionsContainer = customSelect.querySelector('.custom-options');
  
  // Remove existing event listeners by cloning and replacing elements
  const newOptionsContainer = optionsContainer.cloneNode(false);
  optionsContainer.parentNode.replaceChild(newOptionsContainer, optionsContainer);
  
  const newTrigger = trigger.cloneNode(true);
  trigger.parentNode.replaceChild(newTrigger, trigger);
  
  // Update references
  const finalTrigger = customSelect.querySelector('.custom-select-trigger');
  const finalOptionsContainer = customSelect.querySelector('.custom-options');
  
  // Populate options
  finalOptionsContainer.innerHTML = '';
  options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'custom-option';
    optionDiv.textContent = option.text;
    optionDiv.dataset.value = option.value;
    
    if (index === 0 && option.value === '') {
      optionDiv.style.display = 'none'; // Hide placeholder option
    }
    
    optionDiv.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Update hidden select
      select.value = this.dataset.value;
      
      // Update trigger text
      finalTrigger.querySelector('span').textContent = this.textContent;
      
      // Update selected state
      finalOptionsContainer.querySelectorAll('.custom-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      this.classList.add('selected');
      
      // Close dropdown
      customSelect.classList.remove('open');
      
      // Trigger change event on hidden select
      select.dispatchEvent(new Event('change'));
    });
    
    finalOptionsContainer.appendChild(optionDiv);
  });
  
  // Toggle dropdown
  finalTrigger.addEventListener('click', function(e) {
    if (!this.classList.contains('disabled')) {
      e.stopPropagation();
      
      const wasOpen = customSelect.classList.contains('open');
      
      // Close all dropdowns first
      document.querySelectorAll('.custom-select').forEach(cs => {
        cs.classList.remove('open');
      });
      
      // Toggle current dropdown
      if (!wasOpen) {
        customSelect.classList.add('open');
        
        // Scroll to selected option if exists
        const selectedOption = finalOptionsContainer.querySelector('.custom-option.selected');
        if (selectedOption) {
          setTimeout(() => {
            selectedOption.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }, 100);
        }
      }
    }
  });
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.custom-select')) {
    document.querySelectorAll('.custom-select').forEach(cs => {
      cs.classList.remove('open');
    });
  }
});

// Initialize sector dropdown
const sectorSelect = document.getElementById('sector');
const sectorOptions = Array.from(sectorSelect.options).map(opt => ({
  value: opt.value,
  text: opt.textContent
}));
initCustomSelect('sector', 'customSector', sectorOptions);

// Handle sector change to populate units
document.getElementById('sector').addEventListener('change', function() {
  const sector = this.value;
  const unitSelect = document.getElementById('unit');
  const customUnit = document.getElementById('customUnit');
  const unitTrigger = customUnit.querySelector('.custom-select-trigger');
  
  // Close the dropdown if it's open
  customUnit.classList.remove('open');
  
  // Clear existing options
  unitSelect.innerHTML = '<option value="">Select Unit</option>';
  
  if (sector && sectorUnits[sector]) {
    // Enable unit dropdown
    unitSelect.disabled = false;
    unitTrigger.classList.remove('disabled');
    unitTrigger.querySelector('span').textContent = 'Select Unit';
    
    // Sort units alphabetically
    const sortedUnits = [...sectorUnits[sector]].sort((a, b) => {
      return a.localeCompare(b, 'kn'); // Use Kannada locale for proper sorting
    });
    
    // Add units for selected sector
    sortedUnits.forEach(unit => {
      const option = document.createElement('option');
      option.value = unit;
      option.textContent = unit;
      unitSelect.appendChild(option);
    });
    
    // Reinitialize unit dropdown with new options
    const unitOptions = Array.from(unitSelect.options).map(opt => ({
      value: opt.value,
      text: opt.textContent
    }));
    initCustomSelect('unit', 'customUnit', unitOptions);
  } else {
    // Disable unit dropdown if no sector selected
    unitSelect.disabled = true;
    unitSelect.innerHTML = '<option value="">First select a sector</option>';
    unitTrigger.classList.add('disabled');
    unitTrigger.querySelector('span').textContent = 'First select a sector';
    customUnit.querySelector('.custom-options').innerHTML = '';
  }
});

// File upload - no preview, just show filename
document.getElementById('paymentScreenshot').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const fileName = document.getElementById('fileName');

  if (file) {
    fileName.textContent = file.name;
  } else {
    fileName.textContent = 'Choose File';
  }
});

document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const phoneNumber = document.getElementById('phoneNumber').value;
  if (!/^[0-9]{10}$/.test(phoneNumber)) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }

  formData = {
    name: document.getElementById('name').value.trim(),
    age: document.getElementById('age').value,
    unit: document.getElementById('unit').value.trim(),
    sector: document.getElementById('sector').value.trim(),
    phoneNumber: phoneNumber
  };

  document.getElementById('formCard').style.display = 'none';
  document.getElementById('paymentCard').style.display = 'block';
  window.scrollTo(0, 0);
});

document.getElementById('backBtn').addEventListener('click', function() {
  document.getElementById('paymentCard').style.display = 'none';
  document.getElementById('formCard').style.display = 'block';
  window.scrollTo(0, 0);
});

document.getElementById('transactionForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const fileInput = document.getElementById('paymentScreenshot');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please upload a payment screenshot');
    return;
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file');
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Uploading...';

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('unit', formData.unit);
    formDataToSend.append('sector', formData.sector);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('paymentScreenshot', file);

    const response = await fetch('/api/register', {
      method: 'POST',
      body: formDataToSend
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = '/success';
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Something went wrong. Please try again.');
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Complete Registration';
  }
});
