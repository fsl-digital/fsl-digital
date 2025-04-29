document.addEventListener('DOMContentLoaded', function() {
    // Load the navigation
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            
            // Add active class to current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const currentLink = document.querySelector(`.nav-menu a[href="${currentPage}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        })
        .catch(error => console.error('Error loading navigation:', error));
});
