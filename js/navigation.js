// Navigation JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Desktop menu click handlers
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth < 1024) {
                    const menuPanel = document.querySelector('.mobile-menu-panel');
                    if (menuPanel) {
                        menuPanel.style.transform = 'translateY(100%)';
                        menuPanel.style.height = '0';
                        setTimeout(() => {
                            menuPanel.style.display = 'none';
                        }, 400);
                    }
                }
                
                // Scroll to section
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active menu item
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger-btn');
    const menuPanel = document.querySelector('.mobile-menu-panel');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const menuLinks = document.querySelectorAll('.mobile-menu-panel a');

    // Open menu
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            menuPanel.style.display = 'block';
            setTimeout(() => {
                menuPanel.style.transform = 'translateY(0)';
                menuPanel.style.height = '85vh';
            }, 10);
            document.body.style.overflow = 'hidden';
        });
    }

    // Close menu
    function closeMenu() {
        menuPanel.style.transform = 'translateY(100%)';
        menuPanel.style.height = '0';
        setTimeout(() => {
            menuPanel.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }
    
    // Close when clicking outside panel
    if (menuPanel) {
        menuPanel.addEventListener('click', function(e) {
            if (e.target === menuPanel) {
                closeMenu();
            }
        });
    }

    // Close when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                closeMenu();
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 400);
            }
        });
    });
});