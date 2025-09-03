import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  validateInvitationCode, 
  submitRsvp, 
  updateFormData,
  updateFamilyMember,
  addFamilyMember,
  removeFamilyMember,
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

  const updateFamilyMemberData = useCallback((index, updates) => {
    dispatch(updateFamilyMember({ index, updates }));
  }, [dispatch]);

  const addNewFamilyMember = useCallback((memberData = {}) => {
    dispatch(addFamilyMember(memberData));
  }, [dispatch]);

  const removeFamilyMemberData = useCallback((index) => {
    dispatch(removeFamilyMember(index));
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
  const shouldShowLoadingPage = isValidationInProgress;
  const shouldShowSuccessPage = isSubmissionSuccessful;
  
  const shouldShowErrorPage = invitationCode && hasValidationFailed;
  
  const shouldShowMainForm = isValidationSuccessful && rsvpState.primaryGuest && !shouldShowSuccessPage;
  
  const shouldShowCodeForm = !shouldShowLoadingPage && 
                            !shouldShowSuccessPage && 
                            !shouldShowErrorPage && 
                            !shouldShowMainForm;

  // Form validation
  const isFormValid = useCallback(() => {
    const { attending, email, familyMembers } = rsvpState.formData;
    const { guestType } = rsvpState;
    
    // Email is always required
    if (!email?.includes('@')) return false;
    
    // If attending, validate family members based on guest type
    if (attending) {
      if (guestType === 'SOLO_WITH_PLUS_ONE' && familyMembers?.length > 0) {
        // For plus-ones, if they're attending, they need a name
        const plusOne = familyMembers[0];
        if (plusOne?.isAttending && (!plusOne?.firstName?.trim() || !plusOne?.lastName?.trim())) {
          return false;
        }
      }
      
      if (guestType === 'FAMILY_PRIMARY') {
        // For family members, if they're attending, they need names
        for (const member of familyMembers || []) {
          if (member?.isAttending && (!member?.firstName?.trim() || !member?.lastName?.trim())) {
            return false;
          }
        }
      }
    }
    
    return true;
  }, [rsvpState]);

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
    updateFamilyMemberData,
    addNewFamilyMember,
    removeFamilyMemberData,
    submitForm,
    clearErrors,
    isFormValid,
    
    // Validation helpers
    canSubmit: isFormValid() && !isSubmissionInProgress,
    hasRepeatedFailures: rsvpState.validationAttempts >= 5,
  };
};