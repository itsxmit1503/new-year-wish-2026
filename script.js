// Global variables
let currentPage = 'home';
const pages = {
    'home': document.getElementById('homePage'),
    'welcome': document.getElementById('welcomePage'),
    'memories': document.getElementById('memoriesPage'),
    'thoughts': document.getElementById('thoughtsPage'),
    'why-love': document.getElementById('whyLovePage'),
    'what-mean': document.getElementById('whatMeanPage'),
    'forever': document.getElementById('foreverPage'),
    'celebration': document.getElementById('celebrationPage')
};

const menuToggle = document.getElementById('menuToggle');
const sidebarMenu = document.getElementById('sidebarMenu');
const menuClose = document.getElementById('menuClose');
const menuItems = document.querySelectorAll('.menu-item');
const listItems = document.querySelectorAll('.list-item');

// Quote carousel
let currentQuote = 0;
const quotes = document.querySelectorAll('.quote-item');
const totalQuotes = quotes.length;
const quotePrevBtn = document.querySelector('.quote-prev');
const quoteNextBtn = document.querySelector('.quote-next');
const currentQuoteSpan = document.getElementById('currentQuote');
const totalQuotesSpan = document.getElementById('totalQuotes');

// Initialize
function init() {
    // Set up quote counter
    if (totalQuotesSpan) {
        totalQuotesSpan.textContent = totalQuotes;
    }
    updateQuoteDisplay();
    
    // Set up menu
    setupMenu();
    
    // Set up list navigation
    setupListNavigation();
    
    // Create floating hearts and stars
    createFloatingHearts();
    createStars();
}

// Setup Menu
function setupMenu() {
    menuToggle.addEventListener('click', () => {
        sidebarMenu.classList.toggle('open');
    });

    menuClose.addEventListener('click', () => {
        sidebarMenu.classList.remove('open');
    });

    // Menu Items Navigation
    menuItems.forEach((item) => {
        item.addEventListener('click', () => {
            const pageName = item.getAttribute('data-page');
            goToPage(pageName);
            sidebarMenu.classList.remove('open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebarMenu.contains(e.target) && !menuToggle.contains(e.target) && sidebarMenu.classList.contains('open')) {
            sidebarMenu.classList.remove('open');
        }
    });
}

// Setup List Navigation
function setupListNavigation() {
    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            const pageName = item.getAttribute('data-page');
            goToPage(pageName);
        });
    });
}

// Navigate to page
function goToPage(pageName) {
    // Hide all pages
    Object.values(pages).forEach(page => {
        if (page) {
            page.classList.remove('active');
        }
    });

    // Show selected page
    if (pages[pageName]) {
        pages[pageName].classList.add('active');
        currentPage = pageName;
        updateMenu();
        
        // Handle quote rotation
        if (pageName === 'thoughts') {
            startQuoteRotation();
        } else {
            stopQuoteRotation();
        }
    }
}

// Update menu active state
function updateMenu() {
    menuItems.forEach((item) => {
        const pageName = item.getAttribute('data-page');
        if (pageName === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Quote Carousel Functions
function updateQuoteDisplay() {
    quotes.forEach((quote, index) => {
        quote.classList.remove('active');
        if (index === currentQuote) {
            quote.classList.add('active');
        }
    });
    if (currentQuoteSpan) {
        currentQuoteSpan.textContent = currentQuote + 1;
    }
}

function nextQuote() {
    currentQuote = (currentQuote + 1) % totalQuotes;
    updateQuoteDisplay();
}

function prevQuote() {
    currentQuote = (currentQuote - 1 + totalQuotes) % totalQuotes;
    updateQuoteDisplay();
}

// Event listeners for quotes
if (quoteNextBtn) {
    quoteNextBtn.addEventListener('click', nextQuote);
}
if (quotePrevBtn) {
    quotePrevBtn.addEventListener('click', prevQuote);
}

// Auto-rotate quotes (only when on thoughts page)
let quoteInterval = null;
function startQuoteRotation() {
    if (quoteInterval) clearInterval(quoteInterval);
    quoteInterval = setInterval(() => {
        if (currentPage === 'thoughts' && document.visibilityState === 'visible') {
            nextQuote();
        }
    }, 6000);
}

function stopQuoteRotation() {
    if (quoteInterval) {
        clearInterval(quoteInterval);
        quoteInterval = null;
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (currentPage === 'thoughts') {
        if (e.key === 'ArrowRight') {
            nextQuote();
        } else if (e.key === 'ArrowLeft') {
            prevQuote();
        }
    }
});

// Create floating hearts in background (optimized)
let heartCount = 0;
const maxHearts = 6;

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    if (!heartsContainer) return;
    
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    const interval = setInterval(() => {
        if (heartCount >= maxHearts) return;
        
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
        heart.style.opacity = '0';
        heart.style.animation = `floatHeart ${4 + Math.random() * 2}s ease-out forwards`;
        heart.style.pointerEvents = 'none';
        heart.style.willChange = 'transform, opacity';
        heart.style.transform = 'translateZ(0)';
        heart.style.zIndex = '1';
        
        heartsContainer.appendChild(heart);
        heartCount++;
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
                heartCount--;
            }
        }, 6000);
    }, 2000);
}

// Add floating heart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translate3d(0, 100vh, 0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate3d(0, -100px, 0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create stars background (optimized)
function createStars() {
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    
    const starCount = window.innerWidth > 768 ? 25 : 15;
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1;
        star.style.position = 'fixed';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.5 + 0.3;
        star.style.animation = `twinkle ${3 + Math.random() * 2}s ease-in-out infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.willChange = 'opacity, transform';
        star.style.transform = 'translateZ(0)';
        star.style.pointerEvents = 'none';
        
        fragment.appendChild(star);
    }
    
    starsContainer.appendChild(fragment);
}

// Add twinkle animation
const twinkleStyle = document.createElement('style');
twinkleStyle.textContent = `
    @keyframes twinkle {
        0%, 100% {
            opacity: 0.3;
            transform: scale3d(1, 1, 1);
        }
        50% {
            opacity: 1;
            transform: scale3d(1.3, 1.3, 1);
        }
    }
`;
document.head.appendChild(twinkleStyle);

// Visibility API for quote rotation
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && currentPage === 'thoughts') {
        startQuoteRotation();
    } else {
        stopQuoteRotation();
    }
});

// Initialize on load
window.addEventListener('load', () => {
    init();
    // Add entrance animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
