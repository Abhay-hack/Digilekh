import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-medium">
          © {new Date().getFullYear()} Digilekh. All Rights Reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
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
    </footer>
  );
};

export default Footer;
