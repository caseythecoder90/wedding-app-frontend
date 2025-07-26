/**
 * Registry-specific API service
 * Handles all registry-related API calls using the base API service
 */

import api from './api.js';
import ValidationService from './validation.js';

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

class RegistryAPI {
  /**
   * Fetches complete registry overview with progress and statistics
   * @returns {Promise<RegistryOverview>} Registry overview data
   * @throws {APIError} When registry is not found or inactive
   */
  static async fetchOverview() {
    try {
      const data = await api.get('/v1/api/registry/overview');
      
      // Validate that we received the expected data structure
      if (!data || !data.settings) {
        throw api.createAPIError({ 
          errorMessage: 'Invalid response from server', 
          details: [{ reason: 'Registry settings not found in response' }] 
        });
      }
      
      return data;
    } catch (error) {
      // Re-throw APIError instances as-is
      if (error.errorMessage && error.details) {
        throw error;
      }
      
      // Handle unexpected errors
      throw api.createAPIError({
        errorMessage: error.message || 'Failed to fetch registry overview',
        details: [{ reason: 'Overview fetch error' }]
      });
    }
  }

  /**
   * Submits donation to honeymoon registry
   * @param {DonationFormData} donationData - Donation form data
   * @returns {Promise<Donation>} Created donation
   * @throws {APIError} When validation fails or duplicate detected
   */
  static async submitDonation(donationData) {
    try {
      // Validate donation data before sending
      const validation = ValidationService.validateDonationForm(donationData);
      if (!validation.isValid) {
        throw api.createAPIError({
          errorMessage: validation.errorMessage,
          details: validation.details
        });
      }

      // Sanitize input data
      const sanitizedData = {
        donorName: ValidationService.sanitizeInput(donationData.donorName),
        donorEmail: ValidationService.sanitizeInput(donationData.donorEmail),
        donorPhone: ValidationService.sanitizeInput(donationData.donorPhone),
        amount: typeof donationData.amount === 'string' ? 
          parseFloat(donationData.amount) : donationData.amount,
        paymentMethod: donationData.paymentMethod.toUpperCase(),
        paymentReference: ValidationService.sanitizeInput(donationData.paymentReference),
        message: ValidationService.sanitizeInput(donationData.message),
        guestId: donationData.guestId || null
      };

      const response = await api.post('/v1/api/registry/donations', sanitizedData);
      return response;
      
    } catch (error) {
      // Re-throw APIError instances as-is
      if (error.errorMessage && error.details) {
        throw error;
      }
      
      // Handle unexpected errors
      throw api.createAPIError({
        errorMessage: error.message || 'Failed to submit donation',
        details: [{ reason: 'Donation submission error' }]
      });
    }
  }


  /**
   * Fetches registry settings only (lighter weight than full overview)
   * @returns {Promise<RegistrySettings>} Registry settings
   * @throws {APIError} When registry is not found
   */
  static async fetchSettings() {
    try {
      const response = await api.get('/v1/api/registry/settings');
      return response;
      
    } catch (error) {
      // Re-throw APIError instances as-is
      if (error.errorMessage && error.details) {
        throw error;
      }
      
      // Handle unexpected errors
      throw api.createAPIError({
        errorMessage: error.message || 'Failed to fetch registry settings',
        details: [{ reason: 'Settings fetch error' }]
      });
    }
  }

  /**
   * Fetches donation statistics (admin/summary view)
   * @returns {Promise<Object>} Donation statistics
   * @throws {APIError} When request fails
   */
  static async fetchDonationStats() {
    try {
      const response = await api.get('/v1/api/registry/stats');
      return response;
      
    } catch (error) {
      // Re-throw APIError instances as-is
      if (error.errorMessage && error.details) {
        throw error;
      }
      
      // Handle unexpected errors
      throw api.createAPIError({
        errorMessage: error.message || 'Failed to fetch donation statistics',
        details: [{ reason: 'Stats fetch error' }]
      });
    }
  }

  /**
   * Validates donation form data (client-side validation)
   * @param {DonationFormData} donationData - Donation form data
   * @returns {ValidationResult} Validation result
   */
  static validateDonationForm(donationData) {
    return ValidationService.validateDonationForm(donationData);
  }

  /**
   * Validates individual donation fields (for real-time validation)
   * @param {string} field - Field name to validate
   * @param {any} value - Field value
   * @param {Object} [context] - Additional context for validation
   * @returns {FieldValidationResult} Field validation result
   */
  static validateDonationField(field, value, _context = {}) {
    switch (field) {
      case 'donorName':
        return ValidationService.validateRequiredText(value, 'Donor name', 2, 100);
      
      case 'donorEmail':
        return ValidationService.validateEmail(value);
      
      case 'donorPhone':
        return ValidationService.validatePhone(value, false);
      
      case 'amount':
        return ValidationService.validateDonationAmount(value);
      
      case 'paymentMethod':
        return ValidationService.validatePaymentMethod(value);
      
      case 'paymentReference':
        // Payment reference is always optional, but validate format if provided
        return value && value.trim() ? 
          ValidationService.validateRequiredText(value, 'Payment reference', 3, 100) :
          { isValid: true };
      
      case 'message':
        return value ? 
          ValidationService.validateRequiredText(value, 'Message', 1, 500) :
          { isValid: true };
      
      default:
        return { isValid: true };
    }
  }
}

export default RegistryAPI;