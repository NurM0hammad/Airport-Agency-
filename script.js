// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const tabBtns = document.querySelectorAll('.tab-btn');
const flightForm = document.getElementById('flight-search-form');
const flightResults = document.getElementById('results-container');
const newsletterForm = document.getElementById('newsletter-form');
const returnGroup = document.getElementById('return-group');
const returnInput = document.getElementById('return');

// Sample flight data
const sampleFlights = [
    {
        id: 1,
        from: 'JFK',
        to: 'LAX',
        departureTime: '08:30',
        arrivalTime: '11:45',
        duration: '6h 15m',
        price: '$299',
        airline: 'SkyLine Air',
        flightCode: 'SL202'
    },
    {
        id: 2,
        from: 'LAX',
        to: 'JFK',
        departureTime: '14:15',
        arrivalTime: '22:30',
        duration: '5h 15m',
        price: '$329',
        airline: 'Global Airways',
        flightCode: 'GA456'
    },
    {
        id: 3,
        from: 'LHR',
        to: 'CDG',
        departureTime: '09:45',
        arrivalTime: '11:20',
        duration: '1h 35m',
        price: '$189',
        airline: 'Euro Wings',
        flightCode: 'EW789'
    },
    {
        id: 4,
        from: 'CDG',
        to: 'HND',
        departureTime: '13:00',
        arrivalTime: '08:30+1',
        duration: '12h 30m',
        price: '$899',
        airline: 'Pacific Air',
        flightCode: 'PA123'
    }
];

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Flight Search Tab Switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Handle return date visibility based on selected tab
        if (btn.dataset.tab === 'one-way') {
            returnInput.required = false;
            returnGroup.style.opacity = '0.6';
            returnInput.disabled = true;
        } else {
            returnInput.required = true;
            returnGroup.style.opacity = '1';
            returnInput.disabled = false;
        }
    });
});

// Initialize return date field
returnInput.disabled = true;
returnGroup.style.opacity = '0.6';

// Set minimum date to today for date inputs
const today = new Date().toISOString().split('T')[0];
document.getElementById('departure').setAttribute('min', today);
document.getElementById('return').setAttribute('min', today);

// Flight Search Form Submission
flightForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departure = document.getElementById('departure').value;
    const returnDate = document.getElementById('return').value;
    const passengers = document.getElementById('passengers').value;
    const flightClass = document.getElementById('class').value;
    
    // Validate form
    if (!from || !to || !departure) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if departure airport and arrival airport are different
    if (from === to) {
        alert('Departure and arrival airports must be different');
        return;
    }
    
    // Simulate search delay
    flightResults.innerHTML = '<p class="no-results">Searching for flights...</p>';
    
    setTimeout(() => {
        // Filter sample flights based on search criteria (simulated)
        const filteredFlights = sampleFlights.filter(flight => {
            // In a real app, this would be a more complex filtering logic
            return (flight.from === from || flight.to === to || flight.from === to || flight.to === from);
        });
        
        // Display results
        displayFlightResults(filteredFlights, from, to);
    }, 1000);
});

// Display Flight Results
function displayFlightResults(flights, from, to) {
    if (flights.length === 0) {
        flightResults.innerHTML = '<p class="no-results">No flights found for your search criteria. Please try different airports or dates.</p>';
        return;
    }
    
    let resultsHTML = '';
    
    flights.forEach(flight => {
        resultsHTML += `
            <div class="flight-card">
                <div class="flight-info">
                    <div class="flight-route">
                        <div class="flight-time">${flight.departureTime}</div>
                        <div class="flight-code">${flight.from} • ${flight.airline}</div>
                    </div>
                    <div class="flight-arrow">
                        <i class="fas fa-long-arrow-alt-right"></i>
                    </div>
                    <div class="flight-route">
                        <div class="flight-time">${flight.arrivalTime}</div>
                        <div class="flight-code">${flight.to} • ${flight.flightCode}</div>
                    </div>
                    <div class="flight-duration">
                        <div>${flight.duration}</div>
                        <div>Non-stop</div>
                    </div>
                </div>
                <div class="flight-price">
                    ${flight.price}
                    <button class="btn btn-primary" style="margin-left: 15px; padding: 8px 15px;" onclick="bookFlight(${flight.id})">Book Now</button>
                </div>
            </div>
        `;
    });
    
    flightResults.innerHTML = resultsHTML;
}

// Book Flight Function
function bookFlight(flightId) {
    const flight = sampleFlights.find(f => f.id === flightId);
    if (flight) {
        alert(`Booking flight ${flight.flightCode} from ${flight.from} to ${flight.to} for ${flight.price}`);
        // In a real application, this would redirect to a booking page
    }
}

// Newsletter Form Submission
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (email) {
        // Simulate API call
        newsletterForm.innerHTML = '<p style="color: #34a853; text-align: center;">Thank you for subscribing to our newsletter!</p>';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            newsletterForm.innerHTML = `
                <input type="email" placeholder="Your email" required>
                <button type="submit">Subscribe</button>
            `;
            // Reattach event listener to the new button
            document.querySelector('#newsletter-form button').addEventListener('click', (e) => {
                e.preventDefault();
                newsletterForm.dispatchEvent(new Event('submit'));
            });
        }, 3000);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize the page with some sample flight results
window.addEventListener('DOMContentLoaded', () => {
    // Show sample flights on page load
    displayFlightResults(sampleFlights.slice(0, 2));
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});