// =========== DOM Elements ===========
const proposalBtn = document.getElementById('proposalBtn');
const popup = document.getElementById('popup');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successOverlay = document.getElementById('successOverlay');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

// =========== Background Music ===========
let musicPlaying = false;

musicToggle.addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    
    if (musicPlaying) {
        bgMusic.play().catch(err => {
            console.log('Auto-play prevented. User needs to interact first.');
        });
        document.querySelector('.music-icon').textContent = '🎵';
    } else {
        bgMusic.pause();
        document.querySelector('.music-icon').textContent = '🔇';
    }
});

// =========== Proposal Button Click ===========
proposalBtn.addEventListener('click', () => {
    popup.classList.add('show');
    createFloatingHearts(20);
});

// =========== Yes Button Click ===========
yesBtn.addEventListener('click', () => {
    popup.classList.remove('show');
    
    setTimeout(() => {
        successOverlay.classList.add('show');
        launchConfetti();
        createSuccessHearts(50);
        playSuccessSound();
        
        // Continue playing music if it was playing
        if (musicPlaying) {
            bgMusic.play();
        }
    }, 400);
});

// =========== No Button Click ===========
noBtn.addEventListener('click', () => {
    const noBtn = document.getElementById('noBtn');
    const originalText = noBtn.textContent;
    
    noBtn.textContent = "No choice 😜 you are already mine!";
    noBtn.style.background = 'var(--pink-deep)';
    noBtn.style.color = 'white';
    
    // Random movement
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    noBtn.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        noBtn.textContent = originalText;
        noBtn.style.transform = 'translate(0, 0)';
        noBtn.style.background = 'var(--pink-light)';
        noBtn.style.color = 'var(--pink-deep)';
    }, 2000);
});

// =========== Confetti Effect ===========
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#ff6b9d', '#ff8cc8', '#ff5273', '#ff1744', '#ffe4f0'];
    const shapes = ['heart', 'circle', 'rect'];
    
    for (let i = 0; i < 300; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            width: Math.random() * 15 + 8,
            height: Math.random() * 15 + 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 15 - 7.5,
            speed: Math.random() * 5 + 3,
            shape: shapes[Math.floor(Math.random() * shapes.length)]
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach(piece => {
            piece.y += piece.speed;
            piece.x += Math.sin(piece.rotation * Math.PI / 180) * 2;
            piece.rotation += piece.rotationSpeed;
            
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate((Math.PI / 180) * piece.rotation);
            ctx.fillStyle = piece.color;
            
            if (piece.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(0, 0, piece.width / 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (piece.shape === 'heart') {
                drawHeart(ctx, piece.width, piece.height);
            } else {
                ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
            }
            
            ctx.restore();
        });
        
        const remaining = confettiPieces.filter(p => p.y <= canvas.height);
        confettiPieces.length = 0;
        confettiPieces.push(...remaining);
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

// Helper function to draw heart shape
function drawHeart(ctx, width, height) {
    ctx.beginPath();
    const topCurveHeight = height * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -width/2, 0, -width/2, topCurveHeight);
    ctx.bezierCurveTo(-width/2, (height + topCurveHeight)/2, 0, (height + topCurveHeight)/2, 0, height);
    ctx.bezierCurveTo(0, (height + topCurveHeight)/2, width/2, (height + topCurveHeight)/2, width/2, topCurveHeight);
    ctx.bezierCurveTo(width/2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
}

// =========== Floating Hearts ===========
function createFloatingHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            const hearts = ['💕', '💖', '💗', '💝', '💜', '🧡', '💛'];
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = '2.5rem';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.filter = 'drop-shadow(0 0 15px rgba(255, 107, 157, 0.8))';
            
            document.body.appendChild(heart);
            
            const duration = 2000 + Math.random() * 1000;
            const endY = -100;
            const endX = Math.random() * 200 - 100;
            
            heart.animate([
                { transform: 'translateY(0) translateX(0) scale(1) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${endY}px) translateX(${endX}px) scale(0) rotate(720deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'ease-out'
            }).onfinish = () => {
                heart.remove();
            };
        }, i * 50);
    }
}

// =========== Success Hearts ===========
function createSuccessHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createFloatingHearts(10);
        }, i * 150);
    }
}

// =========== Success Sound ===========
function playSuccessSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        const now = audioContext.currentTime;
        
        oscillator1.frequency.setValueAtTime(523.25, now);
        oscillator1.frequency.setValueAtTime(659.25, now + 0.1);
        oscillator1.frequency.setValueAtTime(783.99, now + 0.2);
        
        oscillator2.frequency.setValueAtTime(391.99, now);
        oscillator2.frequency.setValueAtTime(493.88, now + 0.1);
        oscillator2.frequency.setValueAtTime(587.33, now + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        
        oscillator1.start(now);
        oscillator2.start(now);
        oscillator1.stop(now + 0.8);
        oscillator2.stop(now + 0.8);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// =========== Close Popup on Outside Click ===========
popup.addEventListener('click', (e) => {
    if (e.target.id === 'popup') {
        popup.classList.remove('show');
    }
});

// =========== Smooth Scroll for Welcome ===========
document.querySelector('.scroll-hint').addEventListener('click', () => {
    document.querySelector('.message-section').scrollIntoView({ behavior: 'smooth' });
});

// =========== Continuous Gentle Hearts ===========
setInterval(() => {
    if (Math.random() > 0.8) {
        createFloatingHearts(1);
    }
}, 4000);

// =========== Scroll Animations ===========
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.message-card, .proposal-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
});