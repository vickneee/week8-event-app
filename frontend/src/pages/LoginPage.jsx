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

  const navigate = useNavigate();
  
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
      
      if (response && response.token) {
        setUser(response);
        console.log("Login successful:", response);
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else { // Handle all failure scenarios
        const errorMessage = response?.error || "Login failed!";
        console.error("Login failed:", errorMessage);
        toast.error(errorMessage);
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
