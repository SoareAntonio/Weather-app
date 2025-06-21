const API_KEY = 'cc3925bfa335d54ac1e2406faad44ab4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getCurrentWeather = async (city) => {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ro`);
  if (!response.ok) throw new Error('Eroare API');
  return response.json();
};

export const getWeatherByCoords = async (lat, lon) => {
  const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ro`);
  if (!response.ok) throw new Error('Eroare API');
  return response.json();
};