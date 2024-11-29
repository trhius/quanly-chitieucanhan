import { 
  API_URL, 
  validateEmail, 
  validatePassword, 
  showError, 
  hideError,
  showLoading,
  hideLoading 
} from './utils.js';

class LoginForm {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.emailInput = this.form.querySelector('input[name="email"]');
    this.passwordInput = this.form.querySelector('input[name="password"]');
    this.togglePasswordBtn = document.querySelector('.icon-solid-eye-off');
    this.loadingOverlay = document.getElementById('loadingOverlay');
    this.socialButtons = document.querySelectorAll('.frame-174, .frame-1742');

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Password toggle
    this.togglePasswordBtn.addEventListener('click', () => this.togglePassword());

    // Input validation
    this.emailInput.addEventListener('input', () => this.validateEmailField());
    this.passwordInput.addEventListener('input', () => this.validatePasswordField());
    this.passwordInput.addEventListener('focus', () => this.validatePasswordField());

    // Social login
    this.socialButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleSocialLogin(e));
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) return;

    showLoading(this.loadingOverlay);

    try {
      const response = await this.loginRequest();
      
      if (response.ok) {
        const data = await response.json();
        this.handleLoginSuccess(data);
      } else {
        const error = await response.json();
        showError(this.form, error.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      showError(this.form, 'Có lỗi xảy ra, vui lòng thử lại sau');
      console.error('Login error:', error);
    } finally {
      hideLoading(this.loadingOverlay);
    }
  }

  async loginRequest() {
    return '../tong-quan/index.html';
  }

  handleLoginSuccess(data) {
    // Save auth token
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    // Redirect to dashboard
    window.location.href = '/dashboard';
  }

  togglePassword() {
    const type = this.passwordInput.type === 'password' ? 'text' : 'password';
    this.passwordInput.type = type;
    
    // Toggle class để đổi icon
    this.togglePasswordBtn.classList.toggle('show', type === 'text');
  }

  validateForm() {
    const isEmailValid = this.validateEmailField();
    const isPasswordValid = this.validatePasswordField();
    return isEmailValid && isPasswordValid;
  }

  validateEmailField() {
    const isValid = validateEmail(this.emailInput.value);
    if (!isValid) {
      showError(this.emailInput.parentElement, 'Email không hợp lệ');
    } else {
      hideError(this.emailInput.parentElement);
    }
    return isValid;
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

  handleSocialLogin(e) {
    const button = e.currentTarget;
    let provider = '';

    if (button.querySelector('.icon-google')) {
      provider = 'google';
    } else if (button.querySelector('.icon-facebook')) {
      provider = 'facebook';
    } else if (button.querySelector('.mdi-twitter')) {
      provider = 'twitter';
    }

    console.log(`Đăng nhập với ${provider}`);
    // Implement social login logic here
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LoginForm();
});
