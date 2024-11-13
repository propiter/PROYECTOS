// cursor.js
export function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;

    // Smooth cursor movement
    function smoothCursor() {
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;

        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        follower.style.transform = `translate3d(${posX - 4}px, ${posY - 4}px, 0)`;

        requestAnimationFrame(smoothCursor);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll([
        'a',
        'button',
        '.expertise-card',
        '.project-card',
        '.social-icon'
    ].join(','));

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
            
            // Add custom cursor states based on element type
            if (element.classList.contains('expertise-card')) {
                cursor.classList.add('view');
            } else if (element.classList.contains('project-card')) {
                cursor.classList.add('project');
            }
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover', 'view', 'project');
            follower.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });

    document.addEventListener('mouseover', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });

    // Start smooth cursor animation
    smoothCursor();
}