const sections = document.querySelectorAll('section[id]');
  const sidebar = document.querySelector('.sidebar');
  const main = document.querySelector('.main');

  function scrollActive() {
    const scrollY = window.pageYOffset;
  
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 55;
      const sectionId = section.getAttribute('id');
  
      const link = document.querySelector(`.sidebar_ul a[href*="${sectionId}"]`);
      if (!link) return;
  
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }

  let debounceTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(scrollActive, 55);
  });

  window.toggleSidebar = function () {
    const isActive = sidebar.classList.toggle('active');
    main.classList.toggle('active', isActive);
  };

  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar_Y');
    if (window.scrollY > 10) {
      navbar.classList.add('shadow');
    } else {
      navbar.classList.remove('shadow');
    }
  });
