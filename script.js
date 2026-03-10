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

    setTimeout(() => {
      document.querySelector('.main')?.classList.add('snap-enabled');
    }, 3000);
  },

  onReady() {
    this.setupIntersectionObserver();
    this.setupThemeToggle();
    this.syncThemeUI(); // This now handles address bar + logos
    document.body.classList.add('app-ready');
  },

  // 3. QUOTE LOGIC
  initQuotes() {
    const quoteElement = document.getElementById("quote-display");
    if (!quoteElement) return;

    const setQuote = () => {
      const randomIndex = Math.floor(Math.random() * this.quotes.length);
      quoteElement.innerText = this.quotes[randomIndex];
    };

    setQuote();
    setInterval(setQuote, 10000);
  },

  // 4. THEME LOGIC
  applyInitialTheme() {
    const isDark = this.theme === 'dark';
    this.updateThemeClasses(isDark);
  },

  updateThemeClasses(isDark) {
    const add = isDark ? 'dark' : 'light';
    const remove = isDark ? 'light' : 'dark';

    [document.body, document.documentElement].forEach(el => {
      el.classList.add(add);
      el.classList.remove(remove);
    });
  },

  syncThemeUI() {
    const isDark = document.body.classList.contains('dark');
    const logo = document.getElementById('logo');
    const themeIcon = document.querySelector('.theme-toggle_icon');

    // UI Updates
    if (logo) logo.src = isDark ? "LOGO.webp" : "LOGO2.webp";
    if (themeIcon) themeIcon.classList.toggle('rotate', !isDark);

    // Persistence
    localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');

    // Mobile Address Bar Color
    this.updateAddressBar(isDark);
  },

  updateAddressBar(isDark) {
    // Matches your CSS hsl(260, 15%, 8%) and hsl(265, 20%, 92%)
    const color = isDark ? "#0f0e11" : "#ebebf0";
    let meta = document.querySelector('meta[name="theme-color"]');

    if (!meta) {
      meta = document.createElement('meta');
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', color);
  },

  setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark');
      this.updateThemeClasses(!isCurrentlyDark);
      this.syncThemeUI();
    });
  },

  // 5. NAVIGATION LOGIC
  setupIntersectionObserver() {
    const scrollContainer = document.querySelector('.main');
    if (!scrollContainer) return;

    const options = {
      root: scrollContainer,
      threshold: 0.5, // Better trigger point for snapping
      rootMargin: "0px"
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
    const connection = navigator.connection;
    const isLowEnd = memory < 4 || cores < 4 || (connection && connection.saveData);

    if (isLowEnd) {
      document.body.classList.add('low-end');
    }
  }
};

App.init();

/* ==========================================================================
   SCROLL TRACKER FOR PARALLAX SYMBOLS
   ========================================================================== */
// 1. Target the specific container that has the scrollbar (usually .main)
const scrollContainer = document.querySelector('.main') || window;

scrollContainer.addEventListener('scroll', () => {
  // 2. Get the scroll position (support both window and div scrolling)
  const scrolled = (scrollContainer === window)
    ? window.scrollY
    : scrollContainer.scrollTop;

  // 3. Update the CSS variable on the root (html) element
  // We send a unitless number so the CSS calc() can handle the math
  document.documentElement.style.setProperty('--scroll', scrolled);

  // DEBUG: Uncomment the line below to see the numbers in your console
  // console.log("Current Scroll:", scrolled);
}, { passive: true });
