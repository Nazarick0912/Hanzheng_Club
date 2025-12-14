import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home';
import './App.css'

const Gallery = () => (
  <div className="page-container">
    <h1>Gallery Page Coming Soon</h1>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <main>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App