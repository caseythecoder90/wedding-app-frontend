import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const InvitationCodeInput = ({ value, onChange, onSubmit, isLoading = false, error = null }) => {
  const { t } = useTranslation('rsvp');
  const [touched, setTouched] = useState(false);
  
  // Format the input value (uppercase, remove special chars, limit length)
  const formatCode = (input) => {
    return input
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, '') // Only allow letters, numbers, and hyphens
      .slice(0, 12); // Limit to reasonable length
  };

  const handleInputChange = (e) => {
    const formatted = formatCode(e.target.value);
    onChange(formatted);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  // Validation states
  const isEmpty = !value.trim();
  const isTooShort = value.length < 3;
  const showError = touched && (isEmpty || isTooShort) && !isLoading;
  const showServerError = error && touched;

  return (
    <div className="space-y-2">
      <label 
        htmlFor="invitationCode" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
      >
        {t('invitationCode.label')}
      </label>
      
      <div className="relative">
        <input
          type="text"
          id="invitationCode"
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white transition-all duration-200 font-mono text-center tracking-wider ${
            showError || showServerError
              ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary'
          } ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          placeholder={t('invitationCode.placeholder')}
          required
          autoComplete="off"
          spellCheck="false"
        />
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Success indicator for valid format */}
        {!isLoading && value.length >= 3 && !showError && !showServerError && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        )}
      </div>
      
      {/* Client-side validation error */}
      {showError && (
        <p className="text-sm text-red-600 dark:text-red-400 animate-shake">
          {isEmpty 
            ? t('invitationCode.emptyError')
            : t('invitationCode.tooShortError')
          }
        </p>
      )}
      
      {/* Server error */}
      {showServerError && (
        <p className="text-sm text-red-600 dark:text-red-400 animate-shake">
          {error?.details?.[0]?.reason || error?.errorMessage || t('invitationCode.invalidError')}
        </p>
      )}
      
      {/* Help text */}
      {!showError && !showServerError && (
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
          {t('invitationCode.helpText')}
        </p>
      )}
    </div>
  );
};

export default InvitationCodeInput;