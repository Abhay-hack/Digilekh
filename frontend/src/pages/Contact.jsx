import React from "react";
import Header from "./Header";
import Footer from "./Footer"

const Contact = () => {
  return (
    <div className="container mx-auto py-6">
      <Header />
      <h1 className="text-4xl font-bold text-center">Contact Us</h1>
      <p className="text-lg text-gray-700 mt-4">
        You can reach us at <strong>contact@digilekh.com</strong>. We'd love to hear from you!
      </p>
      <Footer/>
    </div>
  );
};

export default Contact;
