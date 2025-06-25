import { getCurrentWeather, getWeatherByCoords } from './modules/weather-service.js';
import { elements, showLoading, hideLoading, showError, displayWeather, clearInput, getCityInput } from './modules/ui-controller.js';
import { getCoords } from './modules/location-service.js';

getCoords()
  .then((coords) => {
    console.log('Coordonate:', coords);
    return getWeatherByCoords(coords.latitude, coords.longitude);
  })
  .then((weather) => {
    console.log('Vremea la locația ta:', weather);
  })
  .catch((err) => {
    console.error('Eroare la obținerea locației sau vremii:', err.message);
  });

const isValidCity = (city) => city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);

const handleSearch = async (e) => {
  e.preventDefault();
  const city = getCityInput();

  if (!isValidCity(city)) {
    showError('Introduceți un oraș valid.');
    return;
  }

  showLoading();
  try {
    const data = await getCurrentWeather(city);
    displayWeather(data);
  } catch (err) {
    showError('Eroare la obținerea datelor meteo.');
  } finally {
    hideLoading();
    clearInput();
  }
};

const handleLocation = async () => {
  if (!navigator.geolocation) {
    showError('Geolocația nu este suportată.');
    return;
  }

  showLoading();
  navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const { latitude, longitude } = position.coords;
      const data = await getWeatherByCoords(latitude, longitude);
      displayWeather(data);
    } catch (err) {
      showError('Nu s-a putut obține locația.');
    } finally {
      hideLoading();
    }
  });
};


const setupEventListeners = () => {
  elements.searchForm.addEventListener('submit', handleSearch);
  elements.locationBtn.addEventListener('click', handleLocation);
};

setupEventListeners();