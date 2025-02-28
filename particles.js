const heroParticles = document.getElementById('hero-particles');

const particles = [];
const particleCount = 100; // You can tweak this number for density
const maxLineDistance = 150; // Max distance to draw connecting lines

// Initialize particles
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
    });
}

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
heroParticles.appendChild(canvas);
const ctx = canvas.getContext('2d');

let mouseX = null;
let mouseY = null;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    const rect = heroParticles.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    } else {
        mouseX = null;
        mouseY = null;
    }
});

function updateParticles() {
    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw particles (dots)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';  // Low opacity white
    for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw connecting lines (mouse interactions)
    if (mouseX !== null && mouseY !== null) {
        for (const p of particles) {
            const distance = Math.sqrt((p.x - mouseX) ** 2 + (p.y - mouseY) ** 2);
            if (distance < maxLineDistance) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxLineDistance})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }
        }
    }
}

function loop() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(loop);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start animation
loop();

