document.addEventListener('DOMContentLoaded', function () {
     const swiper = new Swiper('.card__swiper-container', {
         direction: 'horizontal',
         loop: true,
         grabCursor: true,
         spaceBetween: 32,
 
         pagination: {
             el: '.swiper-pagination',
             clickable: true,
         },
 
         navigation: {
             nextEl: '.swiper-button-next',
             prevEl: '.swiper-button-prev',
         },
 
         slidesPerView: 1,
 
         breakpoints: {
             768: {
                 slidesPerView: 2,
                 spaceBetween: 40,
             },
             1024: {
                 slidesPerView: 3,
                 spaceBetween: 50,
             }
         },
 
         autoplay: {
             delay: 5000,
             disableOnInteraction: false,
         },
 
         a11y: {
             prevSlideMessage: 'Previous slide',
             nextSlideMessage: 'Next slide',
             firstSlideMessage: 'This is the first slide',
             lastSlideMessage: 'This is the last slide',
             paginationBulletMessage: 'Go to slide {{index}}',
         },
 
         keyboard: {
             enabled: true,
             onlyInViewport: true,
         },
 
         mousewheel: {
             invert: true,
         },
     });
 
     const modeToggle = document.getElementById('modeToggle');
     const modeToggle2 = document.getElementById('modeToggle2');
     const section = document.querySelector('.section');
     const menu = document.getElementById('menu');
 
     if (localStorage.getItem('theme') === 'dark') {
         document.body.classList.add('dark-mode');
         if (modeToggle) modeToggle.innerHTML = `<i class="ri-sun-fill"></i>`;
         if (modeToggle2) modeToggle2.innerHTML = `<i class="ri-sun-fill"></i>`;
     }
 
     if (modeToggle) {
         modeToggle.addEventListener('click', () => {
             document.body.classList.toggle('dark-mode');
             const isDark = document.body.classList.contains('dark-mode');
             localStorage.setItem('theme', isDark ? 'dark' : 'light');
             modeToggle.innerHTML = isDark ? `<i class="ri-sun-fill"></i>` : `<i class="ri-moon-clear-fill"></i>`;
         });
     }
 
     if (modeToggle2) {
         modeToggle2.addEventListener('click', () => {
             document.body.classList.toggle('dark-mode');
             const isDark = document.body.classList.contains('dark-mode');
             localStorage.setItem('theme', isDark ? 'dark' : 'light');
             modeToggle2.innerHTML = isDark ? `<i class="ri-sun-fill"></i>` : `<i class="ri-moon-clear-fill"></i>`;
         });
     }
 
     window.showSection = function () {
         section.classList.toggle('active');
         section.style.bottom = section.classList.contains('active') ? '70px' : '-100px';
         section.style.opacity = section.classList.contains('active') ? '1' : '0';
     }
 
     window.hideSection = function () {
         section.classList.remove('active');
         section.style.bottom = '-100px';
         section.style.opacity = '0';
     }
 
     document.addEventListener('click', function (e) {
         if (section.classList.contains('active') && !section.contains(e.target) && (!menu || !menu.contains(e.target))) {
             hideSection();
         }
     });
 
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
         anchor.addEventListener('click', function (e) {
             e.preventDefault();
             const targetId = this.getAttribute('href');
             const targetElement = document.querySelector(targetId);
 
             if (targetElement) {
                 targetElement.scrollIntoView({ behavior: 'smooth' });
                 if (section.classList.contains('active')) {
                     hideSection();
                 }
             }
         });
     });
 });