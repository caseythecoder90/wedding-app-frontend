import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RSVPAPIService from '../../services/rsvpAPI.js';

/**
 * Primary Guest object shape (from new API InvitationValidationResponse)
 * @typedef {Object} PrimaryGuest
 * @property {number} id - Guest database ID
 * @property {string} firstName - Guest's first name
 * @property {string} lastName - Guest's last name
 * @property {string} email - Guest's email address
 * @property {boolean} plusOneAllowed - Can bring plus-one
 * @property {boolean} hasRsvp - Has submitted RSVP
 * @property {number|null} rsvpId - RSVP ID if exists
 */

/**
 * Family Group object shape
 * @typedef {Object} FamilyGroup
 * @property {number} id - Family group ID
 * @property {string} groupName - Group name
 * @property {number} maxAttendees - Maximum attendees allowed
 * @property {number} primaryContactGuestId - Primary contact guest ID
 * @property {string} createdAt - ISO datetime string
 */

/**
 * Family Member object shape
 * @typedef {Object} FamilyMember
 * @property {number} id - Family member ID
 * @property {string} firstName - First name
 * @property {string} lastName - Last name
 * @property {string} ageGroup - Age group (ADULT, CHILD, INFANT)
 * @property {string|null} dietaryRestrictions - Dietary restrictions
 * @property {boolean|null} isAttending - Is attending
 * @property {number} familyGroupId - Family group ID
 */

/**
 * RSVP object shape (from backend RSVPResponseDTO)
 * @typedef {Object} ExistingRSVP
 * @property {number} id - RSVP database ID
 * @property {number} guestId - Guest ID
 * @property {string} guestName - Full guest name
 * @property {string} guestEmail - Guest email
 * @property {boolean} attending - Is attending
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
 * @property {string} dietaryRestrictions - Dietary restrictions
 * @property {string} email - Guest email
 * @property {boolean} sendConfirmationEmail - Send confirmation
 * @property {Array} familyMembers - Array of family members (includes plus-ones)
 */

export const validateInvitationCode = createAsyncThunk(
  'rsvp/validateInvitationCode',

  /**
   * Validates invitation code with backend
   * @param {string} code - Invitation code (e.g., "WEDABC123")
   * @returns {Promise<InvitationValidationResponse>}
   * @throws {APIError} When code is invalid or expired
   */
  async (code, { rejectWithValue }) => {
    try {
      return await RSVPAPIService.validateInvitationCode(code);
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.message,
        details: [{ reason: error.message }]
      });
    }
  }
);

export const submitRsvp = createAsyncThunk(
  'rsvp/submitRsvp',

  /**
   * Submits RSVP data to backend
   * @param {FormData} rsvpData - RSVP form data
   * @returns {Promise<ExistingRSVP>} Created/updated RSVP
   * @throws {APIError} When validation fails or guest not found
   */
  async (rsvpData, { rejectWithValue }) => {
    try {
      return await RSVPAPIService.submitRSVP(rsvpData);
    } catch (error) {
      return rejectWithValue({
        errorMessage: error.message,
        details: [{ reason: error.message }]
      });
    }
  }
);


const initialState = {
  /** @type {PrimaryGuest|null} */
  primaryGuest: null,

  /** @type {ExistingRSVP|null} */
  existingRsvp: null,

  /** @type {boolean} */
  hasExistingRsvp: false,

  /** @type {'SOLO'|'SOLO_WITH_PLUS_ONE'|'FAMILY_PRIMARY'|null} */
  guestType: null,

  /** @type {FamilyGroup|null} */
  familyGroup: null,

  /** @type {Array<FamilyMember>} */
  familyMembers: [],

  /** @type {boolean} */
  canBringPlusOne: false,

  /** @type {FormData} */
  formData: {
    guestId: null,
    attending: true,
    dietaryRestrictions: '',
    email: '',
    sendConfirmationEmail: true,
    familyMembers: [],
  },

  /** @type {'idle'|'loading'|'succeeded'|'failed'} */
  validationStatus: 'idle', 

  /** @type {'idle'|'loading'|'succeeded'|'failed'} */
  submissionStatus: 'idle', 

  /** @type {APIError|null} */
  error: null,
  
  // Add validation attempt tracking
  validationAttempts: 0,
  lastValidatedCode: null,
};


const rsvpSlice = createSlice({
  name: 'rsvp',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateFamilyMember: (state, action) => {
      const { index, updates } = action.payload;
      if (state.formData.familyMembers[index]) {
        state.formData.familyMembers[index] = { 
          ...state.formData.familyMembers[index], 
          ...updates 
        };
      }
    },
    addFamilyMember: (state, action) => {
      const newMember = {
        familyMemberId: null,
        firstName: '',
        lastName: '',
        ageGroup: 'ADULT',
        isAttending: true,
        dietaryRestrictions: '',
        ...action.payload
      };
      state.formData.familyMembers.push(newMember);
    },
    removeFamilyMember: (state, action) => {
      const index = action.payload;
      state.formData.familyMembers.splice(index, 1);
    },
    resetRsvpState: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    incrementValidationAttempts: (state) => {
      state.validationAttempts += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Validate invitation code
      .addCase(validateInvitationCode.pending, (state, action) => {
        state.validationStatus = 'loading';
        state.error = null;
        state.lastValidatedCode = action.meta.arg;
      })
      .addCase(validateInvitationCode.fulfilled, (state, action) => {
        state.validationStatus = 'succeeded';
        const { primaryGuest, existingRsvp, hasExistingRsvp, guestType, familyGroup, familyMembers, canBringPlusOne } = action.payload;
        
        state.primaryGuest = primaryGuest;
        state.existingRsvp = existingRsvp;
        state.hasExistingRsvp = hasExistingRsvp;
        state.guestType = guestType;
        state.familyGroup = familyGroup || null;
        state.familyMembers = familyMembers || [];
        state.canBringPlusOne = canBringPlusOne || false;
        state.validationAttempts = 0; // Reset on success
        
        // Pre-populate form with existing data
        if (state.hasExistingRsvp) {
          state.formData = {
            guestId: primaryGuest.id,
            attending: existingRsvp.attending,
            dietaryRestrictions: existingRsvp.dietaryRestrictions || '',
            email: existingRsvp.guestEmail || primaryGuest.email || '',
            sendConfirmationEmail: true,
            familyMembers: [],
          };

          // For existing RSVPs, still populate family members from the backend data
          // This handles cases where the family structure may have been updated
          if (guestType === 'FAMILY_PRIMARY' && familyMembers?.length) {
            state.formData.familyMembers = familyMembers.map(member => ({
              familyMemberId: member.id,
              firstName: member.firstName,
              lastName: member.lastName,
              ageGroup: member.ageGroup?.toUpperCase() || 'ADULT',
              isAttending: member.isAttending !== null ? member.isAttending : true,
              dietaryRestrictions: member.dietaryRestrictions || '',
            }));
          }
        } else {
          // Initialize form based on guest type
          state.formData = {
            ...state.formData,
            guestId: primaryGuest.id,
            email: primaryGuest.email || '',
            familyMembers: [],
          };
          
          // For family primary, pre-populate with existing family members
          if (guestType === 'FAMILY_PRIMARY' && familyMembers?.length) {
            state.formData.familyMembers = familyMembers.map(member => ({
              familyMemberId: member.id,
              firstName: member.firstName,
              lastName: member.lastName,
              ageGroup: member.ageGroup?.toUpperCase() || 'ADULT',
              isAttending: member.isAttending !== null ? member.isAttending : true,
              dietaryRestrictions: member.dietaryRestrictions || '',
            }));
          }
          
          // For solo with plus one, add empty plus one slot
          if (guestType === 'SOLO_WITH_PLUS_ONE') {
            state.formData.familyMembers = [{
              familyMemberId: null,
              firstName: '',
              lastName: '',
              ageGroup: 'ADULT',
              isAttending: true,
              dietaryRestrictions: '',
            }];
          }
        }
      })
      .addCase(validateInvitationCode.rejected, (state, action) => {
        state.validationStatus = 'failed';
        state.error = action.payload;
        state.validationAttempts += 1;
        // Clear guest data on failed validation
        state.primaryGuest = null;
        state.existingRsvp = null;
        state.hasExistingRsvp = false;
        state.guestType = null;
        state.familyGroup = null;
        state.familyMembers = [];
        state.canBringPlusOne = false;
      })
      
      // Submit RSVP
      .addCase(submitRsvp.pending, (state) => {
        state.submissionStatus = 'loading';
        state.error = null;
      })
      .addCase(submitRsvp.fulfilled, (state, action) => {
        state.submissionStatus = 'succeeded';
        state.existingRsvp = action.payload;
        state.hasExistingRsvp = true;
      })
      .addCase(submitRsvp.rejected, (state, action) => {
        state.submissionStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { 
  updateFormData, 
  updateFamilyMember,
  addFamilyMember,
  removeFamilyMember,
  resetRsvpState, 
  clearError, 
  incrementValidationAttempts 
} = rsvpSlice.actions;

export default rsvpSlice.reducer;