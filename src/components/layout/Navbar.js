import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import DarkModeToggle from '../common/DarkModeToggle';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-dark-primary shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-script text-2xl text-primary dark:text-primary-light">Casey & Yasmim</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <NavLink 
              to="/"
              end
              className={({ isActive }) => 
                isActive 
                  ? "text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light px-1 pt-1 font-medium" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-1 pt-1 font-medium"
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/our-story"
              className={({ isActive }) => 
                isActive 
                  ? "text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light px-1 pt-1 font-medium" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-1 pt-1 font-medium"
              }
            >
              Our Story
            </NavLink>
            <NavLink 
              to="/venue"
              className={({ isActive }) => 
                isActive 
                  ? "text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light px-1 pt-1 font-medium" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-1 pt-1 font-medium"
              }
            >
              Venue
            </NavLink>
            <NavLink 
              to="/rsvp"
              className={({ isActive }) => 
                isActive 
                  ? "text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light px-1 pt-1 font-medium" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-1 pt-1 font-medium"
              }
            >
              RSVP
            </NavLink>
            <NavLink 
              to="/style-guide"
              className={({ isActive }) => 
                isActive 
                  ? "text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light px-1 pt-1 font-medium" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-1 pt-1 font-medium"
              }
            >
              Style Guide
            </NavLink>
            
            {/* Dark Mode Toggle */}
            <div className="ml-2">
              <DarkModeToggle />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden space-x-2">
            <DarkModeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "bg-primary dark:bg-primary-dark text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/our-story"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary dark:bg-primary-dark text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </NavLink>
            <NavLink
              to="/venue"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary dark:bg-primary-dark text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Venue
            </NavLink>
            <NavLink
              to="/rsvp"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary dark:bg-primary-dark text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              RSVP
            </NavLink>
            <NavLink
              to="/style-guide"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary dark:bg-primary-dark text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Style Guide
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;