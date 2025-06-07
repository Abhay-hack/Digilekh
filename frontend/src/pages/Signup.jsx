import React, { useState } from 'react';
import { userInstance } from '../axios'; // Ensure this is properly configured
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
    <div className="flex items-center justify-center min-h-screen bg-[#86DEB7]">
      <div className="p-16 rounded-xl shadow-lg bg-[#D6D3F0] w-1/3">
        <h2 className="text-4xl font-bold text-center text-black mb-8">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-black">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-black">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-black">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-8 text-center">
          <Link
            to="/user/login"
            className="text-lg text-black hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
