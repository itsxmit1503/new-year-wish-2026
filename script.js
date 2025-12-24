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

// Create celebration burst effect
function createCelebrationBurst() {
    const emojis = ['🎉', '🎊', '✨', '💖', '💕', '🎆', '🎇', '💫'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = centerX + 'px';
        emoji.style.top = centerY + 'px';
        emoji.style.fontSize = '40px';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '1000';
        emoji.style.transform = 'translate(-50%, -50%)';
        
        const angle = (Math.PI * 2 * i) / 20;
        const distance = 200 + Math.random() * 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        emoji.style.animation = `celebrationBurst 1.5s ease-out forwards`;
        emoji.style.setProperty('--end-x', endX + 'px');
        emoji.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, 1500);
    }
}

// Add celebration burst animation
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebrationBurst {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%)) scale(1.5) rotate(720deg);
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
        createHeartBurst();
    }
}

// Navigate to previous page
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updateCards();
        updateNavigation();
    }
}

// Navigate to specific page
function goToPage(page) {
    if (page >= 0 && page < totalPages) {
        currentPage = page;
        updateCards();
        updateNavigation();
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

// Auto-rotate quotes
setInterval(() => {
    if (currentPage === 2) { // Quotes page
        nextQuote();
    }
}, 5000);

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

// Create floating hearts in background
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💞', '💟'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.opacity = '0';
        heart.style.animation = `floatHeart ${3 + Math.random() * 2}s ease-out forwards`;
        heart.style.pointerEvents = 'none';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 800);
}

// Add floating heart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create stars background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random();
        star.style.animation = `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        
        starsContainer.appendChild(star);
    }
}

// Add twinkle animation
const twinkleStyle = document.createElement('style');
twinkleStyle.textContent = `
    @keyframes twinkle {
        0%, 100% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.5);
        }
    }
`;
document.head.appendChild(twinkleStyle);

// Create heart burst effect
function createHeartBurst() {
    const heartEmojis = ['❤️', '💕', '💖', '💗'];
    const activeCard = cards[currentPage];
    if (!activeCard) return;
    
    const rect = activeCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.opacity = '0';
        
        const angle = (Math.PI * 2 * i) / 8;
        const distance = 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        heart.style.animation = `heartBurst 1s ease-out forwards`;
        heart.style.setProperty('--end-x', endX + 'px');
        heart.style.setProperty('--end-y', endY + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

// Add heart burst animation
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: translate(calc(var(--end-x) - 50%), calc(var(--end-y) - 50%)) scale(1.5);
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

// Smooth scroll on page change
function smoothTransition() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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
