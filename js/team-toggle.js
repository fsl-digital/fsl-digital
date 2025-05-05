document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('.team-section');
            const teamGrid = section.querySelector('.team-grid');
            const icon = button.querySelector('i');

            if (teamGrid) {
                teamGrid.style.display = teamGrid.style.display === 'none' ? 'grid' : 'none';
                icon.classList.toggle('fa-chevron-up');
                icon.classList.toggle('fa-chevron-down');
            }
        });
    });
});
