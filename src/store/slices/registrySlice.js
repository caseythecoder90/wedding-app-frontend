// src/store/slices/registrySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Registry settings object shape (from backend RegistrySettingsDTO)
 * @typedef {Object} RegistrySettings
 * @property {number} id - Settings database ID
 * @property {number} honeymoonGoalAmount - Target amount for honeymoon fund
 * @property {string|null} venmoHandle - Venmo payment handle
 * @property {string|null} zelleHandle - Zelle payment handle  
 * @property {string|null} registryDescription - Description text
 * @property {boolean} isActive - Registry is active
 * @property {string} createdAt - ISO datetime string
 * @property {string} updatedAt - ISO datetime string
 */

/**
 * Registry overview object shape (from backend RegistryOverviewDTO)
 * @typedef {Object} RegistryOverview
 * @property {RegistrySettings} settings - Registry configuration
 * @property {number} totalDonated - Total confirmed donations
 * @property {number} goalAmount - Target amount
 * @property {number} progressPercentage - Progress toward goal (0-100)
 * @property {number} totalDonations - Count of confirmed donations
 * @property {number} pendingDonations - Count of pending donations
 * @property {number} averageDonation - Average donation amount
 */

/**
 * Donation object shape (from backend DonationResponseDTO)
 * @typedef {Object} Donation
 * @property {number} id - Donation database ID
 * @property {string} donorName - Donor's name
 * @property {string|null} donorEmail - Donor's email
 * @property {string|null} donorPhone - Donor's phone
 * @property {number} amount - Donation amount
 * @property {string} paymentMethod - 'VENMO', 'ZELLE', 'OTHER'
 * @property {string|null} paymentReference - Payment transaction reference
 * @property {string|null} message - Personal message from donor
 * @property {string} status - 'PENDING', 'CONFIRMED', 'THANKED'
 * @property {number|null} guestId - Guest ID if donor is wedding guest
 * @property {string} donationDate - ISO datetime string
 * @property {string|null} confirmedDate - ISO datetime string
 * @property {string|null} thankYouSentDate - ISO datetime string
 */

/**
 * Form data shape for donation submission
 * @typedef {Object} DonationFormData
 * @property {string} donorName - Donor's full name
 * @property {string} donorEmail - Donor's email address
 * @property {string} donorPhone - Donor's phone number
 * @property {number} amount - Donation amount
 * @property {string} paymentMethod - 'VENMO', 'ZELLE', 'OTHER'
 * @property {string} paymentReference - Transaction ID or reference
 * @property {string} message - Personal message to couple
 * @property {number|null} guestId - Guest ID if donor is wedding guest
 */

// Async Thunks for API calls

export const fetchRegistryOverview = createAsyncThunk(
  'registry/fetchOverview',
  /**
   * Fetches complete registry overview with progress and statistics
   * @returns {Promise<RegistryOverview>} Registry overview data
   * @throws {APIError} When registry is not found or inactive
   */
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/v1/api/registry/overview`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      const data = await response.json();
      
      // Validate that we received the expected data structure
      if (!data.settings) {
        return rejectWithValue({ 
          errorMessage: 'Invalid response from server', 
          details: [{ reason: 'Registry settings not found in response' }] 
        });
      }
      
      return data;
    } catch (error) {
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

export const submitDonation = createAsyncThunk(
  'registry/submitDonation',
  /**
   * Submits donation to honeymoon registry
   * @param {DonationFormData} donationData - Donation form data
   * @returns {Promise<Donation>} Created donation
   * @throws {APIError} When validation fails or duplicate detected
   */
  async (donationData, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      
      // Validate required fields before sending
      if (!donationData.donorName?.trim()) {
        return rejectWithValue({
          errorMessage: 'Please provide your name.',
          details: [{ reason: 'Missing donor name' }]
        });
      }
      
      if (!donationData.donorEmail || !donationData.donorEmail.includes('@')) {
        return rejectWithValue({
          errorMessage: 'Please provide a valid email address.',
          details: [{ reason: 'Invalid email format' }]
        });
      }
      
      if (!donationData.amount || donationData.amount < 1) {
        return rejectWithValue({
          errorMessage: 'Please enter a donation amount of at least $1.00.',
          details: [{ reason: 'Invalid donation amount' }]
        });
      }
      
      if (!donationData.paymentMethod) {
        return rejectWithValue({
          errorMessage: 'Please select a payment method.',
          details: [{ reason: 'Missing payment method' }]
        });
      }
      
      const response = await fetch(`${apiUrl}/v1/api/registry/donations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return rejectWithValue({ 
          errorMessage: 'Unable to submit donation. Please check your internet connection and try again.',
          details: [{ reason: 'Network error' }]
        });
      }
      
      return rejectWithValue({ 
        errorMessage: error.message || 'Failed to submit donation',
        details: [{ reason: 'Submission error' }]
      });
    }
  }
);

export const fetchRecentDonations = createAsyncThunk(
  'registry/fetchRecentDonations',
  /**
   * Fetches recent confirmed donations for display (optional feature)
   * @returns {Promise<Donation[]>} List of recent donations
   */
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/v1/api/registry/donations?status=CONFIRMED`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return rejectWithValue({ 
          errorMessage: 'Unable to load recent donations.',
          details: [{ reason: 'Network error' }]
        });
      }
      
      return rejectWithValue({ 
        errorMessage: error.message || 'Failed to load donations',
        details: [{ reason: 'Fetch error' }]
      });
    }
  }
);

const initialState = {
  /** @type {RegistryOverview|null} */
  overview: null,

  /** @type {RegistrySettings|null} */
  settings: null,

  /** @type {Donation[]} */
  recentDonations: [],

  /** @type {Donation|null} */
  lastSubmittedDonation: null,

  /** @type {DonationFormData} */
  donationForm: {
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    amount: '',
    paymentMethod: '',
    paymentReference: '',
    message: '',
    guestId: null,
  },

  /** @type {'idle'|'loading'|'succeeded'|'failed'} */
  overviewStatus: 'idle',

  /** @type {'idle'|'loading'|'succeeded'|'failed'} */
  donationStatus: 'idle',

  /** @type {'idle'|'loading'|'succeeded'|'failed'} */
  recentDonationsStatus: 'idle',

  /** @type {APIError|null} */
  error: null,

  // UI state
  showSuccessModal: false,
  submissionAttempts: 0,
};

const registrySlice = createSlice({
  name: 'registry',
  initialState,
  reducers: {
    updateDonationForm: (state, action) => {
      state.donationForm = { ...state.donationForm, ...action.payload };
    },
    resetDonationForm: (state) => {
      state.donationForm = initialState.donationForm;
    },
    clearError: (state) => {
      state.error = null;
    },
    showSuccessModal: (state) => {
      state.showSuccessModal = true;
    },
    hideSuccessModal: (state) => {
      state.showSuccessModal = false;
    },
    resetRegistryState: () => initialState,
    incrementSubmissionAttempts: (state) => {
      state.submissionAttempts += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch registry overview
      .addCase(fetchRegistryOverview.pending, (state) => {
        state.overviewStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchRegistryOverview.fulfilled, (state, action) => {
        state.overviewStatus = 'succeeded';
        state.overview = action.payload;
        state.settings = action.payload.settings;
      })
      .addCase(fetchRegistryOverview.rejected, (state, action) => {
        state.overviewStatus = 'failed';
        state.error = action.payload;
      })
      
      // Submit donation
      .addCase(submitDonation.pending, (state) => {
        state.donationStatus = 'loading';
        state.error = null;
      })
      .addCase(submitDonation.fulfilled, (state, action) => {
        state.donationStatus = 'succeeded';
        state.lastSubmittedDonation = action.payload;
        state.showSuccessModal = true;
        state.submissionAttempts = 0;
        // Reset form after successful submission
        state.donationForm = initialState.donationForm;
      })
      .addCase(submitDonation.rejected, (state, action) => {
        state.donationStatus = 'failed';
        state.error = action.payload;
        state.submissionAttempts += 1;
      })
      
      // Fetch recent donations
      .addCase(fetchRecentDonations.pending, (state) => {
        state.recentDonationsStatus = 'loading';
      })
      .addCase(fetchRecentDonations.fulfilled, (state, action) => {
        state.recentDonationsStatus = 'succeeded';
        state.recentDonations = action.payload;
      })
      .addCase(fetchRecentDonations.rejected, (state, action) => {
        state.recentDonationsStatus = 'failed';
        // Don't set main error for recent donations failure
      });
  },
});

export const { 
  updateDonationForm, 
  resetDonationForm, 
  clearError, 
  showSuccessModal, 
  hideSuccessModal, 
  resetRegistryState,
  incrementSubmissionAttempts 
} = registrySlice.actions;

export default registrySlice.reducer;