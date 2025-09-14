import React, { useState } from 'react';
import { userInstance } from '../axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await userInstance.post('/login', { email, password });

      // Save token and user info in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));

      // Navigate to blogs page
      navigate('/api/blog');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#86DEB7] px-4">
      <div className="p-8 sm:p-12 rounded-xl shadow-lg bg-[#D6D3F0] w-full max-w-md">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-black mb-6 sm:mb-8">
          Login
        </h2>

        {error && (
          <div className="text-red-600 mb-4 text-center text-sm sm:text-base">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div>
            <label className="block text-sm sm:text-lg font-medium text-black mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 sm:py-3 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm sm:text-lg font-medium text-black mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 sm:py-3 border rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 text-lg font-bold bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm sm:text-base">
          Don't have an account?{' '}
          <Link to="/user/signup" className="font-bold underline text-black hover:text-gray-700">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
