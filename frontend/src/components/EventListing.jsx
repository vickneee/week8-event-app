// eslint-disable-next-line react/prop-types
const EventListing = ({event}) => {
  return (
    <div className="event-preview">
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
    </div>
  );
};

export default EventListing;
