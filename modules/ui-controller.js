export const elements = {
  searchForm: document.getElementById('search-form'),
  cityInput: document.getElementById('city-input'),
  locationBtn: document.getElementById('location-btn'),
  loading: document.getElementById('loading'),
  error: document.getElementById('error'),
  display: document.getElementById('weather-display'),
  cityName: document.getElementById('city-name'),
  temperatureDisplay: document.getElementById('temperature-display'),
  description: document.getElementById('description'),
  humidity: document.getElementById('humidity'),
  pressure: document.getElementById('pressure'),
  wind: document.getElementById('wind'),
  visibility: document.getElementById('visibility'),
  sunrise: document.getElementById('sunrise'),
  sunset: document.getElementById('sunset'),
};

function getWeatherEmoji(description) {
  const desc = description.toLowerCase();
  if (desc.includes("senin") || desc.includes("clear")) return "☀️";
  if (desc.includes("nori") || desc.includes("cloud")) return "☁️";
  if (desc.includes("ploaie") || desc.includes("rain")) return "🌧️";
  if (desc.includes("ninsoare") || desc.includes("snow")) return "❄️";
  return "🌡️";
}

export const showLoading = () => {
  elements.loading.classList.remove('hidden');
  elements.error.classList.add('hidden');
  elements.display.classList.add('hidden');
};

export const hideLoading = () => {
  elements.loading.classList.add('hidden');
};

export const showError = (message) => {
  elements.error.textContent = message;
  elements.error.classList.remove('hidden');
  elements.display.classList.add('hidden');
};

export const displayWeather = (data) => {
  elements.cityName.textContent = data.name;

  const emoji = getWeatherEmoji(data.weather[0].description);
  document.getElementById('weather-emoji').textContent = emoji;

  elements.temperatureDisplay.textContent = `${Math.round(data.main.temp)}°C`;

  elements.description.textContent = data.weather[0].description;

  elements.humidity.textContent = data.main.humidity;
  elements.pressure.textContent = data.main.pressure;
  elements.wind.textContent = (data.wind.speed * 3.6).toFixed(1);
  elements.visibility.textContent = data.visibility;

  elements.sunrise.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
  elements.sunset.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });

  elements.display.classList.remove('hidden');
  elements.error.classList.add('hidden');
};


export const clearInput = () => {
  elements.cityInput.value = '';
};

export const getCityInput = () => {
  return elements.cityInput.value.trim();
};
