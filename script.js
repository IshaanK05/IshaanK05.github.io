const menuButton = document.getElementById('menuButton');
const overlayMenu = document.getElementById('navigationMenu');

menuButton.addEventListener('click', () => {
    overlayMenu.classList.toggle('active');
});

//  Close the menu when a nav link is clicked
const navLinks = overlayMenu.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        overlayMenu.classList.remove('active');
    });
});

//  Close menu with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        overlayMenu.classList.remove('active');
    }
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Enhanced References carousel functionality with drag support
window.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.reference-track');
    const carousel = document.querySelector('.references-carousel');
    
    if (!track || !carousel) return;
    
    // Clone cards for infinite loop
    const cards = Array.from(track.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Draggable carousel variables
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let animationPaused = false;
    
    // Function to pause/resume animation
    function pauseAnimation() {
        carousel.style.animationPlayState = 'paused';
        animationPaused = true;
    }
    
    function resumeAnimation() {
        carousel.style.animationPlayState = 'running';
        animationPaused = false;
    }
    
    // Mouse events
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        pauseAnimation();
        
        // Prevent text selection while dragging
        e.preventDefault();
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            carousel.style.cursor = 'grab';
            resumeAnimation();
        }
    });
    
    carousel.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            carousel.style.cursor = 'grab';
            resumeAnimation();
        }
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
        carousel.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        pauseAnimation();
    });
    
    carousel.addEventListener('touchend', () => {
        isDragging = false;
        resumeAnimation();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
        
        // Prevent page scrolling while dragging
        e.preventDefault();
    });
    
    // Set initial cursor style
    carousel.style.cursor = 'grab';
    
    // Optional: Reset scroll position when animation completes a cycle
    carousel.addEventListener('animationiteration', () => {
        if (!isDragging && !animationPaused) {
            carousel.scrollLeft = 0;
        }
    });
});

// Scroll-triggered header collapse
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('collapsed');
    } else {
        header.classList.remove('collapsed');
    }
});

// Intersection Observer for scroll-triggered animations
function initScrollAnimations() {
    // Configuration for the observer
    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
    };

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Select all elements with the animate-title class
    const animatedTitles = document.querySelectorAll('.animate-title');
    
    // Start observing each title
    animatedTitles.forEach(title => {
        observer.observe(title);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Optional: Re-initialize if content is dynamically added
function reinitScrollAnimations() {
    initScrollAnimations();
}