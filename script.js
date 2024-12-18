// OpenWeatherMap API configuration
const apiKey = 'f31e88bcc68220ad209fa88ebc842284';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weather-icon');
const feelsLikeElement = document.getElementById('feels-like');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

// Update date
function updateDate() {
    const date = new Date();
    dateElement.textContent = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Show error message
function showError(message) {
    alert(message);
    // Reset the display
    cityElement.textContent = 'Weather Forecast';
    temperatureElement.textContent = '--°C';
    descriptionElement.textContent = '--';
    weatherIconElement.src = '';
    feelsLikeElement.textContent = '--°C';
    humidityElement.textContent = '--%';
    windSpeedElement.textContent = '-- km/h';
}

// Fetch weather data
async function getWeather(city) {
    try {
        // Show loading state
        cityElement.textContent = 'Loading...';
        
        // Construct URL with query parameters
        const url = new URL(baseUrl);
        url.searchParams.append('q', city);
        url.searchParams.append('units', 'metric');
        url.searchParams.append('appid', apiKey);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('API key error. Please try again later.');
            } else {
                throw new Error('An error occurred. Please try again later.');
            }
        }

        const data = await response.json();

        // Update UI with weather data
        cityElement.textContent = `${data.name}, ${data.sys.country}`;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
        weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        feelsLikeElement.textContent = `${Math.round(data.main.feels_like)}°C`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windSpeedElement.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

        // Show weather info
        document.querySelector('.weather-box').style.display = 'block';

    } catch (error) {
        console.error('Weather API Error:', error);
        showError(error.message || 'An error occurred while fetching weather data');
    }
}

// Event listeners
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        showError('Please enter a city name');
    }
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            showError('Please enter a city name');
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    getWeather('Mumbai'); // Load Mumbai weather by default
});
