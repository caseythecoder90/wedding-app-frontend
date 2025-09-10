import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import English translations
import enCommon from './locales/en/common.json';
import enNavbar from './locales/en/navbar.json';
import enHome from './locales/en/home.json';
import enRsvp from './locales/en/rsvp.json';
import enVenue from './locales/en/venue.json';
import enStory from './locales/en/story.json';
import enRegistry from './locales/en/registry.json';

// Import Portuguese translations
import ptCommon from './locales/pt/common.json';
import ptNavbar from './locales/pt/navbar.json';
import ptHome from './locales/pt/home.json';
import ptRsvp from './locales/pt/rsvp.json';
import ptVenue from './locales/pt/venue.json';
import ptStory from './locales/pt/story.json';
import ptRegistry from './locales/pt/registry.json';

const resources = {
  en: {
    common: enCommon,
    navbar: enNavbar,
    home: enHome,
    rsvp: enRsvp,
    venue: enVenue,
    story: enStory,
    registry: enRegistry
  },
  pt: {
    common: ptCommon,
    navbar: ptNavbar,
    home: ptHome,
    rsvp: ptRsvp,
    venue: ptVenue,
    story: ptStory,
    registry: ptRegistry
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Language detection options
    detection: {
      order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'weddingAppLanguage',
      lookupQuerystring: 'lang',
    },

    interpolation: {
      escapeValue: false // React already escapes values
    },

    ns: ['common', 'navbar', 'home', 'rsvp', 'venue', 'story', 'registry'],
    defaultNS: 'common',
  });

export default i18n;