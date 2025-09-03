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
   * @returns {Promise<InvitationValidationResponse>}
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
      if (!response.primaryGuest) {
        throw new Error('Primary guest information not found in response');
      }
      
      return response;
    } catch (error) {
      console.error('Invitation validation failed:', error);
      throw RSVPAPIService.formatError(error, 'Failed to validate invitation code');
    }
  }

  /**
   * Submits RSVP data to backend
   * @param {Object} rsvpData - RSVP form data with new structure
   * @returns {Promise<RSVPResponse>} Created/updated RSVP
   * @throws {APIError} When validation fails or guest not found
   */
  static async submitRSVP(rsvpData) {
    try {
      const validation = ValidationService.validateRSVPForm(rsvpData);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const sanitizedData = RSVPAPIService.sanitizeRSVPData(rsvpData);
      
      // Use longer timeout for RSVP submissions (30 seconds)
      const response = await api.post('/v1/api/rsvps', sanitizedData, { timeout: 30000 });
      
      return response;
    } catch (error) {
      console.error('RSVP submission failed:', error);
      throw RSVPAPIService.formatError(error, 'Failed to submit RSVP');
    }
  }

  /**
   * Sanitizes RSVP data before sending to API
   * @param {Object} rsvpData - Raw form data
   * @returns {Object} Sanitized data matching RSVPRequest structure
   */
  static sanitizeRSVPData(rsvpData) {
    const sanitized = {
      guestId: parseInt(rsvpData.guestId) || null,
      attending: Boolean(rsvpData.attending),
      dietaryRestrictions: rsvpData.dietaryRestrictions?.trim() || undefined,
      email: rsvpData.email?.trim()?.toLowerCase() || '',
      sendConfirmationEmail: Boolean(rsvpData.sendConfirmationEmail),
      submittedAt: rsvpData.submittedAt || new Date().toISOString()
    };

    // Handle family members if present
    if (rsvpData.familyMembers && Array.isArray(rsvpData.familyMembers)) {
      sanitized.familyMembers = rsvpData.familyMembers.map(member => ({
        familyMemberId: member.familyMemberId || null,
        firstName: member.firstName?.trim() || '',
        lastName: member.lastName?.trim() || '',
        ageGroup: (member.ageGroup || 'ADULT').toLowerCase(),
        isAttending: Boolean(member.isAttending),
        dietaryRestrictions: member.dietaryRestrictions?.trim() || undefined
      }));
    }

    return sanitized;
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
    
    if (errorMessage.includes('plus one') || errorMessage.includes('family member name')) {
      return new Error('Please provide all required guest names.');
    }
    
    if (errorMessage.includes('family')) {
      return new Error('There was an error with family member information. Please check all details.');
    }

    if (errorMessage.includes('max attendees') || errorMessage.includes('exceeded')) {
      return new Error('You have exceeded the maximum number of attendees allowed for your invitation.');
    }
    
    // Return the original error message or default
    return new Error(errorMessage || defaultMessage);
  }
}

export default RSVPAPIService;