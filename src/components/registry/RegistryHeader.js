import React from 'react';
import { useTranslation } from 'react-i18next';

const RegistryHeader = ({ overview }) => {
  const { t } = useTranslation('registry');
  const { totalDonated, goalAmount, progressPercentage, totalDonations } = overview;

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-playfair text-gray-800 dark:text-white mb-2">
          {t('header.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {overview.settings.registryDescription || t('header.description')}
        </p>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {t('header.progressLabel')}
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mb-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-6 rounded-full transition-all duration-1000 ease-out relative animate-pulse"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {/* Amount Display */}
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
              ${totalDonated.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('header.raisedLabel')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300">
              ${goalAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('header.goalLabel')}</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent-600 dark:text-accent-400">
              {totalDonations}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('header.donationsLabel')}</div>
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4">
        <p className="text-gray-700 dark:text-gray-200 italic">
          {t('header.thankYouMessage')}
        </p>
      </div>
    </div>
  );
};

export default RegistryHeader;