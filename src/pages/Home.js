import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import EngagementGallery from '../components/common/EngagementGallery';
import './Home.css';

function Home() {
  // Wedding ceremony: April 10, 2026 at 4:30 PM Dominican Republic time (UTC-4)
  // useMemo ensures this date object is only created once, not on every render
  const weddingDateTime = useMemo(() => new Date('2026-04-10T16:30:00-04:00'), []);
  
  const [timeLeft, setTimeLeft] = useState({
    isMarried: false,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = weddingDateTime.getTime() - now;

      if (difference > 0) {
        // Before wedding - show countdown
        setTimeLeft({
          isMarried: false,
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        // After wedding - show time married
        const timeSinceWedding = now - weddingDateTime.getTime();
        setTimeLeft({
          isMarried: true,
          days: Math.floor(timeSinceWedding / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeSinceWedding % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeSinceWedding % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeSinceWedding % (1000 * 60)) / 1000)
        });
      }
    };

    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [weddingDateTime]);
  
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
              {timeLeft.isMarried ? 'Happily Married' : 'Counting Down'}
            </h2>
            
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto transition-colors duration-200 animate-countdown-appear">
              {/* Countdown Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display text-primary-dark dark:text-primary-light mb-2 transition-colors duration-200">
                    {timeLeft.days}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    Days
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display text-primary-dark dark:text-primary-light mb-2 transition-colors duration-200">
                    {timeLeft.hours}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    Hours
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display text-primary-dark dark:text-primary-light mb-2 transition-colors duration-200">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    Minutes
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-display text-primary-dark dark:text-primary-light mb-2 transition-colors duration-200">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    Seconds
                  </div>
                </div>
              </div>
              
              {/* Ceremony Details */}
              <div className="text-center border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mb-2">
                  {timeLeft.isMarried ? 'since we said "I do"' : 'until we say "I do"'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {timeLeft.isMarried 
                    ? 'Married: April 10, 2026 at 4:30 PM (Dominican Republic time)' 
                    : 'Ceremony: April 10, 2026 at 4:30 PM (Dominican Republic time)'
                  }
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-12 transition-colors duration-200 animate-section-fade-delayed">
              Join us for our dream destination wedding in beautiful Punta Cana! Browse our story, check out the venue details, and RSVP today.
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