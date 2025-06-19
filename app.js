const API_KEY = "cc3925bfa335d54ac1e2406faad44ab4"; 

const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click", () => {
  getWeather();
});

async function getWeather() {
  const city = document.querySelector("#cityInput").value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ro`;

  try {
    //Trimite cererea către API-ul meteo și așteaptă răspunsul (fetch este metoda de apelare HTTP).
    const response = await fetch(url);

    if (!response.ok) throw new Error("Orașul nu a fost găsit");
    
    //Transformă răspunsul primit (care e în format JSON) într-un obiect JS ușor de folosit.
    const data = await response.json();

    const weatherBox = document.querySelector("#weatherBox");

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    weatherBox.innerHTML = `
      <h2>${data.name}</h2>
      <div class="weather-icon">☀️</div>
      <h3>${Math.round(data.main.temp)}°C</h3>
      <p>${data.weather[0].description}</p>
      <div class="weather-info">
        <p>Umiditate: ${data.main.humidity}%</p>
        <p>Presiune: ${data.main.pressure} hPa</p>
        <p>Vânt: ${data.wind.speed} km/h</p>
        <p>Vizibilitate: ${data.visibility / 1000} km</p>
        <p>Răsărit: ${sunrise}</p>
        <p>Apus: ${sunset}</p>
      </div>
    `;
  } catch (error) {
    alert(error.message);
  }
}
