import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import BlogPost from './components/BogPost';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/api/blog" element={<Blogs />} />
        <Route path="/api/blog/create" element={<BlogPost />} />
        <Route path="/api/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
