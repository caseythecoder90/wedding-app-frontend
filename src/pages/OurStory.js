import React from 'react';

function OurStory() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 bg-primary-light/30 dark:bg-primary-dark/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-script text-5xl text-primary dark:text-primary-light mb-6">Our Story</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              How we met, fell in love, and decided to spend our lives together.
            </p>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* How We Met */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center text-white shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="font-display text-2xl text-primary dark:text-primary-light">How We Met</h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">2021</div>
                </div>
              </div>
              
              <div className="ml-16 bg-white dark:bg-dark-card shadow-md rounded-lg p-6 transition-colors duration-200">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  This is a placeholder for your love story. You can describe how you met, 
                  perhaps it was through mutual friends, at work, or an unexpected encounter.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Share the memorable moments and the little details that made your first meeting special.
                </p>
                
                {/* Optional Image */}
                <div className="mt-6 rounded-md overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1587944538404-f30b04f65517?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="First date" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            
            {/* Our Journey */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-secondary dark:bg-secondary-dark flex items-center justify-center text-white shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="font-display text-2xl text-secondary dark:text-secondary-light">Our Journey</h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">2021-2025</div>
                </div>
              </div>
              
              <div className="ml-16 bg-white dark:bg-dark-card shadow-md rounded-lg p-6 transition-colors duration-200">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Here you can talk about the journey of your relationship - the significant milestones, 
                  adventures you've shared, and how your love has grown over time.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  This is the perfect place to share special moments and memories that have shaped your relationship.
                </p>
                
                {/* Optional Image */}
                <div className="mt-6 rounded-md overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1538383305279-d1979515988a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="Our journey" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            
            {/* The Proposal */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-accent dark:bg-accent-dark flex items-center justify-center text-white shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="font-display text-2xl text-accent-dark dark:text-accent">The Proposal</h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">2024</div>
                </div>
              </div>
              
              <div className="ml-16 bg-white dark:bg-dark-card shadow-md rounded-lg p-6 transition-colors duration-200">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Describe the proposal - where it happened, how it was planned, and the emotions of that special moment.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Share the details of this meaningful day and what made it perfect for both of you.
                </p>
                
                {/* Optional Image */}
                <div className="mt-6 rounded-md overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="The proposal" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="py-16 bg-primary-light/30 dark:bg-primary-dark/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl italic font-serif text-gray-700 dark:text-gray-300">
            "And suddenly all the love songs were about you."
          </blockquote>
          <div className="mt-4 font-script text-xl text-primary dark:text-primary-light">
            — Casey & Yasmim
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurStory;