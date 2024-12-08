import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo Section - Clicking on the logo redirects to the Home page */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
          <img src={logo} alt="Digilekh Logo" className="w-10 h-10 rounded-full" />
          <span>Digilekh</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-gray-300 transition duration-200">About Us</Link>
          <Link to="/contact" className="hover:text-gray-300 transition duration-200">Contact Us</Link>
          <Link to="/signup" className="hover:text-gray-300 transition duration-200">Get Started</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
