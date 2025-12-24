// Research Page Interactive Elements

// Toggle Cooperation Content (for collapsible cooperation blocks)
function toggleCooperationContent(header) {
    const content = header.nextElementSibling;
    
    if (content.classList.contains('show')) {
        content.classList.remove('show');
        header.classList.remove('active');
    } else {
        content.classList.add('show');
        header.classList.add('active');
    }
}

// Toggle Programme Details
function toggleProgrammeDetails(button) {
    const programmeItem = button.closest('.programme-item');
    const detailsDiv = programmeItem.querySelector('.programme-details');
    const expandText = button.querySelector('span');
    
    if (detailsDiv.classList.contains('show')) {
        detailsDiv.classList.remove('show');
        button.classList.remove('active');
        expandText.textContent = 'Learn More';
    } else {
        detailsDiv.classList.add('show');
        button.classList.add('active');
        expandText.textContent = 'Show Less';
    }
}

// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', function() {
    // Auto-expand first cooperation block on page load
    const firstCooperationHeader = document.querySelector('.cooperation-header.clickable');
    if (firstCooperationHeader) {
        const firstContent = firstCooperationHeader.nextElementSibling;
        firstContent.classList.add('show');
        firstCooperationHeader.classList.add('active');
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.stat-item, .cooperation-block, .programme-item, .research-group-card'
    );
    
    elementsToAnimate.forEach(el => {
        animateOnScroll.observe(el);
    });

    // Add scroll-based header shrink effect
    let lastScroll = 0;
    const pageHeader = document.querySelector('.page-header');
    
    if (pageHeader) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                pageHeader.classList.add('scrolled');
            } else {
                pageHeader.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Highlight active section in view
    const sections = document.querySelectorAll('.research-section');
    const navHeight = 100;

    function highlightSection() {
        let scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                section.classList.add('active-section');
            } else {
                section.classList.remove('active-section');
            }
        });
    }

    window.addEventListener('scroll', highlightSection);

    // Add stagger animation for stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effect counter animation for stats
    statItems.forEach(item => {
        const numberElement = item.querySelector('.stat-number');
        const targetNumber = parseInt(numberElement.textContent);
        
        const animateCounter = () => {
            let currentNumber = 0;
            const increment = targetNumber / 50;
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= targetNumber) {
                    numberElement.textContent = targetNumber;
                    clearInterval(timer);
                } else {
                    numberElement.textContent = Math.floor(currentNumber);
                }
            }, 30);
        };

        // Trigger animation when element comes into view
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(item);
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .stat-item {
        opacity: 0;
    }
    
    .stat-item.fade-in-up {
        opacity: 1;
    }
    
    .page-header {
        transition: all 0.3s ease;
    }
    
    .page-header.scrolled {
        padding: var(--spacing-md) 0;
    }
    
    .page-header.scrolled h1 {
        font-size: var(--font-size-xl);
    }
    
    /* Scroll Progress Indicator */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--academic-gold) 0%, var(--academic-blue) 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(style);

// Add scroll progress bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Print functionality for research content
function printResearchContent() {
    window.print();
}

// Export to PDF functionality (requires html2pdf library)
function exportToPDF() {
    // This is a placeholder - you would need to include html2pdf.js library
    console.log('Export to PDF functionality - requires html2pdf.js library');
}

// Share functionality
function shareResearch(platform) {
    const url = window.location.href;
    const title = document.querySelector('.page-header h1').textContent;
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

// Add styles for back to top button
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--academic-blue);
        color: var(--white);
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(3, 54, 163, 0.3);
        z-index: 1000;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: var(--academic-gold);
        color: var(--academic-blue);
        transform: translateY(-5px);
        box-shadow: 0 6px 16px rgba(3, 54, 163, 0.4);
    }
`;
document.head.appendChild(backToTopStyle);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
