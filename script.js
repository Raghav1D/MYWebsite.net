const App = {
  // 1. CONFIGURATION & DATA
  theme: localStorage.getItem('theme-preference') || 'dark',

  quotes: [
    "In The Quiet Of A Focused Mind, Curiosity Finds Its Voice.",
    "Curiosity Is The Compass; Stillness Is The Path.",
    "A Peaceful Mind Has The Room To Ask 'Why?'",
    "Design Starts With A Question And Ends With A Breath Of Fresh Air.",
    "Searching For The 'aha!' Moment In The Space Between Thoughts.",
    "Calmly Dismantling The Complex To Find The Curious.",
    "Stillness In Motion, Curiosity In Action.",
    "Clarity Is The Reward Of A Wandering Mind."
  ],

  // Getters for DOM elements
  get sections() { return document.querySelectorAll('.sections'); },
  get navLinks() { return document.querySelectorAll('.nav_box2 li a'); },

  // 2. INITIALIZATION
  init() {
    this.checkPerformance();
    this.applyInitialTheme();
    this.initQuotes();

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => this.onReady());
    } else {
      this.onReady();
    }
  },

  onReady() {
    this.setupIntersectionObserver();
    this.setupThemeToggle();
    this.syncThemeUI();
    document.body.classList.add('app-ready');
  },

  // 3. QUOTE LOGIC
  initQuotes() {
    const quoteElement = document.getElementById("quote-display");
    if (quoteElement) {
      const setQuote = () => {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        quoteElement.innerText = this.quotes[randomIndex];
      };
      setQuote();
      // Rotate quotes every 10s for dynamism
      setInterval(setQuote, 10000);
    }
  },

  // 4. THEME LOGIC
  applyInitialTheme() {
    document.body.classList.add(this.theme);
    document.documentElement.classList.add(this.theme);
  },

  syncThemeUI() {
    const isDark = document.body.classList.contains('dark');
    const logo = document.getElementById('logo');
    const themeIcon = document.querySelector('.theme-toggle_icon');

    if (logo) {
      logo.src = isDark ? "LOGO.webp" : "LOGO2.webp";
    }

    if (themeIcon) {
      themeIcon.classList.toggle('rotate', !isDark);
    }

    localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  },

  setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
      this.syncThemeUI();
    });
  },

  // 5. NAVIGATION LOGIC
  setupIntersectionObserver() {
    const scrollContainer = document.querySelector('.main');
    if (!scrollContainer) return;

    const options = {
      root: scrollContainer,
      threshold: 0.5,
      rootMargin: "-10% 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveNavLink(entry.target.id);
        }
      });
    }, options);

    this.sections.forEach(section => observer.observe(section));
  },

  updateActiveNavLink(id) {
    this.navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active-link', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
    });
  },

  // 6. PERFORMANCE CHECK
  checkPerformance() {
    const memory = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 4;
    const isLowEnd = memory < 4 || cores < 4 || (navigator.connection && navigator.connection.saveData);

    if (isLowEnd) {
      document.body.classList.add('low-end');
      console.log("Low-end mode activated.");
    }
  }
};

App.init();
