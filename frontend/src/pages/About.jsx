import React from 'react';
import Header from './Header'; 
import Footer from './Footer'; 
import profilePlaceholder from "../assets/rb_451.png";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="bg-[#86DEB7] flex-1 py-12 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-mono font-bold text-gray-800 mb-4">
              About Us
            </h1>
            <p className="text-base sm:text-lg font-serif text-gray-600 mb-4">
              Digilekh is a platform where everyone’s story matters. We provide a space for thoughtful, meaningful writing that helps to connect readers and creators across the world. Whether you're sharing an insight, a lesson, or an experience, we give you the tools to tell your story without the distractions.
            </p>
            <p className="text-base sm:text-lg font-serif text-gray-600 mb-4">
              We believe that words have the power to transform our world, and we’re dedicated to creating a space that fosters conversation, collaboration, and learning. Through thoughtful writing, we aim to build a more connected and understanding world.
            </p>
            <p className="text-base sm:text-lg font-serif text-gray-600">
              Join us as we grow this community. Whether you’re a reader or writer, we invite you to explore, learn, and share your story with us.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 w-full">
            <img
              src={profilePlaceholder} 
              alt="About Us"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
