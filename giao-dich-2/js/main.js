// Add this function
function showSuccessPopup() {
  const popup = document.getElementById('successPopup');
  popup.classList.add('show');
  
  // Hide popup after 2 seconds
  setTimeout(() => {
    popup.classList.remove('show');
  }, 2000);
}

// Find your form submit handler and add the popup call
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // ... existing form handling code ...
  
  showSuccessPopup(); // Add this line after successful form submission
}); 