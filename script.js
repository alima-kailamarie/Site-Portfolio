document.addEventListener("DOMContentLoaded", () => {
    // Dark mode toggle
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        // Save user preference
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            darkModeToggle.textContent = "☀️"; // Sun icon for dark mode
        } else {
            localStorage.setItem("theme", "light");
            darkModeToggle.textContent = "🌙"; // Moon icon for light mode
        }
    });

    // Apply saved theme preference on load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        darkModeToggle.textContent = "☀️";
    } else {
        darkModeToggle.textContent = "🌙";
    }

    // Intersection Observer for "About Me" and "Projects" sections for animations
    const sectionsToAnimate = document.querySelectorAll('#about, #projects');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    // Animate skill items
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        item.style.animationDelay = `${index * 100}ms`;
                        item.style.opacity = '1';
                    });
                } else if (entry.target.id === 'projects') {
                    // Animate project cards
                    const projectCards = entry.target.querySelectorAll('.animate-pop-in');
                    projectCards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 100}ms`;
                        card.style.opacity = '1';
                    });
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });
});