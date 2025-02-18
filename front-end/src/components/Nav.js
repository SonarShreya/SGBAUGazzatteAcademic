import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css'; // Import CSS for styling

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();  // Clear the user data from localStorage
    navigate("/");  // Redirect to the /logout page (or any confirmation page)
  };

  return (
    <div className="nav-container">
      {/* Logo and Title in a Flexbox */}
      <div className="logo-title">
        <img
          alt="sgbau"
          src="https://th.bing.com/th/id/OIP.3t_4wBtNPCIOqvHIZMHZBAHaF7?w=217&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          className="logo"
        />
        <h1 className="title">Sant Gadge Baba Amravati University Amravati</h1>
      </div>

      {/* Logout Button (If user is logged in) */}
      {auth ? (
        <ul className="nav-links">
          <li>
            {/* Trigger logout and navigate to /logout page */}
            <button onClick={logout} className="logout-btn">Logout</button>
          </li>
        </ul>
      ) : (
        <ul className="nav-links">
           
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};

export default Nav;


