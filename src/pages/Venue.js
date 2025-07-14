import React from 'react';

function Venue() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary transition-colors duration-200">
      {/* Hero Section with Ocean/Beach */}
      <section className="relative h-screen overflow-hidden">
        {/* Beautiful ocean/beach background image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
            alt="Beautiful tropical ocean beach"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/20 dark:bg-primary-dark/30 transition-colors duration-200"></div>
        </div>
        
        {/* Animated effects overlay */}
        <div className="absolute inset-0">
          {/* Animated wave overlay */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-24"
              style={{ animation: 'wave 10s ease-in-out infinite' }}
            >
              <path
                d="M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z"
                fill="rgba(255,255,255,0.3)"
              />
            </svg>
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-center px-4 z-10">
            <h1 className="font-script text-6xl md:text-8xl text-white mb-6 text-shadow animate-fade-in">
              Our Paradise
            </h1>
            <p className="text-xl md:text-3xl text-white font-light max-w-3xl mx-auto text-shadow animate-fade-in-delayed">
              Join us in beautiful Punta Cana, Dominican Republic
            </p>
            <div className="mt-8 animate-fade-in-delayed-2">
              <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-8 py-4">
                <p className="text-white text-lg font-medium">April 10th, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resort Information */}
      <section className="py-20 bg-gray-50 dark:bg-dark-secondary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-script text-5xl text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-200">
              Grand Bavaro Princess
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-200">
              A luxurious all-inclusive resort nestled on the pristine shores of Bavaro Beach, 
              where we'll be celebrating our special day. We (Yasmim & Casey) will be staying 
              April 8th - 13th and would be thrilled to spend this time with you!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Resort Image */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Grand Bavaro Princess Resort" 
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            {/* Resort Details */}
            <div className="order-1 lg:order-2">
              <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 transition-colors duration-200">
                <h3 className="font-display text-2xl text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-200">
                  About Our Resort
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-200">
                  Located on the world-renowned Bavaro Beach, the Grand Bavaro Princess boasts 
                  <span className="font-semibold text-primary dark:text-primary-light"> 1,290 spacious suites</span>, 
                  <span className="font-semibold text-primary dark:text-primary-light"> 11 themed restaurants</span>, 
                  and <span className="font-semibold text-primary dark:text-primary-light"> 15 bars</span> set within 
                  an ecological complex that respects the native vegetation and wildlife.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center mr-4 transition-colors duration-200">
                      <svg className="w-5 h-5 text-primary-dark dark:text-primary-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200">Prime Location</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">25 minutes from Punta Cana Airport</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-accent-light dark:bg-accent-dark rounded-full flex items-center justify-center mr-4 transition-colors duration-200">
                      <svg className="w-5 h-5 text-accent-dark dark:text-accent-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200">All-Inclusive Experience</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Meals, drinks, and activities included</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-secondary-light dark:bg-secondary-dark rounded-full flex items-center justify-center mr-4 transition-colors duration-200">
                      <svg className="w-5 h-5 text-secondary-dark dark:text-secondary-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200">Pristine Bavaro Beach</p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm transition-colors duration-200">Crystal-clear waters & white sand</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Wedding Day Schedule */}
      <section className="py-20 bg-primary-light/30 dark:bg-dark-secondary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-script text-5xl text-primary dark:text-primary-light text-center mb-16 transition-colors duration-200">
            Our Wedding Day
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ceremony Card */}
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700">
                  <img 
                    src="https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1752463079/wedding-ceremony_g0qnwj.jpg" 
                    alt="Beach wedding ceremony" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-6 z-10">
                  <h3 className="font-script text-3xl text-white mb-1">Ceremony</h3>
                  <p className="text-white text-lg opacity-90">4:00 PM</p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-200">
                  Join us as we exchange vows in an intimate beachfront ceremony overlooking 
                  the crystal-clear waters of the Caribbean Sea. The ceremony will take place 
                  on the resort's pristine beach with the gentle sound of waves as our soundtrack.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    <svg className="w-5 h-5 text-primary dark:text-primary-light mr-3 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>4:00 PM - 4:30 PM</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    <svg className="w-5 h-5 text-primary dark:text-primary-light mr-3 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>Beachfront Location</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    <svg className="w-5 h-5 text-primary dark:text-primary-light mr-3 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>Beach Formal Attire</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reception Card */}
            <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Beach reception dinner" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-6 z-10">
                  <h3 className="font-script text-3xl text-white mb-1">Reception</h3>
                  <p className="text-white text-lg opacity-90">6:00 - 9:00 PM</p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-200">
                  Celebrate with us during our romantic reception! We're planning either an 
                  intimate private dinner on the beach under the stars or a semi-private 
                  dinner in one of the resort's exquisite restaurants. Stay tuned for final details!
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    <svg className="w-5 h-5 text-secondary dark:text-secondary-light mr-3 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>6:00 PM - 9:00 PM</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    <svg className="w-5 h-5 text-secondary dark:text-secondary-light mr-3 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                    <span>Dinner & Dancing</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    <svg className="w-5 h-5 text-secondary dark:text-secondary-light mr-3 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span>Celebration Under the Stars</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stay With Us Section */}
      <section className="py-20 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-script text-5xl text-primary dark:text-primary-light mb-8 transition-colors duration-200">
            Come Celebrate With Us
          </h2>
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 transition-colors duration-200">
            <div className="mb-8">
              <h3 className="font-display text-2xl text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-200">
                We'll Be There April 8th - 13th
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-200">
                While our wedding is on <strong className="text-primary dark:text-primary-light">April 10th</strong>, 
                we're making this a true celebration by staying at the resort for several days. 
                We would be absolutely thrilled if you join us for any part of this time!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                  <svg className="w-8 h-8 text-primary-dark dark:text-primary-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200">Your Timeline</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">Stay for any length that works for you</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-light dark:bg-secondary-dark rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                  <svg className="w-8 h-8 text-secondary-dark dark:text-secondary-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200">Quality Time</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">Pool days, beach walks, and memories</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-light dark:bg-accent-dark rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                  <svg className="w-8 h-8 text-accent-dark dark:text-accent-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <h4 className="font-medium text-gray-800 dark:text-gray-100 transition-colors duration-200">Celebration</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200">Extended wedding festivities</p>
              </div>
            </div>
            
            <div className="bg-primary-light/10 dark:bg-primary-dark/20 rounded-lg p-6 transition-colors duration-200">
              <p className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-200">
                💙 Whether you come just for the wedding day or stay the whole time with us, 
                we're just excited to celebrate this special moment with the people we love most!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Booking Information */}
      <section className="py-20 bg-gray-800 dark:bg-gray-900 text-white transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-script text-5xl mb-6 transition-colors duration-200">Plan Your Stay</h2>
            <p className="text-xl text-gray-300 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-200">
              We're not reserving a block of rooms, giving you the freedom to choose your perfect 
              accommodation and stay for any length of time you desire. We'll be there April 8th - 13th 
              and would love to spend as much time as possible celebrating with you!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Booking Details */}
            <div className="bg-gray-700 dark:bg-gray-800 rounded-2xl p-8 transition-colors duration-200">
              <h3 className="font-display text-2xl text-white mb-6">Booking Information</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-primary-light mb-2">Resort Contact</h4>
                  <p className="text-gray-200 dark:text-gray-300 transition-colors duration-200">Grand Bavaro Princess</p>
                  <p className="text-gray-200 dark:text-gray-300 transition-colors duration-200">Playa Bavaro, Punta Cana</p>
                  <p className="text-gray-200 dark:text-gray-300 transition-colors duration-200">Dominican Republic</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary-light mb-2">Direct Booking</h4>
                  <a 
                    href="https://www.princess-hotels.com/en/punta-cana/grand-bavaro-princess/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Book at Grand Bavaro Princess
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-primary-light mb-2">Our Stay & Suggestions</h4>
                  <p className="text-gray-200 dark:text-gray-300 transition-colors duration-200">Yasmim & Casey: April 8th - 13th</p>
                  <p className="text-gray-200 dark:text-gray-300 transition-colors duration-200">Wedding Day: April 10th, 2026</p>
                  <p className="text-gray-200 dark:text-gray-300 text-sm mt-2 italic transition-colors duration-200">
                    Stay for any duration that works for you - even just the wedding day!
                  </p>
                </div>
              </div>
            </div>
            
            {/* Travel Tips */}
            <div className="bg-gray-700 dark:bg-gray-800 rounded-2xl p-8 transition-colors duration-200">
              <h3 className="font-display text-2xl text-white mb-6">Travel Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Airport</p>
                    <p className="text-gray-300 dark:text-gray-400 text-sm transition-colors duration-200">Fly into Punta Cana International Airport (PUJ) - only 25 minutes from the resort</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Documentation</p>
                    <p className="text-gray-300 dark:text-gray-400 text-sm transition-colors duration-200">US citizens need a valid passport. Tourist card will be provided upon arrival</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Weather</p>
                    <p className="text-gray-300 dark:text-gray-400 text-sm transition-colors duration-200">April averages 82°F with sunshine - perfect beach weather!</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-medium">Currency</p>
                    <p className="text-gray-300 dark:text-gray-400 text-sm transition-colors duration-200">Dominican Peso (DOP) or US Dollar widely accepted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map section */}
          <div className="mt-16 bg-gray-700 dark:bg-gray-800 rounded-2xl p-8 transition-colors duration-200">
            <h3 className="font-display text-2xl text-white mb-6 text-center">Resort Location</h3>
            <div className="bg-gray-600 dark:bg-gray-700 rounded-xl p-4 text-center transition-colors duration-200">
              <p className="text-gray-300 dark:text-gray-400 mb-4 transition-colors duration-200">
                Grand Bavaro Princess is located on the famous Bavaro Beach in Punta Cana, 
                Dominican Republic - one of the world's most beautiful beaches.
              </p>
              <a 
                href="https://maps.google.com/?q=Grand+Bavaro+Princess+Punta+Cana"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-light hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        @keyframes waves {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(-10px) translateY(-5px); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(-20px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-delayed {
          animation: fade-in 1s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delayed-2 {
          animation: fade-in 1s ease-out 1s forwards;
          opacity: 0;
        }
        
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Venue;