import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiFacebook, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-white text-lg font-semibold">Blog App</h3>
            <p className="text-sm">Share your thoughts, connect with others, and explore new ideas.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="https://maheshlangote.online" target='#' className="hover:text-white transition-colors duration-300">About</Link></li>
               <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-white transition-colors duration-300">Cookie Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/Mahesh-Langote" target="#" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                <FiGithub className="w-6 h-6" />
              </a>
               <a href="https://www.linkedin.com/in/mahesh-langote" target="#" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                <FiLinkedin className="w-6 h-6" />
              </a>
             </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {currentYear} Blog App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;