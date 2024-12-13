import {
  validateEmail,
  validatePassword,
  validateName,
  showError,
  hideError,
  showLoading,
  hideLoading
} from './utils.js';

class RegisterForm {
  constructor() {
    this.form = document.getElementById('registerForm');
    this.emailInput = this.form.querySelector('input[name="email"]');
    this.firstNameInput = this.form.querySelector('input[name="firstName"]');
    this.lastNameInput = this.form.querySelector('input[name="lastName"]');
    this.passwordInput = this.form.querySelector('input[name="password"]');
    this.togglePasswordBtn = document.querySelector('.icon-solid-eye-off');
    this.loadingOverlay = document.getElementById('loadingOverlay');

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.togglePasswordBtn.addEventListener('click', () => this.togglePassword());
    this.passwordInput.addEventListener('input', () => this.validatePasswordField());
  }

  togglePassword() {
    const type = this.passwordInput.type === 'password' ? 'text' : 'password';
    this.passwordInput.type = type;
  }

  validatePasswordField() {
    const value = this.passwordInput.value;
    const inputContainer = this.passwordInput.closest('.input');
    
    if (value.length > 0 && value.length < 6) {
      inputContainer.classList.add('error');
    } else {
      inputContainer.classList.remove('error');
    }
    
    return value.length >= 6;
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) return;

    showLoading(this.loadingOverlay);

    try {
      // TODO: Implement API call to register user
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Redirect to login page after successful registration
      window.location.href = '../dang-nhap/index.html';
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      hideLoading(this.loadingOverlay);
    }
  }

  validateForm() {
    let isValid = true;

    if (!validateEmail(this.emailInput.value)) {
      showError(this.emailInput.parentElement, 'Email không hợp lệ');
      isValid = false;
    }

    if (!validateName(this.firstNameInput.value)) {
      showError(this.firstNameInput.parentElement, 'Vui lòng nhập họ và tên đệm');
      isValid = false;
    }

    if (!validateName(this.lastNameInput.value)) {
      showError(this.lastNameInput.parentElement, 'Vui lòng nhập tên');
      isValid = false;
    }

    if (!this.validatePasswordField()) {
      isValid = false;
    }

    return isValid;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RegisterForm();
}); 