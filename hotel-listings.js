
const hotels = [
    {
        id: 1,
        name: "Grand Horizon Palace",
        location: "Central District, Delhi",
        rating: 4.8,
        reviews: 1284,
        price: 9000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        amenities: ["Pool", "Spa", "Restaurant", "Free WiFi"],
        stars: 5
    },
    {
        id: 2,
        name: "Taj Mahal Palace",
        location: "Colaba, Mumbai",
        rating: 4.9,
        reviews: 2456,
        price: 25000,
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482",
        amenities: ["Sea View", "Historic", "Luxury Spa", "Fine Dining"],
        stars: 5
    },
    {
        id: 3,
        name: "The Leela Palace",
        location: "Bengaluru, Karnataka",
        rating: 4.7,
        reviews: 1872,
        price: 18000,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
        amenities: ["Gardens", "Pool", "Ayurvedic Spa", "Business Center"],
        stars: 5
    },
    {
        id: 4,
        name: "ITC Grand Chola",
        location: "Guindy, Chennai",
        rating: 4.6,
        reviews: 1563,
        price: 15000,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        amenities: ["Heritage", "Golf Course", "9 Dining Options", "Grand Ballroom"],
        stars: 5
    },
    {
        id: 5,
        name: "The Oberoi Udaivilas",
        location: "Udaipur, Rajasthan",
        rating: 4.9,
        reviews: 2105,
        price: 35000,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        amenities: ["Lake View", "Private Pool", "Yoga Pavilion", "Boat Rides"],
        stars: 5
    },
    {
        id: 6,
        name: "Hyatt Regency",
        location: "Pune, Maharashtra",
        rating: 4.5,
        reviews: 1320,
        price: 12000,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        amenities: ["Rooftop Pool", "24/7 Gym", "Conference Rooms", "Kids Club"],
        stars: 4
    },
    {
        id: 7,
        name: "Radisson Blu Plaza",
        location: "Hyderabad, Telangana",
        rating: 4.4,
        reviews: 987,
        price: 8500,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        amenities: ["Airport Shuttle", "Spa", "Bar", "Free Parking"],
        stars: 4
    },
    {
        id: 8,
        name: "The Lalit Goa",
        location: "Goa",
        rating: 4.6,
        reviews: 1850,
        price: 11000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        amenities: ["Beach Access", "Pool", "Water Sports", "Free WiFi"],
        stars: 5
    },
    {
        id: 9,
        name: "Taj Lake Palace",
        location: "Udaipur, Rajasthan",
        rating: 4.9,
        reviews: 3200,
        price: 38000,
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482",
        amenities: ["Lake View", "Boat Transfer", "Fine Dining", "Luxury Spa"],
        stars: 5
    },
    {
        id: 10,
        name: "The Oberoi Amarvilas",
        location: "Agra, Uttar Pradesh",
        rating: 4.8,
        reviews: 2780,
        price: 42000,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
        amenities: ["Taj Mahal View", "Private Pool", "Butler Service", "Luxury Spa"],
        stars: 5
    },
    {
        id: 11,
        name: "Taj Falaknuma Palace",
        location: "Hyderabad, Telangana",
        rating: 4.9,
        reviews: 1950,
        price: 45000,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        amenities: ["Palace Stay", "Horse Carriage Ride", "Fine Dining", "Library"],
        stars: 5
    },
    {
        id: 12,
        name: "The Leela Kovalam",
        location: "Kovalam, Kerala",
        rating: 4.7,
        reviews: 1420,
        price: 22000,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        amenities: ["Beachfront", "Ayurveda Center", "Cliff-top Pool", "Yoga"],
        stars: 5
    },
    {
        id: 13,
        name: "Taj West End",
        location: "Bengaluru, Karnataka",
        rating: 4.6,
        reviews: 1680,
        price: 15000,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        amenities: ["Heritage", "Garden", "Pool", "Spa"],
        stars: 5
    },
    {
        id: 14,
        name: "The Imperial New Delhi",
        location: "New Delhi",
        rating: 4.7,
        reviews: 2100,
        price: 18000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        amenities: ["Historic", "Art Collection", "Fine Dining", "Spa"],
        stars: 5
    },
    {
        id: 15,
        name: "Taj Lands End",
        location: "Mumbai, Maharashtra",
        rating: 4.6,
        reviews: 1950,
        price: 20000,
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482",
        amenities: ["Sea View", "Infinity Pool", "Spa", "Kids Club"],
        stars: 5
    },
    {
        id: 16,
        name: "ITC Maratha",
        location: "Mumbai, Maharashtra",
        rating: 4.5,
        reviews: 1750,
        price: 16000,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
        amenities: ["Airport Proximity", "Spa", "Pool", "Business Center"],
        stars: 5
    },
    {
        id: 17,
        name: "The Oberoi Grand",
        location: "Kolkata, West Bengal",
        rating: 4.7,
        reviews: 1850,
        price: 17000,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        amenities: ["Heritage", "City Center", "Spa", "Fine Dining"],
        stars: 5
    },
    {
        id: 18,
        name: "Taj Fort Aguada Resort",
        location: "Goa",
        rating: 4.6,
        reviews: 1950,
        price: 22000,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        amenities: ["Beach Access", "Fort View", "Pool", "Spa"],
        stars: 5
    },
    {
        id: 19,
        name: "The Leela Ambience Gurugram",
        location: "Gurugram, Haryana",
        rating: 4.5,
        reviews: 1450,
        price: 14000,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        amenities: ["Business Center", "Spa", "Pool", "Fine Dining"],
        stars: 5
    },
    {
        id: 20,
        name: "Taj Holiday Village Resort",
        location: "Goa",
        rating: 4.5,
        reviews: 1650,
        price: 18000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        amenities: ["Beachfront", "Villa Stay", "Pool", "Water Sports"],
        stars: 5
    },
    {
        id: 21,
        name: "The Leela Palace Jaipur",
        location: "Jaipur, Rajasthan",
        rating: 4.8,
        reviews: 1250,
        price: 25000,
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482",
        amenities: ["Palace Stay", "Pool", "Spa", "Cultural Activities"],
        stars: 5
    },
    {
        id: 22,
        name: "Taj Connemara",
        location: "Chennai, Tamil Nadu",
        rating: 4.4,
        reviews: 950,
        price: 12000,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
        amenities: ["Heritage", "City Center", "Pool", "Spa"],
        stars: 5
    },
    {
        id: 23,
        name: "The Ritz-Carlton",
        location: "New York, USA",
        rating: 4.8,
        reviews: 3250,
        price: 45000,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        amenities: ["Central Park View", "Luxury Spa", "Fine Dining", "Concierge"],
        stars: 5
    },
    {
        id: 24,
        name: "Burj Al Arab",
        location: "Dubai, UAE",
        rating: 4.9,
        reviews: 4200,
        price: 75000,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        amenities: ["Private Beach", "Helipad", "Luxury Suites", "Butler Service"],
        stars: 5
    },
    {
        id: 25,
        name: "Marina Bay Sands",
        location: "Singapore",
        rating: 4.7,
        reviews: 3800,
        price: 35000,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        amenities: ["Infinity Pool", "Casino", "Shopping", "SkyPark"],
        stars: 5
    },
    {
        id: 26,
        name: "The Savoy",
        location: "London, UK",
        rating: 4.8,
        reviews: 2950,
        price: 40000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        amenities: ["Historic", "Thames View", "Afternoon Tea", "Luxury Spa"],
        stars: 5
    },
    {
        id: 27,
        name: "Mandarin Oriental",
        location: "Bangkok, Thailand",
        rating: 4.7,
        reviews: 2450,
        price: 22000,
        image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482",
        amenities: ["River View", "Spa", "Rooftop Bar", "Cultural Tours"],
        stars: 5
    },
    {
        id: 28,
        name: "Four Seasons Resort",
        location: "Bali, Indonesia",
        rating: 4.9,
        reviews: 1950,
        price: 38000,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
        amenities: ["Beachfront", "Villas", "Spa", "Yoga"],
        stars: 5
    },
    {
        id: 29,
        name: "Fairmont Banff Springs",
        location: "Banff, Canada",
        rating: 4.8,
        reviews: 2250,
        price: 32000,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
        amenities: ["Mountain View", "Golf Course", "Hot Springs", "Hiking"],
        stars: 5
    },
    {
        id: 30,
        name: "Park Hyatt",
        location: "Sydney, Australia",
        rating: 4.7,
        reviews: 1850,
        price: 28000,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
        amenities: ["Harbour View", "Opera House Proximity", "Rooftop Pool", "Fine Dining"],
        stars: 5
    },
    {
        id: 31,
        name: "The Peninsula",
        location: "Hong Kong",
        rating: 4.9,
        reviews: 3150,
        price: 42000,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
        amenities: ["Harbour View", "Helicopter Transfer", "Luxury Spa", "Historic"],
        stars: 5
    },
    {
        id: 32,
        name: "Hotel de Crillon",
        location: "Paris, France",
        rating: 4.8,
        reviews: 2450,
        price: 50000,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        amenities: ["Eiffel Tower View", "Historic", "Luxury Spa", "Michelin Dining"],
        stars: 5
    }
];

// DOM Elements
const hotelsList = document.getElementById('hotels-list');
const sortBy = document.getElementById('sort-by');
const priceRange = document.getElementById('price-range');
const starRating = document.getElementById('star-rating');

// Function to display hotels
function displayHotels(hotelsToDisplay) {
    hotelsList.innerHTML = '';
    
    if (hotelsToDisplay.length === 0) {
        hotelsList.innerHTML = '<p class="no-results">No hotels match your search criteria.</p>';
        return;
    }
    
    hotelsToDisplay.forEach(hotel => {
        const stars = '★'.repeat(hotel.stars);
        
        const hotelItem = document.createElement('div');
        hotelItem.className = 'hotel-item';
        hotelItem.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-location">
                    <svg viewBox="0 0 24 24" width="14" height="14">
                        <path d="M12 0C7.312 0 3 4.312 3 9c0 6.25 9 15 9 15s9-8.75 9-15c0-4.688-4.312-9-9-9zm0 13.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"/>
                    </svg>
                    ${hotel.location}
                </div>
                <div class="hotel-rating">
                    <span class="star-rating">${stars}</span>
                    <span class="reviews">${hotel.reviews.toLocaleString()} reviews</span>
                </div>
                <div class="hotel-amenities">
                    ${hotel.amenities.slice(0, 3).map(amenity => 
                      `<span class="amenity-tag">${amenity}</span>`
                    ).join('')}
                </div>
            </div>
            <div class="hotel-price">
                <div class="price-amount">₹${hotel.price.toLocaleString()}</div>
                <div class="price-period">per night</div>
                <a href="hotel-details.html?id=${hotel.id}" class="view-details-btn">View</a>
            </div>
        `;
        hotelsList.appendChild(hotelItem);
    });
}

// Function to filter and sort hotels
function updateHotels() {
    let filteredHotels = [...hotels];
    const searchLocation = document.getElementById('search-location').textContent.toLowerCase();
    
    // Filter by location if not "all locations"
    if (searchLocation && searchLocation !== 'all') {
        filteredHotels = filteredHotels.filter(hotel => 
            hotel.location.toLowerCase().includes(searchLocation))
    }
    
    // Filter by star rating
    if (starRating.value !== 'all') {
        const rating = Number(starRating.value);
        filteredHotels = filteredHotels.filter(hotel => hotel.stars === rating);
    }
    
    // Sort hotels
    switch(sortBy.value) {
        case 'price-low':
            filteredHotels.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredHotels.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredHotels.sort((a, b) => b.rating - a.rating);
            break;
        default:
            filteredHotels.sort((a, b) => b.rating - a.rating);
    }
    
    displayHotels(filteredHotels);
}

sortBy.addEventListener('change', updateHotels);
priceRange.addEventListener('change', updateHotels);
starRating.addEventListener('change', updateHotels);

// Parse URL parameters and update search summary
function parseSearchParams() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('destination')) {
        document.getElementById('search-location').textContent = params.get('destination');
    }
    
    if (params.has('checkin') && params.has('checkout')) {
        const checkin = new Date(params.get('checkin'));
        const checkout = new Date(params.get('checkout'));
        const options = { month: 'short', day: 'numeric' };
        document.getElementById('search-dates').textContent = 
            `${checkin.toLocaleDateString('en-US', options)} - ${checkout.toLocaleDateString('en-US', options)}`;
    }
    
    if (params.has('adults') && params.has('children')) {
        const adults = params.get('adults');
        const children = params.get('children');
        let guestsText = `${adults} Adult${adults > 1 ? 's' : ''}`;
        if (children > 0) {
            guestsText += `, ${children} Child${children > 1 ? 'ren' : ''}`;
        }
        document.getElementById('search-guests').textContent = guestsText;
    }
    
    if (params.has('rooms')) {
        document.getElementById('search-rooms').textContent = 
            `${params.get('rooms')} Room${params.get('rooms') > 1 ? 's' : ''}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    parseSearchParams();
    updateHotels();
});

function toggleFavorite(hotelId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.indexOf(hotelId);
    
    if (index === -1) {
        favorites.push(hotelId);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateHotelDisplay(hotelId);
}

function updateHotelDisplay(hotelId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const heartIcon = document.querySelector(`.favorite-btn[data-hotel-id="${hotelId}"]`);
    
    if (heartIcon) {
        heartIcon.classList.toggle('active', favorites.includes(hotelId));
    }
}

