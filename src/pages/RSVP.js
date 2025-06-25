import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { validateInvitationCode, submitRsvp, updateFormData, resetRsvpState } from '../store/slices/rsvpSlice';

function RSVP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invitationCode = searchParams.get('code');
  
  const { 
    guest, 
    existingRsvp, 
    hasExistingRsvp, 
    formData,
    validationStatus, 
    submissionStatus, 
    error 
  } = useSelector((state) => state.rsvp);

  const [codeInput, setCodeInput] = useState(invitationCode || '');
  const [showCodeForm, setShowCodeForm] = useState(!invitationCode);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Reset RSVP state when component unmounts
    return () => {
      dispatch(resetRsvpState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (invitationCode) {
      dispatch(validateInvitationCode(invitationCode));
    }
  }, [dispatch, invitationCode]);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (codeInput.trim()) {
      setShowCodeForm(false);
      navigate(`/rsvp?code=${codeInput}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    dispatch(updateFormData({ [name]: inputValue }));
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    
    // Add submission timestamp
    const rsvpData = {
      ...formData,
      submittedAt: new Date().toISOString()
    };
    
    dispatch(submitRsvp(rsvpData))
      .unwrap()
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.error('Failed to submit RSVP:', err);
      });
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
  if (validationStatus === 'loading') {
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
  if (validationStatus === 'failed') {
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
                onClick={() => {
                  dispatch(resetRsvpState());
                  setShowCodeForm(true);
                }}
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
  if (submitted || submissionStatus === 'succeeded') {
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
                Your RSVP has been successfully submitted. We're looking forward to celebrating with you!
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
  if (showCodeForm) {
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
                  <label htmlFor="invitationCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                    Invitation Code
                  </label>
                  <input
                    type="text"
                    id="invitationCode"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-all duration-200"
                    placeholder="Enter your code"
                    required
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
  return (
    <div>
      {rsvpHero}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-dark-card shadow-lg rounded-xl p-8 transition-colors duration-200 animate-form-entrance opacity-0">            
            {guest && (
              <div className="mb-8 text-center animate-guest-welcome opacity-0">
                <div className="h-16 w-16 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200 animate-avatar-bounce">
                  <svg className="h-8 w-8 text-primary dark:text-primary-light transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-display text-primary dark:text-primary-light mb-2 transition-colors duration-200">
                  Hello, {guest.firstName} {guest.lastName}!
                </h2>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  {hasExistingRsvp 
                    ? "You've already responded, but you can update your RSVP below." 
                    : "Please fill out the form below to RSVP to our wedding."}
                </p>
              </div>
            )}
            
            <form onSubmit={handleRsvpSubmit} className="space-y-8">
              {/* Attendance Selection */}
              <div className="bg-primary-light/10 dark:bg-gray-800 p-6 rounded-xl border border-primary/20 dark:border-gray-700 transition-colors duration-200 animate-section-slide opacity-0">
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-6 transition-colors duration-200">
                  Will you be attending our wedding?
                </label>
                <div className="space-y-4">
                  <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    formData.attending 
                      ? 'border-primary dark:border-primary-light bg-primary/5 dark:bg-primary-dark/20 transform scale-105' 
                      : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-transparent hover:border-primary/50'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      checked={formData.attending}
                      onChange={() => dispatch(updateFormData({ attending: true }))}
                      className="text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light h-5 w-5"
                    />
                    <div className="ml-3">
                      <span className="text-gray-800 dark:text-gray-100 font-medium">Yes, I'll be there! 🎉</span>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Can't wait to celebrate with you</p>
                    </div>
                  </label>

                  <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    !formData.attending 
                      ? 'border-primary dark:border-primary-light bg-primary/5 dark:bg-primary-dark/20 transform scale-105' 
                      : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-transparent hover:border-primary/50'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      checked={!formData.attending}
                      onChange={() => dispatch(updateFormData({ attending: false }))}
                      className="text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light h-5 w-5"
                    />
                    <div className="ml-3">
                      <span className="text-gray-800 dark:text-gray-100 font-medium">Sorry, I can't make it</span>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">I'll be there in spirit</p>
                    </div>
                  </label>
                </div>
              </div>
              
              {/* Plus One Section with Conditional Animation */}
              {formData.attending && guest && guest.plusOneAllowed && (
                <div className="bg-primary-light/10 dark:bg-gray-800 p-6 rounded-xl border border-primary/20 dark:border-gray-700 transition-all duration-300 animate-slide-down">
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="bringingPlusOne"
                      checked={formData.bringingPlusOne}
                      onChange={handleInputChange}
                      className="text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light h-5 w-5 rounded transition-all duration-200"
                    />
                    <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
                      I'll be bringing a guest
                    </span>
                  </label>
                  
                  {formData.bringingPlusOne && (
                    <div className="mt-4 pl-8 animate-fade-slide">
                      <label htmlFor="plusOneName" className="block text-gray-700 dark:text-gray-200 mb-2">
                        Guest's Name
                      </label>
                      <input
                        type="text"
                        id="plusOneName"
                        name="plusOneName"
                        value={formData.plusOneName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white transition-all duration-200"
                        placeholder="Enter guest's full name"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Dietary Restrictions */}
              {formData.attending && (
                <div className="animate-section-slide-delayed opacity-0">
                  <label htmlFor="dietaryRestrictions" className="block text-gray-700 dark:text-gray-200 font-medium mb-3">
                    Dietary Restrictions or Special Requests
                  </label>
                  <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    rows="3"
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
                  disabled={submissionStatus === 'loading'}
                  className={`w-full font-medium py-4 rounded-lg shadow-lg transition-all duration-300 transform ${
                    submissionStatus === 'loading'
                      ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
                      : 'bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white hover:scale-105 hover:shadow-xl animate-button-pulse'
                  }`}
                >
                  {submissionStatus === 'loading' ? (
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
              {submissionStatus === 'failed' && (
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

export default RSVP;