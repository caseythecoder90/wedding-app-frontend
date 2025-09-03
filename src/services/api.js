/**
 * Base API service with standardized fetch wrapper and error handling
 * Provides consistent error formatting and request/response handling
 */

/**
 * Standard API error format
 * @typedef {Object} APIError
 * @property {string} errorMessage - Human-readable error message
 * @property {Array<{reason: string}>} details - Detailed error information
 * @property {number} [status] - HTTP status code
 */

/**
 * API configuration
 * @typedef {Object} APIConfig
 * @property {string} baseURL - Base API URL
 * @property {Object} [defaultHeaders] - Default headers for all requests
 * @property {number} [timeout] - Request timeout in milliseconds
 */

class APIService {
  /**
   * @param {APIConfig} config - API configuration
   */
  constructor(config = {}) {
    this.baseURL = config.baseURL || process.env.REACT_APP_API_URL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.defaultHeaders
    };
    this.timeout = config.timeout || 20000; // 20 seconds default
  }

  /**
   * Makes a standardized HTTP request with error handling
   * @param {string} endpoint - API endpoint (relative to baseURL)
   * @param {Object} options - Fetch options
   * @param {string} [options.method='GET'] - HTTP method
   * @param {Object} [options.headers] - Additional headers
   * @param {any} [options.body] - Request body (will be JSON stringified if object)
   * @param {number} [options.timeout] - Request timeout override
   * @returns {Promise<any>} Response data
   * @throws {APIError} Standardized error object
   */
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.timeout,
      ...otherOptions
    } = options;

    // Build full URL
    const url = `${this.baseURL}${endpoint}`;

    // Prepare headers
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers
    };

    // Prepare body
    let requestBody = body;
    if (body && typeof body === 'object' && !(body instanceof FormData)) {
      requestBody = JSON.stringify(body);
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: requestBody,
        signal: controller.signal,
        ...otherOptions
      });

      clearTimeout(timeoutId);

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw this.createAPIError(errorData, response.status);
      }

      // Parse successful response
      return await this.parseSuccessResponse(response);

    } catch (error) {
      clearTimeout(timeoutId);

      // Handle different error types
      if (error.name === 'AbortError') {
        throw this.createAPIError({
          errorMessage: 'Request timed out. Please check your connection and try again.',
          details: [{ reason: 'Request timeout' }]
        });
      }

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw this.createAPIError({
          errorMessage: 'Unable to connect to server. Please check your internet connection and try again.',
          details: [{ reason: 'Network error' }]
        });
      }

      // Re-throw APIError instances
      if (error.errorMessage && error.details) {
        throw error;
      }

      // Handle unexpected errors
      throw this.createAPIError({
        errorMessage: error.message || 'An unexpected error occurred',
        details: [{ reason: 'Unknown error' }]
      });
    }
  }

  /**
   * Parses successful response based on content type
   * @param {Response} response - Fetch response
   * @returns {Promise<any>} Parsed response data
   */
  async parseSuccessResponse(response) {
    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      return await response.json();
    }
    
    if (contentType.includes('text/')) {
      return await response.text();
    }
    
    // Default to JSON for empty responses or unknown content types
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  /**
   * Parses error response from server
   * @param {Response} response - Fetch response
   * @returns {Promise<Object>} Error data
   */
  async parseErrorResponse(response) {
    try {
      const errorData = await response.json();
      
      // Ensure standard error format
      return {
        errorMessage: errorData.errorMessage || errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        details: errorData.details || [{ reason: errorData.error || 'Server error' }]
      };
    } catch {
      // Fallback if response is not JSON
      return {
        errorMessage: `HTTP ${response.status}: ${response.statusText}`,
        details: [{ reason: 'Server error' }]
      };
    }
  }

  /**
   * Creates standardized API error object
   * @param {Object} errorData - Error data from server or client
   * @param {number} [status] - HTTP status code
   * @returns {APIError} Standardized error object
   */
  createAPIError(errorData, status) {
    return {
      errorMessage: errorData.errorMessage || 'An error occurred',
      details: errorData.details || [{ reason: 'Unknown error' }],
      ...(status && { status })
    };
  }

  /**
   * GET request helper
   * @param {string} endpoint - API endpoint
   * @param {Object} [options] - Request options
   * @returns {Promise<any>} Response data
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request helper
   * @param {string} endpoint - API endpoint
   * @param {any} [data] - Request body data
   * @param {Object} [options] - Request options
   * @returns {Promise<any>} Response data
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body: data });
  }

  /**
   * PUT request helper
   * @param {string} endpoint - API endpoint
   * @param {any} [data] - Request body data
   * @param {Object} [options] - Request options
   * @returns {Promise<any>} Response data
   */
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body: data });
  }

  /**
   * DELETE request helper
   * @param {string} endpoint - API endpoint
   * @param {Object} [options] - Request options
   * @returns {Promise<any>} Response data
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * PATCH request helper
   * @param {string} endpoint - API endpoint
   * @param {any} [data] - Request body data
   * @param {Object} [options] - Request options
   * @returns {Promise<any>} Response data
   */
  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body: data });
  }
}

// Create default API instance
const api = new APIService();

export default api;
export { APIService };