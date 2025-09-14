import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3">About Digilekh</h3>
            <p className="text-sm">
              Digilekh is your destination for insightful blogs and stories. Explore a world of ideas, inspiration, and knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm hover:underline hover:text-gray-300 transition duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm hover:underline hover:text-gray-300 transition duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm hover:underline hover:text-gray-300 transition duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-300 transition duration-200">
                Facebook
              </a>
              <a href="https://twitter.com" className="hover:text-gray-300 transition duration-200">
                Twitter
              </a>
              <a href="https://instagram.com" className="hover:text-gray-300 transition duration-200">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-center border-t border-gray-600 pt-4">
          © {new Date().getFullYear()} Digilekh. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
