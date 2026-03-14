const App = {
  // 1. CONFIGURATION & DATA
  theme: localStorage.getItem('theme-preference') || 'dark',
  isLowEnd: false,
  lenis: null, // Placeholder for Lenis instance

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

  // Getters for frequently used elements
  get sections() { return document.querySelectorAll('.sections'); },
  get navLinks() { return document.querySelectorAll('.nav_box2 li a'); },

  // 2. INITIALIZATION
  init() {
    this.detectPerformance();
    this.applyInitialTheme();
    this.initQuotes();

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', () => this.onReady());
    } else {
      this.onReady();
    }

    // Delayed snap-enable for smoother entry
    setTimeout(() => {
      if (!this.isLowEnd) {
        document.querySelector('.main')?.classList.add('snap-enabled');
      }
    }, 3000);
  },

  onReady() {
    this.initSmoothScroll(); // Initialize Lenis first
    this.setupIntersectionObserver();
    this.setupThemeToggle();
    this.syncThemeUI();
    this.initScrollTracker();
    this.setupScrollLinks(); // Navigation links
    this.setupScrollDown();  // The "Down Arrow" link
    this.initAnimations();   // GSAP logic

    // Final refresh to ensure ScrollTrigger knows where everything is
    setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 600);

    document.body.classList.add('app-ready');
  },

  // 3. PERFORMANCE & CORE SYSTEMS
  detectPerformance() {
    const memory = navigator.deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 4;
    // Targeting older hardware like i3-2100
    if (memory < 4 || cores < 4) {
      this.isLowEnd = true;
      document.body.classList.add('low-end');
    }
  },

  initSmoothScroll() {
    // Optional: if (this.isLowEnd) return; 

    this.lenis = new Lenis({
      wrapper: document.querySelector('.main'),
      content: document.querySelector('.main'),
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    this.lenis.on('scroll', () => ScrollTrigger.update());

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  },

  initScrollTracker() {
    const scrollContainer = document.querySelector('.main') || window;
    let ticking = false;
    scrollContainer.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = (scrollContainer === window) ? window.scrollY : scrollContainer.scrollTop;
          document.documentElement.style.setProperty('--scroll', scrolled);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  },

  // 4. NAVIGATION & SCROLL LOGIC
  setupScrollLinks() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
          e.preventDefault();
          if (this.lenis) {
            this.lenis.scrollTo(targetId, {
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          }
        }
      });
    });
  },

  setupScrollDown() {
    const scrollLink = document.querySelector('.scroll_down_link');
    if (scrollLink && this.lenis) {
      scrollLink.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = scrollLink.getAttribute('href');
        this.lenis.scrollTo(targetId, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      });
    }
  },

  // 5. GSAP ANIMATIONS
  initAnimations() {
    if (this.isLowEnd || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
      scroller: ".main"
    });

    // About Me Heading & Underline
    const heading = document.querySelector("#about .words_on_left h1");
    if (heading) {

      // Heading reveal
      gsap.from(heading, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 100%",
          toggleActions: "play none none reverse",
        }
      });
    }

    // Vision Text Reveal
    const visionLines = document.querySelectorAll(".vision_text .line");
    if (visionLines.length > 0) {
      gsap.from(visionLines, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        // stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      });
    }

    const visionLine = document.querySelectorAll(".vision_text .line_highlighting");
    if (visionLine.length > 0) {
      gsap.from(visionLine, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        // stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      });
    }
  },

  // 6. THEME & UI LOGIC
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

    if (logo) logo.src = isDark ? "LOGO.webp" : "LOGO2.webp";
    if (themeIcon) themeIcon.classList.toggle('rotate', !isDark);

    localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
    this.updateAddressBar(isDark);
  },

  updateAddressBar(isDark) {
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

  setupIntersectionObserver() {
    const scrollContainer = document.querySelector('.main');
    if (!scrollContainer) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.updateActiveNavLink(entry.target.id);
        }
      });
    }, { root: scrollContainer, threshold: 0.5 });
    this.sections.forEach(section => observer.observe(section));
  },

  updateActiveNavLink(id) {
    this.navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active-link', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
    });
  }
};

// Start the Application
App.init();
