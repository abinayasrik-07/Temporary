// Sample data - in a real app, this would come from an API
const hotelData = {
    id: 1,
    name: "Grand Horizon Palace",
    location: "Central District, Delhi",
    rating: 4.8,
    reviews: 1284,
    stars: 5,
    images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791"
    ],
    amenities: [
        { name: "Swimming Pool", icon: "🏊" },
        { name: "Free WiFi", icon: "📶" },
        { name: "Spa", icon: "💆" },
        { name: "Fitness Center", icon: "💪" },
        { name: "Restaurant", icon: "🍽️" },
        { name: "Airport Shuttle", icon: "🚐" },
        { name: "Room Service", icon: "🛎️" },
        { name: "Business Center", icon: "💼" }
    ],
    rooms: [
        {
            id: 101,
            type: "Deluxe Room",
            description: "Spacious room with city view",
            features: ["AC", "Double Bed", "TV", "Minibar"],
            price: 9000,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
            maxOccupancy: 2
        },
        {
            id: 102,
            type: "Executive Suite",
            description: "Luxurious suite with separate living area",
            features: ["AC", "King Bed", "TV", "Minibar", "Coffee Maker"],
            price: 15000,
            image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
            maxOccupancy: 3
        },
        {
            id: 103,
            type: "Family Room",
            description: "Perfect for families with children",
            features: ["AC", "Double Bed + Single Bed", "TV", "Minibar"],
            price: 12000,
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
            maxOccupancy: 4
        }
    ],
    reviews: [
        {
            id: 1,
            name: "Rahul Sharma",
            rating: 5,
            date: "2023-10-15",
            comment: "Excellent service and beautiful rooms. The staff was very helpful throughout our stay."
        },
        {
            id: 2,
            name: "Priya Patel",
            rating: 4,
            date: "2023-09-28",
            comment: "Great location and comfortable beds. The breakfast could have more variety though."
        },
        {
            id: 3,
            name: "Amit Singh",
            rating: 5,
            date: "2023-09-10",
            comment: "One of the best hotels I've stayed in. The pool area is fantastic and the rooms are very clean."
        }
    ]
};

// DOM Elements
const hotelCarousel = document.getElementById('hotelCarousel');
const carouselNav = document.getElementById('carouselNav');
const hotelName = document.getElementById('hotelName');
const hotelLocation = document.getElementById('hotelLocation');
const hotelStars = document.getElementById('hotelStars');
const hotelReviews = document.getElementById('hotelReviews');
const amenitiesGrid = document.getElementById('amenitiesGrid');
const roomsContainer = document.getElementById('roomsContainer');
const reviewsContainer = document.getElementById('reviewsContainer');
const checkinDate = document.getElementById('checkinDate');
const checkoutDate = document.getElementById('checkoutDate');
const bookingGuests = document.getElementById('bookingGuests');
const bookingRooms = document.getElementById('bookingRooms');
const selectedRoomInfo = document.getElementById('selectedRoomInfo');
const totalPrice = document.getElementById('totalPrice');
const bookNowBtn = document.getElementById('bookNowBtn');

// Selected room
let selectedRoom = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Get hotel ID from URL
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('id');
    
    // In a real app, you would fetch hotel data based on ID
    // For this example, we'll use our sample data
    loadHotelDetails(hotelData);
    setupBookingSummary();
});

function loadHotelDetails(hotel) {
    // Set basic hotel info
    hotelName.textContent = hotel.name;
    hotelLocation.textContent = hotel.location;
    hotelStars.textContent = '★'.repeat(hotel.stars);
    hotelReviews.textContent = `(${hotel.reviews.toLocaleString()} reviews)`;
    
    // Set up image carousel
    setupCarousel(hotel.images);
    
    // Set up amenities
    setupAmenities(hotel.amenities);
    
    // Set up rooms
    setupRooms(hotel.rooms);
    
    // Set up reviews
    setupReviews(hotel.reviews);
}

function setupCarousel(images) {
    hotelCarousel.innerHTML = '';
    carouselNav.innerHTML = '';
    
    images.forEach((image, index) => {
        // Add image to carousel
        const img = document.createElement('img');
        img.src = image;
        img.alt = `${hotelData.name} - Image ${index + 1}`;
        hotelCarousel.appendChild(img);
        
        // Add dot to navigation
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            scrollToImage(index);
        });
        carouselNav.appendChild(dot);
    });
    
    // Set up carousel scrolling
    hotelCarousel.addEventListener('scroll', updateCarouselDots);
}

function scrollToImage(index) {
    const imageWidth = hotelCarousel.clientWidth;
    hotelCarousel.scrollTo({
        left: imageWidth * index,
        behavior: 'smooth'
    });
}

function updateCarouselDots() {
    const imageWidth = hotelCarousel.clientWidth;
    const currentIndex = Math.round(hotelCarousel.scrollLeft / imageWidth);
    
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function setupAmenities(amenities) {
    amenitiesGrid.innerHTML = '';
    
    amenities.forEach(amenity => {
        const amenityItem = document.createElement('div');
        amenityItem.className = 'amenity-item';
        amenityItem.innerHTML = `
            <span class="amenity-icon">${amenity.icon}</span>
            <span class="amenity-name">${amenity.name}</span>
        `;
        amenitiesGrid.appendChild(amenityItem);
    });
}

function setupRooms(rooms) {
    roomsContainer.innerHTML = '';
    
    rooms.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        roomCard.innerHTML = `
            <img src="${room.image}" alt="${room.type}" class="room-image">
            <div class="room-info">
                <h3>${room.type}</h3>
                <p>${room.description}</p>
                <div class="room-features">
                    ${room.features.map(feature => `<span class="room-feature">${feature}</span>`).join('')}
                </div>
                <p>Max occupancy: ${room.maxOccupancy} guests</p>
            </div>
            <div class="room-price">
                <div class="price-amount">₹${room.price.toLocaleString()}</div>
                <div class="price-period">per night</div>
                <button class="select-room-btn" data-room-id="${room.id}">Select Room</button>
            </div>
        `;
        roomsContainer.appendChild(roomCard);
    });
    
    // Add event listeners to room selection buttons
    document.querySelectorAll('.select-room-btn').forEach(button => {
        button.addEventListener('click', function() {
            const roomId = parseInt(this.getAttribute('data-room-id'));
            selectRoom(roomId);
        });
    });
}

function selectRoom(roomId) {
    // Find the selected room
    selectedRoom = hotelData.rooms.find(room => room.id === roomId);
    
    // Update booking summary
    updateSelectedRoomInfo();
    
    // Enable book now button
    bookNowBtn.disabled = false;
}

function updateSelectedRoomInfo() {
    if (!selectedRoom) return;
    
    selectedRoomInfo.innerHTML = `
        <div><strong>Selected Room:</strong> ${selectedRoom.type}</div>
        <div><strong>Price per night:</strong> ₹${selectedRoom.price.toLocaleString()}</div>
    `;
    
    // Calculate total price (for all nights)
    const params = new URLSearchParams(window.location.search);
    const checkin = new Date(params.get('checkin'));
    const checkout = new Date(params.get('checkout'));
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    
    totalPrice.textContent = `₹${(selectedRoom.price * nights).toLocaleString()}`;
}

function setupReviews(reviews) {
    reviewsContainer.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
            <div class="review-header">
                <span class="reviewer">${review.name}</span>
                <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p class="review-comment">${review.comment}</p>
        `;
        reviewsContainer.appendChild(reviewCard);
    });
}

function setupBookingSummary() {
    const params = new URLSearchParams(window.location.search);
    
    // Debug: Log all parameters to console
    console.log('URL Parameters:', {
        checkin: params.get('checkin'),
        checkout: params.get('checkout'),
        rooms: params.get('rooms'),
        adults: params.get('adults'),
        children: params.get('children')
    });

    // Validate required parameters
    if (!params.get('checkin') || !params.get('checkout') || !params.get('rooms') || !params.get('adults')) {
        console.error('Missing required booking parameters');
        // Set default values or show error
        checkinDate.textContent = 'Not specified';
        checkoutDate.textContent = 'Not specified';
        bookingGuests.textContent = 'Not specified';
        bookingRooms.textContent = 'Not specified';
        return;
    }

    // Set dates
    const checkinDateObj = new Date(params.get('checkin'));
    const checkoutDateObj = new Date(params.get('checkout'));
    
    checkinDate.textContent = checkinDateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    checkoutDate.textContent = checkoutDateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });

    // Set guests
    const adults = params.get('adults');
    const children = params.get('children') || 0;
    let guestsText = `${adults} Adult${adults > 1 ? 's' : ''}`;
    if (children > 0) {
        guestsText += `, ${children} Child${children > 1 ? 'ren' : ''}`;
    }
    bookingGuests.textContent = guestsText;

    // Set rooms
    const rooms = params.get('rooms');
    bookingRooms.textContent = `${rooms} Room${rooms > 1 ? 's' : ''}`;

    // Calculate nights
    const nights = Math.ceil((checkoutDateObj - checkinDateObj) / (1000 * 60 * 60 * 24));
    
    // Update total price when room is selected
    function updateTotalPrice() {
        if (selectedRoom) {
            totalPrice.textContent = `₹${(selectedRoom.price * nights).toLocaleString()}`;
        }
    }

    // Initially disable book now button
    bookNowBtn.disabled = true;

    // Book now button handler
    bookNowBtn.addEventListener('click', () => {
        if (!selectedRoom) return;
        
        const bookingDetails = {
            hotel: hotelData.name,
            room: selectedRoom.type,
            checkin: checkinDate.textContent,
            checkout: checkoutDate.textContent,
            guests: guestsText,
            rooms: rooms,
            total: `₹${(selectedRoom.price * nights).toLocaleString()}`
        };
        
        alert(`Booking Confirmation:\n${JSON.stringify(bookingDetails, null, 2)}`);
    });
}

// Modified selectRoom function
function selectRoom(roomId) {
    selectedRoom = hotelData.rooms.find(room => room.id === roomId);
    
    if (!selectedRoom) return;
    
    // Calculate nights
    const params = new URLSearchParams(window.location.search);
    const checkin = new Date(params.get('checkin'));
    const checkout = new Date(params.get('checkout'));
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    
    selectedRoomInfo.innerHTML = `
        <div><strong>Room Type:</strong> ${selectedRoom.type}</div>
        <div><strong>Price/Night:</strong> ₹${selectedRoom.price.toLocaleString()}</div>
        <div><strong>Total (${nights} nights):</strong> ₹${(selectedRoom.price * nights).toLocaleString()}</div>
    `;
    
    totalPrice.textContent = `₹${(selectedRoom.price * nights).toLocaleString()}`;
    bookNowBtn.disabled = false;
}