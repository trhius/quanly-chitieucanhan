document.addEventListener('DOMContentLoaded', () => {
  // Xử lý form submit
  const loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleSubmit);
  }

  // Xử lý toggle password
  const eyeIcon = document.querySelector('.icon-solid-eye-off');
  if (eyeIcon) {
    eyeIcon.addEventListener('click', togglePassword);
  }
});

function handleSubmit(e) {
  e.preventDefault();
  console.log('Form submitted');
  
  const email = document.querySelector('input[type="email"]').value.trim();
  const password = document.querySelector('input[type="password"], input[type="text"]').value.trim();
  
  console.log('Credentials:', { email, password });
  
  // Validate form
  if (!email || !password) {
    console.log('Empty fields detected');
    showFailurePopup('Vui lòng nhập đầy đủ thông tin');
    clearPasswordInput();
    return;
  }
  
  // Kiểm tra thông tin đăng nhập với tài khoản mặc định
  if (email === 'admin@gmail.com' && password === '123456') {
    console.log('Login successful');
    // Đăng nhập thành công
    const successPopup = document.getElementById('popup');
    
    if (successPopup) {
      // Ẩn loader nếu có
      const loader = document.querySelector('.loader');
      if (loader) {
        loader.style.display = 'none';
      }
      
      successPopup.style.display = 'block';
      
      // Chuyển hướng sau 1 giây
      setTimeout(() => {
        window.location.href = '../tong-quan/index.html';
      }, 1000);
    }
  } else {
    console.log('Login failed');
    // Đăng nhập thất bại
    showFailurePopup('Email hoặc mật khẩu không chính xác');
    clearPasswordInput();
  }
}

function showFailurePopup(message) {
  const failurePopup = document.getElementById('failurePopup');
  
  if (failurePopup) {
    // Cập nhật nội dung thông báo nếu cần
    const messageElement = failurePopup.querySelector('.popup-message');
    if (messageElement) {
      messageElement.textContent = message;
    }
    
    // Hiển thị popup
    failurePopup.style.display = 'block';
    
    // Tự động ẩn sau 1 giây
    setTimeout(() => {
      failurePopup.style.display = 'none';
    }, 1000);
  }
}

// Hàm clear input mật khẩu
function clearPasswordInput() {
  const passwordInput = document.querySelector('input[type="password"], input[type="text"]');
  if (passwordInput) {
    passwordInput.value = '';
    // Đảm bảo type là password khi clear
    passwordInput.type = 'password';
  }
}

// Toggle hiển thị mật khẩu
function togglePassword() {
  const passwordInput = document.querySelector('input[type="password"], input[type="text"]');
  if (passwordInput) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
}