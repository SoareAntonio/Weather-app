import { CONFIG , API_ENDPOINTS ,ERROR_MESSAGES,mockWeatherData } from "./config.js";

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


export const getCurrentWeather = async (city) => {
  const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { q: city });
  return await makeRequest(url);
};

export const getWeatherByCoords = async (lat, lon) => {
  const url = buildApiUrl(API_ENDPOINTS.CURRENT_WEATHER, { lat, lon });
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