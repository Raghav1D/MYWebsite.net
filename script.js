// Select all nav links
const navLinks = document.querySelectorAll('.nav_box > li > a');

// Select all sections
const sections = document.querySelectorAll('.sections');

// Create an Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active-link'));

        // Highlight the link that matches the section in view
        const activeLink = document.querySelector(`.nav_box > li > a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active-link');
        }
      }
    });
  },
  {
    threshold: 0.6 // section is considered active when 60% visible
  }
);

// Observe each section
sections.forEach(section => {
  observer.observe(section);
});

const themeToggleBtn = document.getElementById('theme-toggle');
const icon = document.querySelector('.theme-toggle_icon');
const body = document.body;
const logo = document.getElementById('logo'); // select logo

// Theme toggle + icon rotation
themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  body.classList.toggle('light');

  // Rotate the icon inside the button
  icon.classList.toggle('rotate');

  // Change logo depending on theme
  if (body.classList.contains('dark')) {
    logo.src = "LOGO.png"; // dark theme logo
  } else {
    logo.src = "LOGO2.png";  // light theme logo
  }
});
