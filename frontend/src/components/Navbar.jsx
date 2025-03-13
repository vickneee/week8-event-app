import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import {useContext} from 'react';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const {isAuthenticated, clearUser, email, isLoading} = useContext(AuthContext);
  
  const handleLogout = (e) => {
    e.preventDefault();
    clearUser();
  }
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand"><h1>Event Search</h1></Link>
      <div className="links align-row">
        {isAuthenticated && (
          <div>
            <Link to="/add-event">Add Event</Link>
            {email && <span className="email">{email}</span>}
            <button className="btn" onClick={handleLogout}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
