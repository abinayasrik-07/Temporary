document.addEventListener('DOMContentLoaded', function() {
    // ===========================================
    // GENERAL FUNCTIONALITY (works on all pages)
    // ===========================================
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks && hamburger) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================
    // BOOKING PAGE FUNCTIONALITY (index.html)
    // ===========================================
    if (document.querySelector('.booking-form')) {
        // Booking Form Handling
        const bookingForm = document.getElementById('bookingForm');
        const bookingModal = document.getElementById('bookingModal');
        const closeModal = document.querySelector('.close-modal');
        const finalBookingForm = document.getElementById('finalBookingForm');
        
        // Room Booking Buttons
        const roomButtons = document.querySelectorAll('.btn-room');
        
        if (roomButtons.length > 0) {
            roomButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const roomCard = this.closest('.room-card');
                    if (roomCard) {
                        const roomType = roomCard.querySelector('h3').textContent;
                        const roomPrice = roomCard.querySelector('.price').textContent;
                        
                        document.getElementById('room-type').value = roomType.toLowerCase().replace(' ', '-');
                        document.getElementById('summary-room-type').textContent = `Room Type: ${roomType}`;
                        document.getElementById('summary-total').textContent = `Total: ${roomPrice}`;
                        
                        if (bookingModal) {
                            bookingModal.style.display = 'block';
                            document.body.style.overflow = 'hidden';
                        }
                    }
                });
            });
        }
        
        // Search Availability Button
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const checkin = document.getElementById('checkin').value;
                const checkout = document.getElementById('checkout').value;
                const guests = document.getElementById('guests').value;
                const roomType = document.getElementById('room-type').value;
                
                // Format dates for display
                const checkinDate = new Date(checkin);
                const checkoutDate = new Date(checkout);
                
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedCheckin = checkinDate.toLocaleDateString('en-US', options);
                const formattedCheckout = checkoutDate.toLocaleDateString('en-US', options);
                
                // Calculate nights
                const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
                const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
                
                // Get room price based on type
                let roomPrice;
                switch(roomType) {
                    case 'standard':
                        roomPrice = 120;
                        break;
                    case 'deluxe':
                        roomPrice = 180;
                        break;
                    case 'suite':
                        roomPrice = 250;
                        break;
                    case 'executive':
                        roomPrice = 350;
                        break;
                    case 'presidential':
                        roomPrice = 500;
                        break;
                    default:
                        roomPrice = 120;
                }
                
                const total = roomPrice * nights;
                
                // Update modal with booking details
                document.getElementById('summary-room-type').textContent = `Room Type: ${roomType.charAt(0).toUpperCase() + roomType.slice(1).replace('-', ' ')}`;
                document.getElementById('summary-dates').textContent = `Dates: ${formattedCheckin} to ${formattedCheckout} (${nights} nights)`;
                document.getElementById('summary-guests').textContent = `Guests: ${guests}`;
                document.getElementById('summary-total').textContent = `Total: $${total.toFixed(2)}`;
                
                // Show modal
                if (bookingModal) {
                    bookingModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        }
        
        // Close Modal
        if (closeModal && bookingModal) {
            closeModal.addEventListener('click', function() {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close Modal when clicking outside
        if (bookingModal) {
            window.addEventListener('click', function(e) {
                if (e.target === bookingModal) {
                    bookingModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Final Booking Form Submission
        if (finalBookingForm) {
            finalBookingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const fullname = document.getElementById('fullname').value;
                const email = document.getElementById('email').value;
                
                // In a real app, you would send this data to your server
                alert(`Thank you, ${fullname}! Your booking has been confirmed. A confirmation has been sent to ${email}.`);
                
                // Reset form and close modal
                this.reset();
                if (bookingModal) {
                    bookingModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
                
                // Reset main booking form
                if (bookingForm) {
                    bookingForm.reset();
                }
            });
        }
        
        // Set minimum date for check-in (today)
        const today = new Date().toISOString().split('T')[0];
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        if (checkinInput && checkoutInput) {
            checkinInput.setAttribute('min', today);
            
            checkinInput.addEventListener('change', function() {
                if (this.value) {
                    const nextDay = new Date(this.value);
                    nextDay.setDate(nextDay.getDate() + 1);
                    const nextDayStr = nextDay.toISOString().split('T')[0];
                    checkoutInput.setAttribute('min', nextDayStr);
                    
                    if (checkoutInput.value && checkoutInput.value < nextDayStr) {
                        checkoutInput.value = nextDayStr;
                    }
                }
            });
        }
        
        // Contact Form Submission
        const contactForm = document.querySelector('.contact-form form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            });
        }
        
        // Newsletter Form Submission
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
            });
        }
        
        // Hero Button Scroll to Booking Form
        const heroButton = document.querySelector('.btn-hero');
        if (heroButton) {
            heroButton.addEventListener('click', function() {
                const bookingForm = document.querySelector('.booking-form');
                if (bookingForm) {
                    bookingForm.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
        
        // Book Now Button in Nav
        const navBookButton = document.querySelector('.nav-links .btn-book');
        if (navBookButton) {
            navBookButton.addEventListener('click', function(e) {
                e.preventDefault();
                const bookingForm = document.querySelector('.booking-form');
                if (bookingForm) {
                    bookingForm.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    // ===========================================
    // AUTHENTICATION PAGES FUNCTIONALITY
    // ===========================================
    if (document.querySelector('.auth-container')) {
        // Password toggle functionality
        function setupPasswordToggle(toggleId, inputId) {
            const toggle = document.querySelector(toggleId);
            const input = document.querySelector(inputId);
            
            if (toggle && input) {
                toggle.addEventListener('click', function() {
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);
                    this.classList.toggle('fa-eye-slash');
                });
            }
        }

        // Set up all password toggles
        setupPasswordToggle('#togglePassword', '#password');
        setupPasswordToggle('#toggleConfirmPassword', '#confirmPassword');
        setupPasswordToggle('#toggleLoginPassword', '#loginPassword');

        // Signup Form Validation
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset feedback messages
                document.querySelectorAll('.form-feedback').forEach(el => {
                    el.textContent = '';
                    el.className = 'form-feedback';
                });

                // Get form values
                const fullname = document.getElementById('fullname').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const password = document.getElementById('password').value;
                const confirmPassword = document.getElementById('confirmPassword').value;

                // Validation flags
                let isValid = true;

                // Name validation
                if (fullname.length < 3) {
                    document.getElementById('nameFeedback').textContent = 'Name must be at least 3 characters';
                    document.getElementById('nameFeedback').classList.add('error');
                    isValid = false;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    document.getElementById('emailFeedback').textContent = 'Please enter a valid email address';
                    document.getElementById('emailFeedback').classList.add('error');
                    isValid = false;
                }

                // Phone validation
                const phoneRegex = /^[\d\s\-()+]{10,}$/;
                if (!phoneRegex.test(phone)) {
                    document.getElementById('phoneFeedback').textContent = 'Please enter a valid phone number';
                    document.getElementById('phoneFeedback').classList.add('error');
                    isValid = false;
                }

                // Password validation
                if (password.length < 8) {
                    document.getElementById('passwordFeedback').textContent = 'Password must be at least 8 characters';
                    document.getElementById('passwordFeedback').classList.add('error');
                    isValid = false;
                }

                // Password match validation
                if (password !== confirmPassword) {
                    document.getElementById('confirmFeedback').textContent = 'Passwords do not match';
                    document.getElementById('confirmFeedback').classList.add('error');
                    isValid = false;
                }

                // If all valid, proceed
                if (isValid) {
                    // In a real app, you would send this data to your server
                    alert(`Thank you for signing up, ${fullname}! A verification email has been sent to ${email}.`);
                    
                    // Redirect to login page after successful signup
                    window.location.href = 'login.html';
                }
            });
        }

        // Login Form Validation
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Reset feedback messages
                document.querySelectorAll('.form-feedback').forEach(el => {
                    el.textContent = '';
                    el.className = 'form-feedback';
                });

                // Get form values
                const email = document.getElementById('loginEmail').value.trim();
                const password = document.getElementById('loginPassword').value;

                // Validation flags
                let isValid = true;

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    document.getElementById('emailFeedback').textContent = 'Please enter a valid email address';
                    document.getElementById('emailFeedback').classList.add('error');
                    isValid = false;
                }

                // Password validation
                if (password.length === 0) {
                    document.getElementById('passwordFeedback').textContent = 'Please enter your password';
                    document.getElementById('passwordFeedback').classList.add('error');
                    isValid = false;
                }

                // If all valid, proceed
                if (isValid) {
                    // In a real app, you would validate credentials with your server
                    // This is just a demo
                    alert('Login successful! Redirecting to your dashboard...');
                    window.location.href = 'index.html';
                }
            });
        }
    }
});