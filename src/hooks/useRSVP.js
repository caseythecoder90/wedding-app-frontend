import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  validateInvitationCode, 
  submitRsvp, 
  updateFormData, 
  resetRsvpState,
  clearError 
} from '../store/slices/rsvpSlice';

export const useRSVP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const rsvpState = useSelector((state) => state.rsvp);
  const invitationCode = searchParams.get('code');

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetRsvpState());
    };
  }, [dispatch]);

  // Auto-validate when code is in URL
  useEffect(() => {
    if (invitationCode && invitationCode !== rsvpState.lastValidatedCode) {
      dispatch(validateInvitationCode(invitationCode));
    }
  }, [dispatch, invitationCode, rsvpState.lastValidatedCode]);

  // Navigation helpers
  const navigateToCodeEntry = useCallback(() => {
    navigate('/rsvp', { replace: true });
    dispatch(resetRsvpState());
  }, [navigate, dispatch]);

  const navigateWithCode = useCallback((code) => {
    if (!code?.trim()) return;
    
    const cleanCode = code.trim().toUpperCase();
    
    // Clear any existing state first
    dispatch(resetRsvpState());
    
    // Navigate with new code
    navigate(`/rsvp?code=${encodeURIComponent(cleanCode)}`);
  }, [navigate, dispatch]);

  // Form handlers
  const updateForm = useCallback((updates) => {
    dispatch(updateFormData(updates));
  }, [dispatch]);

  const submitForm = useCallback(async (additionalData = {}) => {
    const rsvpData = {
      ...rsvpState.formData,
      ...additionalData,
      submittedAt: new Date().toISOString()
    };
    
    try {
      await dispatch(submitRsvp(rsvpData)).unwrap();
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }, [dispatch, rsvpState.formData]);

  // Error handling
  const clearErrors = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Validation helpers
  const isValidationInProgress = rsvpState.validationStatus === 'loading';
  const isValidationSuccessful = rsvpState.validationStatus === 'succeeded';
  const hasValidationFailed = rsvpState.validationStatus === 'failed';
  const isSubmissionInProgress = rsvpState.submissionStatus === 'loading';
  const isSubmissionSuccessful = rsvpState.submissionStatus === 'succeeded';
  const hasSubmissionFailed = rsvpState.submissionStatus === 'failed';

  // Determine what UI state to show
  const shouldShowCodeForm = !invitationCode || !isValidationSuccessful;
  const shouldShowMainForm = isValidationSuccessful && rsvpState.guest;
  const shouldShowSuccessPage = isSubmissionSuccessful;
  const shouldShowErrorPage = hasValidationFailed;
  const shouldShowLoadingPage = isValidationInProgress;

  // Form validation
  const isFormValid = useCallback(() => {
    const { attending, bringingPlusOne, plusOneName, email } = rsvpState.formData;
    
    // Email is always required
    if (!email?.includes('@')) return false;
    
    // If attending and bringing plus one, name is required
    if (attending && bringingPlusOne && !plusOneName?.trim()) return false;
    
    return true;
  }, [rsvpState.formData]);

  return {
    // State
    ...rsvpState,
    invitationCode,
    
    // Computed state
    isValidationInProgress,
    isValidationSuccessful,
    hasValidationFailed,
    isSubmissionInProgress,
    isSubmissionSuccessful,
    hasSubmissionFailed,
    shouldShowCodeForm,
    shouldShowMainForm,
    shouldShowSuccessPage,
    shouldShowErrorPage,
    shouldShowLoadingPage,
    
    // Actions
    navigateToCodeEntry,
    navigateWithCode,
    updateForm,
    submitForm,
    clearErrors,
    isFormValid,
    
    // Validation helpers
    canSubmit: isFormValid() && !isSubmissionInProgress,
    hasRepeatedFailures: rsvpState.validationAttempts >= 3,
  };
};