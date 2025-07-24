import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegistryOverview } from '../store/slices/registrySlice';
import RegistryHeader from '../components/registry/RegistryHeader';
import PaymentHandles from '../components/registry/PaymentHandles';
import DonationForm from '../components/registry/DonationForm';
import RecentDonations from '../components/registry/RecentDonations';
import DonationSuccessModal from '../components/registry/DonationSuccessModal';

const Registry = () => {
  const dispatch = useDispatch();
  const { overview, overviewStatus, error } = useSelector((state) => state.registry);

  useEffect(() => {
    // Fetch registry data on component mount
    dispatch(fetchRegistryOverview());
  }, [dispatch]);

  if (overviewStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-mint-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading registry...</p>
        </div>
      </div>
    );
  }

  if (overviewStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-mint-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Registry Unavailable
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {error?.errorMessage || 'Unable to load the honeymoon registry. Please try again later.'}
          </p>
          <button
            onClick={() => dispatch(fetchRegistryOverview())}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!overview?.settings?.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-mint-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-4xl mb-4">💤</div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Registry Not Active
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The honeymoon registry is currently not accepting donations. Thank you for your interest!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-mint-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-dancing text-primary-600 dark:text-primary-400 mb-2">
            Honeymoon Registry
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Help us create unforgettable memories! ✈️
          </p>
        </div>

        {/* Registry Overview */}
        <RegistryHeader overview={overview} />

        {/* Payment Information */}
        <PaymentHandles settings={overview.settings} />

        {/* Donation Form */}
        <DonationForm />

        {/* Recent Donations (Optional) */}
        <RecentDonations />

        {/* Success Modal */}
        <DonationSuccessModal />
      </div>
    </div>
  );
};

export default Registry;
