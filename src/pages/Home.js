import React from 'react';
import { Link } from 'react-router-dom';
import EngagementGallery from '../components/common/EngagementGallery';
import './Home.css';

function Home() {
  // Calculate days until wedding
  const weddingDate = new Date('April 10, 2026');
  const today = new Date();
  const diffTime = weddingDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return (
    <div>
      {/* Hero Section with Full-Width Engagement Photo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Cloudinary Hero Photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dwdaehpml/image/upload/w_2000,q_auto,f_auto/hero-image_zfwta3')",
            backgroundPosition: "center center"
          }}
        >
          {/* Semi-transparent overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-colors duration-200"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col justify-end hero-content h-full">
          <h1 className="font-script text-4xl sm:text-6xl md:text-8xl text-white mb-4 sm:mb-6 drop-shadow-lg animate-romantic-fade">
            Casey & Yasmim
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white mb-4 sm:mb-6 font-light drop-shadow-md animate-romantic-fade-delayed">
            We're getting married!
          </p>
          <div className="text-lg sm:text-xl md:text-2xl text-white font-light mb-6 sm:mb-8 drop-shadow-md animate-romantic-fade-delayed-2">
            April 10, 2026 • Punta Cana, Dominican Republic
          </div>
          <Link 
            to="/rsvp" 
            className="inline-block bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-romantic-fade-delayed-3"
          >
            RSVP Now
          </Link>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-romantic-fade-delayed-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-white dark:bg-dark-primary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-script text-4xl text-primary-dark dark:text-primary-light mb-12 transition-colors duration-200 animate-section-fade">
              Counting Down
            </h2>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 inline-block transition-colors duration-200 animate-countdown-appear">
              <div className="text-6xl font-display text-primary-dark dark:text-primary-light mb-4 transition-colors duration-200">
                {diffDays}
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200">
                days until we say "I do"
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-12 transition-colors duration-200 animate-section-fade-delayed">
              We can't wait to celebrate our special day with friends and family in beautiful Punta Cana.
              Please check back soon for more details about our destination wedding.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement Gallery Section */}
      <EngagementGallery />

      {/* Info Cards Section */}
     <section className="py-16 bg-primary/10 dark:bg-primary-dark/20 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-script text-4xl text-primary-dark dark:text-primary-light mb-6">
            Join Our Celebration
          </h3>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            We would be honored to have you share in our joy. Please let us know if you can join us in paradise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mobile-button-stack">
            <Link 
              to="/rsvp" 
              className="w-full sm:w-auto inline-block bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
            >
              RSVP Now
            </Link>
            <Link 
              to="/venue" 
              className="w-full sm:w-auto inline-block bg-white dark:bg-dark-card border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;