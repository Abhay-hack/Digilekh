import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IntroVideo from "../assets/intro-video.mp4"; // Path to your video file

const VideoIntro = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const navigate = useNavigate();

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setTimeout(() => navigate("/home"), 500); // Redirect after 0.5 seconds
  };

  const handleSkip = () => {
    navigate("/home"); // Skip to the homepage
  };

  useEffect(() => {
    if (videoEnded) {
      navigate("/home");
    }
  }, [videoEnded, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Video Section */}
      <video
        className="w-full h-full object-cover"
        src={IntroVideo}
        autoPlay
        muted
        onEnded={handleVideoEnd}
      ></video>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg hover:bg-gray-200 transition"
      >
        Skip
      </button>
    </div>
  );
};

export default VideoIntro;
