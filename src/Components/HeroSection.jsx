import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({
  backgroundImage,
  videoSrc, // pass this from parent if using video
  title = "Build Your Quotation",
  subtitle = "Want to see our photography style? Check our gallery highlights before continuing.",
  buttonText = "BUILD MY QUOTATION",
  onButtonClick,
  showButton = true,
}) => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image or Video */}
      {videoSrc ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* White Dove Overlay */}
    

      {/* Text + Button */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {title}
        </h1>
        <p className="text-base md:text-lg mb-6 max-w-xl text-white">
          {subtitle}
        </p>

        {showButton && (
          <button
            onClick={onButtonClick}
            className="relative px-8 py-3 rounded-lg text-white text-lg font-bold overflow-hidden bg-[#880808] shadow-lg transition-all duration-500 hover:shadow-[#880808]/50 hover:scale-105"
          >
            <span className="absolute inset-0 bg-white opacity-10 rounded-lg blur-md pointer-events-none animate-pulse" />
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
