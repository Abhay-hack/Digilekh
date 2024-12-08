import React, { useState } from 'react';
import { userInstance } from '../axios'; // Import the named export `userInstance`
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userInstance.post('/signup', { username, email, password }); 
      console.log('Signup successful:', response.data);
      
      window.location.href = '/api/blog';
    } catch (error) {
      console.error('Signup error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <div className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        className="w-full p-2 border border-gray-300 rounded"
        required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
        Signup
        </button>
        <Link
        to="/login"
        className="block text-center text-blue-500 hover:underline"
        >
        Already have an account? Login
        </Link>
        </form>
    </div>
  </div>
  );
};

export default Signup;
