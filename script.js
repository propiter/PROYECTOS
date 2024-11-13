// Language toggle functionality
const languageToggle = document.getElementById('language-toggle');
const sectionsText = {
    en: {
        about: 'About Me',
        projects: 'Projects',
        services: 'Services',
        contact: 'Contact',
    },
    es: {
        about: 'Acerca de mí',
        projects: 'Proyectos',
        services: 'Servicios',
        contact: 'Contacto',
    }
};

let currentLanguage = 'en';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    languageToggle.textContent = currentLanguage === 'en' ? 'Español' : 'English';

    // Update section headers
    document.querySelector('#about h2').textContent = sectionsText[currentLanguage].about;
    document.querySelector('#projects h2').textContent = sectionsText[currentLanguage].projects;
    document.querySelector('#services h2').textContent = sectionsText[currentLanguage].services;
    document.querySelector('#contact h2').textContent = sectionsText[currentLanguage].contact;
}

languageToggle.addEventListener('click', toggleLanguage);
