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
            // Smooth scroll handled by CSS `scroll-behavior: smooth;`
            // Optional: Add active class update logic here if needed
        });
    });

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Intersection Observer for Fade-In Animations ---
    // More performant than CSS animations triggering on everything at once
    const animatedElements = document.querySelectorAll('.camera-card, .step, .about-text, .about-image-container');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running'; // Start animation
                    // Optional: Unobserve after animation if it shouldn't repeat
                    // observer.unobserve(entry.target);
                } else {
                     // Optional: Reset animation if you want it to replay when scrolling back up
                     // entry.target.style.animationPlayState = 'paused';
                     // You might need to reset opacity/transform here too if resetting
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
