import React, { useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [menu, setMenu] = useState("home");

  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className='nav-logo' onClick={() => {
            setMenu("home");
            navigate('/');
        }}>
        <img src="/hanzheng.jpg" alt="Club Logo"></img>
        <p>Hanzheng Club</p>
      </div>
      
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("home")}}>
            <Link to='/'>Home</Link>
            {menu==="home"?<hr/>:<></>}
        </li>
        <li onClick={()=>{setMenu("timeline")}}>
            <Link to='/timeline'>Timeline</Link>
            {menu==="timeline"?<hr/>:<></>}
        </li>
        <li onClick={()=>{setMenu("gallery")}}>
            <Link to='/gallery'>Memory Gallery</Link>
            {menu==="gallery"?<hr/>:<></>}
        </li>
        <li onClick={()=>{setMenu("events")}}>
            <Link to='/events'>Events</Link>
            {menu==="events"?<hr/>:<></>}
        </li>
        <li onClick={()=>{setMenu("about")}}>
            <Link to='/about'>About Us</Link>
            {menu==="about"?<hr/>:<></>}
        </li>
      </ul>

      <div className="nav-subcribe">
         <Link to='/subscribe'><button>Subscribe</button></Link>
      </div>
    </div>
  )
}

export default Navbar