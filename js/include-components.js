// Dynamically load nav and footer into placeholders
function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadComponent("nav-placeholder", "nav.html");
    loadComponent("footer-placeholder", "footer.html");
});

// Mobile Navigation
function initializeMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navCenter = document.querySelector('.nav-center');
    
    if (!hamburger || !navCenter) return; // Exit if elements not found
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navCenter.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-center') && 
            !event.target.closest('.hamburger') && 
            navCenter.classList.contains('active')) {
            hamburger.classList.remove('active');
            navCenter.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navCenter.classList.remove('active');
        });
    });
}
