// Ensure hotels data is available (in a real app, this would come from an API)
const hotels = [
    // Your hotel data from hotel-listings.js should be here
];

document.addEventListener('DOMContentLoaded', function() {
    // Check if we have booking data
    const bookingFormData = JSON.parse(sessionStorage.getItem('bookingFormData'));
    if (!bookingFormData) {
        // Redirect back to booking if no data
        const params = new URLSearchParams(window.location.search);
        window.location.href = 'booking.html?' + params.toString();
        return;
    }

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('id');

    // Safe element selection with null checks
    const getElement = (id) => {
        const el = document.getElementById(id);
        if (!el) console.error(`Element with ID ${id} not found`);
        return el;
    };

    // Update hotel info if available
    function updateHotelInfo(hotel) {
        const nameEl = getElement('payment-hotel-name');
        const locationEl = getElement('payment-hotel-location');
        const imageEl = getElement('payment-hotel-image');
        const starRatingEl = document.querySelector('.hotel-rating .star-rating');
        const reviewsEl = document.querySelector('.hotel-rating .reviews');

        if (nameEl) nameEl.textContent = hotel.name;
        if (locationEl) locationEl.textContent = hotel.location;
        if (imageEl) imageEl.src = hotel.image;
        if (starRatingEl) starRatingEl.textContent = '★'.repeat(hotel.stars);
        if (reviewsEl) reviewsEl.textContent = `(${hotel.reviews.toLocaleString()} reviews)`;
    }

    // Update booking dates
    function updateBookingDates(checkin, checkout) {
        const checkinEl = getElement('payment-checkin-date');
        const checkoutEl = getElement('payment-checkout-date');
        const durationEl = getElement('payment-stay-duration');

        if (checkinEl && checkoutEl && durationEl) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            checkinEl.textContent = checkin.toLocaleDateString('en-US', options);
            checkoutEl.textContent = checkout.toLocaleDateString('en-US', options);

            const diffTime = Math.abs(checkout - checkin);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            durationEl.textContent = `${diffDays} night${diffDays > 1 ? 's' : ''}`;
        }
    }

    // Update pricing
    function updatePricing(hotel, diffDays) {
        // Get price summary from sessionStorage
        const priceSummary = JSON.parse(sessionStorage.getItem('priceSummary'));
        
        if (!priceSummary) {
            // Fallback calculation if no price summary
            const roomPrice = hotel.price * diffDays;
            const taxes = Math.round(roomPrice * 0.12); // 12% tax
            const discount = Math.round(roomPrice * 0.05); // 5% discount for example
            const total = roomPrice + taxes - discount;

            const priceElements = [
                { selector: '.price-details .price-item:nth-child(1) .price-value', value: roomPrice },
                { selector: '.price-details .price-item:nth-child(2) .price-value', value: taxes },
                { selector: '.price-details .price-item.discount .price-value', value: discount },
                { selector: '.price-details .price-item.total .price-value', value: total },
                { selector: '.btn-amount', value: total }
            ];

            priceElements.forEach(item => {
                const el = document.querySelector(item.selector);
                if (el) el.textContent = `₹${item.value.toLocaleString()}`;
            });
        } else {
            // Use stored price summary
            document.querySelector('.price-details .price-item:nth-child(1) .price-value').textContent = priceSummary.roomPrice;
            document.querySelector('.price-details .price-item:nth-child(2) .price-value').textContent = priceSummary.taxes;
            document.querySelector('.price-details .price-item.total .price-value').textContent = priceSummary.total;
            document.querySelector('.btn-amount').textContent = priceSummary.total;
        }
    }

    // Main initialization
    if (hotelId) {
        const hotel = hotels.find(h => h.id === parseInt(hotelId));
        if (hotel) {
            updateHotelInfo(hotel);

            try {
                const checkin = params.has('checkin') ? new Date(params.get('checkin')) : null;
                const checkout = params.has('checkout') ? new Date(params.get('checkout')) : null;

                if (checkin && checkout) {
                    updateBookingDates(checkin, checkout);
                    const diffTime = Math.abs(checkout - checkin);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    updatePricing(hotel, diffDays);
                }
            } catch (e) {
                console.error('Error parsing dates:', e);
            }
        }
    }

    // If we have form data, pre-fill the payment form
    if (bookingFormData && bookingFormData.paymentInfo) {
        document.getElementById('cardName').value = bookingFormData.paymentInfo.cardName || '';
        document.getElementById('cardNumber').value = bookingFormData.paymentInfo.cardNumber || '';
        document.getElementById('expiryDate').value = bookingFormData.paymentInfo.expiryDate || '';
        document.getElementById('cvv').value = bookingFormData.paymentInfo.cvv || '';
    }

    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentDetails = document.querySelectorAll('.payment-details');

    if (paymentMethods.length && paymentDetails.length) {
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                paymentMethods.forEach(m => m.classList.remove('active'));
                this.classList.add('active');
                
                paymentDetails.forEach(detail => detail.classList.remove('active'));
                
                const methodType = this.getAttribute('data-method');
                const detailEl = document.querySelector(`.${methodType}-details`);
                if (detailEl) detailEl.classList.add('active');
            });
        });
    }

    // Form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validatePaymentForm()) {
                return;
            }
            
            const submitBtn = document.getElementById('payNowBtn');
            if (!submitBtn) return;
            
            const btnText = submitBtn.querySelector('.btn-text');
            if (!btnText) return;
            
            const originalText = btnText.textContent;
            btnText.innerHTML = '<span class="loading-spinner"></span> Processing Payment...';
            submitBtn.disabled = true;
            
            // Get selected payment method
            const paymentMethod = document.querySelector('.payment-method.active').getAttribute('data-method');
            
            // Store payment method for confirmation page
            sessionStorage.setItem('paymentMethod', paymentMethod);
            
            // Get URL parameters to pass through
            const params = new URLSearchParams(window.location.search);
            
            // Simulate payment processing
            setTimeout(function() {
                // Redirect to confirmation with all parameters
                window.location.href = 'confirmation.html?' + params.toString();
            }, 2000);
        });
    }

    // Form validation
    function validatePaymentForm() {
        const activeMethod = document.querySelector('.payment-method.active').getAttribute('data-method');
        let isValid = true;
        
        if (activeMethod === 'credit-card') {
            const requiredFields = ['cardName', 'cardNumber', 'expiryDate', 'cvv'];
            
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validate card number (basic validation)
            const cardNumber = document.getElementById('cardNumber');
            if (cardNumber.value.replace(/\s/g, '').length < 16) {
                cardNumber.classList.add('error');
                isValid = false;
            }
            
            // Validate expiry date (basic validation)
            const expiryDate = document.getElementById('expiryDate');
            if (!expiryDate.value.match(/^\d{2}\/\d{2}$/)) {
                expiryDate.classList.add('error');
                isValid = false;
            }
            
            // Validate CVV
            const cvv = document.getElementById('cvv');
            if (cvv.value.length < 3) {
                cvv.classList.add('error');
                isValid = false;
            }
        } else if (activeMethod === 'netbanking') {
            const bankSelect = document.getElementById('bankSelect');
            if (!bankSelect.value) {
                bankSelect.classList.add('error');
                isValid = false;
            } else {
                bankSelect.classList.remove('error');
            }
        } else if (activeMethod === 'upi') {
            const upiId = document.getElementById('upiId');
            if (!upiId.value.trim() || !upiId.value.includes('@')) {
                upiId.classList.add('error');
                isValid = false;
            } else {
                upiId.classList.remove('error');
            }
        }
        
        // Validate terms checkbox
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms.checked) {
            agreeTerms.classList.add('error');
            isValid = false;
        } else {
            agreeTerms.classList.remove('error');
        }
        
        if (!isValid) {
            alert('Please fill all required fields correctly');
        }
        
        return isValid;
    }

    // Input formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\s+/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            this.value = value;
        });
    }

    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Get stored booking data
    const bookingData = JSON.parse(sessionStorage.getItem('bookingFormData'));
    
    if (!bookingData) {
        // Redirect back if no data
        const params = new URLSearchParams(window.location.search);
        window.location.href = 'booking.html?' + params.toString();
        return;
    }

    // Pre-fill payment form if credit card was entered
    if (bookingData.paymentInfo) {
        document.getElementById('cardName').value = bookingData.paymentInfo.cardName || '';
        document.getElementById('cardNumber').value = bookingData.paymentInfo.cardNumber || '';
        document.getElementById('expiryDate').value = bookingData.paymentInfo.expiryDate || '';
        document.getElementById('cvv').value = bookingData.paymentInfo.cvv || '';
    }
    
    // Rest of your payment page logic...
});
document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form first
    if (!validatePaymentForm()) {
        return;
    }

    // Show processing state
    const payButton = document.getElementById('payNowBtn');
    const originalText = payButton.innerHTML;
    payButton.innerHTML = '<span class="loading-spinner"></span> Processing Payment...';
    payButton.disabled = true;

    // Get selected payment method
    const paymentMethod = document.querySelector('.payment-method.active').getAttribute('data-method');
    
    // Prepare payment data to pass to confirmation
    const paymentData = {
        method: paymentMethod,
        details: {}
    };

    // Collect payment details based on method
    switch(paymentMethod) {
        case 'credit-card':
            paymentData.details = {
                cardName: document.getElementById('cardName').value.trim(),
                lastFour: document.getElementById('cardNumber').value.trim().slice(-4),
                expiryDate: document.getElementById('expiryDate').value.trim()
            };
            break;
            
        case 'paypal':
            paymentData.details = { email: "user@example.com" }; // Simulated
            break;
            
        case 'netbanking':
            paymentData.details = { 
                bank: document.getElementById('bankSelect').value 
            };
            break;
            
        case 'upi':
            paymentData.details = { 
                upiId: document.getElementById('upiId').value.trim() 
            };
            break;
    }

    // Store payment data in sessionStorage
    sessionStorage.setItem('paymentData', JSON.stringify(paymentData));
    
    // Get URL parameters to maintain booking details
    const params = new URLSearchParams(window.location.search);
    
    // Simulate payment processing (2 seconds)
    setTimeout(function() {
        // Redirect to confirmation page with all parameters
        window.location.href = 'confirmation.html?' + params.toString();
    }, 2000);
});

// Form validation function
function validatePaymentForm() {
    const activeMethod = document.querySelector('.payment-method.active').getAttribute('data-method');
    let isValid = true;
    
    // Validate based on payment method
    switch(activeMethod) {
        case 'credit-card':
            if (!document.getElementById('cardName').value.trim()) {
                document.getElementById('cardName').classList.add('error');
                isValid = false;
            }
            if (!document.getElementById('cardNumber').value.trim() || 
                document.getElementById('cardNumber').value.replace(/\s/g, '').length < 16) {
                document.getElementById('cardNumber').classList.add('error');
                isValid = false;
            }
            if (!document.getElementById('expiryDate').value.match(/^\d{2}\/\d{2}$/)) {
                document.getElementById('expiryDate').classList.add('error');
                isValid = false;
            }
            if (!document.getElementById('cvv').value || document.getElementById('cvv').value.length < 3) {
                document.getElementById('cvv').classList.add('error');
                isValid = false;
            }
            break;
            
        case 'netbanking':
            if (!document.getElementById('bankSelect').value) {
                document.getElementById('bankSelect').classList.add('error');
                isValid = false;
            }
            break;
            
        case 'upi':
            if (!document.getElementById('upiId').value.trim() || 
                !document.getElementById('upiId').value.includes('@')) {
                document.getElementById('upiId').classList.add('error');
                isValid = false;
            }
            break;
    }
    
    // Validate terms checkbox
    if (!document.getElementById('agreeTerms').checked) {
        document.getElementById('agreeTerms').classList.add('error');
        isValid = false;
    }
    
    if (!isValid) {
        alert('Please fill all required fields correctly');
    }
    
    return isValid;
}