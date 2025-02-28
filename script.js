document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton");
    const navbar = document.getElementById("navbar");
    const menuIcon = document.getElementById("menuIcon");
    const typingElement = document.getElementById('typing-text');

    // Navbar toggle logic
    let isOpen = false;

    menuButton.addEventListener("click", () => {
        isOpen = !isOpen;
        navbar.classList.toggle("open");

        if (isOpen) {
            // Change to X icon
            menuIcon.innerHTML = `
                <line x1="20" y1="20" x2="80" y2="80" stroke="white" stroke-width="10"></line>
                <line x1="80" y1="20" x2="20" y2="80" stroke="white" stroke-width="10"></line>
            `;
        } else {
            // Back to hamburger
            menuIcon.innerHTML = `
                <rect y="20" width="80" height="10" fill="white"></rect>
                <rect y="45" width="80" height="10" fill="white"></rect>
                <rect y="70" width="80" height="10" fill="white"></rect>
            `;
        }
    });

    // Typing effect
    const text = "↓ Scroll down to explore";
    let index = 0;
    let typingSpeed = 100;
    let deletingSpeed = 50;
    let pauseAfterTyping = 1000;
    let pauseAfterDeleting = 500;

    let isTyping = true;

    function typeEffect() {
        if (isTyping) {
            if (index <= text.length) {
                typingElement.innerText = text.substring(0, index++);
                setTimeout(typeEffect, typingSpeed);
            } else {
                setTimeout(() => {
                    isTyping = false;
                    typeEffect();
                }, pauseAfterTyping);
            }
        } else {
            if (index >= 0) {
                typingElement.innerText = text.substring(0, index--);
                setTimeout(typeEffect, deletingSpeed);
            } else {
                setTimeout(() => {
                    isTyping = true;
                    index = 0;
                    typeEffect();
                }, pauseAfterDeleting);
            }
        }
    }

    typeEffect();
    document.body.classList.toggle('nav-open', isOpen);
    
    window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelector('video').style.transform = `translateY(${scrolled * 0.5}px)`;
});
const roles = ['Aspiring Web Dev', 'Designer', 'Blogger','Producer'];
let roleIndex = 0;

function updateRole() {
    document.getElementById('changing-text').innerText = roles[roleIndex];
    roleIndex = (roleIndex + 1) % roles.length;
}
setInterval(updateRole, 2000);
updateRole();


});

