import React, { useState } from "react";
import Header from "./Header";
import Middle from "./Middle";
import Footer from "./Footer";
// import IntroVideo from "../assets/intro.mp4";

const Home = () => {

//   const [showVideo, setShowVideo] = useState(true);

//   const handleVideoEnd = () => {
//     setShowVideo(false);
//   };


  return (
        <div>
          <Header />
          <Middle />
          <Footer />
        </div>
  );
};
export default Home;
