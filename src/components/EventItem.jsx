import React from 'react';

const EventItem = ({ event }) => {
  const encodedAddress = event.address ? encodeURIComponent(event.address) : '';
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}`;
  // Uber universal link
  const uberUrl = `https://m.uber.com/ul/?action=setPickup&client_id=YOUR_CLIENT_ID&pickup=my_location&dropoff[formatted_address]=${encodedAddress}`;

  return (
    <div className="event-item">
      <div className="event-header">
        <span className="event-time">
          {event.time}
        </span>
        <span className="event-type">
          {event.type}
        </span>
      </div>
      
      <h3 className="event-title">{event.title}</h3>
      
      {event.description && (
        <p className="event-desc">{event.description}</p>
      )}
      
      {event.address && (
        <div className="event-location">
          <p className="location-text">
            📍 {event.address}
          </p>
          
          <div className="action-buttons">
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-maps"
            >
              Maps
            </a>
            <a 
              href={wazeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-waze"
            >
              Waze
            </a>
            <a 
              href={uberUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-uber"
            >
              Uber
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventItem;
