// src/Weather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = ({ lat, lon }) => {
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [stormAlerts, setStormAlerts] = useState(null);

  useEffect(() => {
    if (lat && lon) {
      fetchWeather();
      fetchAlerts();
    }
  }, [lat, lon]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
      setHourlyForecast(response.data.hourlyForecast);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`/api/alerts?lat=${lat}&lon=${lon}`);
      setStormAlerts(response.data.stormAlerts);
    } catch (error) {
      console.error('Error fetching storm alerts:', error);
    }
  };

  return (
    <div className="weather-container">
      <h1>Hourly Weather Forecast</h1>
      {hourlyForecast ? (
        <div className="forecast-list">
          {hourlyForecast.slice(0, 12).map((hour, index) => (
            <div key={index} className="forecast-item">
              <p><strong>Time:</strong> {new Date(hour.startTime).toLocaleString()}</p>
              <p><strong>Temperature:</strong> {hour.temperature}°C</p>
              <p><strong>Condition:</strong> {hour.condition}</p>
              <p><strong>Wind:</strong> {hour.windSpeed} from {hour.windDirection}</p>
              <p><strong>Precipitation Chance:</strong> {hour.precipitationProbability}%</p>
              <p><strong>Humidity:</strong> {hour.humidity}%</p>
              <p><strong>Details:</strong> {hour.detailedForecast}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading hourly weather data...</p>
      )}

      <h2>Active Storm Alerts</h2>
      {stormAlerts ? (
        stormAlerts.length > 0 ? (
          <div className="alerts-list">
            {stormAlerts.map((alert, index) => (
              <div key={index} className="alert-item">
                <p><strong>Event:</strong> {alert.event}</p>
                <p><strong>Severity:</strong> {alert.severity}</p>
                <p><strong>Description:</strong> {alert.description}</p>
                <p><strong>Instructions:</strong> {alert.instruction}</p>
                <p><strong>Effective:</strong> {new Date(alert.effective).toLocaleString()}</p>
                <p><strong>Expires:</strong> {new Date(alert.expires).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No active storm alerts in your area.</p>
        )
      ) : (
        <p>Loading storm alerts...</p>
      )}
    </div>
  );
};

export default Weather;
