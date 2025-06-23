// Get the menu button and navigation menu elements
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
