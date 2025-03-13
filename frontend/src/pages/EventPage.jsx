import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import {toast} from 'react-toastify';

const EventPage = () => {
  const {id} = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  const {token} = useContext(AuthContext);
  
  const deleteEvent = async (id) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete event!');
      }
      return true; // Return true if successful
    } catch (error) {
      console.error('Error deleting event!', error);
      toast.error('Error deleting event!');
      return false; // Return false if failed
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log('id: ', id);
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [id]);
  
  const onDeleteClick = (eventId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this listing?' + eventId,
    );
    if (!confirm) return;
    
    const deletionSuccess = deleteEvent(eventId);
    if (!deletionSuccess) {
      console.error("Failed to delete event!");
    } else if (deletionSuccess) {
      console.log('Event Deleted Successfully!');
      toast.success('Event Deleted Successfully!');
      setTimeout(() => {
        navigate('/');
      }, "1000");
    }
  };
  
  return (
    <div className="event-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{event.title}</h2>
          <p>{event.date}</p>
          <p>{event.location}</p>
          <p>{event.organizer?.name}</p>
          <p>{event.organizer?.contactEmail}</p>
          <p>{event.organizer?.contactPhone}</p>
          <div className="align-row">
            <Link to={`/edit-event/${id}`} className="btn"> Edit </Link>
            <Link to="/" onClick={() => onDeleteClick(event._id)}
                  className="btn">Delete</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default EventPage;
