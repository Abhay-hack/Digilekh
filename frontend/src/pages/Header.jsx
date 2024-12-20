import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Digi.png';
import Button from '../components/Button'; 

const Header = () => {
  return (
    <header className="bg-[#82C0CC] text-gray-800 shadow-md w-full border-b-2 border-black">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
          <img src={logo} alt="Digilekh Logo" className="w-10 h-10 rounded-full" />
        </Link>

        
        <nav className="hidden md:flex items-center space-x-6 text-lg">
          <Link to="/" className="hover:text-white transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-white transition duration-200">About Us</Link>
          <Link to="/contact" className="hover:text-white transition duration-200">Contact Us</Link>
          
          <Link to="/user/signup">
            <Button /> 
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
