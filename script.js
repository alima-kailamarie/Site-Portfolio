// This script runs on every page load

// Get the HTML element to apply the 'dark' class
const htmlElement = document.documentElement;
// Get the dark mode toggle button
const darkModeToggle = document.getElementById("darkModeToggle");

// Function to apply the theme immediately
const applyTheme = (theme) => {
    if (theme === "dark") {
        htmlElement.classList.add("dark");
        if (darkModeToggle) { // Check if the button exists on this page
            darkModeToggle.textContent = "☀️"; // Sun icon for dark mode
        }
    } else {
        htmlElement.classList.remove("dark");
        if (darkModeToggle) { // Check if the button exists on this page
            darkModeToggle.textContent = "🌙"; // Moon icon for light mode
        }
    }
};

// --- Dark Mode Logic (Runs synchronously before DOMContentLoaded) ---
// This ensures the theme is applied as quickly as possible to prevent FOUC (Flash of Unstyled Content)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // If no saved theme, check system preference
    applyTheme("dark");
} else {
    applyTheme("light"); // Default to light mode if no preference found
}

// --- DOMContentLoaded for other interactive elements and animations ---
document.addEventListener("DOMContentLoaded", () => {
    // Event listener for toggle button, only if it exists
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            if (htmlElement.classList.contains("dark")) {
                applyTheme("light");
                localStorage.setItem("theme", "light");
            } else {
                applyTheme("dark");
                localStorage.setItem("theme", "dark");
            }
        });
    }

    // Intersection Observer for section animations
    // Select all sections that need animation, including the hero section
    const sectionsToAnimate = document.querySelectorAll('section[id], .animate-fade-in');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply the general section animation
                if (entry.target.classList.contains('animate-fade-in')) {
                     entry.target.style.opacity = '1';
                     entry.target.style.animation = 'fade-in 1s ease-out forwards';
                } else { // For sections with fade-in-up animation
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = 'fade-in-up 0.8s ease-out forwards';
                }

                // Specific animations for skill items and project cards
                if (entry.target.id === 'about') {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        item.style.animation = `slide-in 0.6s ease-out forwards ${index * 100}ms`;
                        item.style.opacity = '1';
                    });
                } else if (entry.target.id === 'projects') {
                    const projectCards = entry.target.querySelectorAll('.animate-pop-in');
                    projectCards.forEach((card, index) => {
                        card.style.animation = `pop-in 0.5s ease-out forwards ${index * 100}ms`;
                        card.style.opacity = '1';
                    });
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe each relevant section
    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });
});