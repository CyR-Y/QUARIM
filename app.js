document.addEventListener('DOMContentLoaded', () => {
    // Dynamic loading of projects
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const projectGrid = document.querySelector('.project-grid');
            data.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.link}" class="button" target="_blank">View Document</a>
                    </div>
                `;
                projectGrid.appendChild(projectCard);
            });
        });

    // Scroll animations
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            } else {
                entry.target.classList.remove('revealed');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    sections.forEach(section => {
        observer.observe(section);
    });

    // Fireworks effect
    const button = document.getElementById('fireworks-button');
    button.addEventListener('click', (event) => {
        for (let i = 0; i < 5; i++) { // Create 5 fireworks
            const firework = document.createElement('div');
            firework.classList.add('firework');
            firework.innerHTML = '🎆'; 
            firework.style.left = `${Math.random() * window.innerWidth}px`;
            firework.style.top = `${Math.random() * window.innerHeight}px`;
            document.body.appendChild(firework);

            // Remove the firework after animation
            firework.addEventListener('animationend', () => {
                firework.remove();
            });
        }
    });

    const explosionButton = document.getElementById('explosion-button');
    const explosionContainer = document.getElementById('explosion-container');

    explosionButton.addEventListener('click', (event) => {
        const explosionCount = 10; // Number of smaller explosions
        const rect = explosionButton.getBoundingClientRect();

        for (let i = 0; i < explosionCount; i++) {
            const explosion = document.createElement('div');
            explosion.classList.add('explosion');

            // Randomize position around the button
            const offsetX = (Math.random() - 0.5) * 100; // Random offset in X direction
            const offsetY = (Math.random() - 0.5) * 100; // Random offset in Y direction

            explosion.style.left = `${rect.left + rect.width / 2 + offsetX}px`;
            explosion.style.top = `${rect.top + rect.height / 2 + offsetY}px`;

            explosionContainer.appendChild(explosion);

            // Remove the explosion after the animation
            explosion.addEventListener('animationend', () => {
                explosion.remove();
            });
        }
    });
});

function createFirework(x, y) {
    const container = document.getElementById('fireworks-container');
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = `${x}px`;
    firework.style.top = `${y}px`;
    container.appendChild(firework);

    setTimeout(() => {
        container.removeChild(firework);
    }, 1000);
}

// Simulate the user clicking
document.addEventListener('click', (event) => {
    createFirework(event.clientX, event.clientY);
});

function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${Math.random() * window.innerWidth}px`;
    document.body.appendChild(bubble);

    // Remove the bubble after the animation
    setTimeout(() => {
        bubble.remove();
    }, 5000); // Adjust duration as needed
}

// Create bubbles at intervals
setInterval(createBubble, 1000); // Create a bubble every second
