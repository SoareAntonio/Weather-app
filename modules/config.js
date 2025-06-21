/* Mocking înseamnă simularea comportamentului unor componente externe (API-uri, baze de date, funcții) pentru a putea testa codul tău fără să depinzi de resurse reale.
✅ Când folosești mocking:
✅ Testezi o aplicație care consumă un API, dar nu vrei să faci request-uri reale.

✅ API-ul e lent, instabil sau nu ai acces la el.

✅ Vrei date constante pentru a testa comportamentul codului tău.

✅ Vrei să eviți costuri sau rate limit din partea unui serviciu extern.
🛠 Exemple:
🔹 1. Fără mocking
fetch("https://api.weather.com/data") // API real
  .then(res => res.json())
  .then(data => console.log(data));
2. Cu mocking (în dezvoltare sau test)
import { MOCK_DATA } from './modules/config.js';

console.log(MOCK_DATA); // simulează un răspuns real, dar nu folosește internetul

🔁 Alte forme de mocking:
Mock API: returnează JSON-uri statice.

Mock function: înlocuiești o funcție cu una falsă.

Mock server: un server local care simulează endpoint-urile reale.
*/

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

