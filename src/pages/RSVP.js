import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRSVP } from '../hooks/useRSVP';
import InvitationCodeInput from '../components/InvitationCodeInput';
import './RSVP.css';

/**
 * Guest object shape (from backend GuestResponseDTO)
 * @typedef {Object} Guest
 * @property {number} id - Guest database ID
 * @property {string} firstName - Guest's first name
 * @property {string} lastName - Guest's last name
 * @property {string|null} email - Guest's email address
 * @property {boolean} plusOneAllowed - Can bring plus-one
 * @property {boolean} hasRsvp - Has submitted RSVP
 * @property {number|null} rsvpId - RSVP ID if exists
 */

/**
 * RSVP object shape (from backend RSVPResponseDTO)
 * @typedef {Object} ExistingRSVP
 * @property {number} id - RSVP database ID
 * @property {number} guestId - Guest ID
 * @property {string} guestName - Full guest name
 * @property {string|null} guestEmail - Guest email
 * @property {boolean} attending - Is attending
 * @property {boolean} bringingPlusOne - Bringing plus-one
 * @property {string|null} plusOneName - Plus-one name
 * @property {string|null} dietaryRestrictions - Dietary restrictions
 * @property {string} submittedAt - ISO datetime string
 */

/**
 * Error object shape (from backend ErrorResponse)
 * @typedef {Object} APIError
 * @property {string} errorKey - Error identifier
 * @property {string} errorMessage - Human readable message
 * @property {Array<{field: string, reason: string}>} details - Error details
 * @property {string} timestamp - ISO datetime string
 * @property {string} path - Request path that caused error
 */

/**
 * Form data shape for RSVP submission
 * @typedef {Object} FormData
 * @property {number|null} guestId - Guest database ID
 * @property {boolean} attending - Whether attending
 * @property {boolean} bringingPlusOne - Bringing plus-one
 * @property {string} plusOneName - Plus-one name
 * @property {string} dietaryRestrictions - Dietary restrictions
 * @property {string} email - Guest email
 * @property {boolean} sendConfirmationEmail - Send confirmation
 */

/**
 * Main RSVP component handling invitation validation and RSVP submission
 * 
 * State Flow:
 * 1. Code Input → 2. Validation → 3. Main Form → 4. Success
 *                      ↓ (if invalid)
 *                   Error Screen
 * 
 * API Interactions:
 * - GET /v1/api/invitation/validate/{code} → InvitationValidationResponseDTO
 * - POST /v1/api/rsvps → RSVPResponseDTO
 */
function RSVP() {
  const navigate = useNavigate();
  const {
    // State
    guest,
    existingRsvp,
    hasExistingRsvp,
    formData,
    error,
    invitationCode,
    
    // Computed state
    shouldShowCodeForm,
    shouldShowMainForm,
    shouldShowSuccessPage,
    shouldShowErrorPage,
    shouldShowLoadingPage,
    isSubmissionInProgress,
    hasSubmissionFailed,
    canSubmit,
    
    // Actions
    navigateToCodeEntry,
    navigateWithCode,
    updateForm,
    submitForm,
  } = useRSVP();

  const [codeInput, setCodeInput] = useState(invitationCode || '');
  const [submitted, setSubmitted] = useState(false);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    navigateWithCode(codeInput);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    updateForm({ [name]: inputValue });
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    
    const result = await submitForm();
    if (result.success) {
      setSubmitted(true);
    }
  };

  const handleTryAgain = () => {
    navigateToCodeEntry();
    setCodeInput('');
  };

  // Hero section with clean text animations
  const rsvpHero = (
    <section className="relative py-24 bg-gradient-to-br from-primary-light/30 to-secondary-light/30 dark:from-primary-dark/20 dark:to-secondary-dark/20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="font-script text-6xl text-primary dark:text-primary-light mb-6 overflow-visible animate-rsvp-fade opacity-0">
            RSVP
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto animate-rsvp-fade-delayed opacity-0">
            We would be honored to have you join us for our special day.
          </p>
          <div className="mt-8 animate-rsvp-fade-delayed-2 opacity-0">
            <div className="inline-block bg-white dark:bg-dark-card rounded-lg px-6 py-3 shadow-lg backdrop-blur-sm bg-opacity-90 border border-primary/20">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Please respond by February 10, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Loading validation state
  if (shouldShowLoadingPage) {
    return (
      <div>
        {rsvpHero}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white dark:bg-dark-card shadow-lg rounded-xl p-8 text-center animate-pulse-card">
              <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 animate-spin-slow">
                <div className="w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-xl font-display text-gray-800 dark:text-gray-200 mb-2">
                Validating Your Invitation
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your invitation code...
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error validation state
  if (shouldShowErrorPage) {
    return (
      <div>
        {rsvpHero}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white dark:bg-dark-card shadow-lg rounded-xl p-8 text-center animate-error-shake">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.084 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-display text-red-600 dark:text-red-400 mb-4">
                Invalid Invitation Code
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {error?.details?.[0]?.reason || error?.errorMessage || "The invitation code is invalid. Please check your code and try again."}
              </p>
              
              <button
                onClick={handleTryAgain}
                className="w-full bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Success submission state
  if (submitted || shouldShowSuccessPage) {
    return (
      <div>
        {rsvpHero}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white dark:bg-dark-card shadow-lg rounded-xl p-8 transition-colors duration-200 animate-success-bounce">
              <div className="flex justify-center mb-6">
                <div className="rounded-full h-20 w-20 flex items-center justify-center bg-green-100 dark:bg-green-900/30 animate-success-pulse">
                  <svg className="h-10 w-10 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-display text-primary dark:text-primary-light mb-4 text-center">
                Thank You!
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                Your RSVP has been successfully submitted.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-center">
                {hasExistingRsvp && existingRsvp.attending 
                  ? "We're so happy you'll be joining us!" 
                  : "We're sorry you won't be able to join us, but we appreciate your response."}
              </p>
              
              <div className="text-center">
                <button
                  onClick={() => navigate('/')}
                  className="bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium px-8 py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Code input form
  if (shouldShowCodeForm) {
    return (
      <div>
        {rsvpHero}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white dark:bg-dark-card shadow-lg rounded-xl p-8 transition-colors duration-200 animate-card-entrance">
              <div className="text-center mb-6">
                <div className="h-16 w-16 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200 animate-icon-bounce">
                  <svg className="h-8 w-8 text-primary dark:text-primary-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-display text-primary dark:text-primary-light mb-2 transition-colors duration-200">
                  Enter Your Invitation Code
                </h2>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  Please enter the unique code from your invitation to access the RSVP form.
                </p>
              </div>
              
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div className="animate-input-slide">
                  <InvitationCodeInput
                    value={codeInput}
                    onChange={setCodeInput}
                    onSubmit={() => navigateWithCode(codeInput)}
                    error={error}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 animate-button-glow"
                >
                  Continue to RSVP
                </button>
              </form>
              
              <div className="mt-6 text-center animate-fade-in-up opacity-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Don't have your invitation code? Please contact us for assistance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Main RSVP form
  if (shouldShowMainForm) {
    return (
      <div>
        {rsvpHero}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-dark-card shadow-lg rounded-xl p-8 transition-colors duration-200 animate-form-entrance opacity-0">            
              <div className="mb-8 text-center animate-guest-welcome opacity-0">
                <div className="h-16 w-16 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200 animate-avatar-bounce">
                  <svg className="h-8 w-8 text-primary dark:text-primary-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-display text-primary dark:text-primary-light mb-2 transition-colors duration-200">
                  Hello, {guest.firstName} {guest.lastName}!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  {hasExistingRsvp 
                    ? "You can update your RSVP details below." 
                    : "Please let us know if you'll be joining us for our special day."
                  }
                </p>
              </div>

              <form onSubmit={handleRsvpSubmit} className="space-y-8">
                {/* Attendance Section */}
                <div className="bg-primary-light/10 dark:bg-gray-800 p-6 rounded-lg border border-primary/10 dark:border-gray-700 transition-colors duration-200 animate-section-slide opacity-0">
                  <h3 className="text-lg font-display text-primary dark:text-primary-light mb-4 transition-colors duration-200">
                    Will you be attending?
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value="true"
                        checked={formData.attending === true}
                        onChange={() => updateForm({ attending: true })}
                        className="text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light h-5 w-5"
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
                        Yes, I'll be there! 🎉
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value="false"
                        checked={formData.attending === false}
                        onChange={() => updateForm({ attending: false, bringingPlusOne: false, plusOneName: '' })}
                        className="text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light h-5 w-5"
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
                        Sorry, I can't make it 😢
                      </span>
                    </label>
                  </div>
                </div>

                {/* Plus One Section - Only show if attending */}
                {formData.attending && (
                  <div className="bg-secondary-light/10 dark:bg-gray-800 p-6 rounded-lg border border-secondary/10 dark:border-gray-700 transition-colors duration-200 animate-section-slide-delayed opacity-0">
                    <h3 className="text-lg font-display text-secondary dark:text-secondary-light mb-4 transition-colors duration-200">
                      Plus One
                    </h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="bringingPlusOne"
                          checked={formData.bringingPlusOne}
                          onChange={handleInputChange}
                          className="text-secondary dark:text-secondary-light focus:ring-secondary dark:focus:ring-secondary-light h-5 w-5 rounded"
                        />
                        <span className="ml-3 text-gray-700 dark:text-gray-200">
                          I'm bringing a plus one
                        </span>
                      </label>
                      
                      {formData.bringingPlusOne && (
                        <div className="mt-4 animate-plus-one-slide">
                          <label htmlFor="plusOneName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Plus One Name
                          </label>
                          <input
                            type="text"
                            id="plusOneName"
                            name="plusOneName"
                            value={formData.plusOneName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-secondary-light bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                            placeholder="Enter your guest's name"
                            required={formData.bringingPlusOne}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Email Section */}
                <div className="animate-section-slide-delayed opacity-0">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Dietary Restrictions - Only show if attending */}
                {formData.attending && (
                  <div className="animate-section-slide-delayed opacity-0">
                    <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dietary Restrictions or Special Accommodations
                    </label>
                    <textarea
                      id="dietaryRestrictions"
                      name="dietaryRestrictions"
                      rows="4"
                      value={formData.dietaryRestrictions}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                      placeholder="Please let us know of any dietary restrictions, allergies, or special accommodations needed..."
                    />
                  </div>
                )}

                {/* Email Confirmation */}
                <div className="bg-primary-light/10 dark:bg-gray-800 p-4 rounded-lg border border-primary/10 dark:border-gray-700 transition-colors duration-200 animate-section-slide-delayed-2 opacity-0">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sendConfirmationEmail"
                      checked={formData.sendConfirmationEmail}
                      onChange={handleInputChange}
                      className="text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light h-5 w-5 rounded"
                    />
                    <span className="ml-3 text-gray-700 dark:text-gray-200">
                      Send me a confirmation email
                    </span>
                  </label>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4 animate-button-entrance opacity-0">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className={`w-full font-medium py-4 rounded-lg shadow-lg transition-all duration-300 transform ${
                      !canSubmit
                        ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
                        : 'bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white hover:scale-105 hover:shadow-xl animate-button-pulse'
                    }`}
                  >
                    {isSubmissionInProgress ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Your RSVP...
                      </span>
                    ) : (
                      'Submit RSVP'
                    )}
                  </button>
                </div>
                
                {/* Error Message */}
                {hasSubmissionFailed && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-center animate-error-wiggle">
                    {error?.details?.[0]?.reason || error?.errorMessage || "There was an error submitting your RSVP. Please try again."}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Fallback - should not normally reach here
  return (
    <div>
      {rsvpHero}
      <section className="py-16">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white dark:bg-dark-card shadow-lg rounded-xl p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Loading...
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RSVP;