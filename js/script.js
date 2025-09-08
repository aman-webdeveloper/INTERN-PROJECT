// Initialize AOS animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Theme toggle functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        this.body = document.body;
        
        // Check for saved theme preference or default to light mode
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.body.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcons(this.currentTheme);
        
        this.bindEvents();
    }
    
    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        if (this.mobileThemeToggle) {
            this.mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    updateThemeIcons(theme) {
        const desktopIcon = this.themeToggle?.querySelector('i');
        const mobileIcon = this.mobileThemeToggle?.querySelector('i');
        
        if (theme === 'dark') {
            if (desktopIcon) desktopIcon.className = 'fas fa-sun';
            if (mobileIcon) mobileIcon.className = 'fas fa-sun';
        } else {
            if (desktopIcon) desktopIcon.className = 'fas fa-moon';
            if (mobileIcon) mobileIcon.className = 'fas fa-moon';
        }
    }
    
    toggleTheme() {
        const currentTheme = this.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcons(newTheme);
    }
}

// Mobile menu functionality
class MobileMenu {
    constructor() {
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.mobileMenuLinks = this.mobileMenu?.querySelectorAll('a') || [];
        
        this.bindEvents();
    }
    
    bindEvents() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close mobile menu when clicking on links
        this.mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenuToggle?.contains(e.target) && !this.mobileMenu?.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.mobileMenu?.classList.toggle('active');
        this.mobileMenuToggle?.classList.toggle('active');
    }
    
    closeMenu() {
        this.mobileMenu?.classList.remove('active');
        this.mobileMenuToggle?.classList.remove('active');
    }
}

// Smooth scrolling functionality
class SmoothScroll {
    constructor() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Enquiry functionality
class EnquiryManager {
    constructor() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Handle enquiry buttons
        document.querySelectorAll('[data-testid*="button-enquire"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = this.getProductName(e.target);
                this.handleEnquiry(productName);
            });
        });
        
        // Handle WhatsApp buttons
        document.querySelectorAll('.whatsapp-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = this.getProductName(e.target);
                this.openWhatsApp(productName);
            });
        });
    }
    
    getProductName(button) {
        const productCard = button.closest('[data-testid*="card-product"], .product-item');
        const nameElement = productCard?.querySelector('[data-testid*="name"], .product-name');
        return nameElement?.textContent || 'Product';
    }
    
    handleEnquiry(productName) {
        const message = `Hi! I'm interested in the ${productName}. Could you please provide more details about pricing and availability?`;
        const phoneNumber = '918448870418'; // Random IT Solutions business phone number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    
    openWhatsApp(productName) {
        const message = `Hi! I would like to shop for the ${productName}. Please let me know the details.`;
        const phoneNumber = '918448870418'; // Random IT Solutions business phone number
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Navigation active state
class NavigationManager {
    constructor() {
        this.bindEvents();
        this.updateActiveNavigation();
    }
    
    bindEvents() {
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }
    
    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }
    
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    preloadCriticalResources() {
        // Preload hero image
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = heroImage.src;
            document.head.appendChild(link);
        }
    }
}

// Accessibility enhancements
class AccessibilityManager {
    constructor() {
        this.enhanceKeyboardNavigation();
        this.addAriaLabels();
    }
    
    enhanceKeyboardNavigation() {
        // Add keyboard support for theme toggle
        document.querySelectorAll('.theme-toggle').forEach(button => {
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
        
        // Add keyboard support for hamburger menu
        const hamburger = document.getElementById('mobile-menu-toggle');
        if (hamburger) {
            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    hamburger.click();
                }
            });
        }
    }
    
    addAriaLabels() {
        // Add aria-labels for better screen reader support
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        }
        
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
        
        // Update aria-expanded when menu opens/closes
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            const observer = new MutationObserver(() => {
                const isExpanded = mobileMenu.classList.contains('active');
                mobileMenuToggle?.setAttribute('aria-expanded', isExpanded.toString());
            });
            
            observer.observe(mobileMenu, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileMenu();
    new SmoothScroll();
    new EnquiryManager();
    new NavigationManager();
    new PerformanceOptimizer();
    new AccessibilityManager();
    
    // Add loading state management
    document.body.classList.add('loaded');
    
    // Add scroll-to-top functionality
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.setAttribute('aria-label', 'Scroll to top');
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(scrollToTop);
    
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
