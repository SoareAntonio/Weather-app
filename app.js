import { getCurrentWeather, getWeatherByCoords ,refreshWeather,setLastLocation} from './modules/weather-service.js';
import { elements, showLoading, hideLoading, showError, displayWeather, clearInput, getCityInput ,loadUserPreferences,saveUserPreferences} from './modules/ui-controller.js';
import { getCoords } from './modules/location-service.js';

const state = {
  ...loadUserPreferences(),
  currentCity: null,
  currentCoords: null
};

// Setează valorile în UI la încărcare
elements.unitSelect.value = state.unit;
elements.langSelect.value = state.lang;

getCoords()
  .then((coords) => {
    console.log('Coordonate:', coords);
     setLastLocation({ coords }); // salvam locația
    return getWeatherByCoords(coords.latitude, coords.longitude);
  })
  .then((weather) => {
    console.log('Vremea la locația ta:', weather);
    displayWeather(weather);
  })
  .catch((err) => {
    console.error('Eroare la obținerea locației sau vremii:', err.message);
    showError('Nu s-au putut obține datele meteo inițiale.');
  });



// Ascultă modificările
elements.unitSelect.addEventListener('change', async (e) => {
  state.unit = e.target.value;
  saveUserPreferences(state.unit, state.lang);
  await refreshWeather(state);
});

elements.langSelect.addEventListener('change', async (e) => {
  state.lang = e.target.value;
  saveUserPreferences(state.unit, state.lang);
  await refreshWeather(state);
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
    const data = await getCurrentWeather(city, state.unit, state.lang);
    state.currentCity = city;
    state.currentCoords = null;
    displayWeather(data,state.unit);
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
      const data = await getWeatherByCoords(latitude, longitude,state.unit, state.lang);
      displayWeather(data,state.unit);
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