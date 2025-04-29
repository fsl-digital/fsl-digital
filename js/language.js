// language.js
import { translations } from './translations.js';

export function setLanguage(lang) {
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update toggle state
    const langToggle = document.getElementById('langToggle');
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

export function initializeLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLang);
}
