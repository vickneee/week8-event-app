import {Link} from 'react-router-dom';
import EventListing from './EventListing.jsx';

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
          <EventListing event={event} />
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
