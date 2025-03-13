import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import {useContext, useState} from 'react';
import AuthContext from '../context/AuthContext';
import { toast } from "react-toastify";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);  const navigate = useNavigate();
  const email = useField("text");
  const password = useField("password");
  const [validationError, setValidationError] = useState(null); // Client side validation error state
  
  const { login, isLoading, error } = useLogin("/api/users/login");
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.value || !password.value) {
      toast.error('Please provide email and password');
      return;
    }
    
    setValidationError(null);
    
    try {
      const response = await login({
        email: email.value,
        password: password.value,
      });
      
      console.log("Login Response:", response);
      
      if (response && response.email && response.token) {
        setUser(response);
        console.log("Login successful:", response);
        toast.success('Login successful');
        setUser(response);
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else if (response && response.error) {
      console.error("Login failed:", response.error);
      toast.error('Login failed!');
      } else if (response) {
        console.error("Login failed: Unexpected response structure", response);
        toast.error('Login failed!: Unexpected response structure');
      } else {
        console.error("Login failed: No response received");
        toast.error('Login failed!: No response received');
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error('Login failed!');
    }
  };
  
  return (
    <div className="create">
      <h2>Log In</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button type="submit" disabled={isLoading}>Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
