document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('is-open');
        });
    }

    // --- Close mobile nav when a link is clicked ---
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('is-open')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('is-open');
            }
        });
    });

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Gallery Functionality ---
    const galleries = document.querySelectorAll('.gallery-container');
    
    galleries.forEach(gallery => {
        const track = gallery.querySelector('.gallery-track');
        const images = gallery.querySelectorAll('.gallery-image');
        const prevButton = gallery.querySelector('.gallery-prev');
        const nextButton = gallery.querySelector('.gallery-next');
        const dotsContainer = gallery.querySelector('.gallery-dots');
        
        let currentIndex = 0;
        
        // Create dots
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = gallery.querySelectorAll('.gallery-dot');
        
        function updateGallery() {
            // Update images
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateGallery();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            updateGallery();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateGallery();
        }
        
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        // Auto-advance gallery every 5 seconds
        let interval = setInterval(nextSlide, 5000);
        
        // Pause auto-advance on hover
        gallery.addEventListener('mouseenter', () => clearInterval(interval));
        gallery.addEventListener('mouseleave', () => interval = setInterval(nextSlide, 5000));
    });

    // --- Dark Mode Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme on load
    if (currentTheme) {
        body.classList.add(currentTheme); // Assumes saved theme is 'dark-mode' or nothing
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
            body.classList.add('dark-mode'); // Ensure class is added if stored value is just 'dark-mode' string
        }
    } else {
      // Optional: Check system preference if no setting saved
      // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // if (prefersDark) {
      //   body.classList.add('dark-mode');
      //   themeToggle.checked = true;
      //   localStorage.setItem('theme', 'dark-mode'); // Optionally save system pref as initial state
      // }
    }

    // Toggle theme on switch change
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode'); // Explicitly save light mode state
        }
    });

    // --- Optional: Intersection Observer for Fade-In Animations ---
    const animatedElements = document.querySelectorAll('.camera-card, .step, .about-text, .about-image-container');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running'; // Start animation
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            // Initially pause CSS animations defined in style.css
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers: just let the CSS animations run immediately
        animatedElements.forEach(el => {
             el.style.animationPlayState = 'running';
        });
    }

}); // End DOMContentLoaded
