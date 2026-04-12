// Ambient Glow Cursor
function initAmbientLight() {
  const light = document.createElement('div');
  light.id = 'ambient-light';
  document.body.appendChild(light);

  document.addEventListener('mousemove', function(e) {
    // Offset by half of width/height (570px/510px) to center it on the cursor
    // Using transform translates for smooth 60fps rendering
    light.style.transform = `translate(${e.clientX - 285}px, ${e.clientY - 255}px)`;
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
    initAmbientLight(); // Only on desktop
    initTilt();
  }
  initThemeToggle();
});
