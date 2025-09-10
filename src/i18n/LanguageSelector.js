import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Store preference in localStorage
    localStorage.setItem('weddingAppLanguage', lng);
    // Optional: Add to URL for SEO
    const url = new URL(window.location);
    url.searchParams.set('lang', lng);
    window.history.replaceState({}, '', url);
  };

  const currentLanguage = i18n.language || 'en';

  return (
    <div className="language-selector flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md transition-all duration-200 flex items-center space-x-1 ${
          currentLanguage === 'en' 
            ? 'bg-primary dark:bg-primary-dark text-white shadow-md' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
        aria-label="English"
        title="English"
      >
        <span className="text-sm">🇺🇸</span>
        <span className="text-sm font-medium">EN</span>
      </button>
      <button
        onClick={() => changeLanguage('pt')}
        className={`px-3 py-1 rounded-md transition-all duration-200 flex items-center space-x-1 ${
          currentLanguage === 'pt' 
            ? 'bg-primary dark:bg-primary-dark text-white shadow-md' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
        aria-label="Português"
        title="Português"
      >
        <span className="text-sm">🇧🇷</span>
        <span className="text-sm font-medium">PT</span>
      </button>
    </div>
  );
}

export default LanguageSelector;