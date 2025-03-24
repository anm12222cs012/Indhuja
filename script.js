// API Configuration
const API_KEY = '1e3e8f230b6064d27976e41163a82b77';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const elements = {
    searchInput: document.getElementById('search-input'),
    searchButton: document.getElementById('search-button'),
    city: document.getElementById('city'),
    date: document.getElementById('date'),
    temperature: document.getElementById('temperature'),
    description: document.getElementById('description'),
    weatherIcon: document.getElementById('weather-icon'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('wind-speed')
};

// Event Listeners
elements.searchButton.addEventListener('click', handleSearch);
elements.searchInput.addEventListener('keyup', handleKeyPress);

// Event Handlers
function handleSearch() {
    const city = elements.searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}

// API Functions
async function getWeatherData(city) {
    try {
        const url = `${API_BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// UI Update Functions
function updateWeatherInfo(data) {
    const date = new Date();
    
    elements.city.textContent = `${data.name}, ${data.sys.country}`;
    elements.date.textContent = formatDate(date);
    elements.temperature.textContent = `${Math.round(data.main.temp)}°C`;
    elements.description.textContent = data.weather[0].description;
    elements.weatherIcon.src = getWeatherIconUrl(data.weather[0].icon);
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.windSpeed.textContent = `${data.wind.speed} km/h`;
}

// Utility Functions
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getWeatherIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
