import React from "react";
import { Link, useLocation } from "react-router-dom";
import profilePlaceholder from "../assets/user.png";
import logo from '../assets/Digi.png';  

const Header = () => {
  const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
  const location = useLocation();

  // Detect specific routes
  const isCommunityRoute = location.pathname.startsWith("/community");
  const isBlogCreationRoute = location.pathname === "/api/blog/create";

  // Placeholder for user profile picture (replace with actual URL if available)
  const userProfilePicture = profilePlaceholder; // Replace with user's avatar URL or default icon

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center py-4">
        {/* Logo Section */}
        <Link to="/api/blog" className="text-2xl font-semibold text-gray-900">
        <img className="w-14 h-auto" src={logo}/>
        </Link>

        {/* Navigation Section */}
        <nav className="flex items-center space-x-6">
          {token ? (
            <>
              {/* Community Link */}
              {!isCommunityRoute && (
                <Link
                  to="/community"
                  className="text-gray-700 hover:text-green-600 transition duration-200"
                >
                  Join Community
                </Link>
              )}

              {/* Write Post Link (hidden on blog creation route) */}
              {!isBlogCreationRoute && (
                <Link
                  to="/api/blog/create"
                  className="text-gray-700 hover:text-green-600 transition duration-200"
                >
                  Write Post
                </Link>
              )}

              {/* Profile Icon */}
              <Link to="/user/profile" className="relative">
                <img
                  src={userProfilePicture}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-green-600 transition duration-200"
                />
              </Link>
            </>
          ) : (
            // Login link for unauthenticated users
            <Link
              to="/login"
              className="text-gray-700 hover:text-green-600 transition duration-200"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
