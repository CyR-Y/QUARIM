document.addEventListener('DOMContentLoaded', () => {
    const username = 'CyR-Y'; // Your GitHub username
    const projectGrid = document.querySelector('.project-grid');

    // Fetch repositories from GitHub
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            repos.forEach(repo => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');
                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available.'}</p>
                    <div class="project-links">
                        <a href="${repo.html_url}" class="button" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                    </div>
                `;
                projectGrid.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error fetching repositories:', error));

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

    // Delay bubble creation to allow UI to be visible first
    setTimeout(() => {
        const bubbleCount = 30; // Adjust the number of bubbles
        const bubblesContainer = document.querySelector('.bubbles');

        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            // Randomize size
            const size = Math.random() * 50 + 10; // Size between 10px and 60px
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Randomize position
            bubble.style.left = `${Math.random() * 100}vw`; // Position across the viewport width
            bubble.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random duration between 5s and 10s

            bubblesContainer.appendChild(bubble);
        }
    }, 2000); // Delay of 2000 milliseconds (2 seconds)

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Send the email
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function() {
                alert('Message sent successfully!');
            }, function(error) {
                alert('Failed to send message. Please try again later.');
            });

        // Reset the form
        this.reset();
    });
});
