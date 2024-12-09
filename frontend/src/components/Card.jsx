import React from 'react';

const Card = ({ title, description, onJoin, onView }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-200">
      <h3
        className="text-xl font-bold mb-2 cursor-pointer hover:text-blue-500"
        onClick={onView}
      >
        {title}
      </h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button
        onClick={onJoin}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Join
      </button>
    </div>
  );
};

export default Card;
