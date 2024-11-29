// Constants
export const API_URL = 'YOUR_API_URL';

// Utility functions
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const showError = (element, message) => {
  const errorElement = element.querySelector('.error-message');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
};

export const hideError = (element) => {
  const errorElement = element.querySelector('.error-message');
  if (errorElement) {
    errorElement.style.display = 'none';
  }
};

export const showLoading = (overlay) => {
  if (overlay) overlay.style.display = 'flex';
};

export const hideLoading = (overlay) => {
  if (overlay) overlay.style.display = 'none';
};
