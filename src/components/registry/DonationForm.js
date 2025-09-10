import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { submitDonation, updateDonationForm, clearError } from '../../store/slices/registrySlice';

const DonationForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('registry');
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
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl md:text-2xl font-playfair text-gray-800 dark:text-white mb-6 text-center">
        {t('donationForm.title')}
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
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {t('donationForm.fields.donorName.label')}
            </label>
            <input
              type="text"
              value={donationForm.donorName}
              onChange={(e) => handleInputChange('donorName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm dark:text-white transition-all duration-200"
              placeholder={t('donationForm.fields.donorName.placeholder')}
              required
            />
          </div>

          {/* Donor Email */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {t('donationForm.fields.donorEmail.label')}
            </label>
            <input
              type="email"
              value={donationForm.donorEmail}
              onChange={(e) => handleInputChange('donorEmail', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm dark:text-white transition-all duration-200"
              placeholder={t('donationForm.fields.donorEmail.placeholder')}
              required
            />
          </div>

          {/* Donor Phone */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {t('donationForm.fields.donorPhone.label')}
            </label>
            <input
              type="tel"
              value={donationForm.donorPhone}
              onChange={(e) => handleInputChange('donorPhone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm dark:text-white transition-all duration-200"
              placeholder={t('donationForm.fields.donorPhone.placeholder')}
            />
          </div>

          {/* Donation Amount */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              {t('donationForm.fields.amount.label')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">$</span>
              <input
                type="number"
                min="1"
                step="0.01"
                value={donationForm.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm dark:text-white transition-all duration-200"
                placeholder={t('donationForm.fields.amount.placeholder')}
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              {t('donationForm.fields.paymentMethod.label')}
            </label>
            <select
              value={donationForm.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm dark:text-white transition-all duration-200"
              required
            >
              <option value="">{t('donationForm.fields.paymentMethod.placeholder')}</option>
              <option value="VENMO">{t('donationForm.fields.paymentMethod.options.venmo')}</option>
              <option value="ZELLE">{t('donationForm.fields.paymentMethod.options.zelle')}</option>
              <option value="OTHER">{t('donationForm.fields.paymentMethod.options.other')}</option>
            </select>
          </div>

          {/* Payment Reference */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              {t('donationForm.fields.paymentReference.label')}
            </label>
            <input
              type="text"
              value={donationForm.paymentReference}
              onChange={(e) => handleInputChange('paymentReference', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm dark:text-white transition-all duration-200"
              placeholder={t('donationForm.fields.paymentReference.placeholder')}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {t('donationForm.fields.message.label')}
          </label>
          <textarea
            value={donationForm.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm dark:text-white transition-all duration-200"
            placeholder={t('donationForm.fields.message.placeholder')}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 disabled:from-gray-400 disabled:to-gray-500 disabled:opacity-50 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2 min-w-[200px]"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>{t('donationForm.submitButton.loading')}</span>
              </>
            ) : (
              <>
                <span>{t('donationForm.submitButton.idle')}</span>
                <span>🎁</span>
              </>
            )}
          </button>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            {t('donationForm.disclaimer')}
          </p>
        </div>
      </form>
    </div>
  );
};

export default DonationForm;
