import React, { useState } from "react";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles, LuBrain, LuTarget, LuBookOpen, LuPenTool, LuShield, LuZap, LuTrendingUp, LuUsers, LuClock, LuStar, LuCheck } from "react-icons/lu";
import Auth from "./Auth";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleGetStarted = () => {
    setOpenModal(true);
  };

  // Core functionalities from sidebar
  const coreFunctionalities = [
    {
      icon: <LuTarget className="w-8 h-8" />,
      title: "Add Interview Questions",
      description: "Create and customize your interview question sets with AI-powered suggestions tailored to your specific role and industry.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <LuBookOpen className="w-8 h-8" />,
      title: "View Your List",
      description: "Organize and manage all your interview question sets in one place with smart categorization and easy access.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <LuPenTool className="w-8 h-8" />,
      title: "Make Notes",
      description: "Take detailed notes during practice sessions and keep track of your progress with our intelligent note-taking system.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <LuStar className="w-8 h-8" />,
      title: "Pinned Important Questions",
      description: "Mark and quickly access your most challenging questions for focused practice and last-minute review.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  // AI Benefits
  const aiBenefits = [
    {
      icon: <LuBrain className="w-6 h-6" />,
      title: "Google Gemini Integration",
      description: "Powered by Google's advanced Gemini AI for accurate, contextual responses and intelligent question generation."
    },
    {
      icon: <LuZap className="w-6 h-6" />,
      title: "Real-time Analysis",
      description: "Get instant feedback on your answers with AI-powered analysis and improvement suggestions."
    },
    {
      icon: <LuTrendingUp className="w-6 h-6" />,
      title: "Adaptive Learning",
      description: "Our AI learns from your performance and adapts questions to focus on your weak areas."
    },
    {
      icon: <LuShield className="w-6 h-6" />,
      title: "Industry-Specific",
      description: "Questions tailored to your specific industry, role, and experience level for maximum relevance."
    }
  ];

  // Success Statistics
  const stats = [
    { number: "50K+", label: "Questions Generated", icon: <LuTarget className="w-5 h-5" /> },
    { number: "95%", label: "Success Rate", icon: <LuTrendingUp className="w-5 h-5" /> },
    { number: "10K+", label: "Users Helped", icon: <LuUsers className="w-5 h-5" /> },
    { number: "24/7", label: "AI Support", icon: <LuClock className="w-5 h-5" /> }
  ];

  return (
    <>
      <div className={`relative transition-all duration-300 ${openModal ? 'blur-sm' : ''}`}>
        {/* Hero Section with Enhanced Gradient */}
        <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8 pb-16">
            {/* Enhanced Header */}
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">AI</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Interview Prep AI
                </h2>
              </div>
              <button
                onClick={() => setOpenModal(true)}
                className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Login / Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Enhanced Hero Content */}
            <div className="flex flex-col lg:flex-row items-center gap-16 min-h-[500px]">
              {/* Left Content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 bg-blue-100 px-4 py-2 rounded-full border border-blue-200 shadow-sm">
                  <LuSparkles className="animate-spin" /> 
                  <span>Powered by Google Gemini AI</span>
                </div>
                
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gray-800">Ace Interviews with</span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                    AI-Powered
                  </span><br />
                  <span className="text-gray-800">Learning</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Master your interviews with personalized AI coaching, smart question generation, 
                  and real-time feedback. From preparation to success — your complete interview toolkit.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleGetStarted}
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Get Started Free</span>
                    <LuZap className="w-5 h-5 group-hover:animate-pulse" />
                  </button>
                  
                  <button className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                    <LuBookOpen className="w-5 h-5" />
                    <span>Learn More</span>
                  </button>
                </div>
              </div>

              {/* Right Content - Statistics */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/20">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                          {stat.icon}
                        </div>
                        <div className="text-3xl font-bold text-gray-800">{stat.number}</div>
                      </div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Functionalities Section */}
        <div className="w-full bg-gradient-to-br from-white to-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Powerful Features for Interview Success
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive platform provides everything you need to excel in your interviews, 
                from question generation to performance tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreFunctionalities.map((func, index) => (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-br ${func.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {func.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{func.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{func.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Benefits Section */}
        <div className="w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 bg-blue-900/30 px-4 py-2 rounded-full border border-blue-700/30 mb-6">
                <LuBrain className="animate-pulse" />
                <span>Google Gemini AI Integration</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose Our AI-Powered Platform?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the power of Google's advanced Gemini AI technology, 
                delivering unmatched accuracy and personalized learning experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiBenefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Features That Make You Shine
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive tools designed to boost your interview confidence and success rate.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-blue-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    <LuCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {APP_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-blue-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                    <LuCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful candidates who've transformed their interview performance with our AI-powered platform.
            </p>
            <button 
              onClick={handleGetStarted}
              className="bg-white text-purple-600 font-bold px-12 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              <span>Start Your Journey</span>
              <LuZap className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      {openModal && <Auth onClose={() => setOpenModal(false)} />}

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Home;