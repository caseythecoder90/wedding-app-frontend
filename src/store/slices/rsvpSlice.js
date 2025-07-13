import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const validateInvitationCode = createAsyncThunk(
  'rsvp/validateInvitationCode',

  /**
   * Validates invitation code with backend
   * @param {string} code - Invitation code (e.g., "WEDABC123")
   * @returns {Promise<{guest: Guest, existingRsvp: ExistingRSVP|null, hasExistingRsvp: boolean}>}
   * @throws {APIError} When code is invalid or expired
   */
  async (code, { rejectWithValue }) => {
    try {

      console.log("CODE: ", code);
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/v1/api/invitation/validate/${encodeURIComponent(code)}`);

      console.log("RESPONSE FROM INVITATION VALIDATION: " + response);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      const data = await response.json();
      
      // Validate that we received the expected data structure
      if (!data.guest) {
        return rejectWithValue({ 
          errorMessage: 'Invalid response from server', 
          details: [{ reason: 'Guest information not found in response' }] 
        });
      }
      
      return data;
    } catch (error) {
      // Handle network errors, timeout, etc.
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return rejectWithValue({ 
          errorMessage: 'Unable to connect to server. Please check your internet connection and try again.',
          details: [{ reason: 'Network error' }]
        });
      }
      
      return rejectWithValue({ 
        errorMessage: error.message || 'An unexpected error occurred',
        details: [{ reason: 'Unknown error' }]
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
      const apiUrl = process.env.REACT_APP_API_URL || '';
      
      // Validate required fields before sending
      if (!rsvpData.guestId) {
        return rejectWithValue({
          errorMessage: 'Guest information is missing. Please refresh and try again.',
          details: [{ reason: 'Missing guest ID' }]
        });
      }
      
      if (!rsvpData.email || !rsvpData.email.includes('@')) {
        return rejectWithValue({
          errorMessage: 'Please provide a valid email address.',
          details: [{ reason: 'Invalid email format' }]
        });
      }
      
      if (rsvpData.bringingPlusOne && !rsvpData.plusOneName?.trim()) {
        return rejectWithValue({
          errorMessage: 'Please provide your plus one\'s name.',
          details: [{ reason: 'Missing plus one name' }]
        });
      }
      
      const response = await fetch(`${apiUrl}/v1/api/rsvps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      return await response.json();
    } catch (error) {
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return rejectWithValue({ 
          errorMessage: 'Unable to submit RSVP. Please check your internet connection and try again.',
          details: [{ reason: 'Network error' }]
        });
      }
      
      return rejectWithValue({ 
        errorMessage: error.message || 'Failed to submit RSVP',
        details: [{ reason: 'Submission error' }]
      });
    }
  }
);


const initialState = {
  /** @type {Guest|null} */
  guest: null,

   /** @type {ExistingRSVP|null} */
  existingRsvp: null,

  /** @type {boolean} */
  hasExistingRsvp: false,

  /** @type {FormData} */
  formData: {
    guestId: null,
    attending: true,
    bringingPlusOne: false,
    plusOneName: '',
    dietaryRestrictions: '',
    email: '',
    sendConfirmationEmail: true,
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
    resetRsvpState: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
    // Add reducer to track validation attempts
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
        state.guest = action.payload.guest;
        state.existingRsvp = action.payload.existingRsvp;
        state.hasExistingRsvp = action.payload.hasExistingRsvp;
        state.validationAttempts = 0; // Reset on success
        
        // Pre-populate form with existing data
        if (state.hasExistingRsvp) {
          state.formData = {
            guestId: state.guest.id,
            attending: state.existingRsvp.attending,
            bringingPlusOne: state.existingRsvp.bringingPlusOne,
            plusOneName: state.existingRsvp.plusOneName || '',
            dietaryRestrictions: state.existingRsvp.dietaryRestrictions || '',
            email: state.existingRsvp.guestEmail || state.guest.email || '',
            sendConfirmationEmail: true,
          };
        } else {
          state.formData = {
            ...state.formData,
            guestId: state.guest.id,
            email: state.guest.email || '',
          };
        }
      })
      .addCase(validateInvitationCode.rejected, (state, action) => {
        state.validationStatus = 'failed';
        state.error = action.payload;
        state.validationAttempts += 1;
        // Clear guest data on failed validation
        state.guest = null;
        state.existingRsvp = null;
        state.hasExistingRsvp = false;
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

export const { updateFormData, resetRsvpState, clearError, incrementValidationAttempts } = rsvpSlice.actions;

export default rsvpSlice.reducer;