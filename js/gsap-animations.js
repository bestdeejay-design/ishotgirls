// GSAP animations JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animation
        gsap.from('.hero-title', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-cta', {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: 0.4,
            ease: 'power3.out'
        });
        
        // Model cards stagger animation
        gsap.utils.toArray('.model-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                delay: index * 0.1,
                ease: 'power2.out'
            });
        });
        
        // Tag cloud floating animation
        gsap.utils.toArray('.tag').forEach((tag, index) => {
            gsap.to(tag, {
                duration: 3,
                y: -8,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut',
                delay: index * 0.1
            });
        });
        
        // Parallax background effect
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            gsap.to(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: -50,
                ease: 'none'
            });
        });
        
        // Scroll-triggered animations for sections
        gsap.from('.section-heading', {
            scrollTrigger: {
                trigger: '.section-heading',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });
        
        // Animate feature cards in lifestyle section
        gsap.utils.toArray('.feature-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                duration: 0.6,
                y: 40,
                opacity: 0,
                delay: index * 0.15,
                ease: 'power2.out'
            });
        });
    } else {
        console.log('GSAP library not loaded. Animations will not run.');
    }
});