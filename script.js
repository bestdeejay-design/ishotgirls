// Initialize GSAP and plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const backToTopBtn = document.getElementById('backToTop');
const filterButtons = document.querySelectorAll('.filter-btn');
const modelCardsContainer = document.querySelector('.models-grid');
const instagramPopup = document.getElementById('instagramPopup');
const closePopup = document.querySelector('.close-popup');

// Sample model data
const modelsData = [
    {
        id: 1,
        name: "Sophia Fitness",
        handle: "@sophiafit",
        bio: "CrossFit enthusiast and nutrition coach. Sharing workout routines and healthy recipes.",
        specialty: "fitness",
        image: "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Sophia",
        tags: ["#fitness", "#crossfit", "#nutrition"]
    },
    {
        id: 2,
        name: "Emma Yoga",
        handle: "@emmayoga",
        bio: "Yoga instructor and mindfulness advocate. Bringing peace and balance to everyday life.",
        specialty: "yoga",
        image: "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Emma",
        tags: ["#yoga", "#mindfulness", "#wellness"]
    },
    {
        id: 3,
        name: "Mia Nutrition",
        handle: "@mianutrition",
        bio: "Registered dietitian and wellness blogger. Helping you eat clean and live healthy.",
        specialty: "nutrition",
        image: "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Mia",
        tags: ["#nutrition", "#healthyeating", "#dietitian"]
    },
    {
        id: 4,
        name: "Ava Lifestyle",
        handle: "@avalifestyle",
        bio: "Lifestyle influencer promoting work-life balance and self-care practices.",
        specialty: "lifestyle",
        image: "https://via.placeholder.com/300x300/F7DC6F/FFFFFF?text=Ava",
        tags: ["#lifestyle", "#selfcare", "#balance"]
    },
    {
        id: 5,
        name: "Chloe Run",
        handle: "@chloerun",
        bio: "Marathon runner and endurance athlete. Motivating others to reach their goals.",
        specialty: "fitness",
        image: "https://via.placeholder.com/300x300/BB8FCE/FFFFFF?text=Chloe",
        tags: ["#running", "#endurance", "#motivation"]
    },
    {
        id: 6,
        name: "Luna Wellness",
        handle: "@lunawellness",
        bio: "Holistic health coach focusing on mental and physical wellness integration.",
        specialty: "lifestyle",
        image: "https://via.placeholder.com/300x300/85C1E9/FFFFFF?text=Luna",
        tags: ["#wellness", "#holistic", "#mentalhealth"]
    }
];

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle button appearance based on saved theme
    updateThemeToggle(savedTheme);
}

function updateThemeToggle(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    updateThemeToggle(newTheme);
    localStorage.setItem('theme', newTheme);
}

// Create model cards
function createModelCards(models) {
    modelCardsContainer.innerHTML = '';
    
    models.forEach(model => {
        const card = document.createElement('div');
        card.className = 'model-card';
        card.dataset.specialty = model.specialty;
        
        card.innerHTML = `
            <div class="model-image" style="background-image: url('${model.image}')">
                <img src="${model.image}" alt="${model.name}" style="display:none;">
            </div>
            <div class="model-info">
                <h3 class="model-name">${model.name}</h3>
                <span class="model-handle">${model.handle}</span>
                <p class="model-bio">${model.bio}</p>
                <div class="model-tags">
                    ${model.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        // Add click event to open Instagram popup
        card.addEventListener('click', () => openInstagramPopup(model));
        
        modelCardsContainer.appendChild(card);
    });
    
    // Initialize animations for newly created cards
    animateModelCards();
}

// Open Instagram popup
function openInstagramPopup(model) {
    // For demo purposes, we'll use placeholder data
    const popupContent = document.querySelector('.popup-content');
    const profilePic = popupContent.querySelector('.profile-pic');
    const username = popupContent.querySelector('.username');
    const postImage = popupContent.querySelector('.post-image img');
    const caption = popupContent.querySelector('.post-caption p');
    
    profilePic.src = model.image;
    username.textContent = model.handle;
    postImage.src = model.image;
    caption.textContent = `Check out ${model.name}'s latest post! #${model.specialty} #inspiration`;
    
    instagramPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Instagram popup
function closeInstagramPopup() {
    instagramPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Filter models
function filterModels(specialty) {
    const filteredModels = specialty === 'all' 
        ? modelsData 
        : modelsData.filter(model => model.specialty === specialty);
    
    createModelCards(filteredModels);
}

// Animate elements on scroll
function animateHeroSection() {
    // Animate hero title
    gsap.from('.hero-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    });
    
    // Animate hero subtitle
    gsap.from('.hero-subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.2,
        ease: "power3.out"
    });
    
    // Animate hero buttons
    gsap.from('.hero-buttons', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.4,
        ease: "power3.out"
    });
    
    // Animate floating elements
    gsap.utils.toArray('.floating-element').forEach((element, index) => {
        gsap.from(element, {
            duration: 1.5,
            y: 100,
            opacity: 0,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%"
            }
        });
    });
}

function animateModelCards() {
    gsap.utils.toArray('.model-card').forEach((card, index) => {
        gsap.from(card, {
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            }
        });
    });
}

function animateSections() {
    // Animate sections as they come into view
    gsap.from('.section-title', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.section-title',
            start: "top 80%"
        }
    });
    
    gsap.from('.section-subtitle', {
        duration: 1,
        y: 20,
        opacity: 0,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.section-subtitle',
            start: "top 80%"
        }
    });
    
    // Animate brand cloud
    gsap.from('.brand-item', {
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        ease: "bounce.out",
        scrollTrigger: {
            trigger: '.brand-cloud',
            start: "top 80%"
        }
    });
}

// Parallax effect for hero background
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${Math.sin(scrolled * 0.01 + index) * 5}deg)`;
        });
    });
}

// Handle scroll progress
function handleScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Add scroll indicator to header or create a progress bar if needed
}

// Back to top functionality
function handleBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: "power2.inOut"
        });
    });
}

// Initialize everything
function init() {
    // Initialize theme
    initializeTheme();
    
    // Create model cards
    createModelCards(modelsData);
    
    // Set up event listeners
    themeToggle.addEventListener('click', toggleTheme);
    closePopup.addEventListener('click', closeInstagramPopup);
    backToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: "power2.inOut"
        });
    });
    
    // Set up filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterModels(button.dataset.filter);
        });
    });
    
    // Close popup when clicking outside
    instagramPopup.addEventListener('click', (e) => {
        if (e.target === instagramPopup) {
            closeInstagramPopup();
        }
    });
    
    // Initialize animations
    animateHeroSection();
    animateSections();
    initParallax();
    handleBackToTop();
    
    // Refresh scroll triggers when content changes
    ScrollTrigger.refresh();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', init);

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});