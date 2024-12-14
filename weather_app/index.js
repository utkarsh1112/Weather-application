// API key for OpenWeatherMap
const apiKey = 'a08d4693d0c50bc94739bef2d7cf1493';

// Function to get weather data for a location entered by the user
async function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }
    // Construct the API URL for fetching weather data for the given location
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);      // Fetch weather data using the constructed URL
}

// Function to get weather data for the user's current location
async function getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        // Use the browser's geolocation API to get the user's current position
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchWeatherData(url);
        });
    } else {
        alert('Geolocation is not supported by this browser.');    // Alert if geolocation is not available
    }
}

// Function to fetch weather data from the provided API URL
async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);    // Make an HTTP GET request to the API
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();    // Parse the JSON response
        displayWeatherData(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to display the fetched weather data on the webpage
function displayWeatherData(data) {
    document.getElementById('location-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity} %`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('weather-icon').src = iconUrl;
    document.getElementById('weather-info').style.display = 'block';
}











































