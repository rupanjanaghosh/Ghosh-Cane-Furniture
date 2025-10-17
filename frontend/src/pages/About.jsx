import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl  text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"}  />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="about_img"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            For over a decade, our family has been crafting timeless cane furniture that blends tradition with comfort. What began as a small workshop driven by passion and skill has now grown into a trusted name for handcrafted furniture that brings warmth to every home.
          </p>
          <p>
            Each piece we make carries the story of our artisans — their patience, precision, and dedication to keeping the beauty of cane craftsmanship alive. With our online presence, we’re excited to bring our creations directly to your doorstep, so you can experience the charm of handmade furniture that lasts generations.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            To blend traditional cane artistry with contemporary design — crafting furniture that’s sustainable, affordable, and made to last. We’re committed to empowering skilled artisans, reducing our environmental footprint, and creating spaces that feel as good as they look.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            by ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
