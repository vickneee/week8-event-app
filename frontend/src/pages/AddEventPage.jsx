import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useField from '../hooks/useField'; // Import the useField hook
import {toast} from 'react-toastify';

const AddEventPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Using the useField hook for each field
  const title = useField('text', '');
  const date = useField('date', '');
  const location = useField('text', '');
  const organizerName = useField('text', '');
  const organizerContactEmail = useField('email', '');
  const organizerContactPhone = useField('tel', '');
  
  const clearAllFields = () => {
    title.clear();
    date.clear();
    location.clear();
    organizerName.clear();
    organizerContactEmail.clear();
    organizerContactPhone.clear();
  };

  const navigate = useNavigate();
  
  const addEvent = async (newEvent) => {
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add event');
      }
      return true;
    } catch (error) {
      console.error(error);
      toast.error(error.message ||
        'Failed to add event. Check console for more info.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const submitForm = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    const newEvent = {
      title: title.value,
      date: date.value,
      location: location.value,
      organizer: {
        name: organizerName.value,
        contactEmail: organizerContactEmail.value,
        contactPhone: organizerContactPhone.value,
      },
    };
    
    const success = await addEvent(newEvent);
    if (success) {
      toast.success('Event Added Successfully!');
      console.log('Event Added Successfully!');
      clearAllFields();
      navigate(`/`);
    }
    else {
      toast.error('Failed to Update the Event!');
      console.error('Failed to Update the Event!');
    }
  };
  
  return (
    <div className="create">
      <h2>Add a New Event</h2>
      <form onSubmit={submitForm}>
        <label>Event title:</label>
        <input {...title} required/>
        <label>Date:</label>
        <input {...date} required/>
        <label>Location:</label>
        <input {...location} required/>
        <label>Organizer Name:</label>
        <input {...organizerName} required/>
        <label>Organizer Contact Email:</label>
        <input {...organizerContactEmail} required/>
        <label>Organizer Contact Phone:</label>
        <input {...organizerContactPhone} required/>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Event'}
        </button>
      </form>
    </div>
  );
};

export default AddEventPage;
