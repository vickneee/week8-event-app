import {Link} from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const EventListings = ({events}) => {
  
  if (!events || events.length === 0) {
    return <div>No events available</div>;
  }
  
  return (
    <div className="event-list">
      {/* eslint-disable-next-line react/prop-types */}
      {events.map((event) => (
        
        <div className="event-preview" key={event.id}>
          <h2>{event.title}</h2>
          <p>Date: {event.date}</p>
          <p>Location: {event.location}</p>
          <div className="align-row">
            <Link to={`/events/${event.id}`} className="btn">
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventListings;
