import {BrowserRouter, Routes, Route} from 'react-router-dom';

// Pages & Components
import Home from './pages/HomePage';
import AddEventPage from './pages/AddEventPage.jsx';
import EventPage from './pages/EventPage.jsx';
import EditEventPage from './pages/EditEventPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Navbar from './components/Navbar';
import NotFoundPage from './pages/NotFoundPage';
import AuthProvider from './context/AuthProvider.jsx'; // Import AuthProvider
import { ToastContainer } from 'react-toastify';

const App = () => {
  
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/add-event" element={<AddEventPage/>}/>
              <Route path="/events/:id" element={<EventPage/>}/>
              <Route path="/edit-event/:id" element={<EditEventPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/signup" element={<SignupPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer/>
    </div>
  );
};

export default App;
