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
import CommunityList from './pages/CommunityList';
import CommunityDetail from './pages/CommunityDetail';
import CommunityCreate from './pages/CommunityCreate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/api/blog" element={<Blogs />} />
        <Route path="/api/blog/create" element={<BlogPost />} />
        <Route path="/api/blog/:id" element={<BlogDetail />} />
        <Route path="/community" element={<CommunityList />} />
        <Route path="/community/create" element={<CommunityCreate />} />
        <Route path="/community/:communityId" element={<CommunityDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
