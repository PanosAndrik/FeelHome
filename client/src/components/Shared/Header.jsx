import React from "react";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../../styles/header.css"; // That's for Christina's Css file

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  // const [userFullname, setUserFullname] = useState(localStorage.getItem('userFullname'));
  const navigate = useNavigate();

  // Use useEffect to update token state whenever localStorage changes
  useEffect(() => {
    const interval = setInterval(() => {
      setToken(localStorage.getItem('token'));
      
      
    }, 1000); // Check every 1 second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token to log the user out
    localStorage.removeItem('userFullname');
    window.location.reload(); // Refresh the page to reflect changes
  };

  const handleSellingAuth = () => {
 if(!token){
  alert("Login or sign up to become a seller on Feel home.")
  navigate("/login");
 }else{
  navigate("/seller");
 }
}
  

  return (
    <nav>
      <ul className="navbar">
      <li>
          <Link to="/"className="site-title">Feel Home</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={handleSellingAuth}>Seller</button>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {/* Conditionally render links based on whether the user is logged in */}
        {token ? (
          <>
            <li>
              <button onClick={handleLogout} to="/login">Logout</button>
            </li>
            <li>
              <p>{localStorage.getItem("userFullname")}</p>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
