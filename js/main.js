// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('ISHOTGIRLS website loaded successfully!');
    
    // Initialize all components
    initializeModelCards();
    
    // Set up scroll event listeners
    setupScrollListeners();
});

function initializeModelCards() {
    // Create sample model cards dynamically
    const modelsGrid = document.querySelector('.models-grid');
    if (!modelsGrid) return;
    
    // Sample model data
    const models = [
        {
            name: "Anna Fitness",
            handle: "@ishot_anna",
            bio: "Fitness enthusiast • Healthy lifestyle advocate • Travel lover",
            followers: "150K",
            engagement: "85%"
        },
        {
            name: "Maria Strong",
            handle: "@ishot_maria",
            bio: "Yoga instructor • Nutrition specialist • Mindfulness coach",
            followers: "120K",
            engagement: "78%"
        },
        {
            name: "Sofia Active",
            handle: "@ishot_sofia",
            bio: "Crossfit champion • Wellness expert • Motivational speaker",
            followers: "200K",
            engagement: "92%"
        },
        {
            name: "Olivia Health",
            handle: "@ishot_olivia",
            bio: "Personal trainer • Health coach • Nutrition consultant",
            followers: "180K",
            engagement: "88%"
        },
        {
            name: "Emma Vitality",
            handle: "@ishot_emma",
            bio: "Dance fitness instructor • Lifestyle blogger • Wellness advocate",
            followers: "160K",
            engagement: "82%"
        },
        {
            name: "Lily Power",
            handle: "@ishot_lily",
            bio: "Strength trainer • Nutrition expert • Mental wellness coach",
            followers: "140K",
            engagement: "80%"
        }
    ];
    
    // Generate model cards
    models.forEach(model => {
        const card = document.createElement('div');
        card.className = 'model-card';
        card.innerHTML = `
            <div class="model-image-container">
                <img src="https://picsum.photos/400/480?random=${Math.floor(Math.random() * 100)}" alt="${model.name}" class="model-image">
                <div class="instagram-frame">
                    <div class="instagram-icons">
                        <svg class="icon-like" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/>
                        </svg>
                        <svg class="icon-comment" viewBox="0 0 24 24">
                            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="white"/>
                        </svg>
                    </div>
                </div>
            </div>
            
            <div class="model-info">
                <h3 class="model-name">${model.name}</h3>
                <p class="model-handle">${model.handle}</p>
                <p class="model-bio">${model.bio}</p>
                
                <div class="model-stats">
                    <span class="stat"><strong>${model.followers}</strong> followers</span>
                    <span class="stat"><strong>${model.engagement}</strong> engagement</span>
                </div>
                
                <button class="btn-view-profile">View Profile</button>
            </div>
        `;
        modelsGrid.appendChild(card);
    });
}

function setupScrollListeners() {
    // Add scroll event listener for section highlighting
    window.addEventListener('scroll', function() {
        highlightActiveSection();
    });
}

function highlightActiveSection() {
    const sections = document.querySelectorAll('.section');
    const menuItems = document.querySelectorAll('.menu-item');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-target') === currentSection) {
            item.classList.add('active');
        }
    });
}