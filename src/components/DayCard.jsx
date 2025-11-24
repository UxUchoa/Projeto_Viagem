import React from 'react';
import EventItem from './EventItem';

const DayCard = ({ day, isActive, onToggle }) => {
  return (
    <div className={`day-card ${isActive ? 'active' : ''}`}>
      <button 
        onClick={onToggle}
        className="day-header"
      >
        <div>
          <div className="day-meta">
            Dia {day.day} • {day.weekday}
          </div>
          <h2 className="day-title">{day.title}</h2>
          <div className="day-date">{day.date}</div>
        </div>
        <div className="day-toggle-icon">
          ▼
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
