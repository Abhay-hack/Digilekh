import React from 'react';
import Header from './Header'; 
import Footer from './Footer'; 
import profilePlaceholder from "../assets/rb_451.png";

const About = () => {
  return (
    <div>
      <Header />
      <div className="container bg-[#86DEB7] mx-auto py-12 px-6">
        <div className="flex items-center  justify-between space-x-8">
          
          <div className="w-1/2 text-left">
            <h1 className="text-4xl font-mono font-bold text-gray-800 mb-4">
              About Us
            </h1>
            <p className="text-xl font-serif text-gray-600 mb-6">
              Digilekh is a platform where everyone’s story matters. We provide a space for thoughtful, meaningful writing that helps to connect readers and creators across the world. Whether you're sharing an insight, a lesson, or an experience, we give you the tools to tell your story without the distractions.
            </p>
            <p className="text-xl font-serif text-gray-600 mb-6">
              We believe that words have the power to transform our world, and we’re dedicated to creating a space that fosters conversation, collaboration, and learning. Through thoughtful writing, we aim to build a more connected and understanding world.
            </p>
            <p className="text-xl font-serif text-gray-600">
              Join us as we grow this community. Whether you’re a reader or writer, we invite you to explore, learn, and share your story with us.
            </p>
          </div>

          
          <div className="w-1/2">
            <img
              src= {profilePlaceholder} 
              alt="About Us"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
