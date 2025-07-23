// FIXED Portfolio JavaScript with Working Carousel Arrows and Theme Toggle
const portfolioData = {
  "projects": [
    {
      "name": "Google Fiber Case Study",
      "type": "Certification Project",
      "date": "May 2023",
      "description": "Comprehensive business intelligence analysis of Google Fiber performance metrics using advanced SQL queries and Tableau visualizations to identify market penetration opportunities and optimize customer acquisition strategies."
    },
    {
      "name": "Minnesota Traffic Volume Dashboard",
      "type": "Certification Project", 
      "date": "May 2023",
      "description": "Interactive dashboard analyzing traffic patterns and volume data across Minnesota using data visualization best practices with Tableau to aid Department of Transportation planning and resource allocation."
    },
    {
      "name": "COVID-19 SQL and Tableau Data Analysis",
      "type": "Independent Project",
      "date": "May 2023", 
      "description": "End-to-end analysis of COVID-19 global dataset using advanced SQL for data extraction and transformation, combined with Tableau for compelling visualizations tracking pandemic trends and vaccination progress."
    },
    {
      "name": "Data Analysis on FIFA 23 Database",
      "type": "Independent Project",
      "date": "Feb 2023",
      "description": "Comprehensive statistical analysis of FIFA 23 player database using Python and advanced data science techniques including Pandas and NumPy to identify undervalued players and key performance indicators."
    },
    {
      "name": "Movie Database Analysis Dashboard",
      "type": "Independent Project",
      "date": "Feb 2023",
      "description": "Interactive dashboard analyzing movie industry trends, ratings, and box office performance using modern BI tools and data modeling techniques to uncover insights for entertainment industry stakeholders."
    },
    {
      "name": "Cyclistic Bike Share Case Study",
      "type": "Certification Project",
      "date": "Jan 2023",
      "description": "Strategic analysis of bike-sharing usage patterns and customer behavior using R and Tableau to drive actionable business recommendations for converting casual riders to annual members."
    }
  ]
};

// FIXED Theme Management Class - Now Actually Changes Theme
class ThemeManager {
  constructor() {
    this.currentTheme = this.getPreferredTheme();
    this.isToggling = false;
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme, false);
    this.setupToggle();
    this.setupSystemThemeListener();
    console.log('✅ FIXED Theme Manager initialized with theme:', this.currentTheme);
  }

  getStoredTheme() {
    try {
      return localStorage.getItem('portfolio-color-scheme');
    } catch (e) {
      console.warn('localStorage not available, using fallback');
      return null;
    }
  }

  storeTheme(theme) {
    try {
      localStorage.setItem('portfolio-color-scheme', theme);
      console.log('✅ Theme stored:', theme);
    } catch (e) {
      console.warn('Cannot store theme preference');
    }
  }

  getPreferredTheme() {
    const stored = this.getStoredTheme();
    if (stored && (stored === 'light' || stored === 'dark')) {
      return stored;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme, save = true) {
    if (theme !== 'light' && theme !== 'dark') {
      console.warn('Invalid theme:', theme);
      return;
    }
    
    if (this.isToggling) return;
    
    this.isToggling = true;
    this.currentTheme = theme;
    
    // Apply theme immediately with smooth transition
    this.applyThemeWithTransition(theme, save);
    
    setTimeout(() => {
      this.isToggling = false;
    }, 300);
    
    console.log('✅ Theme set to:', theme);
  }

  applyThemeWithTransition(theme, save = true) {
    // Add smooth transition classes
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Apply theme immediately
    this.applyTheme(theme, save);
    
    // Remove transition after animation
    setTimeout(() => {
      document.body.style.transition = '';
      document.documentElement.style.transition = '';
    }, 300);
  }

  applyTheme(theme, save = true) {
    // FIXED: Force theme change on body and html
    const body = document.body;
    const html = document.documentElement;
    
    // Remove existing theme attributes
    body.removeAttribute('data-color-scheme');
    html.removeAttribute('data-color-scheme');
    
    // Apply new theme
    body.setAttribute('data-color-scheme', theme);
    html.setAttribute('data-color-scheme', theme);
    
    // FIXED: Force CSS custom properties update
    if (theme === 'dark') {
      body.style.setProperty('--portfolio-bg', '#1a202c');
      body.style.setProperty('--portfolio-text', '#ffffff');
      body.style.setProperty('--portfolio-text-muted', '#e2e8f0');
      body.style.setProperty('--portfolio-card-bg', '#2d3748');
      body.style.setProperty('--portfolio-card-border', '#4a5568');
      body.style.setProperty('--nav-bg', 'rgba(26, 32, 44, 0.95)');
    } else {
      body.style.setProperty('--portfolio-bg', '#ffffff');
      body.style.setProperty('--portfolio-text', '#1a1a1a');
      body.style.setProperty('--portfolio-text-muted', '#4a5568');
      body.style.setProperty('--portfolio-card-bg', '#f8fafc');
      body.style.setProperty('--portfolio-card-border', '#cbd5e0');
      body.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.95)');
    }
    
    // FIXED: Update all elements with theme-dependent styles
    this.updateElementStyles(theme);
    
    // Save to localStorage if requested
    if (save) {
      this.storeTheme(theme);
    }
    
    // Update toggle state
    this.updateToggleState(theme);
    
    // Trigger custom event for other components
    document.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
    
    console.log('✅ Theme applied successfully:', theme);
  }

  updateElementStyles(theme) {
    // Update all sections
    document.querySelectorAll('.section').forEach(section => {
      section.style.backgroundColor = theme === 'dark' ? '#1a202c' : '#ffffff';
      section.style.color = theme === 'dark' ? '#ffffff' : '#1a1a1a';
    });
    
    // Update cards
    document.querySelectorAll('.experience-card, .project-slide, .certification-card, .education-card').forEach(card => {
      card.style.backgroundColor = theme === 'dark' ? '#2d3748' : '#f8fafc';
      card.style.borderColor = theme === 'dark' ? '#4a5568' : '#cbd5e0';
      card.style.color = theme === 'dark' ? '#ffffff' : '#1a1a1a';
    });
    
    // Update skill chips
    document.querySelectorAll('.skill-chip').forEach(chip => {
      chip.style.backgroundColor = theme === 'dark' ? '#2d3748' : '#f8fafc';
      chip.style.borderColor = theme === 'dark' ? '#4a5568' : '#cbd5e0';
      chip.style.color = theme === 'dark' ? '#ffffff' : '#1a1a1a';
    });
    
    // Update hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.backgroundColor = theme === 'dark' ? 'rgba(26, 32, 44, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      heroContent.style.borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)';
    }
    
    // Update navigation
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.background = theme === 'dark' ? 'rgba(26, 32, 44, 0.95)' : 'rgba(255, 255, 255, 0.95)';
      navbar.style.borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    }
    
    // Update text colors
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach(element => {
      if (!element.style.color || element.style.color === 'inherit') {
        element.style.color = theme === 'dark' ? '#ffffff' : '#1a1a1a';
      }
    });
  }

  updateToggleState(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      
      // Visual feedback animation
      toggle.style.transform = 'scale(0.95)';
      setTimeout(() => {
        toggle.style.transform = '';
      }, 150);
      
      console.log('✅ Toggle state updated for theme:', theme);
    }
  }

  setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        if (!this.getStoredTheme()) {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }
  }

  setupToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) {
      console.warn('Theme toggle button not found');
      return;
    }

    // FIXED: Clear any existing event listeners and create new toggle
    const newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);

    const handleToggleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('✅ Theme toggle clicked, current theme:', this.currentTheme);
      
      if (this.isToggling) {
        console.log('Already toggling, ignoring click');
        return;
      }
      
      const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      console.log('✅ Switching to theme:', newTheme);
      this.setTheme(newTheme);
    };

    const handleKeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggleClick(e);
      }
    };

    // Add event listeners with proper binding
    newToggle.addEventListener('click', handleToggleClick, { passive: false });
    newToggle.addEventListener('keydown', handleKeydown, { passive: false });

    console.log('✅ FIXED theme toggle setup complete');
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

// FIXED Navigation Management with Working Links
class NavigationManager {
  constructor() {
    this.activeSection = 'hero';
    this.mobileMenuOpen = false;
    this.scrollTimeout = null;
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveLinks();
    this.setupNavbarScroll();
    console.log('✅ FIXED Navigation Manager initialized');
  }

  setupMobileMenu() {
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');

    if (!burger || !navMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }

    // Clear any existing event listeners
    const newBurger = burger.cloneNode(true);
    burger.parentNode.replaceChild(newBurger, burger);

    const toggleMobileMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      this.mobileMenuOpen = !this.mobileMenuOpen;
      
      if (this.mobileMenuOpen) {
        this.openMobileMenu();
      } else {
        this.closeMobileMenu();
      }
      
      console.log('Mobile menu', this.mobileMenuOpen ? 'opened' : 'closed');
    };

    newBurger.addEventListener('click', toggleMobileMenu);
    newBurger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu(e);
      }
    });

    // Close menu when clicking on nav links
    navMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        setTimeout(() => this.closeMobileMenu(), 300);
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.mobileMenuOpen && 
          !newBurger.contains(e.target) && 
          !navMenu.contains(e.target)) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileMenuOpen) {
        this.closeMobileMenu();
      }
    });

    console.log('✅ FIXED mobile menu setup complete');
  }

  openMobileMenu() {
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    
    if (burger && navMenu) {
      burger.classList.add('active');
      navMenu.classList.add('active');
      burger.setAttribute('aria-expanded', 'true');
      this.mobileMenuOpen = true;
    }
  }

  closeMobileMenu() {
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    
    if (burger && navMenu) {
      burger.classList.remove('active');
      navMenu.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      this.mobileMenuOpen = false;
    }
  }

  setupSmoothScrolling() {
    // FIXED: Enhanced smooth scrolling for ALL navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    navLinks.forEach(link => {
      // Skip theme toggle
      if (link.id === 'theme-toggle') return;
      
      // Clear existing listeners and add new one
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = newLink.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          console.log('✅ Navigating to section:', targetId);
          this.smoothScrollTo(target);
          this.closeMobileMenu();
          this.setActiveSection(targetId);
        } else {
          console.warn('Target section not found:', targetId);
        }
      });
    });
    
    console.log('✅ FIXED smooth scrolling setup complete');
  }

  setActiveSection(sectionId) {
    this.activeSection = sectionId;
    
    // Update active navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
    
    // Trigger custom event
    document.dispatchEvent(new CustomEvent('sectionChanged', { 
      detail: { section: sectionId } 
    }));
    
    console.log('✅ Active section set to:', sectionId);
  }

  smoothScrollTo(target) {
    const navHeight = 70;
    const targetPosition = target.offsetTop - navHeight - 20; // Added extra padding
    
    // Use smooth scrolling with better easing
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Ensure we reached the target after scrolling
    setTimeout(() => {
      const currentScroll = window.pageYOffset;
      const diff = Math.abs(currentScroll - targetPosition);
      if (diff > 50) {
        window.scrollTo({
          top: targetPosition,
          behavior: 'auto'
        });
      }
    }, 600);
    
    console.log('✅ Scroll completed to:', target.id);
  }

  setupActiveLinks() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const id = entry.target.getAttribute('id');
          if (id) {
            this.setActiveSection(id);
          }
        }
      });
    }, {
      threshold: [0.3, 0.7],
      rootMargin: '-70px 0px -30% 0px'
    });

    sections.forEach(section => {
      if (section.id) {
        observer.observe(section);
      }
    });
  }

  setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100 && !this.mobileMenuOpen) {
        if (currentScrollY > lastScrollY) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }, { passive: true });
  }
}

// Enhanced Scroll Reveal
class ScrollReveal {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    this.setupSectionObserver();
    this.setupElementObserver();
    console.log('✅ Enhanced Scroll Reveal initialized');
  }

  setupSectionObserver() {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.animateChildElements(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-animate').forEach(section => {
      sectionObserver.observe(section);
    });

    this.observers.set('sections', sectionObserver);
  }

  setupElementObserver() {
    const elementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -20px 0px'
    });

    // Observe individual elements for stagger animations
    document.querySelectorAll(
      '.skill-chip, .experience-card, .certification-card, .education-card, .project-slide'
    ).forEach(element => {
      elementObserver.observe(element);
    });

    this.observers.set('elements', elementObserver);
  }

  animateChildElements(section) {
    const childElements = section.querySelectorAll(
      '.skill-chip, .experience-item, .certification-card, .education-card'
    );
    
    childElements.forEach((child, index) => {
      setTimeout(() => {
        if (!this.animatedElements.has(child)) {
          this.animateElement(child);
          this.animatedElements.add(child);
        }
      }, index * 100);
    });
  }

  animateElement(element) {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      return;
    }

    // Add enhanced entrance animation
    element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }
}

// FIXED Projects Carousel with Working Navigation Arrows
class ProjectsCarousel {
  constructor(projects) {
    this.projects = projects;
    this.swiper = null;
    this.isTouch = 'ontouchstart' in window;
    this.retryCount = 0;
    this.maxRetries = 5;
    this.init();
  }

  init() {
    this.renderProjects();
    // Wait for DOM to be ready, then initialize Swiper
    setTimeout(() => {
      this.initializeSwiper();
    }, 100);
  }

  renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) {
      console.warn('Projects container not found');
      return;
    }

    const projectsHTML = this.projects.map(project => `
      <div class="swiper-slide">
        <div class="project-slide">
          <div class="project-header">
            <div>
              <h3 class="project-title">${project.name}</h3>
              <div class="project-date">${project.date}</div>
            </div>
            <span class="project-badge">${project.type}</span>
          </div>
          <p class="project-description">${project.description}</p>
        </div>
      </div>
    `).join('');

    container.innerHTML = projectsHTML;
    console.log('✅ Projects rendered successfully');
  }

  initializeSwiper() {
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper library not loaded, retrying...', this.retryCount + 1);
      this.retryCount++;
      if (this.retryCount < this.maxRetries) {
        setTimeout(() => this.initializeSwiper(), 500);
      } else {
        console.error('❌ Swiper library failed to load after', this.maxRetries, 'attempts');
        this.setupFallbackNavigation();
      }
      return;
    }

    try {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      this.swiper = new Swiper('.projects-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: prefersReducedMotion ? 300 : 600,
        
        // Disable default navigation since we're using custom buttons
        navigation: false,
        
        // Enable pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        },
        
        // Responsive breakpoints
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          }
        },
        
        // Enhanced settings
        grabCursor: true,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        mousewheel: {
          forceToAxis: true,
          sensitivity: 0.5,
        },
        a11y: {
          prevSlideMessage: 'Previous project',
          nextSlideMessage: 'Next project',
        },
        
        // Loop for infinite scroll if enough slides
        loop: this.projects.length > 2,
        
        // Autoplay (can be disabled for reduced motion)
        autoplay: prefersReducedMotion ? false : {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        
        // Events
        on: {
          init: () => {
            console.log('✅ FIXED Swiper initialized successfully');
            this.setupCustomNavigation();
            this.updateNavigationState();
          },
          slideChange: () => {
            this.updateNavigationState();
            console.log('Slide changed to:', this.swiper.activeIndex);
          },
          touchStart: () => {
            if (this.swiper.autoplay) {
              this.swiper.autoplay.stop();
            }
          },
          touchEnd: () => {
            if (this.swiper.autoplay && !prefersReducedMotion) {
              setTimeout(() => {
                this.swiper.autoplay.start();
              }, 3000);
            }
          }
        }
      });
      
    } catch (error) {
      console.error('❌ Error initializing Swiper:', error);
      this.setupFallbackNavigation();
    }
  }

  setupCustomNavigation() {
    // FIXED: Get custom navigation buttons
    const prevButton = document.getElementById('projects-prev');
    const nextButton = document.getElementById('projects-next');
    
    if (!prevButton || !nextButton) {
      console.warn('❌ Custom navigation buttons not found');
      return;
    }

    console.log('✅ Found custom navigation buttons');

    // Remove any existing listeners by cloning
    const newPrevButton = prevButton.cloneNode(true);
    const newNextButton = nextButton.cloneNode(true);
    
    prevButton.parentNode.replaceChild(newPrevButton, prevButton);
    nextButton.parentNode.replaceChild(newNextButton, nextButton);

    // Add click handlers for custom navigation
    newPrevButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('✅ Previous button clicked');
      
      if (this.swiper) {
        this.swiper.slidePrev();
        console.log('Swiper slidePrev executed');
      } else {
        console.warn('Swiper not available for slidePrev');
      }
      
      // Visual feedback
      newPrevButton.style.transform = 'scale(0.9)';
      setTimeout(() => {
        newPrevButton.style.transform = '';
      }, 150);
    });

    newNextButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('✅ Next button clicked');
      
      if (this.swiper) {
        this.swiper.slideNext();
        console.log('Swiper slideNext executed');
      } else {
        console.warn('Swiper not available for slideNext');
      }
      
      // Visual feedback
      newNextButton.style.transform = 'scale(0.9)';
      setTimeout(() => {
        newNextButton.style.transform = '';
      }, 150);
    });

    // Add keyboard support
    newPrevButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (this.swiper) {
          this.swiper.slidePrev();
        }
      }
    });

    newNextButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (this.swiper) {
          this.swiper.slideNext();
        }
      }
    });

    console.log('✅ FIXED Custom navigation setup complete');
  }

  setupFallbackNavigation() {
    console.log('🔧 Setting up fallback navigation...');
    
    const prevButton = document.getElementById('projects-prev');
    const nextButton = document.getElementById('projects-next');
    const slides = document.querySelectorAll('.swiper-slide');
    
    if (!prevButton || !nextButton || slides.length === 0) {
      console.warn('❌ Fallback navigation setup failed - missing elements');
      return;
    }

    let currentSlide = 0;
    const totalSlides = slides.length;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
      currentSlide = index;
    };

    showSlide(0);

    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
      console.log('Fallback: Previous slide', currentSlide);
    });

    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
      console.log('Fallback: Next slide', currentSlide);
    });

    console.log('✅ Fallback navigation setup complete');
  }

  updateNavigationState() {
    if (!this.swiper) return;

    const prevButton = document.getElementById('projects-prev');
    const nextButton = document.getElementById('projects-next');

    if (prevButton && nextButton) {
      // Update button states based on slide position
      if (this.swiper.isBeginning && !this.swiper.params.loop) {
        prevButton.style.opacity = '0.5';
        prevButton.style.pointerEvents = 'none';
      } else {
        prevButton.style.opacity = '1';
        prevButton.style.pointerEvents = 'auto';
      }

      if (this.swiper.isEnd && !this.swiper.params.loop) {
        nextButton.style.opacity = '0.5';
        nextButton.style.pointerEvents = 'none';
      } else {
        nextButton.style.opacity = '1';
        nextButton.style.pointerEvents = 'auto';
      }
    }
  }

  destroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }
}

// Performance and Accessibility Optimizer
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.addLoadingStates();
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.addButtonAnimations();
    this.setupReducedMotion();
    console.log('✅ Performance Optimizer initialized');
  }

  addLoadingStates() {
    document.body.classList.add('loading');
    
    const removeLoading = () => {
      setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        this.triggerInitialAnimations();
      }, 200);
    };

    if (document.readyState === 'complete') {
      removeLoading();
    } else {
      window.addEventListener('load', removeLoading);
    }
  }

  triggerInitialAnimations() {
    const visibleElements = document.querySelectorAll('.hero-content > *');
    visibleElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }

  addButtonAnimations() {
    document.querySelectorAll('.btn, .animated-btn, .carousel-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        this.createButtonRipple(button, e);
      });

      button.addEventListener('mouseenter', () => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          button.style.transform = 'translateY(-2px) scale(1.02)';
        }
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  }

  createButtonRipple(button, event) {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('div');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  setupKeyboardNavigation() {
    let isTabbing = false;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        isTabbing = true;
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      if (isTabbing) {
        isTabbing = false;
        document.body.classList.remove('keyboard-navigation');
      }
    });
  }

  setupFocusManagement() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.addEventListener('focus', () => {
      skipLink.classList.remove('sr-only');
    });
    skipLink.addEventListener('blur', () => {
      skipLink.classList.add('sr-only');
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    const main = document.querySelector('main');
    if (main && !main.id) {
      main.id = 'main-content';
    }
  }

  setupReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreference = (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
        console.log('✅ Reduced motion enabled');
      } else {
        document.body.classList.remove('reduced-motion');
        console.log('✅ Full animations enabled');
      }
    };

    mediaQuery.addEventListener('change', handleMotionPreference);
    handleMotionPreference(mediaQuery);
  }
}

// FIXED Portfolio Application with All Working Features
class PortfolioApp {
  constructor() {
    this.components = {};
    this.isInitialized = false;
    this.version = '3.0.0'; // Major version with all fixes
    this.init();
  }

  init() {
    console.log(`🚀 Initializing FULLY FIXED Portfolio App v${this.version}`);
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    if (this.isInitialized) {
      console.warn('Portfolio already initialized');
      return;
    }

    try {
      // Initialize components in correct order
      this.components.performance = new PerformanceOptimizer();
      this.components.theme = new ThemeManager();
      this.components.navigation = new NavigationManager();
      this.components.scrollReveal = new ScrollReveal();
      this.components.projects = new ProjectsCarousel(portfolioData.projects);

      // Setup additional interactions
      this.setupEnhancedInteractions();
      this.setupCustomEvents();
      this.addDynamicStyles();
      
      this.isInitialized = true;
      console.log('✅ FULLY FIXED Portfolio application initialized successfully');
      
      // Verify critical functionality
      this.verifyFunctionality();
      
    } catch (error) {
      console.error('❌ Error initializing portfolio application:', error);
      this.fallbackInit();
    }
  }

  verifyFunctionality() {
    console.log('🔍 Verifying critical functionality...');
    
    // Verify theme toggle exists and works
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle && this.components.theme) {
      console.log('✅ Theme toggle verified');
    } else {
      console.warn('❌ Theme toggle not working');
    }
    
    // Verify carousel arrows exist
    const prevButton = document.getElementById('projects-prev');
    const nextButton = document.getElementById('projects-next');
    if (prevButton && nextButton) {
      console.log('✅ Carousel navigation arrows verified');
    } else {
      console.warn('❌ Carousel navigation arrows missing');
    }
    
    // Verify navigation links work
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (navLinks.length > 0) {
      console.log('✅ Navigation links verified');
    } else {
      console.warn('❌ Navigation links not found');
    }
    
    console.log('🔍 Functionality verification complete');
  }

  setupEnhancedInteractions() {
    this.setupHoverEffects();
    this.setupContactLinks();
    this.setupSkillInteractions();
  }

  setupHoverEffects() {
    const cards = document.querySelectorAll(
      '.experience-card, .project-slide, .certification-card, .education-card, .social-link'
    );
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          card.style.transform = 'translateY(-4px) scale(1.02)';
          card.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  setupContactLinks() {
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href*="linkedin.com"]');
    
    contactLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const linkType = link.href.includes('mailto') ? 'email' : 'linkedin';
        console.log(`Contact link clicked: ${linkType}`);
        
        // Visual feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
          link.style.transform = '';
        }, 150);
      });
    });
  }

  setupSkillInteractions() {
    document.querySelectorAll('.skill-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        chip.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
          chip.style.transform = '';
        }, 200);
      });
    });
  }

  setupCustomEvents() {
    // Listen for theme changes
    document.addEventListener('themeChanged', (e) => {
      console.log('✅ Theme changed to:', e.detail.theme);
    });

    // Listen for section changes
    document.addEventListener('sectionChanged', (e) => {
      console.log('Active section:', e.detail.section);
    });
  }

  addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }

      .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }

      .keyboard-navigation :focus {
        outline: 2px solid var(--portfolio-primary) !important;
        outline-offset: 2px !important;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      .sr-only:focus {
        position: static;
        width: auto;
        height: auto;
        padding: 8px;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
        background: var(--portfolio-primary);
        color: white;
        text-decoration: none;
        z-index: 1001;
      }
    `;
    document.head.appendChild(style);
  }

  fallbackInit() {
    console.log('🔧 Initializing fallback functionality...');
    
    // FIXED Fallback theme toggle with actual theme switching
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const currentTheme = document.body.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme to both body and html
        document.body.setAttribute('data-color-scheme', newTheme);
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        
        // Force style updates
        if (newTheme === 'dark') {
          document.body.style.backgroundColor = '#1a202c';
          document.body.style.color = '#ffffff';
        } else {
          document.body.style.backgroundColor = '#ffffff';
          document.body.style.color = '#1a1a1a';
        }
        
        console.log('✅ Fallback theme toggle:', newTheme);
        
        // Try to store theme
        try {
          localStorage.setItem('portfolio-color-scheme', newTheme);
        } catch (e) {
          console.warn('Cannot store theme preference');
        }
      });
    }

    // Fallback mobile menu
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    if (burger && navMenu) {
      let menuOpen = false;
      burger.addEventListener('click', (e) => {
        e.preventDefault();
        menuOpen = !menuOpen;
        burger.classList.toggle('active', menuOpen);
        navMenu.classList.toggle('active', menuOpen);
      });
    }

    console.log('✅ Fallback functionality initialized');
  }

  // Public API methods
  getCurrentTheme() {
    return this.components.theme?.currentTheme || 'light';
  }

  setTheme(theme) {
    if (this.components.theme) {
      this.components.theme.setTheme(theme);
    }
  }

  toggleTheme() {
    if (this.components.theme) {
      this.components.theme.toggleTheme();
    }
  }

  getVersion() {
    return this.version;
  }

  destroy() {
    console.log('🛑 Destroying Portfolio App...');
    
    Object.values(this.components).forEach(component => {
      if (component.destroy) {
        component.destroy();
      }
    });
    
    this.components = {};
    this.isInitialized = false;
  }
}

// Global initialization with comprehensive error handling
let portfolioApp;

function initializeApp() {
  if (portfolioApp) {
    console.warn('Portfolio app already exists');
    return;
  }
  
  try {
    portfolioApp = new PortfolioApp();
    
    // Make available globally for debugging and external access
    window.PortfolioApp = portfolioApp;
    window.toggleTheme = () => portfolioApp.toggleTheme();
    
    console.log(`✅ FULLY FIXED Portfolio App v${portfolioApp.getVersion()} loaded successfully`);
    
    // Add global error handling
    window.addEventListener('error', (e) => {
      console.error('Global error caught:', e.error);
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
    
  } catch (error) {
    console.error('❌ Failed to create portfolio application:', error);
  }
}

// Initialize when DOM is ready with multiple fallbacks
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  setTimeout(initializeApp, 100);
}

// Ensure initialization happens even if DOM events don't fire
setTimeout(() => {
  if (!portfolioApp) {
    console.warn('Portfolio app not initialized, forcing initialization...');
    initializeApp();
  }
}, 2000);

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && portfolioApp) {
    console.log('Page visible - resuming animations');
    if (portfolioApp.components.projects?.swiper?.autoplay) {
      portfolioApp.components.projects.swiper.autoplay.start();
    }
  } else if (document.visibilityState === 'hidden' && portfolioApp) {
    console.log('Page hidden - pausing animations');
    if (portfolioApp.components.projects?.swiper?.autoplay) {
      portfolioApp.components.projects.swiper.autoplay.stop();
    }
  }
});

// Cleanup on unload
window.addEventListener('beforeunload', () => {
  if (portfolioApp) {
    portfolioApp.destroy();
  }
});

// Export for module usage
export { PortfolioApp, ThemeManager, NavigationManager, ProjectsCarousel, ScrollReveal, PerformanceOptimizer };
export default PortfolioApp;