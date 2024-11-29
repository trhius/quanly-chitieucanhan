document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const nextButton = document.querySelector('.next-button');
    const backButton = document.querySelector('.back-button');
    let currentSlide = 0;

    // Initialize first slide
    updateSlide(0);

    // Function to update slides
    function updateSlide(index) {
        // Remove active class and hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class and show current slide
        slides[index].classList.add('active');
        slides[index].style.display = 'flex';
        dots[index].classList.add('active');

        // Show/hide back button
        backButton.style.display = index === 0 ? 'none' : 'flex';

        // Update next button text on last slide only
        if (index === slides.length - 1) {
            nextButton.querySelector('span').textContent = 'Bắt đầu';
        } else {
            nextButton.querySelector('span').textContent = 'Tiếp';
        }
    }

    // Next button click
    nextButton.addEventListener('click', () => {
        if (currentSlide === slides.length - 1) {
            // Navigate to main app on last slide
            window.location.href = '../Đăng ký/index.html';
            return;
        }
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    });

    // Back button click
    backButton.addEventListener('click', () => {
        currentSlide = Math.max(0, currentSlide - 1);
        updateSlide(currentSlide);
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });
}); 