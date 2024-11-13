// src/App.js
import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import SatelliteView from './SatelliteView';

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
      },
      (error) => console.error('Error fetching location:', error),
      { enableHighAccuracy: true }
    );
  }, []);

  if (!location.lat || !location.lon) {
    return <p>Fetching location...</p>;
  }

  return (
    <div className="App">
      <h1>Storm Reporting App</h1>
      <Weather lat={location.lat} lon={location.lon} />
      <SatelliteView lat={location.lat} lon={location.lon} />
    </div>
  );
}

export default App;
