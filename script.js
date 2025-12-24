// Global variables
let currentPage = 0;
const totalPages = 5;
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const landingPage = document.getElementById('landingPage');
const mainContainer = document.getElementById('mainContainer');
const navigation = document.getElementById('navigation');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const rocketContainer = document.getElementById('rocketContainer');
const rocket = document.getElementById('rocket');

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
    totalQuotesSpan.textContent = totalQuotes;
    updateQuoteDisplay();
    
    // Set up landing page
    setupLandingPage();
    
    // Set up main content (hidden initially)
    updateCards();
    updateNavigation();
    createFloatingHearts();
    createStars();
}

// Landing Page Setup
function setupLandingPage() {
    yesBtn.addEventListener('click', () => {
        startCelebration();
    });
    
    noBtn.addEventListener('click', () => {
        // Make the No button move away
        noBtn.style.transition = 'all 0.5s ease';
        noBtn.style.transform = 'translateX(-200px)';
        noBtn.style.opacity = '0';
        
        // After a moment, bring it back with a message
        setTimeout(() => {
            noBtn.textContent = "Come on, say Yes! 💕";
            noBtn.style.transform = 'translateX(0)';
            noBtn.style.opacity = '1';
            noBtn.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)';
        }, 600);
    });
}

// Start Celebration with Rocket
function startCelebration() {
    // Hide landing page
    landingPage.classList.add('hidden');
    
    // Show and animate rocket
    rocketContainer.classList.add('active');
    
    // Reset rocket position
    rocket.style.left = '-10%';
    rocket.style.top = '50%';
    
    // Animate rocket
    setTimeout(() => {
        rocket.style.left = '110%';
        rocket.style.top = '10%';
    }, 100);
    
    // After rocket animation, show main content
    setTimeout(() => {
        rocketContainer.classList.remove('active');
        mainContainer.classList.add('active');
        navigation.classList.add('active');
        
        // Create celebration burst
        createCelebrationBurst();
    }, 3000);
}

// Create celebration burst effect (optimized)
function createCelebrationBurst() {
    const emojis = ['🎉', '🎊', '✨', '💖', '💕'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const count = window.innerWidth > 768 ? 12 : 8; // Fewer on mobile
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < count; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = centerX + 'px';
        emoji.style.top = centerY + 'px';
        emoji.style.fontSize = window.innerWidth > 768 ? '40px' : '30px';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '1000';
        emoji.style.opacity = '0';
        emoji.style.willChange = 'transform, opacity';
        emoji.style.transform = 'translateZ(0)';
        
        const angle = (Math.PI * 2 * i) / count;
        const distance = window.innerWidth > 768 ? 250 : 150;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        emoji.style.animation = `celebrationBurst 1.2s ease-out forwards`;
        emoji.style.setProperty('--end-x', endX + 'px');
        emoji.style.setProperty('--end-y', endY + 'px');
        
        fragment.appendChild(emoji);
        
        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.remove();
            }
        }, 1200);
    }
    
    document.body.appendChild(fragment);
}

// Add celebration burst animation
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebrationBurst {
        0% {
            transform: translate3d(-50%, -50%, 0) scale3d(0, 0, 1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate3d(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%), 0) scale3d(1.2, 1.2, 1) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(celebrationStyle);

// Update card visibility
function updateCards() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        
        if (index === currentPage) {
            card.classList.add('active');
            smoothTransition(); // Smooth scroll on page change
        } else if (index < currentPage) {
            card.classList.add('prev');
        } else {
            card.classList.add('next');
        }
    });
}

// Update navigation buttons and dots
function updateNavigation() {
    // Update buttons
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Navigate to next page
function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateCards();
        updateNavigation();
        if (currentPage === 2) {
            startQuoteRotation();
        } else {
            stopQuoteRotation();
        }
        createHeartBurst();
    }
}

// Navigate to previous page
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updateCards();
        updateNavigation();
        if (currentPage === 2) {
            startQuoteRotation();
        } else {
            stopQuoteRotation();
        }
    }
}

// Navigate to specific page
function goToPage(page) {
    if (page >= 0 && page < totalPages) {
        currentPage = page;
        updateCards();
        updateNavigation();
        if (page === 2) {
            startQuoteRotation();
        } else {
            stopQuoteRotation();
        }
        if (page > 0) {
            createHeartBurst();
        }
    }
}

// Quote Carousel Functions
function updateQuoteDisplay() {
    quotes.forEach((quote, index) => {
        quote.classList.remove('active');
        if (index === currentQuote) {
            quote.classList.add('active');
        }
    });
    currentQuoteSpan.textContent = currentQuote + 1;
}

function nextQuote() {
    currentQuote = (currentQuote + 1) % totalQuotes;
    updateQuoteDisplay();
}

function prevQuote() {
    currentQuote = (currentQuote - 1 + totalQuotes) % totalQuotes;
    updateQuoteDisplay();
}

// Event listeners
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToPage(index));
});

quoteNextBtn.addEventListener('click', nextQuote);
quotePrevBtn.addEventListener('click', prevQuote);

// Auto-rotate quotes (optimized - only when page is visible)
let quoteInterval = null;
function startQuoteRotation() {
    if (quoteInterval) clearInterval(quoteInterval);
    quoteInterval = setInterval(() => {
        if (currentPage === 2 && document.visibilityState === 'visible') {
            nextQuote();
        }
    }, 6000); // Increased interval for better performance
}

function stopQuoteRotation() {
    if (quoteInterval) {
        clearInterval(quoteInterval);
        quoteInterval = null;
    }
}

// Start rotation when on quotes page
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && currentPage === 2) {
        startQuoteRotation();
    } else {
        stopQuoteRotation();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!mainContainer.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') {
        if (currentPage === 2) {
            nextQuote();
        } else {
            nextPage();
        }
    } else if (e.key === 'ArrowLeft') {
        if (currentPage === 2) {
            prevQuote();
        } else {
            prevPage();
        }
    }
});

// Create floating hearts in background (optimized)
let heartCount = 0;
const maxHearts = 8; // Limit concurrent hearts

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    // Only create hearts if under limit
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
    }, 1500); // Reduced frequency
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
    // Reduce star count for better performance
    const starCount = window.innerWidth > 768 ? 30 : 20;
    
    // Use document fragment for better performance
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

// Create heart burst effect (optimized)
let lastBurstTime = 0;
function createHeartBurst() {
    // Throttle bursts
    const now = Date.now();
    if (now - lastBurstTime < 500) return;
    lastBurstTime = now;
    
    const heartEmojis = ['❤️', '💕', '💖', '💗'];
    const activeCard = cards[currentPage];
    if (!activeCard) return;
    
    const rect = activeCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const count = 6; // Reduced from 8
    
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '28px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.opacity = '0';
        heart.style.willChange = 'transform, opacity';
        heart.style.transform = 'translateZ(0)';
        
        const angle = (Math.PI * 2 * i) / count;
        const distance = 80;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        heart.style.animation = `heartBurst 0.8s ease-out forwards`;
        heart.style.setProperty('--end-x', endX + 'px');
        heart.style.setProperty('--end-y', endY + 'px');
        
        fragment.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 800);
    }
    
    document.body.appendChild(fragment);
}

// Add heart burst animation
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate3d(0, 0, 0) scale3d(0, 0, 1);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translate3d(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%), 0) scale3d(1.2, 1.2, 1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// Add click effect on cards
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 107, 157, 0.3)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth scroll on page change (optimized)
function smoothTransition() {
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // Fallback for older browsers
        window.scrollTo(0, 0);
    }
}

// Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (!mainContainer.classList.contains('active')) return;
    
    const swipeThreshold = 50;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Only handle horizontal swipes (ignore vertical scrolling)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            // Swipe left - next page
            if (currentPage === 2) {
                nextQuote();
            } else {
                nextPage();
            }
        } else {
            // Swipe right - previous page
            if (currentPage === 2) {
                prevQuote();
            } else {
                prevPage();
            }
        }
    }
}

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

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

// Smooth page transitions
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    observer.observe(card);
});
