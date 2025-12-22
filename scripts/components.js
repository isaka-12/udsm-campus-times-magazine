// Component Loader - Loads navbar and footer dynamically
document.addEventListener('DOMContentLoaded', function() {
    // Determine the correct path based on current location
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    const pathPrefix = isInPagesFolder ? '' : 'pages/';
    
    // Load Navbar
    fetch(pathPrefix + 'navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Navbar not found');
            return response.text();
        })
        .then(data => {
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = data;
                initializeNavbar();
                initializeStickyNav();
            }
        })
        .catch(error => console.error('Error loading navbar:', error));
    
    // Load Footer
    fetch(pathPrefix + 'footer.html')
        .then(response => {
            if (!response.ok) throw new Error('Footer not found');
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
                fixFooterLinks();
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Initialize navbar functionality (mobile toggle)
function initializeNavbar() {
    // Fix navbar links based on current location
    fixNavbarLinks();
    
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // Animate hamburger icon
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarToggle.contains(event.target) || navbarMenu.contains(event.target);
            
            if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navbarMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            });
        });
    }
}

// Fix navbar links based on current page location
function fixNavbarLinks() {
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    const navLinks = document.querySelectorAll('.navbar-nav a, .navbar-brand a');
    
    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        
        if (isInPagesFolder) {
            // We're in pages folder, adjust links
            if (href === 'index.html') {
                link.setAttribute('href', '../index.html');
            } else if (href.startsWith('pages/')) {
                // Remove 'pages/' prefix for links to other pages
                link.setAttribute('href', href.replace('pages/', ''));
            }
        }
        // If we're in root, links are already correct
    });
}
// Initialize sticky navigation behavior
function initializeStickyNav() {
    const navLinksWrapper = document.querySelector('.navbar-links-wrapper');
    const navBrandWrapper = document.querySelector('.navbar-brand-wrapper');
    
    if (!navLinksWrapper || !navBrandWrapper) {
        console.log('Nav wrappers not found');
        return;
    }
    
    // Get the offset position where nav should become fixed
    const navOffset = navBrandWrapper.offsetHeight;
    
    console.log('Sticky nav initialized, offset:', navOffset);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > navOffset) {
            navLinksWrapper.classList.add('fixed');
            navLinksWrapper.classList.add('scrolled');
            // Add padding to body to prevent content jump
            document.body.style.paddingTop = navLinksWrapper.offsetHeight + 'px';
        } else {
            navLinksWrapper.classList.remove('fixed');
            navLinksWrapper.classList.remove('scrolled');
            document.body.style.paddingTop = '0';
        }
    });
}
// Fix footer links based on current page location
function fixFooterLinks() {
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    const footerLinks = document.querySelectorAll('.footer a');
    
    footerLinks.forEach(link => {
        let href = link.getAttribute('href');
        
        // Skip social media and external links
        if (!href || href.startsWith('#') || href.startsWith('http')) {
            return;
        }
        
        if (isInPagesFolder) {
            // We're in pages folder, adjust links
            if (href === 'index.html') {
                link.setAttribute('href', '../index.html');
            } else if (href.startsWith('pages/')) {
                // Remove 'pages/' prefix for links to other pages
                link.setAttribute('href', href.replace('pages/', ''));
            }
        }
        // If we're in root, links are already correct
    });
}

// Highlight active page in navigation
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.style.backgroundColor = 'var(--academic-gold)';
            link.style.color = 'var(--academic-blue)';
        }
    });
}

// Call highlight function after navbar is loaded
setTimeout(highlightActivePage, 100);
