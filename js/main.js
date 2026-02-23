/**
 * AVLA - Main JavaScript
 * Funcionalidad principal de la landing page
 */

(function() {
    'use strict';

    // ========================================
    // DOM Elements
    // ========================================
    const loader = document.getElementById('loader');
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // ========================================
    // Loader
    // ========================================
    function hideLoader() {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }, 800);
    }

    // ========================================
    // Navigation
    // ========================================
    function toggleMenu() {
        navMenu.classList.toggle('show');
        document.body.classList.toggle('no-scroll');
    }

    function closeMenu() {
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }

    // Sticky header on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Active link on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    // Smooth scroll for navigation links
    function smoothScroll(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                closeMenu();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    // ========================================
    // Testimonials Slider
    // ========================================
    const testimoniosSlider = document.getElementById('testimonios-slider');
    const testimonioCards = document.querySelectorAll('.testimonio-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dots = document.querySelectorAll('.testimonios__dot');
    let currentSlide = 0;
    const totalSlides = testimonioCards.length;
    let autoPlayInterval;

    function goToSlide(index) {
        const prevIndex = currentSlide;
        
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        
        testimonioCards.forEach((card, i) => {
            card.classList.remove('active', 'prev');
            if (i === currentSlide) {
                card.classList.add('active');
            } else if (i === prevIndex) {
                card.classList.add('prev');
            }
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Initialize first slide
    if (testimonioCards.length > 0) {
        testimonioCards[0].classList.add('active');
    }

    // ========================================
    // Parallax Effect
    // ========================================
    function parallaxEffect() {
        const scrollY = window.scrollY;
        
        const heroDecoration = document.querySelector('.hero__bg-decoration');
        if (heroDecoration) {
            heroDecoration.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        
        const heroImage = document.querySelector('.hero__image-decoration');
        if (heroImage) {
            heroImage.style.transform = `rotate(${3 + scrollY * 0.01}deg)`;
        }
    }

    // ========================================
    // Initialize Event Listeners
    // ========================================
    function initEventListeners() {
        // Loader
        window.addEventListener('load', hideLoader);
        
        // Navigation
        if (navToggle) navToggle.addEventListener('click', toggleMenu);
        if (navClose) navClose.addEventListener('click', closeMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('show') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('show')) {
                closeMenu();
            }
        });
        
        // Scroll events
        window.addEventListener('scroll', () => {
            handleScroll();
            updateActiveLink();
            parallaxEffect();
        }, { passive: true });
        
        // Testimonials
        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoPlay();
                goToSlide(index);
                startAutoPlay();
            });
        });
        
        // Touch support for testimonials
        if (testimoniosSlider) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            testimoniosSlider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoPlay();
            }, { passive: true });
            
            testimoniosSlider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoPlay();
            }, { passive: true });
            
            function handleSwipe() {
                const diff = touchStartX - touchEndX;
                if (diff > 50) nextSlide();
                if (diff < -50) prevSlide();
            }
        }
        
        // Start autoplay for testimonials
        startAutoPlay();
    }

    // ========================================
    // Meet Chat Animation
    // ========================================
    function initMeetChat() {
        const meetChat = document.getElementById('meet-chat');
        if (!meetChat) return;
        
        const messages = meetChat.querySelectorAll('.meet-chat__message');
        const typingIndicator = document.getElementById('typing-indicator');
        const messagesContainer = document.getElementById('meet-messages');
        
        let currentIndex = 0;
        let animationRunning = false;
        
        function resetChat() {
            messages.forEach(msg => {
                msg.classList.remove('visible');
                msg.style.display = 'none';
            });
            if (typingIndicator) {
                typingIndicator.classList.remove('visible');
            }
            currentIndex = 0;
            animationRunning = false;
            if (messagesContainer) {
                messagesContainer.scrollTop = 0;
            }
        }
        
        function showTyping() {
            if (typingIndicator) {
                typingIndicator.classList.add('visible');
                scrollToBottom();
            }
        }
        
        function hideTyping() {
            if (typingIndicator) {
                typingIndicator.classList.remove('visible');
            }
        }
        
        function scrollToBottom() {
            if (messagesContainer) {
                messagesContainer.scrollTo({
                    top: messagesContainer.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }
        
        function showNextMessage() {
            if (currentIndex >= messages.length) {
                hideTyping();
                setTimeout(() => {
                    resetChat();
                    setTimeout(startAnimation, 2000);
                }, 4000);
                return;
            }
            
            const message = messages[currentIndex];
            const isTeacher = message.classList.contains('meet-chat__message--teacher');
            
            if (isTeacher && currentIndex > 0) {
                showTyping();
                setTimeout(() => {
                    hideTyping();
                    revealMessage(message);
                }, 1200);
            } else {
                revealMessage(message);
            }
        }
        
        function revealMessage(message) {
            message.style.display = 'flex';
            
            requestAnimationFrame(() => {
                message.classList.add('visible');
                scrollToBottom();
            });
            
            currentIndex++;
            
            const delay = 1500 + Math.random() * 1000;
            setTimeout(showNextMessage, delay);
        }
        
        function startAnimation() {
            if (animationRunning) return;
            animationRunning = true;
            showNextMessage();
        }
        
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom > 0
            );
        }
        
        resetChat();
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationRunning) {
                    setTimeout(startAnimation, 500);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(meetChat);
    }

    // ========================================
    // Initialize
    // ========================================
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('no-scroll');
        initEventListeners();
        handleScroll();
        updateActiveLink();
        initMeetChat();
    });

})();
