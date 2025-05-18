import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // Calculate days until wedding
  const weddingDate = new Date('April 10, 2026');
  const today = new Date();
  const diffTime = weddingDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return (
    <div>
      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            backgroundPosition: "center bottom"
          }}
        >
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-primary-light/40 dark:bg-primary-dark/60 transition-colors duration-200"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          {/* Circle Profile Image */}
          <div className="relative mx-auto mb-8 w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl transition-colors duration-200">
            {/* Replace with your actual image */}
            <img 
              src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
              alt="Casey and Yasmim" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h1 className="font-script text-5xl md:text-7xl text-white mb-6 text-shadow">
            Casey & Yasmim
          </h1>
          <p className="text-xl md:text-2xl text-white mb-6 font-light">
            We're getting married!
          </p>
          <div className="text-xl md:text-2xl text-white font-light mb-8">
            April 10, 2026 • Punta Cana, Dominican Republic
          </div>
          <Link 
            to="/rsvp" 
            className="inline-block bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium px-8 py-3 rounded-md shadow-md transition-colors duration-200"
          >
            RSVP Now
          </Link>
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-white dark:bg-dark-primary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-script text-4xl text-primary-dark dark:text-primary-light mb-12 transition-colors duration-200">
              Counting Down
            </h2>
            
            <div className="bg-accent-light dark:bg-dark-card rounded-lg p-8 shadow-md inline-block transition-colors duration-200">
              <div className="text-6xl font-display text-primary-dark dark:text-primary-light mb-4 transition-colors duration-200">
                {diffDays}
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200">
                days until we say "I do"
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-12 transition-colors duration-200">
              We can't wait to celebrate our special day with friends and family in beautiful Punta Cana.
              Please check back soon for more details about our destination wedding.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 bg-accent-light dark:bg-dark-secondary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Wedding */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden transition-colors duration-200">
              <div className="h-40 bg-primary-light dark:bg-primary-dark/40 flex items-center justify-center transition-colors duration-200">
                <svg className="w-20 h-20 text-primary dark:text-primary-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-200">Wedding Day</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  Join us for our ceremony and reception on April 10, 2026, in beautiful Punta Cana.
                </p>
              </div>
            </div>
            
            {/* Card 2: Travel */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden transition-colors duration-200">
              <div className="h-40 bg-secondary-light dark:bg-secondary-dark/40 flex items-center justify-center transition-colors duration-200">
                <svg className="w-20 h-20 text-secondary-dark dark:text-secondary-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-200">Destination</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  Information about travel, accommodations, and what to expect at our destination wedding.
                </p>
              </div>
            </div>
            
            {/* Card 3: RSVP */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden transition-colors duration-200">
              <div className="h-40 bg-accent dark:bg-accent-dark/40 flex items-center justify-center transition-colors duration-200">
                <svg className="w-20 h-20 text-accent-dark dark:text-accent-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-200">RSVP</h3>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  Please confirm your attendance by February 10, 2026. We look forward to celebrating with you!
                </p>
                <Link 
                  to="/rsvp" 
                  className="inline-block text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white font-medium mt-4 transition-colors duration-200"
                >
                  Respond now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Add this CSS class for text shadow
const style = document.createElement('style');
style.textContent = `
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
`;
document.head.appendChild(style);

export default Home;