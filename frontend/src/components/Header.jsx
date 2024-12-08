import React from "react"; 
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/api/blog" className="text-2xl font-bold">
          <span className="text-blue-500">My</span>Blog
        </Link>

        {/* Navigation Section */}
        <div className="space-x-4">
          {/* If the user is logged in, show "Write Post" and "Profile" */}
          {token ? (
            <>
              <Link to="/api/blog/create" className="text-white hover:text-blue-400">
                Write Post
              </Link>
              <Link to="/user/profile" className="text-white hover:text-blue-400">
                Profile
              </Link>
            </>
          ) : (
            // If not logged in, show nothing or a login link (optional)
            <Link to="/login" className="text-white hover:text-blue-400">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
