/*  =====  app.js — Updated for Your HTML Structure  =====
    • Fixed to work with your specific carousel HTML structure
    • Carousel arrows positioned outside swiper container
    • Button IDs: projects-prev, projects-next
    • Proper Swiper initialization and navigation setup                */

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

  /* ---------- 4. PORTFOLIO DATA ---------- */
  const portfolioData = {
    projects: [
      {
        title: "ESG Reporting Dashboard",
        year: "2024",
        description: "Interactive Tableau dashboard for environmental, social, and governance metrics tracking and reporting.",
        technologies: ["Tableau", "SQL", "Python"],
        link: "#",
        type: "tableau"
      },
      {
        title: "Sales Analytics Platform",
        year: "2023",
        description: "Comprehensive sales performance analysis tool with predictive modeling capabilities.",
        technologies: ["Power BI", "R", "SQL Server"],
        link: "#",
        type: "powerbi"
      },
      {
        title: "Financial Data Pipeline",
        year: "2023",
        description: "Automated data processing pipeline for financial reporting and compliance monitoring.",
        technologies: ["Python", "Apache Airflow", "PostgreSQL"],
        link: "#",
        type: "github"
      },
      {
        title: "Customer Segmentation Analysis",
        year: "2022",
        description: "Machine learning model for customer behavioral analysis and targeted marketing strategies.",
        technologies: ["Python", "Scikit-learn", "Pandas"],
        link: "#",
        type: "pdf"
      }
    ]
  };

  /* ---------- 5. PROJECTS CAROUSEL ---------- */
  let swiperInstance = null;

  function renderProjects() {
    const container = $('#projects-container');
    if (!container) return;

    const projectsHTML = portfolioData.projects.map(project => {
      const iconMap = {
        tableau: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12v-1h-8v1h8zm-9-4h-6v8h6V8zm1 0v8h8V8h-8zM0 11v2h6v-2H0zm7-3h6V0H7v8zm-1 0V0H0v8h6z"/>
        </svg>`,
        powerbi: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 7.5v9l-12 6-12-6v-9l12-6 12 6z"/>
        </svg>`,
        github: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>`,
        pdf: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>`
      };

      return `
        <div class="swiper-slide">
          <div class="project-card">
            <div class="project-header">
              <h3>${project.title}</h3>
              <span class="project-year">${project.year}</span>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-technologies">
              ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link" target="_blank" rel="noopener" aria-label="View ${project.title}">
              ${iconMap[project.type] || iconMap.github}
            </a>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = projectsHTML;
  }

  function initSwiper() {
    const swiperContainer = $('.projects-swiper');
    const prevBtn = $('#projects-prev');
    const nextBtn = $('#projects-next');
    
    if (!swiperContainer) {
      console.warn('Swiper container not found');
      return;
    }

    // Render projects first
    renderProjects();

    // Initialize Swiper with your button selectors
    swiperInstance = new Swiper(swiperContainer, {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 600,
      grabCursor: true,
      
      // Pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      
      // Navigation - pointing to your specific button IDs
      navigation: {
        nextEl: '#projects-next',
        prevEl: '#projects-prev',
      },
      
      // Responsive breakpoints
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      
      // Autoplay (respects reduced motion preference)
      autoplay: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? false
        : {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
    });

    // Additional fallback: Manual event listeners (in case Swiper navigation fails)
    prevBtn?.addEventListener('click', () => {
      if (swiperInstance) {
        swiperInstance.slidePrev();
      }
    });

    nextBtn?.addEventListener('click', () => {
      if (swiperInstance) {
        swiperInstance.slideNext();
      }
    });

    // Enable buttons (remove any disabled state)
    [prevBtn, nextBtn].forEach(btn => {
      if (btn) {
        btn.disabled = false;
        btn.classList.remove('is-disabled');
      }
    });

    console.log('Swiper initialized successfully');
  }

  /* Wait for Swiper library to load */
  function waitForSwiper(attempts = 10) {
    if (typeof Swiper !== 'undefined') {
      initSwiper();
      return;
    }
    
    if (attempts > 0) {
      setTimeout(() => waitForSwiper(attempts - 1), 200);
    } else {
      console.error('Swiper library failed to load after multiple attempts');
    }
  }

  /* ---------- 6. SCROLL-REVEAL ANIMATIONS ---------- */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReduced && 'IntersectionObserver' in window) {
    const revealElements = $$('.reveal, .project-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---------- 7. SMOOTH SCROLLING ---------- */
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = $(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ---------- 8. INITIALIZE ON DOM READY ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForSwiper);
  } else {
    waitForSwiper();
  }

})();
Asset 1 of 1
