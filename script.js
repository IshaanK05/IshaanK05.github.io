// =========================
// Navigation Overlay Menu
// =========================
const menuButton = document.getElementById('menuButton');
const overlayMenu = document.getElementById('navigationMenu');

if (menuButton && overlayMenu) {
    menuButton.addEventListener('click', () => {
        overlayMenu.classList.toggle('active');
    });

    // Close the menu when a nav link is clicked
    const navLinks = overlayMenu.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlayMenu.classList.remove('active');
        });
    });
}

// =========================
// Modal Utilities
// =========================
function anyModalOpen() {
    const modals = document.querySelectorAll('.modal');
    for (const modal of modals) {
        // If display is set inline OR if a class-based approach is used later, this still works
        const isVisible =
            modal.style.display === 'block' ||
            (getComputedStyle(modal).display !== 'none' && modal.classList.contains('active'));
        if (isVisible) return true;
    }
    return false;
}

function lockScroll() {
    document.body.style.overflow = 'hidden';
}

function unlockScrollIfSafe() {
    // Only unlock if no modals are open
    if (!anyModalOpen()) {
        document.body.style.overflow = 'auto';
    }
}

// Keep these GLOBAL because your HTML uses inline onclick calls:
// onclick="openModal('...')" / onclick="closeModal('...')"
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = 'block';
    lockScroll();
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = 'none';
    unlockScrollIfSafe();
}

// =========================
// Close modal when clicking the backdrop (outside modal-content)
// =========================
window.addEventListener('click', (event) => {
    // If user clicked the backdrop itself (the .modal element), close it
    if (event.target && event.target.classList && event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        unlockScrollIfSafe();
    }
});

// =========================
// Escape key behavior:
// - If nav overlay is open: close it
// - If any modal is open: close ALL open modals (matches your current behavior)
// =========================
document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    // Close nav overlay first (if open)
    if (overlayMenu && overlayMenu.classList.contains('active')) {
        overlayMenu.classList.remove('active');
    }

    // Close any open modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    unlockScrollIfSafe();
});

// =========================
// Enhanced References carousel functionality with drag support
// =========================
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

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let animationPaused = false;

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
        e.preventDefault();
    });

    carousel.addEventListener('mouseleave', () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
        resumeAnimation();
    });

    carousel.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
        resumeAnimation();
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();

        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        pauseAnimation();
    }, { passive: true });

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
    }, { passive: false });

    // Set initial cursor style
    carousel.style.cursor = 'grab';

    // Optional: Reset scroll position when animation completes a cycle
    carousel.addEventListener('animationiteration', () => {
        if (!isDragging && !animationPaused) {
            carousel.scrollLeft = 0;
        }
    });
});

// =========================
// Scroll-triggered header collapse
// =========================
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add('collapsed');
    } else {
        header.classList.remove('collapsed');
    }
});

// =========================
// Intersection Observer for scroll-triggered animations
// =========================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedTitles = document.querySelectorAll('.animate-title');
    animatedTitles.forEach(title => observer.observe(title));
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Optional: Re-initialize if content is dynamically added
function reinitScrollAnimations() {
    initScrollAnimations();
}
