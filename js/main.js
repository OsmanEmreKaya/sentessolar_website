// ============================================
// Conditional Video Loading (Desktop Only)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    const videoElement = document.querySelector('.hero-video');
    
    // Check if mobile (screen width <= 767px)
    function isMobile() {
        return window.innerWidth <= 767;
    }
    
    // Remove video on mobile to improve performance
    if (isMobile() && videoElement) {
        videoElement.remove();
    }
    
    // Also handle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (isMobile() && videoElement && videoElement.parentNode) {
                videoElement.remove();
            } else if (!isMobile() && !videoElement && heroSection) {
                // Re-add video if resized to desktop (optional)
                const newVideo = document.createElement('video');
                newVideo.className = 'hero-video';
                newVideo.autoplay = true;
                newVideo.muted = true;
                newVideo.loop = true;
                newVideo.playsInline = true;
                newVideo.innerHTML = `
                    <source src="assets/videos/solar-panels.mp4" type="video/mp4">
                    <source src="assets/videos/solar-panels.webm" type="video/webm">
                `;
                heroSection.insertBefore(newVideo, heroSection.firstChild);
            }
        }, 250);
    });
});

// ============================================
// Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
});

// ============================================
// Active Navigation Link Highlighting
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ============================================
// Contact Form Validation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Clear previous errors
            clearErrors();
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                showError('nameError', 'Ad soyad gereklidir');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError('nameError', 'Ad soyad en az 2 karakter olmalıdır');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError('emailError', 'E-posta gereklidir');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError('emailError', 'Lütfen geçerli bir e-posta adresi girin');
                isValid = false;
            }
            
            // Validate phone (optional but if provided, should be valid)
            if (phone.value.trim()) {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(phone.value)) {
                    showError('phoneError', 'Lütfen geçerli bir telefon numarası girin');
                    isValid = false;
                }
            }
            
            // Validate subject
            if (!subject.value.trim()) {
                showError('subjectError', 'Konu gereklidir');
                isValid = false;
            } else if (subject.value.trim().length < 3) {
                showError('subjectError', 'Konu en az 3 karakter olmalıdır');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError('messageError', 'Mesaj gereklidir');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError('messageError', 'Mesaj en az 10 karakter olmalıdır');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                showSuccess();
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    const successMessage = document.getElementById('formSuccess');
                    if (successMessage) {
                        successMessage.style.display = 'none';
                    }
                }, 5000);
            }
        });
    }
    
    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        // Add error class to input
        const fieldName = fieldId.replace('Error', '');
        const inputField = document.getElementById(fieldName);
        if (inputField) {
            inputField.style.borderColor = '#e76f51';
        }
    }
    
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        // Reset input borders
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }
    
    function showSuccess() {
        const successMessage = document.getElementById('formSuccess');
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Real-time validation on blur
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error when user starts typing
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement && errorElement.textContent) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                this.style.borderColor = '';
            }
        });
    });
    
    function validateField(field) {
        const fieldId = field.id;
        const value = field.value.trim();
        const errorId = fieldId + 'Error';
        
        // Clear previous error
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.style.borderColor = '';
        
        // Validate based on field type
        if (field.hasAttribute('required') && !value) {
            showError(errorId, 'Bu alan gereklidir');
            return false;
        }
        
        if (fieldId === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(errorId, 'Lütfen geçerli bir e-posta adresi girin');
                return false;
            }
        }
        
        if (fieldId === 'phone' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                showError(errorId, 'Lütfen geçerli bir telefon numarası girin');
                return false;
            }
        }
        
        if (fieldId === 'name' && value && value.length < 2) {
            showError(errorId, 'Ad soyad en az 2 karakter olmalıdır');
            return false;
        }
        
        if (fieldId === 'subject' && value && value.length < 3) {
            showError(errorId, 'Konu en az 3 karakter olmalıdır');
            return false;
        }
        
        if (fieldId === 'message' && value && value.length < 10) {
            showError(errorId, 'Mesaj en az 10 karakter olmalıdır');
            return false;
        }
        
        return true;
    }
});

// ============================================
// Hero Title and Subtitle Text Animation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    
    if (heroTitle && heroSubtitle) {
        const textSets = [
            {
                title: 'Enerji Bağımsızlığınız İçin Çalışıyoruz',
                subtitle: 'Güneş hikayeniz burada başlıyor!'
            },
            {
                title: 'Faturalarınızı Güneşe Ödetelim',
                subtitle: 'Güneşin gücüyle faturalarınızı sıfırlayın, geleceğinizi güvence altına alın.'
            }
        ];
        
        let currentIndex = 0;
        
        function changeText() {
            // Fade out both title and subtitle
            heroTitle.style.opacity = '0';
            heroSubtitle.style.opacity = '0';
            heroTitle.style.transition = 'opacity 0.5s ease';
            heroSubtitle.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                // Change text
                currentIndex = (currentIndex + 1) % textSets.length;
                heroTitle.textContent = textSets[currentIndex].title;
                heroSubtitle.textContent = textSets[currentIndex].subtitle;
                
                // Fade in both title and subtitle
                setTimeout(() => {
                    heroTitle.style.opacity = '1';
                    heroSubtitle.style.opacity = '1';
                }, 50);
            }, 500);
        }
        
        // Initial delay, then change text every 4 seconds
        setTimeout(() => {
            setInterval(changeText, 4000);
        }, 3000); // First text set shows for 3 seconds, then changes
    }
});

// ============================================
// Header Scroll Effect
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
});

// ============================================
// Animate on Scroll (Simple Implementation)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards, project cards, and feature items
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .feature-item, .value-card, .team-member');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

