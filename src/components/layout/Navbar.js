import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DarkModeToggle from '../common/DarkModeToggle';
import LanguageSelector from '../../i18n/LanguageSelector';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('navbar');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-dark-primary/95 backdrop-blur-sm shadow-md transition-all duration-200">
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
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-1 pt-1 font-medium transition-colors duration-200"
              }
            >
              {t('home')}
            </NavLink>
            <NavLink 
              to="/our-story"
              className={({ isActive }) => 
                isActive 
                  ? "text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light px-1 pt-1 font-medium" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-1 pt-1 font-medium transition-colors duration-200"
              }
            >
              {t('ourStory')}
            </NavLink>
            <NavLink 
              to="/venue"
              className={({ isActive }) => 
                isActive 
                  ? "text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light px-1 pt-1 font-medium" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-1 pt-1 font-medium transition-colors duration-200"
              }
            >
              {t('venue')}
            </NavLink>
            <NavLink 
              to="/rsvp"
              className={({ isActive }) => 
                isActive 
                  ? "text-primary dark:text-primary-light border-b-2 border-primary dark:border-primary-light px-1 pt-1 font-medium" 
                  : "text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light px-1 pt-1 font-medium transition-colors duration-200"
              }
            >
              {t('rsvp')}
            </NavLink>
            
            {/* Japan Fund Registry Link */}
            <NavLink 
              to="/registry"
              className={({ isActive }) => 
                isActive 
                  ? "text-pink-600 dark:text-pink-400 border-b-2 border-pink-500 dark:border-pink-400 px-1 pt-1 font-medium flex items-center" 
                  : "text-gray-500 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 px-1 pt-1 font-medium transition-colors duration-200 flex items-center"
              }
            >
              <span className="mr-1">🌸</span>
              {t('honeymoonFund')}
            </NavLink>
            
            {/* Language Selector and Dark Mode Toggle */}
            <div className="ml-2 flex items-center space-x-3">
              <LanguageSelector />
              <DarkModeToggle />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden space-x-2">
            <LanguageSelector />
            <DarkModeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">{t('openMainMenu')}</span>
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
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </NavLink>
            <NavLink
              to="/our-story"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary dark:bg-primary-dark text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('ourStory')}
            </NavLink>
            <NavLink
              to="/venue"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary dark:bg-primary-dark text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('venue')}
            </NavLink>
            <NavLink
              to="/rsvp"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary dark:bg-primary-dark text-white block px-3 py-2 rounded-md text-base font-medium"
                  : "text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-primary-light block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {t('rsvp')}
            </NavLink>
            
            {/* Japan Fund Registry Link - Mobile */}
            <NavLink
              to="/registry"
              className={({ isActive }) =>
                isActive
                  ? "bg-gradient-to-r from-pink-500 to-red-500 text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                  : "text-gray-500 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="mr-2">🌸</span>
              {t('honeymoonFund')}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;