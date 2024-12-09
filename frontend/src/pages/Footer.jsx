import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <ul>
              <li>
                <a href="/" className="text-sm hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="https://facebook.com" className="hover:underline">
                Facebook
              </a>
              <a href="https://twitter.com" className="hover:underline">
                Twitter
              </a>
              <a href="https://instagram.com" className="hover:underline">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-sm text-center border-t border-white pt-4">
          © {new Date().getFullYear()} Digilekh. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
