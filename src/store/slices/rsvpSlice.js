import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const validateInvitationCode = createAsyncThunk(
  'rsvp/validateInvitationCode',
  async (code, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/v1/api/invitation/validate/${code}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

export const submitRsvp = createAsyncThunk(
  'rsvp/submitRsvp',
  async (rsvpData, { rejectWithValue }) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
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
      return rejectWithValue({ errorMessage: error.message });
    }
  }
);

const initialState = {
  guest: null,
  existingRsvp: null,
  hasExistingRsvp: false,
  formData: {
    guestId: null,
    attending: true,
    bringingPlusOne: false,
    plusOneName: '',
    dietaryRestrictions: '',
    email: '',
    sendConfirmationEmail: true,
  },
  validationStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  submissionStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const rsvpSlice = createSlice({
  name: 'rsvp',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetRsvpState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Validate invitation code
      .addCase(validateInvitationCode.pending, (state) => {
        state.validationStatus = 'loading';
        state.error = null;
      })
      .addCase(validateInvitationCode.fulfilled, (state, action) => {
        state.validationStatus = 'succeeded';
        state.guest = action.payload.guest;
        state.existingRsvp = action.payload.existingRsvp;
        state.hasExistingRsvp = action.payload.hasExistingRsvp;
        
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

export const { updateFormData, resetRsvpState } = rsvpSlice.actions;

export default rsvpSlice.reducer;