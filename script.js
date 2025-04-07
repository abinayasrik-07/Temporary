// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeButtons = document.querySelectorAll('.close');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const searchForm = document.getElementById('searchForm');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Open Login Modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
    signupModal.style.display = 'none';
});

// Open Signup Modal
signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
    loginModal.style.display = 'none';
});

// Show Signup from Login
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

// Show Login from Signup
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
});

// Close Modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

// Close Modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Search form submission
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const destination = document.getElementById('destination').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const rooms = document.getElementById('rooms').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value || 0;

    // Validate dates
    if (new Date(checkout) <= new Date(checkin)) {
        alert("Check-out date must be after check-in date");
        return;
    }

    // Create URL with search parameters
    const params = new URLSearchParams({
        destination: destination,
        checkin: checkin,
        checkout: checkout,
        rooms: rooms,
        adults: adults,
        children: children
    });

    // Redirect to hotel listings page with search parameters
    window.location.href = `search-hotels.html?${params.toString()}`;
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // In a real application, you would validate and send to server
    alert(`Login attempt with email: ${email}`);
    loginModal.style.display = 'none';
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    
    if (password !== confirm) {
        alert('Passwords do not match!');
        return;
    }
    
    // In a real application, you would validate and send to server
    alert(`Account created for ${name} with email: ${email}`);
    signupModal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('checkin').valueAsDate = today;
    document.getElementById('checkout').valueAsDate = tomorrow;
});

document.addEventListener('DOMContentLoaded', function() {
    const roomInput = document.getElementById('rooms');
    const roomPlusBtn = roomInput.closest('.room-selector').querySelector('.plus');
    const roomMinusBtn = roomInput.closest('.room-selector').querySelector('.minus');

    roomPlusBtn.addEventListener('click', () => {
        let value = parseInt(roomInput.value);
        if (value < 20) roomInput.value = value + 1;
    });

    roomMinusBtn.addEventListener('click', () => {
        let value = parseInt(roomInput.value);
        if (value > 0) roomInput.value = value - 1;
    });

    const adultsInput = document.getElementById('adults');
    const adultsPlusBtn = adultsInput.closest('.adults-selector').querySelector('.plus');
    const adultsMinusBtn = adultsInput.closest('.adults-selector').querySelector('.minus');

    adultsPlusBtn.addEventListener('click', () => {
        let value = parseInt(adultsInput.value);
        if (value < 20) adultsInput.value = value + 1;
    });

    adultsMinusBtn.addEventListener('click', () => {
        let value = parseInt(adultsInput.value);
        if (value > 0) adultsInput.value = value - 1;
    });

    const childrenInput = document.getElementById('children');
    const childrenPlusBtn = childrenInput.closest('.children-selector').querySelector('.plus');
    const childrenMinusBtn = childrenInput.closest('.children-selector').querySelector('.minus');

    childrenPlusBtn.addEventListener('click', () => {
        let value = parseInt(childrenInput.value);
        if (value < 20) childrenInput.value = value + 1;
    });

    childrenMinusBtn.addEventListener('click', () => {
        let value = parseInt(childrenInput.value);
        if (value > 0) childrenInput.value = value - 1;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.recommendations-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    const cards = document.querySelectorAll('.hotel-card');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // card width + gap
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        carousel.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
        updateDots();
    }
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            goToSlide(currentIndex);
        }
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            goToSlide(currentIndex);
        }
    });
    
    // Handle swipe on touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        if (touchEndX < touchStartX && currentIndex < cards.length - 1) {
            currentIndex++;
            goToSlide(currentIndex);
        }
        if (touchEndX > touchStartX && currentIndex > 0) {
            currentIndex--;
            goToSlide(currentIndex);
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + 32;
        goToSlide(currentIndex);
    });
});

// Set default dates (today and tomorrow)
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format as YYYY-MM-DD (required by date inputs)
    document.getElementById('checkin').valueAsDate = today;
    document.getElementById('checkout').valueAsDate = tomorrow;
});

// Wishlist functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Update all heart icons based on wishlist
    function updateHeartIcons() {
        document.querySelectorAll('.wishlist-heart').forEach(heart => {
            const hotelId = heart.getAttribute('data-hotel-id');
            if (wishlist.includes(hotelId)) {
                heart.innerHTML = '❤️';
                heart.classList.add('active');
            } else {
                heart.innerHTML = '♡';
                heart.classList.remove('active');
            }
        });
    }
    
    // Handle heart clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('wishlist-heart')) {
            const hotelId = e.target.getAttribute('data-hotel-id');
            const index = wishlist.indexOf(hotelId);
            
            if (index === -1) {
                // Add to wishlist
                wishlist.push(hotelId);
                e.target.innerHTML = '❤️';
                e.target.classList.add('active');
                showToast('Added to wishlist!');
            } else {
                // Remove from wishlist
                wishlist.splice(index, 1);
                e.target.innerHTML = '♡';
                e.target.classList.remove('active');
                showToast('Removed from wishlist');
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    });
    
    // Simple toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
    
    // User menu toggle (you'll need to implement actual auth)
    const userIcon = document.getElementById('userIcon');
    if (userIcon) {
        userIcon.addEventListener('click', function() {
            // This would be replaced with actual auth check
            const userMenu = document.getElementById('userMenu');
            if (localStorage.getItem('loggedInUser')) {
                userMenu.style.display = 'inline-block';
            }
        });
    }
    
    // Initial update of hearts
    updateHeartIcons();
});

// Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
    const signinBtn = document.getElementById('memberSigninBtn');
    
    signinBtn.addEventListener('click', function() {
        // In a real implementation, this would open the login modal
        // For this example, we'll show a simple message
        alert("Please sign in to your Cozy Haven account to access member discounts. We'll automatically apply your 10% savings at checkout.");
        
        // In your actual implementation, you might use:
        // document.getElementById('loginModal').style.display = 'block';
    });
});