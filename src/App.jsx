import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home';
import './App.css'
import Timeline from './components/Timeline/Timeline';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';
import AboutUsPage from './pages/AboutUsPage';
import Subscribe from './pages/Subscribe';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/subcribe" element={<Subscribe />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App