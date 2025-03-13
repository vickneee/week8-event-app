import { useEffect, useState } from "react";
import EventListings from "../components/EventListings.jsx";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("api/events");
        
        if (!res.ok) {
          throw new Error("Could not fetch the data for that resource");
        }
        const data = await res.json();
        setIsPending(false);
        setEvents(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    // setTimeout(() => {fetchEvents();}, 1000); // Delay of 1 second
    fetchEvents();
  }, []);
  
  return (
    <div className="home">
      {error && <div className="margin-b">{error}</div>}
      {isPending && <div>Loading...</div>}
      {events && <EventListings events={events} />}
    </div>
  );
};

export default Home;
