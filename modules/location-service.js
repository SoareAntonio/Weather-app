export const getCoords = () => new Promise((resolve, reject) => {
  
  const fallbackToIp = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();

      if (!data.latitude || !data.longitude) {
        throw new Error('Nu s-au putut extrage coordonatele din răspunsul IP.');
      }

      resolve({
        latitude: data.latitude,
        longitude: data.longitude,
        source: 'ip',
        accuracy: 'city' // mai puțin precisă
      });
    } catch (error) {
      reject(new Error('Nu am putut determina locația (nici prin IP).'));
    }
  };

  
  if (!navigator.geolocation) {
    console.warn('Geolocation API nu este suportat. Folosim fallback IP.');
    return fallbackToIp();
  }

  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        source: 'gps',
        accuracy: position.coords.accuracy <= 100 ? 'precise' : 'approximate'
      });
    },
    (error) => {
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.warn('Utilizatorul a refuzat accesul la locație.');
          break;
        case error.POSITION_UNAVAILABLE:
          console.warn('Poziția nu este disponibilă.');
          break;
        case error.TIMEOUT:
          console.warn('Timeout la obținerea locației.');
          break;
        default:
          console.warn('Eroare necunoscută la geolocation.');
      }
      fallbackToIp();
    },
    {
      timeout: 7000, 
      enableHighAccuracy: true,
      maximumAge: 0
    }
  );
});
