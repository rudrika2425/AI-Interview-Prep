import React from 'react';
import { 
  LuBrain, 
  LuMail, 
  LuPhone, 
  LuMapPin, 
  LuTwitter, 
  LuLinkedin, 
  LuGithub, 
  LuInstagram,
  LuSparkles,
  LuTarget,
  LuBookOpen,
  LuPenTool,
  LuStar,
  LuShield,
  LuZap,
  LuHeart,
  LuArrowUp
} from 'react-icons/lu';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'AI Technology', href: '#ai' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Success Stories', href: '#testimonials' }
    ],
    resources: [
      { name: 'Interview Tips', href: '#tips' },
      { name: 'Documentation', href: '#docs' },
      { name: 'Blog', href: '#blog' },
      { name: 'Help Center', href: '#help' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press Kit', href: '#press' },
      { name: 'Contact', href: '#contact' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { icon: <LuTwitter className="w-5 h-5" />, href: '#twitter', label: 'Twitter' },
    { icon: <LuLinkedin className="w-5 h-5" />, href: '#linkedin', label: 'LinkedIn' },
    { icon: <LuGithub className="w-5 h-5" />, href: '#github', label: 'GitHub' },
    { icon: <LuInstagram className="w-5 h-5" />, href: '#instagram', label: 'Instagram' }
  ];

  const quickFeatures = [
    { icon: <LuTarget className="w-4 h-4" />, text: 'Smart Question Generation' },
    { icon: <LuBrain className="w-4 h-4" />, text: 'AI-Powered Feedback' },
    { icon: <LuSparkles className="w-4 h-4" />, text: 'Personalized Learning' },
    { icon: <LuShield className="w-4 h-4" />, text: 'Industry-Specific Prep' }
  ];

  return (
    <footer className="relative w-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">AI</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Interview Prep AI</h3>
              </div>
              
              <p className="text-gray-300 leading-relaxed max-w-md">
                Revolutionize your interview preparation with AI-powered coaching, personalized feedback, 
                and industry-specific question generation. Your success is our mission.
              </p>

              {/* Quick Features */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <LuZap className="w-4 h-4 text-yellow-400" />
                  Key Features
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {quickFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-400">
                        {feature.icon}
                      </div>
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-gray-300">
                    <LuMail className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">support@interviewprepai.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <LuPhone className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <LuMapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Product Links */}
              <div>
                <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <LuTarget className="w-4 h-4 text-blue-400" />
                  Product
                </h4>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform transition-transform"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <LuBookOpen className="w-4 h-4 text-green-400" />
                  Resources
                </h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform transition-transform"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <LuPenTool className="w-4 h-4 text-yellow-400" />
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform transition-transform"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <LuShield className="w-4 h-4 text-purple-400" />
                  Legal
                </h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:translate-x-1 transform transition-transform"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <LuSparkles className="w-6 h-6 text-yellow-400" />
                    Stay Updated
                  </h4>
                  <p className="text-gray-300">
                    Get the latest interview tips, AI features, and success stories delivered to your inbox.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm min-w-0 sm:min-w-[300px]"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2024 Interview Prep AI. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                  Made with <LuHeart className="w-3 h-3 text-red-400" /> for your success
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 border border-white/20"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="group w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                aria-label="Back to top"
              >
                <LuArrowUp className="w-5 h-5 group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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
    </footer>
  );
};

export default Footer;