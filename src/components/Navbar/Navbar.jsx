import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync active menu with current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setMenu('home');
    else if (path === '/timeline') setMenu('timeline');
    else if (path === '/gallery') setMenu('gallery');
    else if (path === '/events') setMenu('events');
    else if (path === '/about') setMenu('about');
  }, [location]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (menuName) => {
    setMenu(menuName);
    setMenuOpen(false);
  };

  return (
    <div className='navbar'>
      <div className='nav-logo' onClick={() => {
        setMenu("home");
        setMenuOpen(false);
        navigate('/');
      }}>
        <img src="/hanzheng.jpg" alt="Club Logo" />
        <p>Hanzheng Club</p>
      </div>

      <div
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Backdrop overlay for mobile */}
      {menuOpen && (
        <div className="nav-backdrop" onClick={() => setMenuOpen(false)}></div>
      )}

      <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        <li className={menu === "home" ? "active" : ""} onClick={() => handleNavClick("home")}>
          <Link to='/'>Home</Link>
          <hr />
        </li>
        <li className={menu === "timeline" ? "active" : ""} onClick={() => handleNavClick("timeline")}>
          <Link to='/timeline'>Timeline</Link>
          <hr />
        </li>
        <li className={menu === "gallery" ? "active" : ""} onClick={() => handleNavClick("gallery")}>
          <Link to='/gallery'>Memory Gallery</Link>
          <hr />
        </li>
        <li className={menu === "events" ? "active" : ""} onClick={() => handleNavClick("events")}>
          <Link to='/events'>Events</Link>
          <hr />
        </li>
        <li className={menu === "about" ? "active" : ""} onClick={() => handleNavClick("about")}>
          <Link to='/about'>About Us</Link>
          <hr />
        </li>

      </ul>

      <div className="nav-subcribe">
        <Link to='/subscribe'><button className="nav-btn-black">Subscribe</button></Link>
      </div>
    </div>
  );
};

export default Navbar;