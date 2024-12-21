document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const passwordInput = form.querySelector('input[name="password"]');
  const togglePasswordBtn = document.querySelector('.icon-solid-eye-off');

  // Xử lý toggle password
  togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
  });

  // Xử lý validate password length khi nhập
  passwordInput.addEventListener('input', () => {
    const inputContainer = passwordInput.closest('.input');
    if (passwordInput.value.length > 0 && passwordInput.value.length < 6) {
      inputContainer.classList.add('error');
    } else {
      inputContainer.classList.remove('error');
    }
  });

  // Xử lý submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Kiểm tra password length
    if (passwordInput.value.length < 6) {
      const inputContainer = passwordInput.closest('.input');
      inputContainer.classList.add('error');
      return;
    }

    // Hiển thị popup thành công
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'block';
      
      // Chuyển về trang đăng nhập sau 1 giây
      setTimeout(() => {
        window.location.href = '../dang-nhap/index.html';
      }, 1000);
    }
  });
}); 