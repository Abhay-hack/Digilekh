import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { FaUser, FaBlog, FaUsers } from 'react-icons/fa'; // You can use any icon library

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <div className="text-2xl font-semibold mb-6">Profile</div>
      <nav className="space-y-4">
        {/* Profile Section */}
        <Link to="/profile" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
          <FaUser />
          <span>Profile</span>
        </Link>

        {/* Blogs Section */}
        <Link to="/profile/blogs" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
          <FaBlog />
          <span>Blogs</span>
        </Link>

        {/* Community Section */}
        <Link to="/profile/community" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md">
          <FaUsers />
          <span>Community</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
