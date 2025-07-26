import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideSuccessModal } from '../../store/slices/registrySlice';

const DonationSuccessModal = () => {
  const dispatch = useDispatch();
  const { showSuccessModal, lastSubmittedDonation } = useSelector((state) => state.registry);

  if (!showSuccessModal) return null;

  const handleClose = () => {
    dispatch(hideSuccessModal());
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          ×
        </button>

        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
            <span className="text-3xl">✨</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Thank You So Much! 💕
          </h3>

          {/* Message */}
          <div className="text-gray-600 dark:text-gray-300 mb-6">
            <p className="mb-3">
              We've received your gift information for <strong>${lastSubmittedDonation?.amount}</strong>!
            </p>
            <p className="text-sm">
              We'll confirm your payment once we receive it and send you a personalized thank you note.
            </p>
          </div>

          {/* Donation Details */}
          {lastSubmittedDonation && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 text-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                <span className="font-semibold">${lastSubmittedDonation.amount}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-500 dark:text-gray-400">Payment Method:</span>
                <span>{lastSubmittedDonation.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">Status:</span>
                <span className="text-yellow-600 dark:text-yellow-400">Pending Confirmation</span>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccessModal;
