import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import profilePlaceholder from "../assets/user.png";
import logo from "../assets/Digi.png";  

const Header = () => {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect specific routes
  const isCommunityRoute = location.pathname.startsWith("/community");
  const isBlogCreationRoute = location.pathname === "/api/blog/create";

  // Update token & user info when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("authToken"));
      setUser(JSON.parse(localStorage.getItem("userInfo")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const storedUser = JSON.parse(localStorage.getItem("userInfo"));
  const userProfilePicture = storedUser?.avatarUrl || profilePlaceholder;

  return (
    <header className="sticky top-0 bg-[#82C0CC] z-10 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/api/blog" className="flex items-center">
          <img className="w-12 sm:w-14 h-auto" src={logo} alt="Logo" />
          <span className="ml-2 text-xl sm:text-2xl font-semibold text-black">Digilekh</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {token ? (
            <>
              {!isCommunityRoute && (
                <Link to="/community" className="text-black hover:text-white transition duration-200">
                  Join Community
                </Link>
              )}
              {!isBlogCreationRoute && (
                <Link to="/api/blog/create" className="text-black hover:text-white transition duration-200">
                  Write Post
                </Link>
              )}
              <Link to="/user/profile">
                <img
                  src={userProfilePicture}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-black hover:border-white transition duration-200"
                />
              </Link>
            </>
          ) : (
            <Link to="/user/login" className="text-gray-700 hover:text-white transition duration-200">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-black focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#82C0CC] px-4 pt-2 pb-4 space-y-2">
          {token ? (
            <>
              {!isCommunityRoute && (
                <Link
                  to="/community"
                  className="block text-black hover:text-white transition duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Community
                </Link>
              )}
              {!isBlogCreationRoute && (
                <Link
                  to="/api/blog/create"
                  className="block text-black hover:text-white transition duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Write Post
                </Link>
              )}
              <Link to="/user/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  src={userProfilePicture}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border-2 border-black hover:border-white transition duration-200 mt-2"
                />
              </Link>
            </>
          ) : (
            <Link
              to="/user/login"
              className="block text-gray-700 hover:text-white transition duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
