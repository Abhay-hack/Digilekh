import React from "react";

const Middle = () => {
  return (
    <main className="bg-gray-50 py-12">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Digilekh</h2>
        <p className="text-xl text-gray-600 mb-6">
          Digilekh is a platform where every word matters. We share stories, insights, and knowledge that make a difference.
        </p>

        <div className="mb-8">
          <img
            src="https://via.placeholder.com/600x400" // You can replace this with any online image URL.
            alt="Blogging Platform"
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Our Vision</h3>
        <p className="text-lg text-gray-500 mb-4">
          At Digilekh, our goal is to provide insightful, high-quality content that resonates with our readers.
          We aim to create a community where writers can express their thoughts, ideas, and expertise in a meaningful way.
        </p>

        <p className="text-lg text-gray-500">
          Whether you're a writer or a reader, Digilekh is a space where every word has the potential to inspire.
        </p>
      </div>
    </main>
  );
};

export default Middle;
