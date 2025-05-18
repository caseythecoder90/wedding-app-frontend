import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-accent-light dark:bg-dark-secondary py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="font-script text-2xl text-primary dark:text-primary-light mb-4">
              Casey & Yasmim
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center md:text-left">
              We can't wait to celebrate with you in Punta Cana!
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-4">
              <Link to="/our-story" className="text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white transition-colors">
                Our Story
              </Link>
              <Link to="/venue" className="text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white transition-colors">
                Venue
              </Link>
              <Link to="/rsvp" className="text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white transition-colors">
                RSVP
              </Link>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">
              &copy; {currentYear} Casey & Yasmim's Wedding
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;