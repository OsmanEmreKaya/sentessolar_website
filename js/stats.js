// ============================================
// Animated Statistics Counter
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    if (!statNumbers.length) return;
    
    // Function to animate counter
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;
        
        const timer = setInterval(() => {
            step++;
            current = Math.min(Math.ceil(increment * step), target);
            element.textContent = current + suffix;
            
            if (step >= steps) {
                clearInterval(timer);
                element.textContent = target + suffix;
            }
        }, duration / steps);
    }
    
    // Intersection Observer to trigger animation when section is visible
    const statsSection = document.querySelector('.stats-grid');
    if (!statsSection) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    // Only animate if not already animated
                    if (!stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(statsSection);
});

