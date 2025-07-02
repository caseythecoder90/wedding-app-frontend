import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751481626/story-becoming-official-atlanta-trip_aoaimh",
        caption: "Casey's Visit to Atlanta",
        alt: "Casey and Yasmim during Casey's visit to Atlanta in October 2023"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751481627/story-becoming-official-texas-trip_vsdfzr",
        caption: "Yasmim Visits Texas", 
        alt: "Yasmim visiting Casey in Texas during their long distance relationship"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751481627/story-becoming-official-long-distance_h9ntiu",
        caption: "Long Distance Love",
        alt: "Casey and Yasmim making long distance work"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751481675/story-becoming-official-long-distance-2_mv3wmp",
        caption: "Building Our Connection", 
        alt: "More memories from Casey and Yasmim's long distance relationship period"
      }
    ]
  },
  {
    id: 4,
    date: "January 2024",
    title: "Starting Our Life Together",
    story: "Casey graduated and moved to Atlanta full-time with Visa. We decided to take the next step and moved in together in Midtown - our first home as a couple.",
    type: "photo",
    photos: [
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751483422/starting-our-life-together-first-apartment_w7lgj3",
        caption: "Our First Apartment",
        alt: "Casey and Yasmim in their first apartment together in Midtown Atlanta"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751483422/starting-our-life-together-date-night_lgbscs",
        caption: "Date Night Adventures",
        alt: "Casey and Yasmim enjoying date nights in Atlanta"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751483424/starting-our-life-together-ice-skating_wqjbxk",
        caption: "Ice Skating Together",
        alt: "Casey and Yasmim ice skating as a couple in Atlanta"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751483423/starting-our-life-together-friends-wedding_vtvtsw",
        caption: "Friends' Wedding",
        alt: "Casey and Yasmim attending a friends' wedding together"
      }
    ]
  },
  {
    id: 5,
    date: "May - July 2024",
    title: "Making Memories",
    story: "From meeting Casey's parents in Florida to hiking and camping in Rocky Mountain National Park, we discovered we're the perfect adventure team. Yasmim supported Casey's Longs Peak attempt, even with that 2am drop-off!",
    type: "photo",
    photos: [
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751484339/making-memories-florida-trip_amo1cf",
        caption: "Florida Family Visit",
        alt: "Casey and Yasmim visiting Casey's parents in Florida"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751484338/making-memories-colorado-trip-beautiful-backdrop_sfalzd",
        caption: "Colorado Adventures",
        alt: "Casey and Yasmim exploring Colorado with beautiful mountain backdrop"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751484370/making-memories-sky-pond-colorado_sugm1b",
        caption: "Sky Pond Hike",
        alt: "Casey and Yasmim at Sky Pond in Rocky Mountain National Park"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751484340/making-memories-kissing-in-colorado_uekqpy",
        caption: "Rocky Mountain Romance",
        alt: "Casey and Yasmim sharing a romantic moment in Colorado"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751484313/making-memories-colorado-selfie-together_nddh23",
        caption: "Colorado Selfie",
        alt: "Casey and Yasmim taking a selfie together in Colorado"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751484312/making-memories-camping-tennessee_bi8w1q",
        caption: "Camping in Tennessee",
        alt: "Casey and Yasmim camping adventure in Tennessee"
      }
    ]
  },
  {
    id: 6,
    date: "December 2024",
    title: "The Perfect Moment",
    story: "After a stormy day in Rio, the clouds cleared just as we reached the top of Sugar Loaf Mountain. As the sun set over Copacabana, Casey proposed with the most breathtaking view in the world.",
    type: "photo",
    photos: [
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485123/perfect-moment-landing-in-rio-airport-horizontal_decqmo",
        caption: "Landing in Rio",
        alt: "Casey and Yasmim arriving at Rio airport for their Brazil trip"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485121/perfect-moment-boat-tour-ubatuba_iofjtk",
        caption: "Ubatuba Boat Tour",
        alt: "Casey and Yasmim enjoying a boat tour in Ubatuba, Brazil"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485122/perfect-moment-dinner-in-itai-with-yas-family_lgbwkw",
        caption: "Dinner with Yasmim's Family",
        alt: "Casey meeting Yasmim's family over dinner in Itaí, Brazil"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485126/perfect-moment-sugarloaf-overlooking-botafago-harbor_vgioan",
        caption: "Sugar Loaf Views",
        alt: "Breathtaking views from Sugar Loaf Mountain overlooking Botafogo Harbor"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485124/perfect-moment-me-proposing-sugarloaf-nighttime-just-started_qgtiwt",
        caption: "The Proposal Moment",
        alt: "Casey proposing to Yasmim at Sugar Loaf Mountain as night falls over Rio"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485127/perfect-moment-yasmim-after-proposal_sip6vo",
        caption: "Yasmim After the Proposal",
        alt: "Yasmim's joyful reaction after Casey's proposal at Sugar Loaf Mountain"
      }
    ]
  },
  {
    id: 7,
    date: "2025 - Present",
    title: "Planning Our Forever",
    story: "Now engaged and building our future together in our new apartment, planning our Punta Cana wedding where both our families can celebrate with us.",
    type: "photo",
    photos: [
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485764/planning-forever-piedmont-park-picnic_jm442m",
        caption: "Piedmont Park Picnic",
        alt: "Casey and Yasmim enjoying an engaged couple's picnic at Piedmont Park"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485761/planning-forever-atlanta-braves-game-yasmims-first-ever_xpjwfp",
        caption: "Yasmim's First Braves Game",
        alt: "Casey and Yasmim at Yasmim's first ever Atlanta Braves baseball game"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485762/planning-forever-brasstown-bald-georgia_bk5wo6",
        caption: "Brasstown Bald Adventure",
        alt: "Casey and Yasmim at Brasstown Bald, the highest point in Georgia"
      },
      {
        url: "https://res.cloudinary.com/dwdaehpml/image/upload/w_800,c_scale,q_auto,f_auto/v1751485763/planning-forever-cruise-bahamas_tehubj",
        caption: "Bahamas Cruise",
        alt: "Casey and Yasmim on their engagement cruise to the Bahamas"
      }
    ]
  }
];

function OurStory() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Handle scroll to update active section and visibility
  useEffect(() => {
    const handleScroll = () => {
      // Check visibility of timeline sections
      const newVisibility = {};
      timelinePoints.forEach((_, index) => {
        const element = document.getElementById(`timeline-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
          newVisibility[index] = isInView;
          if (isInView && activeSection !== index) {
            setActiveSection(index);
          }
        }
      });
      setIsVisible(newVisibility);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (index) => {
    const element = document.getElementById(`timeline-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSection(index);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-primary transition-colors duration-200">
      {/* Hero Section with Typewriter Effect */}
      <section className="relative py-24 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 dark:from-primary-dark/20 dark:to-secondary-dark/20 overflow-hidden">
        {/* Floating Hearts Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-primary/20 dark:text-primary-light/10 animate-float-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
                fontSize: `${12 + Math.random() * 20}px`
              }}
            >
              ♡
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="font-script text-6xl text-primary dark:text-primary-light mb-6 animate-typewriter-title overflow-visible">
              Our Story
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-up-delayed">
              How we met, fell in love, and decided to spend our lives together.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Timeline Navigation with Simplified Indicators */}
          <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
            <div className="flex flex-col space-y-4">
              {timelinePoints.map((point, index) => (
                <button
                  key={point.id}
                  onClick={() => scrollToSection(index)}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 hover:scale-125 relative z-10 ${
                    activeSection === index
                      ? 'bg-primary border-primary dark:bg-primary-light dark:border-primary-light animate-timeline-pulse'
                      : 'bg-white border-gray-300 dark:bg-dark-card dark:border-gray-600 hover:border-primary dark:hover:border-primary-light'
                  }`}
                  aria-label={`Go to ${point.title}`}
                />
              ))}
              {/* Connecting line with progress indicator */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600 transform -translate-x-1/2 -z-10" />
              <div 
                className="absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary to-secondary transform -translate-x-1/2 transition-all duration-500 ease-out"
                style={{ height: `${(activeSection / (timelinePoints.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Timeline Content with Staggered Animations */}
          <div className="space-y-24">
            {timelinePoints.map((point, index) => (
              <div
                key={point.id}
                id={`timeline-${index}`}
                className={`flex flex-col lg:flex-row items-center gap-12 transition-opacity duration-500 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } ${isVisible[index] ? 'opacity-100 animate-simple-fade-in' : 'opacity-0'}`}
              >
                {/* Date Badge with Floating Animation */}
                <div className="flex-shrink-0 relative">
                  <div className={`bg-gradient-to-br from-primary to-secondary text-white px-6 py-3 rounded-full shadow-lg font-medium min-w-max animate-float-gentle ${
                    activeSection === index ? 'ring-4 ring-primary/30 scale-110' : ''
                  } transition-all duration-300`}>
                    {point.date}
                  </div>
                  {/* Sparkle effect for active item */}
                  {activeSection === index && (
                    <div className="absolute inset-0 animate-sparkle">
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                      <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  )}
                </div>

                {/* Content Card with Hover Effects */}
                <div className="flex-1 max-w-2xl">
                  <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105 group">
                    <h3 className="font-script text-3xl text-primary dark:text-primary-light mb-4 group-hover:text-primary-dark dark:group-hover:text-white transition-colors duration-300">
                      {point.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                      {point.story}
                    </p>

                    {/* Content based on type */}
                    {point.type === "text-only" ? (
                      // Beautiful typography design for text-only sections
                      <div className="bg-gradient-to-br from-accent-light/50 to-primary-light/30 dark:from-dark-card dark:to-primary-dark/20 rounded-2xl p-8 text-center">
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto bg-primary/20 dark:bg-primary-light/20 rounded-full flex items-center justify-center animate-pulse-gentle">
                            <svg className="w-8 h-8 text-primary dark:text-primary-light" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="font-script text-2xl text-primary dark:text-primary-light">
                            {index === 0 && '"The beginning of our forever"'}
                            {index === 1 && '"Love at first sight... at Velvet Taco"'}
                          </p>
                          <div className="flex justify-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-secondary/40 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-accent/40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Updated photo gallery with masonry layout for natural photo sizing
                      <div className="space-y-4">
                        {/* Masonry grid layout */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                          {point.photos.map((photo, photoIndex) => (
                            <div
                              key={photoIndex}
                              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-2 break-inside-avoid mb-4"
                              style={{ animationDelay: `${photoIndex * 0.1}s` }}
                            >
                              <img
                                src={typeof photo === 'string' ? photo : photo.url}
                                alt={typeof photo === 'string' ? `${point.title} memory ${photoIndex + 1}` : photo.alt}
                                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <p className="text-sm font-medium">
                                  {typeof photo === 'string' ? `Memory #${photoIndex + 1}` : photo.caption}
                                </p>
                              </div>
                              {/* Shimmer effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action with Parallax Effect */}
      <section className="py-16 bg-gradient-to-br from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/10 dark:to-secondary-dark/10 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-accent rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h3 className="font-script text-4xl text-primary dark:text-primary-light mb-6 animate-fade-up">
            Our Adventure Continues
          </h3>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed animate-fade-up-delayed">
            From a chance meeting in Atlanta to planning our dream wedding in Punta Cana, 
            our love story is just beginning. We can't wait to celebrate with all of you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delayed-2">
            <Link
              to="/rsvp"
              className="inline-block bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              RSVP to Our Wedding
            </Link>
            <Link
              to="/venue"
              className="inline-block bg-white dark:bg-dark-card border-2 border-primary dark:border-primary-light text-primary dark:text-primary-light hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-white font-medium px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              Learn About Punta Cana
            </Link>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        @keyframes typewriter-title {
          from {
            width: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-heart {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.7;
          }
        }

        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes timeline-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(145, 195, 229, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(145, 195, 229, 0);
          }
        }

        @keyframes simple-fade-in {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-gentle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          33% {
            transform: translateY(-30px) scale(1.1);
          }
          66% {
            transform: translateY(20px) scale(0.9);
          }
        }

        .animate-typewriter-title {
          animation: typewriter-title 2s ease-out forwards;
          white-space: nowrap;
          border-right: 3px solid transparent;
        }

        .animate-fade-up-delayed {
          animation: fade-up 1s ease-out 1.5s forwards;
          opacity: 0;
        }

        .animate-fade-up-delayed-2 {
          animation: fade-up 1s ease-out 2s forwards;
          opacity: 0;
        }

        .animate-fade-up {
          animation: fade-up 0.8s ease-out forwards;
        }

        .animate-float-heart {
          animation: float-heart 20s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-timeline-pulse {
          animation: timeline-pulse 2s infinite;
        }

        .animate-simple-fade-in {
          animation: simple-fade-in 0.6s ease-out forwards;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default OurStory;