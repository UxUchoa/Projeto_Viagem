import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Coordinates for São Paulo
    const lat = -23.5505;
    const lon = -46.6333;
    
    // Fetch current weather
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo`)
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch weather", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4 text-center text-muted">Carregando previsão...</div>;
  if (!weather) return null;

  const currentTemp = Math.round(weather.current.temperature_2m);
  const weatherCode = weather.current.weather_code;
  
  // Simple mapping for weather codes
  const getWeatherIcon = (code) => {
    if (code <= 3) return "☀️";
    if (code <= 48) return "☁️";
    if (code <= 67) return "🌧️";
    if (code <= 99) return "⛈️";
    return "🌡️";
  };

  return (
    <div className="weather-widget">
      <div className="weather-info">
        <div className="location">São Paulo, SP</div>
        <div className="temp">{currentTemp}°C</div>
        <div className="label">Hoje</div>
      </div>
      <div className="weather-icon">
        {getWeatherIcon(weatherCode)}
      </div>
    </div>
  );
};

export default WeatherWidget;
