const apiKey = '1e3e8f230b6064d27976e41163a82b77'; // Replace with your OpenWeatherMap API key
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weather-icon');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function updateWeatherInfo(data) {
    const date = new Date();
    
    cityElement.textContent = `${data.name}, ${data.sys.country}`;
    dateElement.textContent = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;
}
