// animations.js
export function initAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Floating shapes animation
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach(shape => {
        shape.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
    });

    // Glitch text effect
    function glitchText() {
        const glitchTexts = document.querySelectorAll('.glitch-text');
        glitchTexts.forEach(text => {
            const originalText = text.textContent;
            const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
            
            let interval;
            
            text.addEventListener('mouseover', () => {
                let iteration = 0;
                clearInterval(interval);
                
                interval = setInterval(() => {
                    text.textContent = text.textContent
                        .split('')
                        .map((letter, index) => {
                            if(index < iteration) {
                                return originalText[index];
                            }
                            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        })
                        .join('');
                    
                    if(iteration >= originalText.length) {
                        clearInterval(interval);
                    }
                    
                    iteration += 1/3;
                }, 30);
            });
        });
    }

    // Parallax effect for background elements
    function parallaxEffect() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            document.querySelectorAll('.parallax').forEach(shift => {
                const speed = shift.getAttribute('data-speed');
                
                const x = (window.innerWidth - mouseX * speed) / 100;
                const y = (window.innerHeight - mouseY * speed) / 100;
                
                shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    }

    // Initialize all animations
    glitchText();
    parallaxEffect();
}