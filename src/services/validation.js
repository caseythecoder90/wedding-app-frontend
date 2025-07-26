/**
 * Validation utility service for form and data validation
 * Provides reusable validation functions with consistent error formatting
 */

/**
 * Validation result
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {string} [errorMessage] - Human-readable error message
 * @property {Array<{field: string, reason: string}>} [details] - Field-specific error details
 */

/**
 * Field validation result
 * @typedef {Object} FieldValidationResult
 * @property {boolean} isValid - Whether field validation passed
 * @property {string} [errorMessage] - Field-specific error message
 */

class ValidationService {
  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {FieldValidationResult} Validation result
   */
  static validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return {
        isValid: false,
        errorMessage: 'Email is required'
      };
    }

    const trimmedEmail = email.trim();
    
    if (!trimmedEmail) {
      return {
        isValid: false,
        errorMessage: 'Email is required'
      };
    }

    // Basic email regex - more permissive than strict RFC compliance
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(trimmedEmail)) {
      return {
        isValid: false,
        errorMessage: 'Please provide a valid email address'
      };
    }

    return { isValid: true };
  }

  /**
   * Validates phone number format (US format)
   * @param {string} phone - Phone number to validate
   * @param {boolean} [required=false] - Whether phone is required
   * @returns {FieldValidationResult} Validation result
   */
  static validatePhone(phone, required = false) {
    if (!phone || typeof phone !== 'string') {
      return {
        isValid: !required,
        errorMessage: required ? 'Phone number is required' : undefined
      };
    }

    const trimmedPhone = phone.trim();
    
    if (!trimmedPhone) {
      return {
        isValid: !required,
        errorMessage: required ? 'Phone number is required' : undefined
      };
    }

    // Remove common phone formatting characters
    const cleanPhone = trimmedPhone.replace(/[\s\-\(\)\.]/g, '');
    
    // US phone number: 10 digits, optionally starting with +1
    const phoneRegex = /^(\+1)?[0-9]{10}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
      return {
        isValid: false,
        errorMessage: 'Please provide a valid phone number (e.g., 555-123-4567)'
      };
    }

    return { isValid: true };
  }

  /**
   * Validates required text field
   * @param {string} value - Value to validate
   * @param {string} fieldName - Name of the field for error messages
   * @param {number} [minLength=1] - Minimum length
   * @param {number} [maxLength] - Maximum length
   * @returns {FieldValidationResult} Validation result
   */
  static validateRequiredText(value, fieldName, minLength = 1, maxLength) {
    if (!value || typeof value !== 'string') {
      return {
        isValid: false,
        errorMessage: `${fieldName} is required`
      };
    }

    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      return {
        isValid: false,
        errorMessage: `${fieldName} is required`
      };
    }

    if (trimmedValue.length < minLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must be at least ${minLength} character${minLength === 1 ? '' : 's'} long`
      };
    }

    if (maxLength && trimmedValue.length > maxLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must be no more than ${maxLength} characters long`
      };
    }

    return { isValid: true };
  }

  /**
   * Validates donation amount
   * @param {number|string} amount - Amount to validate
   * @param {number} [minAmount=1] - Minimum donation amount
   * @param {number} [maxAmount] - Maximum donation amount
   * @returns {FieldValidationResult} Validation result
   */
  static validateDonationAmount(amount, minAmount = 1, maxAmount) {
    if (amount === null || amount === undefined || amount === '') {
      return {
        isValid: false,
        errorMessage: 'Donation amount is required'
      };
    }

    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    if (isNaN(numericAmount)) {
      return {
        isValid: false,
        errorMessage: 'Please enter a valid donation amount'
      };
    }

    if (numericAmount < minAmount) {
      return {
        isValid: false,
        errorMessage: `Donation amount must be at least $${minAmount.toFixed(2)}`
      };
    }

    if (maxAmount && numericAmount > maxAmount) {
      return {
        isValid: false,
        errorMessage: `Donation amount cannot exceed $${maxAmount.toFixed(2)}`
      };
    }

    // Check for reasonable decimal places (max 2)
    if (numericAmount.toString().includes('.')) {
      const decimalPlaces = numericAmount.toString().split('.')[1].length;
      if (decimalPlaces > 2) {
        return {
          isValid: false,
          errorMessage: 'Donation amount cannot have more than 2 decimal places'
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Validates payment method selection
   * @param {string} paymentMethod - Payment method to validate
   * @param {string[]} [validMethods=['VENMO', 'ZELLE', 'OTHER']] - Valid payment methods
   * @returns {FieldValidationResult} Validation result
   */
  static validatePaymentMethod(paymentMethod, validMethods = ['VENMO', 'ZELLE', 'OTHER']) {
    if (!paymentMethod || typeof paymentMethod !== 'string') {
      return {
        isValid: false,
        errorMessage: 'Please select a payment method'
      };
    }

    const trimmedMethod = paymentMethod.trim().toUpperCase();
    
    if (!validMethods.includes(trimmedMethod)) {
      return {
        isValid: false,
        errorMessage: `Payment method must be one of: ${validMethods.join(', ')}`
      };
    }

    return { isValid: true };
  }

  /**
   * Validates donation form data
   * @param {Object} donationData - Donation form data
   * @param {string} donationData.donorName - Donor's name
   * @param {string} donationData.donorEmail - Donor's email
   * @param {string} [donationData.donorPhone] - Donor's phone
   * @param {number|string} donationData.amount - Donation amount
   * @param {string} donationData.paymentMethod - Payment method
   * @param {string} [donationData.paymentReference] - Payment reference
   * @param {string} [donationData.message] - Personal message
   * @returns {ValidationResult} Comprehensive validation result
   */
  static validateDonationForm(donationData) {
    const errors = [];

    // Validate donor name
    const nameValidation = this.validateRequiredText(donationData.donorName, 'Donor name', 2, 100);
    if (!nameValidation.isValid) {
      errors.push({ field: 'donorName', reason: nameValidation.errorMessage });
    }

    // Validate donor email
    const emailValidation = this.validateEmail(donationData.donorEmail);
    if (!emailValidation.isValid) {
      errors.push({ field: 'donorEmail', reason: emailValidation.errorMessage });
    }

    // Validate donor phone (optional)
    if (donationData.donorPhone) {
      const phoneValidation = this.validatePhone(donationData.donorPhone, false);
      if (!phoneValidation.isValid) {
        errors.push({ field: 'donorPhone', reason: phoneValidation.errorMessage });
      }
    }

    // Validate donation amount
    const amountValidation = this.validateDonationAmount(donationData.amount);
    if (!amountValidation.isValid) {
      errors.push({ field: 'amount', reason: amountValidation.errorMessage });
    }

    // Validate payment method
    const paymentMethodValidation = this.validatePaymentMethod(donationData.paymentMethod);
    if (!paymentMethodValidation.isValid) {
      errors.push({ field: 'paymentMethod', reason: paymentMethodValidation.errorMessage });
    }

    // Validate payment reference (optional, but with length limit if provided)
    if (donationData.paymentReference && donationData.paymentReference.trim()) {
      const referenceValidation = this.validateRequiredText(
        donationData.paymentReference, 
        'Payment reference/transaction ID', 
        3, 
        100
      );
      if (!referenceValidation.isValid) {
        errors.push({ field: 'paymentReference', reason: referenceValidation.errorMessage });
      }
    }

    // Validate message (optional, but with length limit if provided)
    if (donationData.message) {
      const messageValidation = this.validateRequiredText(donationData.message, 'Message', 1, 500);
      if (!messageValidation.isValid) {
        errors.push({ field: 'message', reason: messageValidation.errorMessage });
      }
    }

    if (errors.length > 0) {
      return {
        isValid: false,
        errorMessage: `Please correct the following errors: ${errors.map(e => e.reason).join('; ')}`,
        details: errors
      };
    }

    return { isValid: true };
  }

  /**
   * Validates RSVP invitation code
   * @param {string} code - Invitation code to validate
   * @returns {FieldValidationResult} Validation result
   */
  static validateInvitationCode(code) {
    if (!code || typeof code !== 'string') {
      return {
        isValid: false,
        errorMessage: 'Invitation code is required'
      };
    }

    const trimmedCode = code.trim().toUpperCase();
    
    if (!trimmedCode) {
      return {
        isValid: false,
        errorMessage: 'Invitation code is required'
      };
    }

    // Basic format validation - adjust based on your code format
    if (trimmedCode.length < 4 || trimmedCode.length > 20) {
      return {
        isValid: false,
        errorMessage: 'Please enter a valid invitation code'
      };
    }

    // Optional: Add more specific format validation
    // const codeRegex = /^[A-Za-z0-9]+$/;
    // if (!codeRegex.test(trimmedCode)) {
    //   return {
    //     isValid: false,
    //     errorMessage: 'Invitation code can only contain letters and numbers'
    //   };
    // }

    return { isValid: true };
  }

  /**
   * Validates RSVP form data
   * @param {Object} rsvpData - RSVP form data
   * @param {number} rsvpData.guestId - Guest database ID
   * @param {boolean} rsvpData.attending - Whether attending
   * @param {boolean} [rsvpData.bringingPlusOne] - Bringing plus-one
   * @param {string} [rsvpData.plusOneName] - Plus-one name
   * @param {string} [rsvpData.dietaryRestrictions] - Dietary restrictions
   * @param {string} rsvpData.email - Guest email
   * @param {boolean} [rsvpData.sendConfirmationEmail] - Send confirmation
   * @returns {ValidationResult} Comprehensive validation result
   */
  static validateRSVPForm(rsvpData) {
    const errors = [];

    // Validate guest ID
    if (!rsvpData.guestId || typeof rsvpData.guestId !== 'number') {
      errors.push({ field: 'guestId', reason: 'Guest information is missing. Please refresh and try again.' });
    }

    // Validate email
    const emailValidation = this.validateEmail(rsvpData.email);
    if (!emailValidation.isValid) {
      errors.push({ field: 'email', reason: emailValidation.errorMessage });
    }

    // Validate plus one name if bringing plus one
    if (rsvpData.bringingPlusOne) {
      const plusOneValidation = this.validateRequiredText(
        rsvpData.plusOneName,
        'Plus one name',
        2,
        100
      );
      if (!plusOneValidation.isValid) {
        errors.push({ field: 'plusOneName', reason: plusOneValidation.errorMessage });
      }
    }

    // Validate dietary restrictions (optional, but check length if provided)
    if (rsvpData.dietaryRestrictions && rsvpData.dietaryRestrictions.trim()) {
      if (rsvpData.dietaryRestrictions.length > 500) {
        errors.push({ 
          field: 'dietaryRestrictions', 
          reason: 'Dietary restrictions must be no more than 500 characters long' 
        });
      }
    }

    if (errors.length > 0) {
      return {
        isValid: false,
        error: `Please correct the following errors: ${errors.map(e => e.reason).join('; ')}`,
        details: errors
      };
    }

    return { isValid: true };
  }

  /**
   * Sanitizes user input by trimming whitespace and encoding special characters
   * @param {string} input - Input to sanitize
   * @param {boolean} [allowHTML=false] - Whether to allow HTML tags
   * @returns {string} Sanitized input
   */
  static sanitizeInput(input, allowHTML = false) {
    if (!input || typeof input !== 'string') {
      return '';
    }

    let sanitized = input.trim();

    if (!allowHTML) {
      // Basic HTML encoding
      sanitized = sanitized
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    }

    return sanitized;
  }
}

export default ValidationService;