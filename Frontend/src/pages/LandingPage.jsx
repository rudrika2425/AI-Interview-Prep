import React, { useState } from "react";
import HERO_IMG from "../assets/hero.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import Auth from "./Auth"

const LandingPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      
      <div className="relative w-full min-h-screen bg-[#fff8e4]">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
          
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-lg font-bold text-black">Interview Prep AI</h2>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-6 py-2 rounded-full hover:opacity-90 transition-colors"
            >
              Login / Sign Up
            </button>
          </div>
           
          {/* Auth will come here  */}
          {openModal && <Auth onClose={()=>setOpenModal(false)}/>}

          
          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left */}
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full border border-orange-300 mb-3">
                <LuSparkles /> AI Powered
              </div>
              <h1 className="text-5xl font-bold text-black mb-4 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9324] to-[#FFC94B]">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            {/* Right */}
            <div className="w-full md:w-1/2">
              <p className="text-base text-gray-800 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is
                here.
              </p>
              <button
                onClick={handleCTA}
                className="bg-black text-white text-sm px-6 py-2 rounded-full hover:bg-gray-900 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Mockup Section */}
      <div className="flex justify-center -mt-28 relative z-10">
        <img
          src={HERO_IMG}
          alt="Hero"
          className="w-[80vw] rounded-lg shadow-md"
        />
      </div>

      {/* Features Section */}
      <div className="w-full bg-[#fffcef] pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center mb-12">
            Features that make you shine
          </h2>

          {/* Top 3 Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#fffef8] p-6 rounded-xl shadow hover:shadow-lg transition border border-amber-100"
              >
                <h3 className="text-base font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom 2 Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#fffef8] p-6 rounded-xl shadow hover:shadow-lg transition border border-amber-100"
              >
                <h3 className="text-base font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm bg-gray-50 text-gray-500 text-center py-5">
        Made with ❤️ Happy Coding
      </div>
      
    </>
  );
};

export default LandingPage;
