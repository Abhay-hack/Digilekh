import React from "react";
import { Link, useLocation } from "react-router-dom";
import profilePlaceholder from "../assets/user.png";
import logo from '../assets/Digi.png';  

const Header = () => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  // Detect specific routes
  const isCommunityRoute = location.pathname.startsWith("/community");
  const isBlogCreationRoute = location.pathname === "/api/blog/create";

  const userProfilePicture = profilePlaceholder;

  return (
    <header className="sticky top-0 bg-[#82C0CC]  z-10">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center py-4">
        {/* Logo Section */}
        <Link to="/api/blog" className="text-2xl font-semibold text-black">
        <img className="w-14 h-auto" src={logo}/>
        </Link>


        <nav className="sticky top-0 z-10 flex items-center space-x-6">
          {token ? (
            <>
              {!isCommunityRoute && (
                <Link
                  to="/community"
                  className="text-black hover:text-white transition duration-200"
                >
                  Join Community
                </Link>
              )}

              {!isBlogCreationRoute && (
                <Link
                  to="/api/blog/create"
                  className="text-black hover:text-white transition duration-200"
                >
                  Write Post
                </Link>
              )}

              <Link to="/user/profile" className="relative">
                <img
                  src={userProfilePicture}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-black hover:border-white transition duration-200"
                />
              </Link>
            </>
          ) : (
            // Login link for unauthenticated users
            <Link
              to="/login"
              className="text-gray-700 hover:text-white transition duration-200"
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
