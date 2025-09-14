import React from "react";
import BackgroundImage from "../assets/home1.webp";
import { Link } from "react-router-dom";

const Middle = () => {
  return (
    <main className="relative bg-gray-50 flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
          Voices that shape the world
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-white mb-6">
          Explore the untold stories, discover new perspectives
        </p>

        <div className="mt-6 sm:mt-8 flex justify-center sm:justify-start">
          <Link to="/signup">
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-white hover:text-black border-2 border-black transition duration-200 text-sm sm:text-base">
              Start reading
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Middle;
