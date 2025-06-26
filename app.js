import { getCurrentWeather, getWeatherByCoords ,refreshWeather,setLastLocation} from './modules/weather-service.js';
import { elements, showLoading, hideLoading, showError,showMessage, displayWeather, clearInput, getCityInput ,loadUserPreferences,saveUserPreferences} from './modules/ui-controller.js';
import { getCoords } from './modules/location-service.js';

const state = {
  ...loadUserPreferences(),
  currentCity: null,
  currentCoords: null
};

// Setează valorile în UI la încărcare
elements.unitSelect.value = state.unit;
elements.langSelect.value = state.lang;


// Orchestrare inițială la pornire
const initWeather = async () => {
  try {
    showLoading(elements, 'Detectez locația...');

    const coords = await getCoords();
    if (coords.source === 'ip') {
      showMessage(elements, 'Locație aproximativă detectată prin IP.', 'warning');
    }

    state.currentCoords = coords;
    state.currentCity = null;
    setLastLocation({ coords });

    showLoading(elements, 'Încarc vremea...');
    const data = await getWeatherByCoords(coords.latitude, coords.longitude, state.unit, state.lang);
    displayWeather(data, state.unit);
  } catch (err) {
    console.error('Eroare inițializare:', err.message);
    showError(elements, 'Nu s-au putut obține datele meteo inițiale.');
  } finally {
    hideLoading();
  }
};

initWeather();


// Ascultă modificările
elements.unitSelect.addEventListener('change', async (e) => {
  state.unit = e.target.value;
  saveUserPreferences(state.unit, state.lang);
  if (!elements.display.classList.contains('hidden')) {
  await refreshWeather(state);
  }
});

elements.langSelect.addEventListener('change', async (e) => {
  state.lang = e.target.value;
  saveUserPreferences(state.unit, state.lang);
  if (!elements.display.classList.contains('hidden')){
  await refreshWeather(state);
  }
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

const handleLocationSearch = async () => {
  try {
    showLoading(elements, 'Detectez locația...');

    const coords = await getCoords();
    if (coords.source === 'ip') {
      showMessage(elements, 'Locație aproximativă detectată prin IP.', 'warning');
    }

    const data = await getWeatherByCoords(coords.latitude, coords.longitude, state.unit, state.lang);
    state.currentCoords = coords;
    state.currentCity = null;
    displayWeather(data, state.unit);
  } catch (error) {
    showError(elements, `Locația nu a putut fi determinată: ${error.message}`);
  } finally {
    hideLoading();
  }
};


const setupEventListeners = () => {
  elements.searchForm.addEventListener('submit', handleSearch);
  elements.locationBtn.addEventListener('click', handleLocationSearch);
};

setupEventListeners();