document.addEventListener('DOMContentLoaded', function() {
    // Generate a random booking reference
    function generateBookingReference() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = 'CHS-';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Format date with time
    function formatDateTime(date) {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('id');

    // Set booking reference
    const bookingRefEl = document.getElementById('booking-reference');
    if (bookingRefEl) {
        bookingRefEl.textContent = generateBookingReference();
    }

    // Set current date/time for payment
    const paymentDateEl = document.getElementById('payment-date');
    if (paymentDateEl) {
        paymentDateEl.textContent = formatDateTime(new Date());
    }

    // In a real app, you would fetch booking details from your backend
    // For demo purposes, we'll use sample data
    const bookingDetails = {
        hotel: {
            name: "Grand Horizon Palace",
            location: "Central District, Delhi",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            rating: 5,
            reviews: 1284
        },
        dates: {
            checkin: new Date(2023, 10, 15), // Nov 15, 2023
            checkout: new Date(2023, 10, 20)  // Nov 20, 2023
        },
        guests: {
            adults: 2,
            children: 1,
            rooms: 1
        },
        payment: {
            method: "Credit Card ending in 4242",
            amount: "₹48,150.00"
        },
        guestInfo: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+91 9876543210"
        }
    };

    // Update hotel info
    const hotel = bookingDetails.hotel;
    document.getElementById('confirmation-hotel-name').textContent = hotel.name;
    document.getElementById('confirmation-hotel-name-full').textContent = hotel.name;
    document.getElementById('confirmation-hotel-location').textContent = hotel.location;
    document.getElementById('confirmation-hotel-image').src = hotel.image;
    document.querySelector('.hotel-rating .star-rating').textContent = '★'.repeat(hotel.rating);
    document.querySelector('.hotel-rating .reviews').textContent = `(${hotel.reviews.toLocaleString()} reviews)`;

    // Update booking dates
    const dates = bookingDetails.dates;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    document.getElementById('confirmation-checkin').textContent = dates.checkin.toLocaleDateString('en-US', options);
    document.getElementById('confirmation-checkout').textContent = dates.checkout.toLocaleDateString('en-US', options);
    
    const diffTime = Math.abs(dates.checkout - dates.checkin);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('confirmation-duration').textContent = `${diffDays} night${diffDays > 1 ? 's' : ''}`;

    // Update guest info
    const guests = bookingDetails.guests;
    document.getElementById('confirmation-guests').textContent = 
        `${guests.adults} Adult${guests.adults > 1 ? 's' : ''}${guests.children > 0 ? `, ${guests.children} Child${guests.children > 1 ? 'ren' : ''}` : ''}`;
    document.getElementById('confirmation-rooms').textContent = `${guests.rooms} Room${guests.rooms > 1 ? 's' : ''}`;

    // Update payment info
    const payment = bookingDetails.payment;
    document.getElementById('payment-method').textContent = payment.method;
    document.getElementById('amount-paid').textContent = payment.amount;

    // Update guest information
    const guestInfo = bookingDetails.guestInfo;
    document.getElementById('primary-guest').textContent = guestInfo.name;
    document.getElementById('guest-email').textContent = guestInfo.email;
    document.getElementById('guest-phone').textContent = guestInfo.phone;

    // Download receipt handler
    document.querySelector('.download-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Receipt download would start here in a real implementation');
    });

    // Add to calendar handler
    document.querySelector('.calendar-btn')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Calendar event would be added here in a real implementation');
    });
});
