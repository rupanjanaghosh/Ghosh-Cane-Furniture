import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom"; // for navigation

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 relative w-full h-[80vh]">
      {/* Left Side Text */}
      <div className="absolute sm:relative inset-0 sm:inset-auto w-full sm:w-1/2 flex flex-col justify-center px-6 sm:px-16 text-[#414141]">
        {/* One-of-a-kind */}
        <p className="font-serif italic font-medium font-semibold text-[#642b15] text-base sm:text-lg mb-2">
          one-of-a-kind
        </p>

        {/* Handmade */}
        <h2 className="font-serif text-[#873e23] text-4xl sm:text-5xl font-semibold mb-1 leading-tight">
          HANDMADE
        </h2>

        {/* Cane */}
        <h1 className="prata-regular text-[#df8340] text-5xl sm:text-6xl font-bold mb-2 leading-tight">
          CANE
        </h1>

        {/* Furniture */}
        <p className="font-serif text-[#642b15] italic font-semibold text-xl sm:text-2xl mb-4">
          FURNITURE
        </p>

       {/* Small Shop Now Button */}
        <div className="mt-2">
          <Link
            to="/collections"
            className="bg-[#873e23] text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-700 transition w-max"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
      {/* Right Side Image */}
      <img
        className="w-full sm:w-1/2 h-full object-cover object-center"
        src={assets.hero}
        alt="hero_img"
      />
    </div>
  );
};

export default Hero;
