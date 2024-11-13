// main.js
import { initCursor } from './cursor.js';
import { initAnimations } from './animations.js';
import { loadProjects } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initAnimations();
    loadProjects();
});

// cursor.js
export function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseenter', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        }
    });
}

// Add more JavaScript modules for animations and project management