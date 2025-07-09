// Typing Effect for Hero Section
const typingTexts = [
  ["I am Mahmoud Ibrahim", "Telecom Application Developer"],
];
const typingElement = document.querySelector(".typing-effect");
let textIndex = 0;
let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
let lines = ["", ""];

function type() {
    const currentPair = typingTexts[textIndex];
    if (!isDeleting) {
        // Typing phase
        if (charIndex < currentPair[lineIndex].length) {
            lines[lineIndex] = currentPair[lineIndex].substring(0, charIndex + 1);
            charIndex++;
            updateTypingElement();
            setTimeout(type, 80);
        } else {
            if (lineIndex === 0) {
                // Move to second line
                lineIndex = 1;
                charIndex = 0;
                setTimeout(type, 400);
            } else {
                // Both lines done, pause
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 1500);
            }
        }
    } else {
        // Deleting phase
        if (charIndex > 0) {
            lines[lineIndex] = currentPair[lineIndex].substring(0, charIndex - 1);
            charIndex--;
            updateTypingElement();
            setTimeout(type, 40);
        } else {
            if (lineIndex === 1) {
                // Move to first line
                lineIndex = 0;
                charIndex = currentPair[0].length;
                setTimeout(type, 200);
            } else {
                // Both lines deleted, next pair
                isDeleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
                lineIndex = 0;
                charIndex = 0;
                lines = ["", ""];
                setTimeout(type, 500);
            }
        }
    }
}

function updateTypingElement() {
    typingElement.innerHTML =
        `<span>${lines[0]}</span><br><span>${lines[1]}</span>`;
}

// Start typing effect only if element exists
if (typingElement) {
    type();
}

// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Mobile menu toggle with animation
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger lines
        const lines = hamburger.querySelectorAll('.line');
        if (hamburger.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const lines = hamburger.querySelectorAll('.line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const lines = hamburger.querySelectorAll('.line');
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });
}

// Enhanced Smooth Scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
const skillCategories = document.querySelectorAll('.skill-category');
const eduEntries = document.querySelectorAll('.edu-entry');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate project cards
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animate skill categories
skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(category);
});

// Animate education entries
eduEntries.forEach((entry, index) => {
    entry.style.opacity = '0';
    entry.style.transform = 'translateY(30px)';
    entry.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(entry);
});

// Enhanced Modal Video Logic
const viewDemoLinks = document.querySelectorAll('.project-link');
const videoModal = document.getElementById('videoModal');
const demoVideo = document.getElementById('demoVideo');
const closeModalBtn = document.getElementById('closeModalBtn');

if (videoModal && demoVideo && closeModalBtn) {
    viewDemoLinks.forEach(link => {
        if (link.textContent.includes('View Demo') && link.getAttribute('href') !== '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const videoUrl = link.getAttribute('href');
                
                if (videoUrl && videoUrl !== '#') {
                    demoVideo.querySelector('source').src = videoUrl;
                    demoVideo.load();
                    videoModal.style.display = 'flex';
                    
                    // Add loading state
                    demoVideo.style.opacity = '0.7';
                    
                    demoVideo.addEventListener('canplay', function() {
                        demoVideo.style.opacity = '1';
                        demoVideo.play().catch(e => {
                            console.log('Auto-play prevented:', e);
                        });
                    }, { once: true });
                }
            });
        }
    });

    closeModalBtn.addEventListener('click', function() {
        closeModal();
    });

    // Close modal when clicking outside the video area
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            closeModal();
        }
    });

    function closeModal() {
        videoModal.style.display = 'none';
        demoVideo.pause();
        demoVideo.currentTime = 0;
        demoVideo.style.opacity = '1';
    }
}

// Enhanced Touch Interactions for Mobile
if ('ontouchstart' in window) {
    // Add touch feedback for interactive elements
    const touchElements = document.querySelectorAll('.project-card, .skill-category, .edu-entry, .nav-links a, .social-links a');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(function() {
        // Add scroll-based effects here if needed
    }, 100);
});

// Enhanced loading experience
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Add loading state to body
document.body.style.opacity = '0';

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update button icon based on current theme
function updateThemeIcon() {
  const icon = themeToggle.querySelector('i');
  if (html.getAttribute('data-theme') === 'dark') {
    icon.className = 'fas fa-sun';
    themeToggle.classList.add('dark');
  } else {
    icon.className = 'fas fa-moon';
    themeToggle.classList.remove('dark');
  }
}

// Initialize theme icon
updateThemeIcon();

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
  
  // Add smooth transition effect
  document.body.style.transition = 'background 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
});

// === ScrollSpy: Highlight active nav link on scroll ===
const sections = document.querySelectorAll('section[id]');
const navLinksSpy = document.querySelectorAll('.nav-links a');

function onScrollSpy() {
  const centerPos = (window.scrollY || window.pageYOffset) + window.innerHeight / 2;
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;

  let found = false;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (!found && centerPos >= sectionTop && centerPos < sectionBottom) {
      navLinksSpy.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === section.id) {
          link.classList.add('active');
        }
      });
      found = true;
    }
  });
  // If at the bottom of the page, always activate the last section
  if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)) {
    navLinksSpy.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === sections[sections.length - 1].id) {
        link.classList.add('active');
      }
    });
  }
}

window.addEventListener('scroll', onScrollSpy);
window.addEventListener('load', onScrollSpy);