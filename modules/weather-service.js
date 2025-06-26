import { CONFIG , API_ENDPOINTS ,ERROR_MESSAGES,mockWeatherData } from "./config.js";
import {updateTemperatureDisplay, showLoading, hideLoading, showError,showMessage, displayWeather, elements} from "./ui-controller.js";
import { getCoords } from "./location-service.js";

const buildApiUrl = (endpoint, params = {}) => {
  const url = new URL(`${CONFIG.API_BASE_URL}/${endpoint}`);
  url.searchParams.set("appid", CONFIG.API_KEY);
  url.searchParams.set("units", CONFIG.DEFAULT_UNITS);
  url.searchParams.set("lang", CONFIG.DEFAULT_LANG);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

const makeRequest = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND);
      } else if (response.status === 401) {
        throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
      } else {
        throw new Error(ERROR_MESSAGES.SERVER_ERROR);
      }
    }

    return await response.json();

  } catch (error) {
    if (error instanceof TypeError) {
      
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      throw error;
    }
  }
};


export const getCurrentWeather = async (city,unit = CONFIG.DEFAULT_UNITS, lang = CONFIG.DEFAULT_LANG) => {
  const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { q: city , units: unit, lang: lang });
  return await makeRequest(url);
};

export const getWeatherByCoords = async (lat, lon, unit = CONFIG.DEFAULT_UNITS, lang = CONFIG.DEFAULT_LANG) => {
  const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon, units: unit, lang: lang });
  return await makeRequest(url);
};

export const getCurrentWeatherWithFallback = async (city) => {
  try {
    return await getCurrentWeather(city);
  } catch (error) {
    console.warn('Folosim date simulate din cauza:', error.message);
    return {
      ...mockWeatherData,
      isFallback: true,
      fallbackReason: error.message
    };
  }
};


let lastCity = null;
let lastCoords = null;

export const setLastLocation = ({ city = null, coords = null }) => {
  lastCity = city;
  lastCoords = coords;
};

export const refreshWeather = async (state) => {
  try {
    showLoading();
    let data;

    if (state.currentCity) {
      data = await getCurrentWeather(state.currentCity, state.unit, state.lang);
    } else if (state.currentCoords) {
      const { latitude, longitude } = state.currentCoords;
      data = await getWeatherByCoords(latitude, longitude, state.unit, state.lang);
    } else {
      const coords = await getCoords();
      data = await getWeatherByCoords(coords.latitude, coords.longitude, state.unit, state.lang);
      state.currentCoords = coords;
    }

    displayWeather(data,unit);
  } catch (err) {
    showError('Nu s-au putut obține datele meteo.');
  } finally {
    hideLoading();
  }
};

