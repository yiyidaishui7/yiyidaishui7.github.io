// Custom Cursor
function initCursor() {
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  
  const cursorOutline = document.createElement('div');
  cursorOutline.className = 'custom-cursor-outline';
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;
  
  window.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Animation loop for smooth outline delay
  function animate() {
    let dx = mouseX - outlineX;
    let dy = mouseY - outlineY;
    
    // Ease factor
    outlineX += dx * 0.15;
    outlineY += dy * 0.15;
    
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animate);
  }
  animate();

  // Highlight effect on clickable elements
  const clickables = document.querySelectorAll('a, button, input, .card, .post-card, .moment-card');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
  });
}

// Dark Mode Toggle
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Check saved theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  });
}

// 3D Tilt Initialization
function initTilt() {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".card, .post-card"), {
      max: 10,
      speed: 400,
      glare: true,
      "max-glare": 0.1,
      scale: 1.02
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(max-width: 768px)').matches) {
    initCursor(); // Only on desktop
    initTilt();
  }
  initThemeToggle();
});
