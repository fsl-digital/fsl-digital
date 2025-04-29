document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navCenter = document.querySelector('.nav-center');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navCenter.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navCenter.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Toggle menu when clicking hamburger
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navCenter.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Prevent clicks inside nav-center from closing the menu
    navCenter.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
