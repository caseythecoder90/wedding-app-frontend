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

  // Hero section - styled consistently with OurStory
  const rsvpHero = (
    <section className="relative py-24 bg-primary-light/30 dark:bg-primary-dark/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-script text-5xl text-primary dark:text-primary-light mb-6">RSVP</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            We would be honored to have you join us for our special day.
          </p>
        </div>
      </div>
    </section>
  );

  if (showCodeForm) {
    return (
      <div>
        {rsvpHero}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-dark-card shadow-md rounded-lg p-6 transition-colors duration-200">
              <h2 className="text-2xl font-display text-primary dark:text-primary-light mb-6 text-center">
                Enter Your Invitation Code
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-center">
                Please enter the invitation code from your invitation to access your RSVP.
              </p>
              
              <form onSubmit={handleCodeSubmit}>
                <div className="mb-6">
                  <label htmlFor="invitationCode" className="block text-gray-700 dark:text-gray-300 mb-2">
                    Invitation Code
                  </label>
                  <input
                    type="text"
                    id="invitationCode"
                    name="invitationCode"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="Enter your code here"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium py-3 rounded-md shadow-md transition-colors duration-200"
                >
                  Continue to RSVP
                </button>
              </form>
              
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Can't find your code? Contact us at <a href="mailto:weddinginfo@example.com" className="text-primary dark:text-primary-light hover:underline">weddinginfo@example.com</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (validationStatus === 'loading') {
    return (
      <div>
        {rsvpHero}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-white dark:bg-dark-card shadow-md rounded-lg p-6 transition-colors duration-200">
              <div className="flex justify-center mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary dark:border-primary-light"></div>
              </div>
              <h2 className="text-2xl font-display text-primary dark:text-primary-light mb-4">
                Validating...
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Please wait while we verify your invitation code.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (validationStatus === 'failed') {
    return (
      <div>
        {rsvpHero}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white dark:bg-dark-card shadow-md rounded-lg p-6 transition-colors duration-200">
              <div className="flex justify-center mb-6">
                <div className="rounded-full h-16 w-16 flex items-center justify-center bg-red-100 dark:bg-red-900">
                  <svg className="h-8 w-8 text-red-500 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-display text-primary dark:text-primary-light mb-4 text-center">
                Invalid Code
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
                {error?.details?.[0]?.reason || error?.errorMessage || "The invitation code is invalid. Please check your code and try again."}
              </p>
              
              <button
                onClick={() => {
                  dispatch(resetRsvpState());
                  setShowCodeForm(true);
                }}
                className="w-full bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium py-3 rounded-md shadow-md transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (submitted || submissionStatus === 'succeeded') {
    return (
      <div>
        {rsvpHero}
        <section className="py-16">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white dark:bg-dark-card shadow-md rounded-lg p-6 transition-colors duration-200">
              <div className="flex justify-center mb-6">
                <div className="rounded-full h-16 w-16 flex items-center justify-center bg-green-100 dark:bg-green-900">
                  <svg className="h-8 w-8 text-green-500 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                  className="bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white font-medium px-8 py-3 rounded-md shadow-md transition-colors duration-200"
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

  return (
    <div>
      {rsvpHero}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-dark-card shadow-md rounded-lg p-6 transition-colors duration-200">            
            {guest && (
              <div className="mb-8 text-center">
                <div className="h-16 w-16 bg-primary-light dark:bg-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-display text-primary dark:text-primary-light mb-2">
                  Hello, {guest.firstName} {guest.lastName}!
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {hasExistingRsvp 
                    ? "You've already responded, but you can update your RSVP below." 
                    : "Please fill out the form below to RSVP to our wedding."}
                </p>
              </div>
            )}
            
            <form onSubmit={handleRsvpSubmit} className="space-y-8">
              {/* Attendance Selection */}
              <div className="bg-primary-light/10 dark:bg-gray-800 p-6 rounded-lg border border-primary/10 dark:border-gray-700 transition-colors duration-200">
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-4">
                  Will you be attending our wedding?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${formData.attending ? 'border-primary dark:border-primary-light bg-white dark:bg-primary-dark/20' : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-transparent'}`}>
                    <input
                      type="radio"
                      name="attending"
                      checked={formData.attending}
                      onChange={() => dispatch(updateFormData({ attending: true }))}
                      className="text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light h-5 w-5"
                    />
                    <div className="ml-3">
                      <span className="text-gray-800 dark:text-gray-100 font-medium">Yes, I'll be there!</span>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">I'll join the celebration in Punta Cana</p>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${!formData.attending ? 'border-primary dark:border-primary-light bg-white dark:bg-primary-dark/20' : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-transparent'}`}>
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
              
              {/* Plus One Section */}
              {formData.attending && guest && guest.plusOneAllowed && (
                <div className="bg-primary-light/10 dark:bg-gray-800 p-6 rounded-lg border border-primary/10 dark:border-gray-700 transition-colors duration-200">
                  <label className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      name="bringingPlusOne"
                      checked={formData.bringingPlusOne}
                      onChange={handleInputChange}
                      className="text-primary dark:text-primary-light focus:ring-primary dark:focus:ring-primary-light h-5 w-5 rounded"
                    />
                    <span className="ml-3 text-gray-700 dark:text-gray-200 font-medium">
                      I'll be bringing a guest
                    </span>
                  </label>
                  
                  {formData.bringingPlusOne && (
                    <div className="mt-4 pl-8">
                      <label htmlFor="plusOneName" className="block text-gray-700 dark:text-gray-200 mb-2">
                        Guest's Name
                      </label>
                      <input
                        type="text"
                        id="plusOneName"
                        name="plusOneName"
                        value={formData.plusOneName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white transition-colors duration-200"
                        placeholder="Enter your guest's full name"
                        required
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Contact Information */}
              <div className="bg-primary-light/10 dark:bg-gray-800 p-6 rounded-lg border border-primary/10 dark:border-gray-700 transition-colors duration-200">
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="your@email.com"
                  required
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  We'll use this to send you confirmation and any updates about the wedding.
                </p>
              </div>
              
              {/* Dietary Restrictions */}
              {formData.attending && (
                <div className="bg-primary-light/10 dark:bg-gray-800 p-6 rounded-lg border border-primary/10 dark:border-gray-700 transition-colors duration-200">
                  <label htmlFor="dietaryRestrictions" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    Dietary Restrictions
                  </label>
                  <textarea
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-white dark:bg-gray-700 dark:text-white transition-colors duration-200"
                    placeholder="Please let us know if you have any dietary restrictions or allergies."
                  />
                </div>
              )}
              
              {/* Email Confirmation */}
              <div className="bg-primary-light/10 dark:bg-gray-800 p-4 rounded-lg border border-primary/10 dark:border-gray-700 transition-colors duration-200">
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
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submissionStatus === 'loading'}
                  className={`w-full font-medium py-3 rounded-md shadow-md transition-all duration-200 ${
                    submissionStatus === 'loading'
                      ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
                      : 'bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary text-white'
                  }`}
                >
                  {submissionStatus === 'loading' ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit RSVP'
                  )}
                </button>
              </div>
              
              {/* Error Message */}
              {submissionStatus === 'failed' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-center">
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