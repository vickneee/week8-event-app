import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand"><h1>Event Search</h1></Link>
      <div className="links">
        <a href="/">Home</a>
        <a href="/add-event">Add Event</a>
      </div>
    </nav>
  );
}

export default Navbar;
