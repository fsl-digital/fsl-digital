document.addEventListener('DOMContentLoaded', function() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set the data-page attribute on the body
    const pageName = currentPage.replace('.html', '');
    document.body.setAttribute('data-page', pageName);
    
    // Add active class to current nav item
    const currentLink = document.querySelector(`.nav-menu a[href$="${currentPage}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
});
