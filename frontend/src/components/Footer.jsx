import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-32" src={assets.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Founded in 2014, we began as a small family workshop dedicated to making quality cane furniture. Over the years, our passion and craftsmanship helped us grow — and now, we’re bringing our creations online to reach homes everywhere.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">About us</Link>
            </li>
            <li>
              <Link to="/collection" className="hover:underline">Collections</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-6296227560</li>
            <li>contact@ghoshcanefurniture.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ghoshcanefurniture.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;