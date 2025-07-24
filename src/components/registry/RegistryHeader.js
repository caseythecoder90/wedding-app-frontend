import React from 'react';

const RegistryHeader = ({ overview }) => {
  const { totalDonated, goalAmount, progressPercentage, totalDonations } = overview;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-playfair text-gray-800 dark:text-white mb-2">
          Our Honeymoon Fund
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {overview.settings.registryDescription}
        </p>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Progress toward our goal
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
          <div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-4 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>

        {/* Amount Display */}
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
              ${totalDonated.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Raised</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300">
              ${goalAmount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Goal</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent-600 dark:text-accent-400">
              {totalDonations}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Donations</div>
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4">
        <p className="text-gray-700 dark:text-gray-200 italic">
          "Every contribution, no matter the size, helps us create memories that will last a lifetime. Thank you for being part of our journey!" 💕
        </p>
      </div>
    </div>
  );
};

export default RegistryHeader;