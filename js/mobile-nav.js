document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navCenter = document.querySelector('.nav-center');
    
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
});
