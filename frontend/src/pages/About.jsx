import React from "react";
import Header from "./Header";
import Footer from "./Footer"

const About = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-6">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
        <p className="text-lg text-gray-700 mt-4">
          Welcome to Digilekh! We share insightful blogs and stories about various topics. Our goal is to provide readers with valuable content and foster a community of knowledge sharing.
        </p>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
