import React from 'react';
import EventItem from './EventItem';

const DayCard = ({ day, isActive, onToggle, weather }) => {
  // Helper to get icon (duplicated from widget, could be shared util)
  const getWeatherIcon = (code) => {
    if (code === undefined) return "";
    if (code <= 3) return "☀️";
    if (code <= 48) return "☁️";
    if (code <= 67) return "🌧️";
    if (code <= 99) return "⛈️";
    return "🌡️";
  };

  return (
    <div className={`day-card ${isActive ? 'active' : ''}`}>
      <button 
        onClick={onToggle}
        className="day-header"
      >
        <div style={{ flex: 1 }}>
          <div className="flex justify-between items-start">
            <div>
              <div className="day-meta">
                Dia {day.day} • {day.weekday}
              </div>
              <h2 className="day-title">{day.title}</h2>
              <div className="day-date">{day.date}</div>
            </div>
            
            {weather ? (
              <div className="flex items-center gap-3 bg-surface/50 p-2 px-3 rounded-lg border border-border/50">
                <div className="text-3xl" title="Condição do Tempo">
                  {getWeatherIcon(weather.code)}
                </div>
                
                <div className="flex flex-col items-start gap-1">
                  {weather.rainChance > 0 ? (
                    <div className="text-xs font-medium text-blue-400 flex items-center gap-1">
                      <span className="opacity-70">Chuva:</span>
                      <strong>{weather.rainChance}%</strong>
                    </div>
                  ) : (
                    <div className="text-xs font-medium text-muted flex items-center gap-1">
                      <span className="opacity-70">Chuva:</span>
                      <strong>0%</strong>
                    </div>
                  )}
                  
                  <div className="text-xs font-medium text-primary flex items-center gap-1">
                    <span className="text-muted opacity-70">Temp:</span>
                    <strong>{weather.max}°</strong>
                    <span className="text-muted">/ {weather.min}°</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-surface/50 p-2 px-3 rounded-lg border border-border/50 opacity-50">
                <div className="text-2xl">⏳</div>
                <div className="text-xs font-medium text-muted">
                  Previsão<br/>em breve
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="day-toggle-icon">
        </div>
      </button>
      
      {isActive && (
        <div className="day-content">
          <div style={{ marginTop: '1rem' }}>
            {day.events.map((event, index) => (
              <EventItem key={index} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DayCard;
