import api from './api.js';
import ValidationService from './validation.js';

/**
 * RSVP-specific API service for handling invitation validation and RSVP submissions
 * Uses the base API service instance for HTTP operations
 */
class RSVPAPIService {
  /**
   * Validates invitation code with backend
   * @param {string} code - Invitation code (e.g., "WEDABC123")
   * @returns {Promise<{guest: Object, existingRsvp: Object|null, hasExistingRsvp: boolean}>}
   * @throws {APIError} When code is invalid or expired
   */
  static async validateInvitationCode(code) {
    try {
      const validation = ValidationService.validateInvitationCode(code);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const response = await api.get(`/v1/api/invitation/validate/${encodeURIComponent(code)}`);
      
      // Validate that we received the expected data structure
      if (!response.guest) {
        throw new Error('Guest information not found in response');
      }
      
      return response;
    } catch (error) {
      console.error('Invitation validation failed:', error);
      throw RSVPAPIService.formatError(error, 'Failed to validate invitation code');
    }
  }

  /**
   * Submits RSVP data to backend
   * @param {Object} rsvpData - RSVP form data
   * @returns {Promise<Object>} Created/updated RSVP
   * @throws {APIError} When validation fails or guest not found
   */
  static async submitRSVP(rsvpData) {
    try {
      const validation = ValidationService.validateRSVPForm(rsvpData);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const sanitizedData = RSVPAPIService.sanitizeRSVPData(rsvpData);
      
      const response = await api.post('/v1/api/rsvps', sanitizedData);
      
      return response;
    } catch (error) {
      console.error('RSVP submission failed:', error);
      throw RSVPAPIService.formatError(error, 'Failed to submit RSVP');
    }
  }

  /**
   * Sanitizes RSVP data before sending to API
   * @param {Object} rsvpData - Raw form data
   * @returns {Object} Sanitized data
   */
  static sanitizeRSVPData(rsvpData) {
    return {
      guestId: parseInt(rsvpData.guestId) || null,
      attending: Boolean(rsvpData.attending),
      bringingPlusOne: Boolean(rsvpData.bringingPlusOne),
      plusOneName: rsvpData.plusOneName?.trim() || '',
      dietaryRestrictions: rsvpData.dietaryRestrictions?.trim() || '',
      email: rsvpData.email?.trim()?.toLowerCase() || '',
      sendConfirmationEmail: Boolean(rsvpData.sendConfirmationEmail)
    };
  }

  /**
   * Formats error messages specifically for RSVP operations
   * @param {Error} error - Original error
   * @param {string} defaultMessage - Default error message
   * @returns {Error} Formatted error
   */
  static formatError(error, defaultMessage) {
    // Get the error message from either standard Error or APIError format
    const errorMessage = error.errorMessage || error.message || '';
    
    if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
      return new Error('Unable to connect to server. Please check your internet connection and try again.');
    }
    
    if (errorMessage.includes('INVALID_INVITATION_CODE') || errorMessage.includes('invalid invitation')) {
      return new Error('The invitation code is invalid. Please check your code and try again.');
    }
    
    if (errorMessage.includes('expired')) {
      return new Error('This invitation code has expired. Please contact us for assistance.');
    }
    
    if (errorMessage.includes('already used')) {
      return new Error('This invitation code has already been used.');
    }
    
    if (errorMessage.includes('email')) {
      return new Error('Please provide a valid email address.');
    }
    
    if (errorMessage.includes('plus one')) {
      return new Error('Please provide your plus one\'s name.');
    }
    
    // Return the original error message or default
    return new Error(errorMessage || defaultMessage);
  }
}

export default RSVPAPIService;