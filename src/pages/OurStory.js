// src/pages/OurStory.js - Interactive Timeline Version
import React, { useState, useEffect } from 'react';

function OurStory() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timeline data
  const timelinePoints = [
    {
      id: 1,
      date: "August 2023",
      title: "Summer of 2023",
      story: "We met in the summer of 2023 while Casey was interning in Atlanta and finishing his final semester at Texas A&M. With just two weeks left before he returned to Texas, neither of us expected to find something so special.",
      type: "text-only"
    },
    {
      id: 2,
      date: "August 17, 2023",
      title: "Our Anniversary",
      story: "Our first official date in Buckhead at Velvet Taco. Yasmim jokes that Casey made her uncomfortable with how he was looking at her - he just couldn't believe how beautiful she was.",
      type: "text-only"
    },
    {
      id: 3,
      date: "October 2023",
      title: "Making It Official",
      story: "Casey visited Atlanta in early October, and after amazing few days together, we knew this was something special. Long distance couldn't stop what we had.",
      type: "photo",
      photos: [
        "https://via.placeholder.com/600x400/91C3E5/ffffff?text=October+Visit+Photos",
        "https://via.placeholder.com/600x400/FFC2AE/ffffff?text=Becoming+Official"
      ]
    },
    {
      id: 4,
      date: "January 2024",
      title: "Starting Our Life Together",
      story: "Casey graduated and moved to Atlanta full-time with Visa. We decided to take the next step and moved in together in Midtown - our first home as a couple.",
      type: "photo",
      photos: [
        "https://via.placeholder.com/600x400/C9E4DE/ffffff?text=Moving+In+Together",
        "https://via.placeholder.com/600x400/91C3E5/ffffff?text=Midtown+Apartment"
      ]
    },
    {
      id: 5,
      date: "May - July 2024",
      title: "Making Memories",
      story: "From meeting Casey's parents in Florida to hiking and camping in Rocky Mountain National Park, we discovered we're the perfect adventure team. Yasmim supported Casey's Longs Peak attempt, even with that 2am drop-off!",
      type: "photo",
      photos: [
        "https://via.placeholder.com/600x400/FFC2AE/ffffff?text=Florida+Family+Visit",
        "https://via.placeholder.com/600x400/91C3E5/ffffff?text=Colorado+Adventures",
        "https://via.placeholder.com/600x400/C9E4DE/ffffff?text=Rocky+Mountain+Hiking"
      ]
    },
    {
      id: 6,
      date: "December 2024",
      title: "The Perfect Moment",
      story: "After a stormy day in Rio, the clouds cleared just as we reached the top of Sugar Loaf Mountain. As the sun set over Copacabana, Casey proposed with the most breathtaking view in the world.",
      type: "photo",
      photos: [
        "https://via.placeholder.com/600x400/91C3E5/ffffff?text=Sugar+Loaf+Proposal",
        "https://via.placeholder.com/600x400/FFC2AE/ffffff?text=Rio+Sunset",
        "https://via.placeholder.com/600x400/C9E4DE/ffffff?text=Brazil+Adventures"
      ]
    },
    {
      id: 7,
      date: "2025 - Present",
      title: "Planning Our Forever",
      story: "Now engaged and building our future together in our new apartment, planning our Punta Cana wedding where both our families can celebrate with us.",
      type: "photo",
      photos: [
        "https://via.placeholder.com/600x400/91C3E5/ffffff?text=Engaged+Life",
        "https://via.placeholder.com/600x400/FFC2AE/ffffff?text=Wedding+Planning"
      ]
    }
  ];

  const scrollToSection = (index) => {
    const element = document.getElementById(`timeline-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSection(index);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-primary transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 dark:from-primary-dark/20 dark:to-secondary-dark/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-script text-6xl text-primary dark:text-primary-light mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              How we met, fell in love, and decided to spend our lives together.
            </p>
            <div className="flex justify-center">
              <div className="bg-white dark:bg-dark-card rounded-full px-6 py-2 shadow-md">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Click timeline points to explore our journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Timeline Navigation */}
          <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
            <div className="flex flex-col space-y-4">
              {timelinePoints.map((point, index) => (
                <button
                  key={point.id}
                  onClick={() => scrollToSection(index)}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
                    activeSection === index
                      ? 'bg-primary border-primary dark:bg-primary-light dark:border-primary-light'
                      : 'bg-white border-gray-300 dark:bg-dark-card dark:border-gray-600'
                  }`}
                  aria-label={`Go to ${point.title}`}
                />
              ))}
              {/* Connecting line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600 transform -translate-x-1/2 -z-10" />
            </div>
          </div>

          {/* Timeline Content */}
          <div className="space-y-24">
            {timelinePoints.map((point, index) => (
              <div
                key={point.id}
                id={`timeline-${index}`}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  {/* Date Badge */}
                  <div className="inline-block">
                    <span className="bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary-light px-4 py-2 rounded-full text-sm font-medium">
                      {point.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-script text-4xl text-primary dark:text-primary-light">
                    {point.title}
                  </h2>

                  {/* Story */}
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {point.story}
                  </p>

                  {/* Text-only decorative element for first two sections */}
                  {point.type === 'text-only' && (
                    <div className="pt-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-secondary"></div>
                        <svg className="w-6 h-6 text-primary dark:text-primary-light" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-secondary to-primary"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual Side */}
                <div className="flex-1">
                  {point.type === 'text-only' ? (
                    // Beautiful typography design for text-only sections
                    <div className="bg-gradient-to-br from-accent-light/50 to-primary-light/30 dark:from-dark-card dark:to-primary-dark/20 rounded-2xl p-8 text-center">
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-primary/20 dark:bg-primary-light/20 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-primary dark:text-primary-light" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="font-script text-2xl text-primary dark:text-primary-light">
                          "The beginning of our forever"
                        </p>
                        <div className="flex justify-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                          <div className="w-2 h-2 rounded-full bg-secondary/40"></div>
                          <div className="w-2 h-2 rounded-full bg-accent/40"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Photo gallery for photo sections
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {point.photos.map((photo, photoIndex) => (
                          <div
                            key={photoIndex}
                            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                          >
                            <img
                              src={photo}
                              alt={`${point.title} memory ${photoIndex + 1}`}
                              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center italic">
                        Photos coming soon - Yasmim's approval pending! 😄
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/10 dark:to-secondary-dark/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-script text-4xl text-primary dark:text-primary-light mb-6">
            Our Adventure Continues
          </h3>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            From a chance meeting in Atlanta to planning our dream wedding in Punta Cana, 
            our love story is just beginning. We can't wait to celebrate with all of you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/rsvp"
              className="inline-block bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              RSVP to Our Wedding
            </a>
            <a
              href="/venue"
              className="inline-block bg-white dark:bg-dark-card border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Learn About Punta Cana
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurStory;