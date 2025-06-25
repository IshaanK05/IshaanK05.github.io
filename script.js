// Get the menu button and navigation menu elements
/*
const menuButton = document.getElementById('menuButton');
const navigationMenu = document.getElementById('navigationMenu');

// Add click event listener to the menu button
menuButton.addEventListener('click', function() {
    // Toggle the 'active' class on the navigation menu
    navigationMenu.classList.toggle('active');
});

// Optional: Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!menuButton.contains(event.target) && !navigationMenu.contains(event.target)) {
        navigationMenu.classList.remove('active');
    }
});
*/

const menuButton = document.getElementById('menuButton');
const overlayMenu = document.getElementById('navigationMenu');

menuButton.addEventListener('click', () => {
    overlayMenu.classList.toggle('active');
});

// Optional: Close menu when Escape is pressed
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        overlayMenu.classList.remove('active');
    }
});


// Optional: Close menu when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        navigationMenu.classList.remove('active');
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

window.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.reference-track');
    const cards = Array.from(track.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
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