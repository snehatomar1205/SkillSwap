// src/components/Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-brand">SkillSwap</h2>
      <div className="navbar-links">
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/my-skills">My Skills</NavLink>
        <NavLink to="/requests">Requests</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/create-skill">Create Skill</NavLink>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
