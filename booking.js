document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters to populate booking details
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('id');
    
    // In a real application, you would fetch hotel details from an API
    // For this example, we'll use the hotel data from hotel-listings.js
    
    if (hotelId) {
        // Find the hotel in the hotels array (from hotel-listings.js)
        const hotel = hotels.find(h => h.id === parseInt(hotelId));
        
        if (hotel) {
            document.getElementById('booking-hotel-name').textContent = hotel.name;
            document.getElementById('booking-hotel-location').textContent = hotel.location;
            document.getElementById('booking-hotel-image').src = hotel.image;
            
            // Calculate and display star rating
            const stars = '★'.repeat(hotel.stars);
            document.querySelector('.hotel-rating .star-rating').textContent = stars;
            document.querySelector('.hotel-rating .reviews').textContent = `(${hotel.reviews.toLocaleString()} reviews)`;
        }
    }
    
    // Populate dates if provided in URL
    if (params.has('checkin') && params.has('checkout')) {
        const checkin = new Date(params.get('checkin'));
        const checkout = new Date(params.get('checkout'));
        
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        document.getElementById('checkin-date').textContent = checkin.toLocaleDateString('en-US', options);
        document.getElementById('checkout-date').textContent = checkout.toLocaleDateString('en-US', options);
        
        // Calculate duration
        const diffTime = Math.abs(checkout - checkin);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        document.getElementById('stay-duration').textContent = `${diffDays} night${diffDays > 1 ? 's' : ''}`;
        
        // Calculate price (in a real app, this would come from the API)
        if (hotel) {
            const roomPrice = hotel.price * diffDays;
            const taxes = Math.round(roomPrice * 0.12); // 12% tax
            const total = roomPrice + taxes;
            
            document.querySelector('.price-details .price-item:nth-child(1) .price-value').textContent = `₹${roomPrice.toLocaleString()}`;
            document.querySelector('.price-details .price-item:nth-child(2) .price-value').textContent = `₹${taxes.toLocaleString()}`;
            document.querySelector('.price-details .price-item.total .price-value').textContent = `₹${total.toLocaleString()}`;
        }
    }
    
    // Populate guests if provided in URL
    if (params.has('adults')) {
        document.getElementById('adults-count').textContent = params.get('adults');
    }
    if (params.has('children')) {
        document.getElementById('children-count').textContent = params.get('children') || '0';
    }
    if (params.has('rooms')) {
        document.getElementById('rooms-count').textContent = params.get('rooms');
    }
    
    // Handle form submission
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateBookingForm()) {
            return;
        }
        
        // Get form data
        const formData = {
            guestInfo: {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                specialRequests: document.getElementById('specialRequests').value.trim()
            },
            paymentInfo: {
                cardName: document.getElementById('cardName').value.trim(),
                cardNumber: document.getElementById('cardNumber').value.trim(),
                expiryDate: document.getElementById('expiryDate').value.trim(),
                cvv: document.getElementById('cvv').value.trim()
            }
        };
        
        // Store form data in sessionStorage to pass to payment page
        sessionStorage.setItem('bookingFormData', JSON.stringify(formData));
        
        // Store price summary
        const priceSummary = {
            roomPrice: document.querySelector('.price-details .price-item:nth-child(1) .price-value').textContent,
            taxes: document.querySelector('.price-details .price-item:nth-child(2) .price-value').textContent,
            total: document.querySelector('.price-details .price-item.total .price-value').textContent
        };
        sessionStorage.setItem('priceSummary', JSON.stringify(priceSummary));
        
        // Get URL parameters to pass through
        const params = new URLSearchParams(window.location.search);
        
        // Redirect to payment page with all parameters
        window.location.href = 'payment.html?' + params.toString();
    });
    
    // Form validation
    function validateBookingForm() {
        const requiredFields = [
            'firstName', 'lastName', 'email', 'phone',
            'cardName', 'cardNumber', 'expiryDate', 'cvv'
        ];
        
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        // Validate email format
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('error');
            isValid = false;
        }
        
        // Validate phone number (basic validation)
        const phone = document.getElementById('phone');
        if (phone.value.trim().length < 10) {
            phone.classList.add('error');
            isValid = false;
        }
        
        // Validate card number (basic validation)
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber.value.replace(/\s/g, '').length < 16) {
            cardNumber.classList.add('error');
            isValid = false;
        }
        
        // Validate CVV
        const cvv = document.getElementById('cvv');
        if (cvv.value.length < 3) {
            cvv.classList.add('error');
            isValid = false;
        }
        
        if (!isValid) {
            alert('Please fill all required fields correctly');
        }
        
        return isValid;
    }
    
    // Handle coupon application
    document.querySelector('.coupon-input .apply-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const couponCode = document.querySelector('.coupon-input input').value.trim();
        
        if (couponCode) {
            // In a real application, you would validate the coupon with the server
            // For demo, we'll apply a 10% discount
            const totalElement = document.querySelector('.price-details .price-item.total .price-value');
            const totalText = totalElement.textContent.replace(/[^0-9]/g, '');
            let total = parseInt(totalText);
            
            const discount = Math.round(total * 0.1);
            total = total - discount;
            
            // Add discount row if not already present
            if (!document.querySelector('.price-details .price-item.discount')) {
                const discountRow = document.createElement('div');
                discountRow.className = 'price-item discount';
                discountRow.innerHTML = `
                    <span class="price-label">Coupon Discount</span>
                    <span class="price-value">-₹${discount.toLocaleString()}</span>
                `;
                
                const totalRow = document.querySelector('.price-details .price-item.total');
                totalRow.parentNode.insertBefore(discountRow, totalRow);
            }
            
            totalElement.textContent = `₹${total.toLocaleString()}`;
            
            alert(`Coupon ${couponCode} applied successfully! 10% discount added.`);
        } else {
            alert('Please enter a coupon code');
        }
    });
});
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form first
    if (!validateBookingForm()) {
        return;
    }

    // Collect all form data
    const formData = {
        guestInfo: {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            specialRequests: document.getElementById('specialRequests').value.trim()
        },
        paymentInfo: {
            cardName: document.getElementById('cardName').value.trim(),
            cardNumber: document.getElementById('cardNumber').value.trim(),
            expiryDate: document.getElementById('expiryDate').value.trim(),
            cvv: document.getElementById('cvv').value.trim()
        }
    };

    // Store data in sessionStorage
    sessionStorage.setItem('bookingFormData', JSON.stringify(formData));
    
    // Get current URL parameters
    const params = new URLSearchParams(window.location.search);
    
    // Redirect to payment page with all parameters
    window.location.href = 'payment.html?' + params.toString();
});

// Form validation function
function validateBookingForm() {
    let isValid = true;
    const requiredFields = [
        'firstName', 'lastName', 'email', 'phone',
        'cardName', 'cardNumber', 'expiryDate', 'cvv'
    ];

    // Validate required fields
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });

    // Validate email format
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        isValid = false;
    }

    // Validate credit card
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber.value.replace(/\s/g, '').length < 16) {
        cardNumber.classList.add('error');
        isValid = false;
    }

    // Validate CVV
    const cvv = document.getElementById('cvv');
    if (cvv.value.length < 3) {
        cvv.classList.add('error');
        isValid = false;
    }

    if (!isValid) {
        alert('Please fill all required fields correctly');
    }

    return isValid;
}