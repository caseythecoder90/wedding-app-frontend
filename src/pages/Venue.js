import React from 'react';

function Venue() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-96" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1578439231583-9eca0a363860?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')"
      }}>
        <div className="absolute inset-0 bg-primary/30 dark:bg-primary-dark/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-script text-5xl text-white mb-6 text-shadow">
              Our Destination
            </h1>
            <p className="text-2xl text-white font-light max-w-2xl mx-auto text-shadow">
              Join us in beautiful Punta Cana for our celebration of love
            </p>
          </div>
        </div>
      </section>
      
      {/* Venue Details */}
      <section className="py-16 bg-white dark:bg-dark-primary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
            {/* Image Column */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                  alt="Wedding resort in Punta Cana" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Content Column */}
            <div className="md:w-1/2">
              <h2 className="font-display text-3xl text-primary dark:text-primary-light mb-6">
                The Resort
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We're thrilled to be celebrating our special day at the beautiful 
                [Resort Name] in Punta Cana, Dominican Republic. This tropical paradise 
                offers pristine beaches, crystal-clear waters, and amazing amenities 
                that will make our wedding weekend unforgettable.
              </p>
              <div className="bg-primary-light dark:bg-dark-card rounded-lg p-6 shadow-md transition-colors duration-200">
                <h3 className="font-medium text-primary-dark dark:text-primary-light text-lg mb-3">
                  Resort Address
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  [Resort Name]<br />
                  Punta Cana, Dominican Republic
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white transition-colors"
                >
                  <span>View on Google Maps</span>
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Schedule */}
      <section className="py-16 bg-accent-light/50 dark:bg-dark-secondary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-script text-4xl text-primary dark:text-primary-light text-center mb-12">
            Wedding Day Schedule
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ceremony Card */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden transition-colors duration-200">
              <div className="h-48 bg-primary-light dark:bg-primary-dark/40 flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="text-4xl font-script text-primary-dark dark:text-white mb-2">Ceremony</div>
                  <div className="text-xl font-light text-gray-700 dark:text-gray-200">April 10, 2026</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-6 w-6 text-primary dark:text-primary-light mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">3:00 PM - 4:00 PM</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our wedding ceremony will take place on the beach with the beautiful 
                  Caribbean Sea as our backdrop. Please arrive 30 minutes early to find 
                  your seats and get settled before the ceremony begins.
                </p>
                <div className="flex items-center mb-2">
                  <svg className="h-6 w-6 text-primary dark:text-primary-light mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Beachfront</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-primary dark:text-primary-light mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Attire: Beach Formal</span>
                </div>
              </div>
            </div>
            
            {/* Reception Card */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden transition-colors duration-200">
              <div className="h-48 bg-secondary-light dark:bg-secondary-dark/40 flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="text-4xl font-script text-secondary-dark dark:text-white mb-2">Reception</div>
                  <div className="text-xl font-light text-gray-700 dark:text-gray-200">April 10, 2026</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg className="h-6 w-6 text-secondary dark:text-secondary-light mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">5:00 PM - 11:00 PM</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Following the ceremony, join us for cocktails, dinner, and dancing at 
                  the resort's oceanfront terrace. We'll enjoy a delicious meal, toasts, 
                  and celebration under the stars.
                </p>
                <div className="flex items-center mb-2">
                  <svg className="h-6 w-6 text-secondary dark:text-secondary-light mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Oceanfront Terrace</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-secondary dark:text-secondary-light mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Dinner & Dancing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Travel & Accommodations */}
      <section className="py-16 bg-white dark:bg-dark-primary transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-script text-4xl text-primary dark:text-primary-light text-center mb-12">
            Travel & Accommodations
          </h2>
          
          <div className="bg-primary-light/30 dark:bg-dark-card rounded-lg shadow-md p-8 mb-10 transition-colors duration-200">
            <h3 className="font-display text-2xl text-primary-dark dark:text-primary-light mb-4">
              Resort Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We've arranged a special room block at [Resort Name] for our wedding guests. 
              When booking, please mention the "Quinn-Wedding" group to receive our special rate.
              The resort is all-inclusive, which means your room, meals, drinks, and most activities 
              are covered in your stay.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-dark-secondary rounded-lg p-4 shadow-sm transition-colors duration-200">
                <h4 className="font-medium text-primary dark:text-primary-light text-lg mb-2">Booking Information</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Reservations: (555) 123-4567<br />
                  Booking Code: QUINN2026<br />
                  Website: <a href="#" className="text-primary hover:underline">www.resortname.com</a>
                </p>
              </div>
              <div className="bg-white dark:bg-dark-secondary rounded-lg p-4 shadow-sm transition-colors duration-200">
                <h4 className="font-medium text-primary dark:text-primary-light text-lg mb-2">Room Block Details</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Available: April 7-14, 2026<br />
                  Rate: $XXX per night, all-inclusive<br />
                  Booking Deadline: January 10, 2026
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 transition-colors duration-200">
              <h3 className="font-display text-2xl text-accent-dark dark:text-accent mb-4">
                Travel Tips
              </h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex">
                  <svg className="h-6 w-6 text-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  <span>Fly into Punta Cana International Airport (PUJ), which is approximately 20 minutes from the resort.</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  <span>A valid passport is required for travel to the Dominican Republic.</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span>The resort offers airport transfer services for guests. Please arrange this when booking your room.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 transition-colors duration-200">
              <h3 className="font-display text-2xl text-secondary-dark dark:text-secondary-light mb-4">
                Things to Do
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                There are plenty of activities to enjoy during your stay:
              </p>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex">
                  <svg className="h-6 w-6 text-secondary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                  </svg>
                  <span>Snorkeling and scuba diving in crystal-clear waters</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-secondary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                  <span>Relax at the resort's spa and pools</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-secondary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  <span>Join group excursions to explore local culture and nature</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Venue;