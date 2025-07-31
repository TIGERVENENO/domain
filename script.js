// TabSaver Landing Page JavaScript
// Handles theme switching, modal interactions, and smooth scrolling

class TabSaverLanding {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.addScrollAnimations();
    }

    /**
     * Initialize DOM element references
     */
    initializeElements() {
        // Install buttons
        this.installBtns = document.querySelectorAll('.install-btn, .install-btn-large');
        
        // Plan buttons
        this.planBtns = document.querySelectorAll('.plan-btn');
        
        // Animated elements
        this.animatedElements = document.querySelectorAll('.feature-card, .step-card, .price-card');
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Install buttons
        this.installBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleInstallClick(e));
        });

        // Plan buttons
        this.planBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handlePlanClick(e));
        });

        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Intersection Observer for animations
        this.setupScrollAnimations();
    }

    /**
     * Handle install button clicks
     */
    handleInstallClick(event) {
        event.preventDefault();
        
        // Add click animation
        const btn = event.currentTarget;
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        // In a real implementation, this would redirect to Chrome Web Store
        // For demo purposes, show a notification
        this.showNotification('Redirecting to Chrome Web Store...', 'info');
        
        // Simulate redirect delay
        setTimeout(() => {
            // Replace with actual Chrome Web Store URL
            window.open('https://chromewebstore.google.com/detail/tab-saver/knljchkecgbghkbfombedjjekbnbmojg', '_blank');
        }, 1000);
    }

    /**
     * Handle plan button clicks
     */
    handlePlanClick(event) {
        const btn = event.currentTarget;
        const planType = btn.textContent.includes('Free') ? 'free' : 'premium';
        
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
        
        if (planType === 'free') {
            this.handleInstallClick(event);
        } else {
            // For premium plans, show upgrade info
            this.showNotification('Please install the extension first, then choose Premium in settings', 'info');
            setTimeout(() => {
                this.handleInstallClick(event);
            }, 2000);
        }
    }

    /**
     * Show notification (simple implementation)
     */
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${this.escapeHtml(message)}</span>
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '10000',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            animation: 'slideInRight 0.3s ease',
            background: type === 'info' ? '#4299e1' : type === 'success' ? '#48bb78' : '#e53e3e'
        });
        
        // Add to document
        document.body.appendChild(notification);
        
        // Handle close button
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.remove();
            });
        }
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    /**
     * Setup scroll animations
     */
    setupScrollAnimations() {
        // Create intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe animated elements
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    /**
     * Add scroll animation styles
     */
    addScrollAnimations() {
        // Add CSS for scroll animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes fadeInUp {
                from {
                    transform: translateY(30px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .feature-card,
            .step-card,
            .price-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .feature-card.animate-in,
            .step-card.animate-in,
            .price-card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }
            
            .notification-close:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            @media (prefers-reduced-motion: reduce) {
                .feature-card,
                .step-card,
                .price-card {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
                
                .notification {
                    animation: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Smooth scroll to element
     */
    scrollToElement(element) {
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Add parallax effect to header (optional enhancement)
     */
    addParallaxEffect() {
        const header = document.querySelector('.header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < header.offsetHeight) {
                header.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    /**
     * Add typing animation to hero title (optional enhancement)
     */
    addTypingAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid';
        heroTitle.style.animation = 'blink 1s infinite';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                heroTitle.style.borderRight = 'none';
                heroTitle.style.animation = 'none';
            }
        };

        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);

        // Add blink animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { border-color: transparent; }
                51%, 100% { border-color: currentColor; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TabSaverLanding();
});

// Add some additional interactive enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.98)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Add floating animation to premium badges
    const premiumBadges = document.querySelectorAll('.premium-badge, .recommended-badge');
    premiumBadges.forEach(badge => {
        badge.style.animation = 'float 3s ease-in-out infinite';
    });

    // Add float animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
});

