import { translations } from './js/translations.js';
import { setLanguage, initializeLanguage } from './js/language.js';
import { debounce, performGlobalSearch, performLocalSearch, initializeSearch } from './js/search.js';
import { initializeExpandableContent } from './js/expand.js';

document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link based on current page
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-menu a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Update active state on page load
    updateActiveNavLink();

    // Initialize expandable content
    initializeExpandableContent();

    // Initialize search functionality
    initializeSearch();

    // Language switching functionality
    const langToggle = document.getElementById('langToggle');
    
    function setLanguage(lang) {
        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
        
        // Update toggle state
        if (langToggle) {
            langToggle.checked = lang === 'de';
        }

        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                if (element.classList.contains('show-more')) {
                    // Special handling for "Show more" links to preserve the icon
                    const icon = element.querySelector('i');
                    element.textContent = translations[lang][key] + ' ';
                    if (icon) element.appendChild(icon);
                } else if (element.classList.contains('member-title')) {
                    // Special handling for member titles to preserve line breaks
                    element.innerHTML = translations[lang][key].split('\n').join('<br>');
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });

        // Update search placeholder
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.placeholder = translations[lang].search;
        }

        // Update document language
        document.documentElement.lang = lang;
    }

    // Initialize language from localStorage or default to 'en'
    function initializeLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        setLanguage(savedLang);
    }

    // Add change handler for language toggle
    if (langToggle) {
        langToggle.addEventListener('change', () => {
            const lang = langToggle.checked ? 'de' : 'en';
            setLanguage(lang);
        });
    }

    // Initialize the page with the current language
    initializeLanguage();

    // Handle navigation with optimized transitions
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.href;
            
            // Update active state
            document.querySelectorAll('.nav-menu a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
            
            // Add fade-out class
            document.body.classList.add('fade-out');
            
            // Navigate after a shorter fade-out
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 200);
        });
    });

    // Remove fade-out class when page loads
    if (document.body.classList.contains('fade-out')) {
        document.body.classList.remove('fade-out');
    }

    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    if (searchBox && searchButton) {
        // Search on button click
        searchButton.addEventListener('click', () => {
            const value = searchBox.value.trim();
            if (value) {
                window.location.href = `search-results.html?q=${encodeURIComponent(value)}`;
            }
        });

        // Search on Enter key
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const value = searchBox.value.trim();
                if (value) {
                    window.location.href = `search-results.html?q=${encodeURIComponent(value)}`;
                }
            }
        });
    }

    // Define searchable content for each page
    const pageContent = {
        'team.html': {
            'professor': {
                title: 'Professor',
                section: 'professor',
                keywords: ['professor', 'faculty', 'teaching', 'academic']
            },
            'post doc': {
                title: 'Post Doctoral',
                section: 'postdoc',
                keywords: ['post doc', 'postdoc', 'researcher', 'research']
            },
            'phd': {
                title: 'Ph.D Students',
                section: 'phd',
                keywords: ['phd', 'doctoral', 'student', 'research']
            },
            'shk': {
                title: 'SHK',
                section: 'shk',
                keywords: ['shk', 'student assistant', 'helper']
            }
        },
        'news.html': {
            'news': {
                news: "News/Events",
                keywords: ['news', 'updates', 'latest']
            }
        },
        'project.html': {
            'project': {
                title: 'Project',
                keywords: ['project', 'research', 'work']
            }
        },
        'corpus.html': {
            'corpus': {
                title: 'Corpus',
                keywords: ['corpus', 'data', 'collection']
            }
        },
        'publication.html': {
            'publication': {
                title: 'Publication',
                keywords: ['publication', 'paper', 'research']
            }
        }
    };

    function performGlobalSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // If we're already on team.html, perform local search
        if (currentPage === 'team.html') {
            performLocalSearch(searchTerm);
            return;
        }

        // Check if the search term matches any team page content
        let foundMatch = false;
        for (const [key, content] of Object.entries(pageContent['team.html'])) {
            if (content.keywords.some(keyword => searchTerm.includes(keyword)) ||
                key.includes(searchTerm) ||
                content.title.toLowerCase().includes(searchTerm)) {
                    
                // Navigate to team page with search parameter
                const targetUrl = `team.html?search=${encodeURIComponent(searchTerm)}`;
                navigateWithTransition(targetUrl);
                foundMatch = true;
                break;
            }
        }

        // If no match found, show no results message
        if (!foundMatch) {
            showNoResultsMessage();
        }
    }

    function performLocalSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();
        
        // Get all team members
        const teamMembers = document.querySelectorAll('.team-member');
        let hasResults = false;

        teamMembers.forEach(member => {
            // Get searchable content from the member
            const name = member.querySelector('.member-name')?.textContent.toLowerCase() || '';
            const title = member.querySelector('.member-title')?.textContent.toLowerCase() || '';
            const section = member.closest('.team-section')?.querySelector('.section-header h2')?.textContent.toLowerCase() || '';
            
            // Check if the search term matches any of the member's content
            const matches = name.includes(searchTerm) || 
                          title.includes(searchTerm) || 
                          section.includes(searchTerm);

            // Show/hide the member based on search results
            if (matches) {
                member.style.display = '';
                hasResults = true;
                expandSection(member.closest('.team-section'));
            } else {
                member.style.display = 'none';
            }
        });

        // Show/hide sections based on whether they have visible members
        document.querySelectorAll('.team-section').forEach(section => {
            const hasVisibleMembers = Array.from(section.querySelectorAll('.team-member'))
                .some(member => member.style.display !== 'none');
            section.style.display = hasVisibleMembers ? '' : 'none';
        });

        if (!hasResults) {
            showNoResultsMessage();
        } else {
            hideNoResultsMessage();
        }
    }

    function expandSection(section) {
        if (section) {
            const grid = section.querySelector('.team-grid');
            const toggleBtn = section.querySelector('.toggle-btn');
            if (grid && toggleBtn) {
                grid.classList.remove('collapsed');
                toggleBtn.classList.remove('collapsed');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
        }
    }

    function showNoResultsMessage() {
        const noResultsMsg = getNoResultsMessage();
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        noResultsMsg.textContent = currentLang === 'de' ? 
            'Keine Ergebnisse gefunden.' : 
            'No results found.';
        noResultsMsg.style.display = 'block';
    }

    function hideNoResultsMessage() {
        const noResultsMsg = document.querySelector('.no-results-message');
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }

    function getNoResultsMessage() {
        return document.querySelector('.no-results-message') || 
            (() => {
                const msg = document.createElement('p');
                msg.className = 'no-results-message';
                msg.style.textAlign = 'center';
                msg.style.padding = '2rem';
                msg.style.color = '#666';
                document.querySelector('main').appendChild(msg);
                return msg;
            })();
    }

    function navigateWithTransition(url) {
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = url;
        }, 200);
    }

    // Section Toggle Functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('collapsed');
            const section = button.closest('.team-section');
            const grid = section.querySelector('.team-grid');
            grid.classList.toggle('collapsed');
            const isExpanded = !button.classList.contains('collapsed');
            button.setAttribute('aria-expanded', isExpanded);
        });
    });
});

// Ensure smooth fade-in on page load
window.addEventListener('load', () => {
    document.body.classList.remove('fade-out');
});
