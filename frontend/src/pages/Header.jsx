import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Digi.png';
import Button from '../components/Button';  // Import the Button component

const Header = () => {
  return (
    <header className="bg-white text-gray-800 shadow-md w-full border-b-2 border-gray-300"> {/* Added border here */}
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
          <img src={logo} alt="Digilekh Logo" className="w-10 h-10 rounded-full" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-lg">
          <Link to="/" className="hover:text-blue-600 transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-blue-600 transition duration-200">About Us</Link>
          <Link to="/contact" className="hover:text-blue-600 transition duration-200">Contact Us</Link>
          {/* Use Button component for Get Started */}
          <Link to="/signup">
            <Button />  {/* Button component will replace the previous "Get Started" link */}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
