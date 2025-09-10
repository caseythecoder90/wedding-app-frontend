import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchRegistryOverview } from '../store/slices/registrySlice';

/**
 * @typedef {import('../store/slices/registrySlice').RegistryOverview} RegistryOverview
 * @typedef {import('../store/slices/registrySlice').RegistrySettings} RegistrySettings  
 * @typedef {import('../store/slices/registrySlice').Donation} Donation
 */

import RegistryHero from '../components/registry/RegistryHero';
import RegistryHeader from '../components/registry/RegistryHeader';
import PaymentHandles from '../components/registry/PaymentHandles';
import DonationForm from '../components/registry/DonationForm';
import DonationSuccessModal from '../components/registry/DonationSuccessModal';

const Registry = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('registry');
  
  /** @type {{ overview: RegistryOverview | null, overviewStatus: 'idle'|'loading'|'succeeded'|'failed', error: any }} */
  const { overview, overviewStatus, error } = useSelector((state) => state.registry);

  useEffect(() => {
    // Fetch registry data on component mount
    dispatch(fetchRegistryOverview());
  }, [dispatch]);

  // Loading state
  if (overviewStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">{t('loadingMessage')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (overviewStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            {t('errorTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {error?.errorMessage || t('defaultErrorMessage')}
          </p>
          <button
            onClick={() => dispatch(fetchRegistryOverview())}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors"
          >
            {t('tryAgainBtn')}
          </button>
        </div>
      </div>
    );
  }

  // Inactive state
  if (!overview?.settings?.isActive) {
    return (
      <div className="min-h-screen bg-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            {t('inactiveTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t('inactiveMessage')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <RegistryHero />

        {/* Registry Components */}
        <RegistryHeader overview={overview} />
        <PaymentHandles settings={overview.settings} />
        <DonationForm />

        {/* Travel Highlights */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-display text-gray-800 dark:text-white mb-6 text-center">
            {t('japanPlans.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏔️</span>
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t('japanPlans.mountFuji.title')}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('japanPlans.mountFuji.description')}</p>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌸</span>
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t('japanPlans.cherryBlossoms.title')}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('japanPlans.cherryBlossoms.description')}</p>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⛩️</span>
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{t('japanPlans.temples.title')}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('japanPlans.temples.description')}</p>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        <DonationSuccessModal />

        {/* Destination Wedding Message */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💝</span>
            </div>
            <h3 className="text-xl md:text-2xl font-playfair text-gray-800 dark:text-white mb-4">
              {t('destinationNote.title')}
            </h3>
            <div className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 space-y-3">
              <p className="text-base leading-relaxed">
                {t('destinationNote.paragraph1')}
              </p>
              <p className="text-base leading-relaxed">
                {t('destinationNote.paragraph2')}
              </p>
              <p className="text-base leading-relaxed font-medium text-primary-600 dark:text-primary-400">
                {t('destinationNote.paragraph3')}
              </p>
            </div>
          </div>
        </div>

        {/* Thank You Footer */}
        <div className="text-center bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-display mb-4">{t('thankYouFooter.title')}</h3>
          <p className="text-lg font-sans opacity-90">
            {t('thankYouFooter.message')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registry;