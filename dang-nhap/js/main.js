handleSubmit = async (e) => {
  e.preventDefault();

  if (!this.validateForm()) return;

  showLoading(this.loadingOverlay);

  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Lấy danh sách users từ localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Tìm user với email và password khớp
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Lưu thông tin user đang đăng nhập
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Hiển thị popup thành công
      const popup = document.getElementById('popup');
      popup.style.display = 'block';
      
      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        window.location.href = '../tong-quan/index.html';
      }, 2000);
    } else {
      // Hiển thị thông báo lỗi
      alert('Email hoặc mật khẩu không chính xác!');
    }

  } catch (error) {
    console.error('Login failed:', error);
  } finally {
    hideLoading(this.loadingOverlay);
  }
}