import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentDonations } from '../../store/slices/registrySlice';

const RecentDonations = () => {
  const dispatch = useDispatch();
  const { recentDonations, recentDonationsStatus } = useSelector((state) => state.registry);

  useEffect(() => {
    dispatch(fetchRecentDonations());
  }, [dispatch]);

  if (recentDonationsStatus === 'loading' || recentDonations.length === 0) {
    return null; // Don't show this section if no donations or still loading
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
      <h3 className="text-xl md:text-2xl font-playfair text-gray-800 dark:text-white mb-6 text-center">
        Recent Contributions 🌟
      </h3>

      <div className="space-y-4">
        {recentDonations.slice(0, 5).map((donation) => (
          <div
            key={donation.id}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                {donation.donorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-gray-800 dark:text-white">
                  {donation.donorName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(donation.donationDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
              ${donation.amount}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Thank you to everyone who has contributed! 💕
        </p>
      </div>
    </div>
  );
};

export default RecentDonations;
