/**
 * Portfolio Website JavaScript
 * Author: Oussema Said
 */

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');

/**
 * Mobile Navigation Functions
 */

// Toggle mobile menu
function toggleMenu() {
    navMenu.classList.toggle('show-menu');
    toggleHamburgerIcon();
}

// Toggle hamburger icon between bars and times
function toggleHamburgerIcon() {
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('show-menu')) {
        icon.classList.remove('uil-bars');
        icon.classList.add('uil-times');
    } else {
        icon.classList.remove('uil-times');
        icon.classList.add('uil-bars');
    }
}

// Close mobile menu
function closeMenu() {
    navMenu.classList.remove('show-menu');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('uil-times');
    icon.classList.add('uil-bars');
}

/**
 * Smooth Scroll Functions
 */

// Handle smooth scrolling for navigation links
function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.closest('.nav__link').getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    closeMenu();
}

/**
 * Header Effects
 */

// Change header background on scroll
function handleHeaderScroll() {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    }
}

/**
 * Active Navigation State
 */

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero-section');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = 'var(--text-color)';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--first-color)';
        }
    });
}

/**
 * Loading Animation
 */

// Add smooth loading animation
function initLoadingAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

/**
 * Event Listeners
 */

// Mobile menu toggle
navToggle.addEventListener('click', toggleMenu);

// Navigation links smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
    }
});

// Scroll events
window.addEventListener('scroll', () => {
    handleHeaderScroll();
    updateActiveNavLink();
});

// Loading animation
window.addEventListener('load', initLoadingAnimation);

/**
 * Utility Functions
 */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler with debouncing
const optimizedScrollHandler = debounce(() => {
    handleHeaderScroll();
    updateActiveNavLink();
}, 10);

// Replace the regular scroll event with optimized version for better performance
window.removeEventListener('scroll', () => {
    handleHeaderScroll();
    updateActiveNavLink();
});
window.addEventListener('scroll', optimizedScrollHandler);

/**
 * Intersection Observer for animations (optional enhancement)
 */

// Add fade-in animation for sections when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

/**
 * Keyboard Navigation Support
 */

// Handle keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        closeMenu();
    }
});

// Focus management for mobile menu
navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

console.log('Portfolio website JavaScript loaded successfully! 🚀');