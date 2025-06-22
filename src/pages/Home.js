import React from 'react';
import { Link } from 'react-router-dom';
import EngagementGallery from '../components/common/EngagementGallery';

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
        {/* Background Image - Placeholder Hero Photo */}
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
        <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col justify-end pb-32 h-full">
          <h1 className="font-script text-6xl md:text-8xl text-white mb-6 drop-shadow-lg">
            Casey & Yasmim
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-6 font-light drop-shadow-md">
            We're getting married!
          </p>
          <div className="text-xl md:text-2xl text-white font-light mb-8 drop-shadow-md">
            April 10, 2026 • Punta Cana, Dominican Republic
          </div>
          <Link 
            to="/rsvp" 
            className="inline-block bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            RSVP Now
          </Link>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-accent-light/50 dark:bg-dark-secondary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-script text-5xl text-primary-dark dark:text-primary-light mb-16 transition-colors duration-200">
              Counting Down
            </h2>
            
            <div className="bg-white dark:bg-dark-card rounded-2xl p-12 shadow-xl inline-block transition-colors duration-200 max-w-md mx-auto">
              <div className="text-7xl font-display text-primary-dark dark:text-primary-light mb-6 transition-colors duration-200">
                {diffDays}
              </div>
              <div className="text-2xl text-gray-600 dark:text-gray-300 transition-colors duration-200 font-light">
                days until we say "I do"
              </div>
              
              {/* Optional: Add this for enhanced countdown later */}
              {/* 
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{hours}</div>
                  <div className="text-sm text-gray-500">Hours</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{minutes}</div>
                  <div className="text-sm text-gray-500">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{seconds}</div>
                  <div className="text-sm text-gray-500">Seconds</div>
                </div>
              </div>
              */}
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-12 text-lg leading-relaxed transition-colors duration-200">
              We can't wait to celebrate our special day with friends and family in beautiful Punta Cana.
              Join us for a destination wedding filled with love, laughter, and unforgettable memories.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement Photo Gallery */}
      <EngagementGallery />
      
      {/* Call to Action Section */}
      <section className="py-16 bg-primary/10 dark:bg-primary-dark/20 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-script text-4xl text-primary-dark dark:text-primary-light mb-6">
            Join Our Celebration
          </h3>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            We would be honored to have you share in our joy. Please let us know if you can join us in paradise.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <Link 
              to="/rsvp" 
              className="inline-block bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              RSVP Now
            </Link>
            <Link 
              to="/venue" 
              className="inline-block bg-white dark:bg-dark-card border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
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