import React from "react";

const Middle = () => {
  return (
    <main className="bg-gray-50 py-12 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl text-left px-4">
        {/* Add the HomeCard component above the headline */}

        {/* Headline */}
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Voices that shape the world
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-700 mb-6">
          Explore the untold stories, discover new perspectives
        </p>

        {/* Call to Action Button */}
        <div className="mt-8">
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-white hover:text-black border-2 border-black transition duration-200 text-sm">
            Start reading
          </button>
        </div>
      </div>
    </main>
  );
};

export default Middle;
