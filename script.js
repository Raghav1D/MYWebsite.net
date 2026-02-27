/* ==========================================================================
   1. NAVIGATION: ACTIVE LINK ON SCROLL
   ========================================================================== */

const navLinks = document.querySelectorAll('.nav_box2 li a');
const sections = document.querySelectorAll('.sections');

const observerOptions = {
  // 60% visibility triggers the change
  threshold: 0.6
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all
      navLinks.forEach(link => link.classList.remove('active-link'));

      // Find and add to current
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.nav_box2 li a[href="#${id}"]`);

      if (activeLink) {
        activeLink.classList.add('active-link');
      }
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


/* ==========================================================================
   2. THEME TOGGLE: WITH LOCALSTORAGE PERSISTENCE
   ========================================================================== */

const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-toggle_icon');
const body = document.body;
const logo = document.getElementById('logo');

/**
 * Updates the UI based on the current theme
 */
function updateThemeUI() {
  const isDark = body.classList.contains('dark');

  // 1. Update Logo
  if (logo) {
    logo.src = isDark ? "LOGO.webp" : "LOGO2.webp";
  }

  // 2. Update Icon Rotation
  if (isDark) {
    themeIcon.classList.remove('rotate');
  } else {
    themeIcon.classList.add('rotate');
  }

  // 3. Save to localStorage
  localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
}

// Check for saved theme on page load
const savedTheme = localStorage.getItem('theme-preference');
if (savedTheme) {
  body.classList.remove('dark', 'light');
  body.classList.add(savedTheme);
  updateThemeUI();
}

// Click Event Listener
themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');
  updateThemeUI();
});
