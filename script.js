/**
 * script.js - Interactive Logic for Luis Hernandez's Integration Portfolio
 * Implements Typing effects, Interactive Terminal, Handshake POST simulation,
 * Theme switching, Mobile Navigation, and Project Filters.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. THEME SWITCHER ENGINE
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else {
    htmlElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  // Toggle Action
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Log theme toggle in terminal if available
      appendTerminalOutput(`SYSTEM: Visual theme mutated to [${newTheme.toUpperCase()}] mode.`);
    });
  }


  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });

    // Close menu when clicking nav item
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.classList.remove('open');
      });
    });
  }


  /* ==========================================================================
     3. DYNAMIC TYPING ANNOUNCER
     ========================================================================== */
  const typingText = document.getElementById('typing-text');
  const titles = [
    'MuleSoft Certified Developer',
    'Integration Technical Consultant',
    'TIBCO Developer',
    'Data Integration Engineer'
  ];
  
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      typingText.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Delete faster
    } else {
      typingText.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Natural typing speed
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 2000; // Hold word for 2s
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500; // Short pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Initialize typing
  if (typingText) {
    setTimeout(typeEffect, 1000);
  }





  /* ==========================================================================
     5. PROJECT FILTERS DRAWER
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active to current
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        // Clear active transition timeout
        if (card.transitionTimeout) {
          clearTimeout(card.transitionTimeout);
        }

        // CSS smooth transition styling trigger
        if (filterValue === 'all' || (cardCategory && cardCategory.split(' ').includes(filterValue))) {
          card.style.display = 'flex';
          card.transitionTimeout = setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          card.transitionTimeout = setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  /* ==========================================================================
     7. SCROLL NAVIGATION HIGH LIGHTER & SCROLL TOP
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const scrollBtn = document.getElementById('scroll-to-top');

  function scrollHighlighter() {
    const scrollY = window.pageYOffset;
    
    // Active Navigation items matching viewport
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset header padding
      const sectionId = current.getAttribute('id');
      const navLink = document.getElementById(`nav-${sectionId}`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });

    // Scroll To Top button visibility trigger
    if (scrollBtn) {
      if (scrollY > 500) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.visibility = 'visible';
      } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
      }
    }
  }

  window.addEventListener('scroll', scrollHighlighter);
  
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
