import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitDonation, updateDonationForm, clearError } from '../../store/slices/registrySlice';

const DonationForm = () => {
  const dispatch = useDispatch();
  const { donationForm, donationStatus, error } = useSelector((state) => state.registry);

  const handleInputChange = (field, value) => {
    dispatch(updateDonationForm({ [field]: value }));
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert amount to number
    const formData = {
      ...donationForm,
      amount: parseFloat(donationForm.amount)
    };
    
    dispatch(submitDonation(formData));
  };

  const isLoading = donationStatus === 'loading';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8">
      <h3 className="text-xl md:text-2xl font-playfair text-gray-800 dark:text-white mb-6 text-center">
        Let Us Know About Your Gift 🎁
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
            <div className="flex">
              <div className="text-red-400 text-xl mr-3">⚠️</div>
              <div>
                <h4 className="text-red-800 dark:text-red-300 font-medium">
                  {error.errorMessage}
                </h4>
                {error.details && error.details.length > 0 && (
                  <ul className="text-red-700 dark:text-red-400 text-sm mt-1 list-disc list-inside">
                    {error.details.map((detail, index) => (
                      <li key={index}>{detail.reason}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Donor Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              value={donationForm.donorName}
              onChange={(e) => handleInputChange('donorName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Your full name"
              required
            />
          </div>

          {/* Donor Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={donationForm.donorEmail}
              onChange={(e) => handleInputChange('donorEmail', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Donor Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={donationForm.donorPhone}
              onChange={(e) => handleInputChange('donorPhone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Donation Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gift Amount *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={donationForm.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="100.00"
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Payment Method *
            </label>
            <select
              value={donationForm.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
              required
            >
              <option value="">Select payment method</option>
              <option value="VENMO">Venmo</option>
              <option value="ZELLE">Zelle</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Payment Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Transaction ID (Optional)
            </label>
            <input
              type="text"
              value={donationForm.paymentReference}
              onChange={(e) => handleInputChange('paymentReference', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
              placeholder="Transaction or reference number"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Personal Message (Optional)
          </label>
          <textarea
            value={donationForm.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
            placeholder="Share a sweet message with us! 💕"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed inline-flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit Gift Info</span>
                <span>🎁</span>
              </>
            )}
          </button>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            This form lets us know about your gift. We'll confirm once we receive your payment and send you a thank you note! 💕
          </p>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
