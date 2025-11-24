import React, { useState } from 'react';
import { itinerary } from './data/itinerary';
import DayCard from './components/DayCard';
import WeatherWidget from './components/WeatherWidget';
import Header from './components/Header';

function App() {
  const [activeDay, setActiveDay] = useState(null);

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
