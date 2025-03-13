import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages & Components
import Home from "./pages/HomePage";
import AddEventPage from "./pages/AddEventPage.jsx";
import EventPage from "./pages/EventPage.jsx";
import EditEventPage from "./pages/EditEventPage.jsx";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {

    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-event" element={<AddEventPage />} />
              <Route path="/events/:id" element={<EventPage />} />
              <Route path="/edit-event/:id" element={<EditEventPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
