# Creating a comprehensive JavaScript fix for the Swiper navigation issue
js_fix = '''/*  =====  app-fixed.js — Updated 23 Jul 2025  =====
    • FIXES: Arrow navigation that works once then stops working
    • Addresses disabled class issues, observer problems, and initialization race conditions
    • Comprehensive solution for "works once then stops" Swiper navigation issue
*/

(() => {
  /* ---------- 1. UTILITIES ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

  /* ---------- 2. THEME TOGGLE ---------- */
  const html = document.documentElement;
  const themeToggle = $('#theme-toggle');
  const STORAGE_KEY = 'theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    html.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const theme = stored || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
  }

  initTheme();

  themeToggle?.addEventListener('click', () => {
    const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  /* ---------- 3. ANIMATED BUTTONS ---------- */
  $$('a.btn, button.btn, .carousel-btn').forEach(btn => {
    btn.addEventListener('pointerenter', () => btn.classList.add('is-hover'));
    btn.addEventListener('pointerleave', () => btn.classList.remove('is-hover'));
    btn.addEventListener('pointerdown', ()  => btn.classList.add('is-active'));
    btn.addEventListener('pointerup',   ()  => btn.classList.remove('is-active'));
  });

  /* ---------- 4. FIXED PROJECTS CAROUSEL ---------- */
  const swiperContainer = $('.projects-swiper');
  const prevBtn = $('#projects-prev');
  const nextBtn = $('#projects-next');
  let swiperInstance = null;

  // Project data
  const portfolioData = {
    projects: [
      {
        title: "ESG Reporting Dashboard",
        year: "2024",
        technologies: ["Tableau", "Python", "SQL"],
        description: "Comprehensive ESG metrics dashboard for sustainability reporting",
        image: "/assets/img/project1.jpg",
        links: {
          github: "#",
          demo: "#"
        }
      },
      {
        title: "Supply Chain Analytics",
        year: "2023", 
        technologies: ["Power BI", "R", "Azure"],
        description: "Real-time supply chain optimization and risk analysis platform",
        image: "/assets/img/project2.jpg",
        links: {
          github: "#",
          demo: "#"
        }
      },
      {
        title: "Financial Risk Modeling",
        year: "2023",
        technologies: ["Python", "TensorFlow", "SQL"],
        description: "Machine learning models for credit risk assessment and portfolio optimization",
        image: "/assets/img/project3.jpg",
        links: {
          github: "#",
          demo: "#"
        }
      }
    ]
  };

  function renderProjects() {
    const container = $('#projects-container');
    if (!container) return;

    container.innerHTML = portfolioData.projects.map(project => `
      <div class="swiper-slide">
        <div class="project-card">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy" />
          </div>
          <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-year">${project.year}</p>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
              <a href="${project.links.github}" class="project-link" target="_blank" rel="noopener">
                <span>GitHub</span>
              </a>
              <a href="${project.links.demo}" class="project-link" target="_blank" rel="noopener">
                <span>Demo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function forceEnableNavigation() {
    // Force remove disabled classes and attributes that might be stuck
    [prevBtn, nextBtn].forEach(btn => {
      if (!btn) return;
      
      // Remove all disabled-related classes
      btn.classList.remove('swiper-button-disabled', 'swiper-button-lock');
      
      // Remove disabled attributes
      btn.removeAttribute('disabled');
      btn.removeAttribute('tabindex');
      btn.removeAttribute('aria-disabled');
      
      // Ensure pointer events work
      btn.style.pointerEvents = 'auto';
      btn.style.cursor = 'pointer';
    });
  }

  function setupManualNavigation() {
    // Manual event listeners as backup for when Swiper's native navigation fails
    if (prevBtn && nextBtn && swiperInstance) {
      
      // Remove any existing listeners to prevent duplicates
      prevBtn.replaceWith(prevBtn.cloneNode(true));
      nextBtn.replaceWith(nextBtn.cloneNode(true));
      
      // Get fresh references after cloning
      const freshPrevBtn = $('#projects-prev');
      const freshNextBtn = $('#projects-next');
      
      freshPrevBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Manual prev clicked');
        if (swiperInstance && typeof swiperInstance.slidePrev === 'function') {
          swiperInstance.slidePrev();
          forceEnableNavigation(); // Re-enable after slide
        }
      });

      freshNextBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Manual next clicked');
        if (swiperInstance && typeof swiperInstance.slideNext === 'function') {
          swiperInstance.slideNext();
          forceEnableNavigation(); // Re-enable after slide
        }
      });
    }
  }

  function initSwiper() {
    if (!swiperContainer) {
      console.error('Swiper container not found');
      return;
    }

    try {
      // First render the projects
      renderProjects();

      // Force enable navigation buttons before initialization
      forceEnableNavigation();

      // Initialize Swiper with comprehensive fix configuration
      swiperInstance = new Swiper(swiperContainer, {
        // Core settings
        loop: true,
        slidesPerView: 1,
        spaceBetween: 32,
        speed: 600,
        grabCursor: true,
        
        // Critical: Observer settings to prevent disabled state bugs
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        
        // Navigation with custom disabled class to prevent conflicts
        navigation: {
          nextEl: '#projects-next',
          prevEl: '#projects-prev',
          disabledClass: 'custom-nav-disabled', // Use custom class instead of default
          lockClass: 'custom-nav-lock', // Use custom class instead of default
        },
        
        // Pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        
        // Responsive breakpoints
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
        
        // Autoplay with reduced motion respect
        autoplay: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? false
          : { 
              delay: 4500, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            },

        // Event handlers to maintain navigation functionality
        on: {
          init: function() {
            console.log('Swiper initialized');
            forceEnableNavigation();
            setupManualNavigation();
          },
          
          slideChange: function() {
            console.log('Slide changed');
            // Force re-enable navigation after each slide change
            setTimeout(() => {
              forceEnableNavigation();
            }, 100);
          },
          
          navigationNext: function() {
            console.log('Navigation next triggered');
            forceEnableNavigation();
          },
          
          navigationPrev: function() {
            console.log('Navigation prev triggered');  
            forceEnableNavigation();
          },
          
          // Fix for when slides are updated dynamically
          update: function() {
            console.log('Swiper updated');
            forceEnableNavigation();
          }
        }
      });

      // Additional safety: Re-enable navigation periodically
      setInterval(() => {
        if (swiperInstance && swiperInstance.navigation) {
          forceEnableNavigation();
        }
      }, 2000);

      console.log('Swiper successfully initialized');
      
    } catch (error) {
      console.error('Swiper initialization failed:', error);
    }
  }

  /* Wait until Swiper bundle has loaded with improved retry logic */
  function whenSwiperReady(retries = 10) {
    if (window.Swiper) {
      console.log('Swiper library loaded, initializing...');
      return initSwiper();
    }
    if (retries === 0) {
      console.error('Swiper failed to load after all retries');
      return;
    }
    console.log(`Waiting for Swiper... ${retries} retries left`);
    setTimeout(() => whenSwiperReady(retries - 1), 500);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      whenSwiperReady();
    });
  } else {
    whenSwiperReady();
  }

  /* ---------- 5. SCROLL-REVEAL ANIMATIONS ---------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealEls = $$('.reveal');
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(el => io.observe(el));
  }
})();'''

print("✅ Created comprehensive JavaScript fix for Swiper navigation issue")
print("\nKey fixes implemented:")
print("• Observer settings to prevent disabled state bugs")
print("• Custom disabled classes to avoid conflicts") 
print("• Force re-enable navigation after each slide change")
print("• Manual navigation listeners as backup")
print("• Periodic re-enabling of navigation buttons")
print("• Improved initialization timing and error handling")