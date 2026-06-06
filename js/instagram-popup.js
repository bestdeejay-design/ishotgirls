// Instagram popup JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all "View Profile" buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-view-profile') || 
            e.target.closest('.btn-view-profile')) {
            
            // Create and show Instagram popup
            createInstagramPopup(e);
        }
    });
    
    // Close popup when clicking close button or outside the popup
    document.addEventListener('click', function(e) {
        const popup = document.querySelector('.instagram-popup');
        if (!popup) return;
        
        if (e.target.classList.contains('popup-close') || 
            e.target.closest('.popup-close') ||
            (e.target.classList.contains('instagram-popup') && popup.classList.contains('active'))) {
            
            closeInstagramPopup(popup);
        }
    });
});

function createInstagramPopup(event) {
    const button = event.target.classList.contains('btn-view-profile') 
        ? event.target 
        : event.target.closest('.btn-view-profile');
    
    const modelCard = button.closest('.model-card');
    const modelName = modelCard.querySelector('.model-name').textContent;
    const modelHandle = modelCard.querySelector('.model-handle').textContent;
    
    // Remove existing popup if present
    const existingPopup = document.querySelector('.instagram-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'instagram-popup active';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <div class="popup-avatar" style="background: linear-gradient(45deg, #FF3366, #0099FF);"></div>
                <div class="popup-username">${modelHandle}</div>
                <button class="popup-close">&times;</button>
            </div>
            <div class="popup-grid">
                <div class="popup-post" style="background: linear-gradient(45deg, #FF3366, #FF6699); color: white;">Post 1</div>
                <div class="popup-post" style="background: linear-gradient(45deg, #0099FF, #33BBFF); color: white;">Post 2</div>
                <div class="popup-post" style="background: linear-gradient(45deg, #FF3366, #0099FF); color: white;">Post 3</div>
                <div class="popup-post" style="background: linear-gradient(45deg, #FF6699, #00CCFF); color: white;">Post 4</div>
                <div class="popup-post" style="background: linear-gradient(45deg, #00CCFF, #FF3366); color: white;">Post 5</div>
                <div class="popup-post" style="background: linear-gradient(45deg, #FF3366, #0099FF); color: white;">Post 6</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Add click event to close button
    const closeBtn = popup.querySelector('.popup-close');
    closeBtn.addEventListener('click', function() {
        closeInstagramPopup(popup);
    });
}

function closeInstagramPopup(popup) {
    popup.classList.remove('active');
    setTimeout(() => {
        popup.remove();
    }, 300);
}