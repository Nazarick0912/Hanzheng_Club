import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import Home from './pages/home'
import './App.css'

const Gallery = () => <h1>Gallery Page Coming Soon</h1>;

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App
