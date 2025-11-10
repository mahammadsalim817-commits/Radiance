document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');

  // Get form data
  const formData = {
    name: document.getElementById('name').value.trim(),
    age: document.getElementById('age').value,
    unit: document.getElementById('unit').value.trim(),
    sector: document.getElementById('sector').value.trim(),
    phoneNumber: document.getElementById('phoneNumber').value.trim()
  };

  // Validate phone number
  if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }

  // Disable button and show loader
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';

  try {
    // Create Razorpay order
    const orderResponse = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const orderData = await orderResponse.json();

    if (!orderData.success) {
      throw new Error(orderData.error || 'Failed to create order');
    }

    // Razorpay options
    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Sahityotsava',
      description: 'Registration Fee',
      order_id: orderData.orderId,
      handler: async function (response) {
        // Payment successful
        try {
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              ...formData
            })
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // Redirect to success page
            window.location.href = '/success';
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (error) {
          console.error('Verification error:', error);
          alert('Payment verification failed. Please contact support.');
          resetButton();
        }
      },
      prefill: {
        name: formData.name,
        contact: formData.phoneNumber
      },
      theme: {
        color: '#667eea'
      },
      modal: {
        ondismiss: function() {
          // User closed the payment modal
          resetButton();
        }
      }
    };

    // Open Razorpay checkout
    const razorpay = new Razorpay(options);
    razorpay.open();

    razorpay.on('payment.failed', function (response) {
      alert('Payment failed. Please try again.');
      console.error('Payment failed:', response.error);
      resetButton();
    });

  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Something went wrong. Please try again.');
    resetButton();
  }

  function resetButton() {
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
  }
});
