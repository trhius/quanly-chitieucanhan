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
      // Lấy thông tin từ form
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const name = document.getElementById('name').value;

      // Lưu thông tin vào localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({
        email,
        password,
        name
      });
      localStorage.setItem('users', JSON.stringify(users));
      
      // Show success popup
      const popup = document.getElementById('popup');
      popup.style.display = 'block';
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '../dang-nhap/index.html';
      }, 2000);

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