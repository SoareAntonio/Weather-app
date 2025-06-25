
export const MOCK_DATA = {
  coord: {
    lon: 7.367,
    lat: 45.133,
  },
  weather: [
    {
      id: 501,
      main: "Rain",
      description: "moderate rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 284.2,
    feels_like: 282.93,
    temp_min: 283.06,
    temp_max: 286.82,
    pressure: 1021,
    humidity: 60,
    sea_level: 1021,
    grnd_level: 910,
  },
  visibility: 10000,
  wind: {
    speed: 4.09,
    deg: 121,
    gust: 3.47,
  },
  rain: {
    "1h": 2.73,
  },
  clouds: {
    all: 83,
  },
  dt: 1726660758,
  sys: {
    type: 1,
    id: 6736,
    country: "IT",
    sunrise: 1726636384,
    sunset: 1726680975,
  },
  timezone: 7200,
  id: 3165523,
  name: "Province of Turin",
  cod: 200,
};

export const CONFIG = {
  API_KEY: 'cc3925bfa335d54ac1e2406faad44ab4', // Ideal din .env în producție
  API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  DEFAULT_UNITS: 'metric', 
  DEFAULT_LANG: 'ro', 
};

export const API_ENDPOINTS = {
  CURRENT_WEATHER: 'weather',                    
  FORECAST: 'forecast',                          
  ONE_CALL: 'onecall',                           // Toate datele meteo într-un singur request
  AIR_POLLUTION: 'air_pollution',                
  ALERTS: 'alerts',                              // Alerte meteo (în cadrul One Call)
};


export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'Orașul nu a fost găsit. Verifică ortografia și încearcă din nou.',
  NETWORK_ERROR: 'Conexiunea la internet a eșuat. Te rugăm să verifici rețeaua.',
  API_ERROR: 'Eroare API. Încearcă din nou mai târziu.',
  UNKNOWN_ERROR: 'A apărut o eroare necunoscută. Încearcă mai târziu.',
};

export const mockWeatherData = {
  name: 'Fallback City',
  weather: [{ description: 'cer parțial noros', icon: '03d' }],
  main: { temp: 22.5, humidity: 60 },
  wind: { speed: 3.5 }
};
