// Sample hotel data (in a real app, this would come from an API)
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
    
    // Filter by price range
    const priceValue = priceRange.value;
    if (priceValue !== 'all') {
        const [min, max] = priceValue.split('-').map(Number);
        if (max) {
            filteredHotels = filteredHotels.filter(hotel => hotel.price >= min && hotel.price <= max);
        } else {
            filteredHotels = filteredHotels.filter(hotel => hotel.price >= min);
        }
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
            // Recommended (default sorting)
            filteredHotels.sort((a, b) => b.rating - a.rating);
    }
    
    displayHotels(filteredHotels);
}

// Event listeners for filters
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    parseSearchParams();
    updateHotels();
});