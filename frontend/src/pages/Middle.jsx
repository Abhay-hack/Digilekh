import React from "react";
import BackgroundImage from "../assets/home1.webp";
import { Link } from "react-router-dom";

const Middle = () => {
  return (
    <main className="relative bg-gray-50 py-12 flex justify-center items-center min-h-screen">
 
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      ></div>


      <div className="relative z-10 w-full max-w-2xl text-left px-4">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Voices that shape the world
        </h2>

        <p className="text-xl text-gray-700 mb-6">
          Explore the untold stories, discover new perspectives
        </p>

        <div className="mt-8">
          <Link to="/signup">
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-white hover:text-black border-2 border-black transition duration-200 text-sm">
            Start reading
          </button>
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
    </main>
  );
};

export default Middle;
