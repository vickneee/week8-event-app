import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const SignupPage = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const name = useField("text");
  const email = useField("email");
  const password = useField("password");
  const [selectedGender, setSelectedGender] = useState('Male');
  const dateOfBirth = useField("date");
  const addressStreet = useField("text");
  const addressCity = useField("text");
  const addressState = useField("text");
  const addressZipCode= useField("text");
  const addressCountry = useField("text");
  const occupation = useField("text");
  const phoneNumber = useField("text");
  const [validationError, setValidationError] = useState(null); // Client side validation error state
  
  const { signup } = useSignup("/api/users/signup");
  
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.value || !email.value || !password.value || !selectedGender || !dateOfBirth.value || !addressStreet.value || !addressCity.value || !addressState.value || !addressZipCode.value || !addressCountry.value || !occupation.value || !phoneNumber.value) {
      setValidationError('Please provide all the required fields!!!');
      toast.error('Please provide all the required fields!!!');
      return;
    }
    
    setValidationError(null);
    
    // Format date to YYYY-MM-DD
    const formattedDate = new Date(dateOfBirth.value).toISOString().slice(0, 10);

    try {
      const response = await signup({
        name: name.value,
        email: email.value,
        password: password.value,
        gender: selectedGender,
        date_of_birth: formattedDate,
        address: {
          street: addressStreet.value,
          city: addressCity.value,
          state: addressState.value,
          zip: addressZipCode.value,
          country: addressCountry.value,
        },
        
        occupation: occupation.value,
        phone: phoneNumber.value,
      });
      
      console.log('Signup Response:', response);
      
        if (response && response.token) { // Correct check
        console.log('Signup successful!', response);
        toast.success('Signup successful!');
        setUser(response);
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else { // Handle all failure scenarios
        const errorMessage = response?.error || "Signup failed!";
        console.error("Signup failed:", errorMessage);
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      toast.error('Signup failed!');
    }
  };
  
  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        {validationError && <p className="error">{validationError}</p>} {/* Display validation error */}
        <label>Name:</label>
        <input {...name} />
        <label>Email:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <label>Gender:</label>
        <select value={selectedGender} onChange={handleGenderChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label>Date of Birth:</label>
        <input {...dateOfBirth} />
        <label>Street:</label>
        <input{...addressStreet}/>
        <label>City:</label>
        <input{...addressCity}/>
        <label>State:</label>
        <input{...addressState}/>
        <label>Zip Code:</label>
        <input{...addressZipCode}/>
        <label>Country:</label>
        <input{...addressCountry}/>
        <label>Occupation:</label>
        <input {...occupation} />
        <label>Phone Number:</label>
        <input {...phoneNumber} />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
