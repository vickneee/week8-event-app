import {useState, useEffect, useContext} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import {toast} from 'react-toastify';

const EditEventPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [event, setEvent] = useState(null); // Initialize event state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const {id} = useParams();
  
  // Using the useField hook for each field
  const [title, setTitle] = useState('')
  const [date, setDate ]= useState( '');
  const [location, setLocation] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerContactEmail, setOrganizerContactEmail] = useState('');
  const [organizerContactPhone, setOrganizerContactPhone] = useState( '');
  
  const navigate = useNavigate();
  
  const {token} = useContext(AuthContext);
  
  // const formatDate = (date) => {
  //   const d = new Date(date);
  //   return d.toLocaleDateString();
  // }
  
  const updateEvent = async (event) => {
    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
      if (!res.ok)
        throw new Error('Failed to update event');
      return true;
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error(error.message ||
        'Failed to add event. Check console for more info.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setEvent(data); // Set the event data
        
        // Initialize form fields with fetched event data
        setTitle(data.title);
        setDate(data.date);
        setLocation(data.location);
        setOrganizerName(data.organizer.name);
        setOrganizerContactEmail(data.organizer.contactEmail);
        setOrganizerContactPhone(data.organizer.contactPhone);
      } catch (error) {
        console.error('Failed to fetch event:', error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };
    
    fetchEvent();
  }, [id]);
  
  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    const updatedEvent = {
      id,
      title,
      date,
      location,
      organizer: {
        name: organizerName,
        contactEmail: organizerContactEmail,
        contactPhone: organizerContactPhone,
    }};
    
    const success = await updateEvent(updatedEvent);
    if (success) {
      toast.success('Event Updated Successfully!');
      console.log('Event Updated Successfully!');
      navigate(`/events/${id}`);
    }
    else {
      toast.error('Failed to update the event');
      console.error('Failed to update the event');
    }
  };
  
  if (!token) {
    return <div>You are not authorized to edit an event.</div>; // Handle unauthorized access
  }
  
  return (
    <div className="create">
      <h2>Update Event</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
      <form onSubmit={submitForm}>
        <label>Event title:</label>
        <input type="text" required value={title}
               onChange={(e) => setTitle(e.target.value)}/>
        <label>Date:</label>
        <input type="text" required value={date}
               onChange={(e) => setDate(e.target.value)}/>
        <label>Location:</label>
        <input type="text" required value={location}
               onChange={(e) => setLocation(e.target.value)}/>
        <label>Organizer Name:</label>
        <input type="text" required value={organizerName}
               onChange={(e) => setOrganizerName(e.target.value) }/>
        <label>Organizer Contact Email:</label>
        <input type="email" required value={organizerContactEmail}
               onChange={(e) => setOrganizerContactEmail(e.target.value)}/>
        <button type="submit">
           Update Event
        </button>
      </form>
      )}
    </div>
  );
};

export default EditEventPage;
