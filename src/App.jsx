import React, { useState, useEffect } from 'react';
import { itinerary } from './data/itinerary';
import DayCard from './components/DayCard';
import WeatherWidget from './components/WeatherWidget';
import Header from './components/Header';

function App() {
  const [activeDay, setActiveDay] = useState(null);
  const [dailyWeather, setDailyWeather] = useState({});

  useEffect(() => {
    // Fetch forecast for the trip duration
    const lat = -23.5505;
    const lon = -46.6333;
    const startDate = "2025-12-03";
    const endDate = "2025-12-09"; // Limit to 16 days from now (approx)

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&start_date=${startDate}&end_date=${endDate}`)
      .then(res => res.json())
      .then(data => {
        console.log("API Data:", data);
        if (data.daily) {
          const weatherMap = {};
          data.daily.time.forEach((date, index) => {
            weatherMap[date] = {
              max: Math.round(data.daily.temperature_2m_max[index]),
              min: Math.round(data.daily.temperature_2m_min[index]),
              code: data.daily.weather_code[index],
              rainChance: data.daily.precipitation_probability_max[index]
            };
          });
          console.log("Weather Map:", weatherMap);
          setDailyWeather(weatherMap);
        }
      })
      .catch(err => console.error("Failed to fetch daily weather", err));
  }, []);

  const toggleDay = (dayIndex) => {
    if (activeDay === dayIndex) {
      setActiveDay(null);
    } else {
      setActiveDay(dayIndex);
    }
  };

  return (
    <div>
      <Header />
      <WeatherWidget />
      
      <div className="days-grid">
        {itinerary.map((day, index) => (
          <DayCard 
            key={day.day} 
            day={day} 
            weather={dailyWeather[day.date]}
            isActive={activeDay === index} 
            onToggle={() => toggleDay(index)} 
          />
        ))}
      </div>
      
      <footer className="app-footer">
        <p>Boa viagem! ✈️</p>
      </footer>
    </div>
  );
}

export default App;
