// projects.js
const projects = [
    {
        id: 1,
        title: "Project Name 1",
        category: "web",
        image: "assets/images/project1.jpg",
        technologies: ["React", "Node.js", "MongoDB"],
        description: "Project description goes here",
        link: "https://project1.com"
    },
    // Add more projects here
];

export function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-buttons button');

    // Create project cards
    function createProjectCard(project) {
        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <h3>${project.title}</h3>
                        <div class="tech-stack">
                            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                </div>
            </div>
        `;
    }

    // Filter projects
    function filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Initialize projects
    function init() {
        // Load all projects
        projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');

        // Add filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterProjects(button.dataset.filter);
            });
        });

        // Add hover animations
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const overlay = card.querySelector('.project-overlay');
                overlay.style.opacity = '1';
            });

            card.addEventListener('mouseleave', () => {
                const overlay = card.querySelector('.project-overlay');
                overlay.style.opacity = '0';
            });
        });
    }

    // Initialize on load
    init();

    // Export for use in other modules if needed
    return {
        filterProjects,
        refreshProjects: init
    };
}

// Add project modal functionality
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('project-link')) {
                const projectId = card.dataset.id;
                const project = projects.find(p => p.id === parseInt(projectId));
                
                if (project) {
                    showProjectModal(project);
                }
            }
        });
    });
}

function showProjectModal(project) {
    const modal = document.createElement('div');
    modal.classList.add('project-modal');
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${project.title}</h2>
            <img src="${project.image}" alt="${project.title}">
            <div class="modal-details">
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <p>${project.description}</p>
                <a href="${project.link}" target="_blank" class="modal-link">Visit Project</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}