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
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Log theme toggle in terminal if available
    appendTerminalOutput(`SYSTEM: Visual theme mutated to [${newTheme.toUpperCase()}] mode.`);
  });


  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    
    // Hamburger line transformations
    const spans = menuBtn.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking nav item
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = menuBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });


  /* ==========================================================================
     3. DYNAMIC TYPING ANNOUNCER
     ========================================================================== */
  const typingText = document.getElementById('typing-text');
  const titles = [
    'Senior Integration Engineer',
    'Enterprise ESB Architect',
    'Data Pipeline Orchestrator',
    'API Gateway Designer',
    'Drift Reconciliation Wizard'
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
     4. INTERACTIVE BASH TERMINAL EMULATOR
     ========================================================================== */
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalInput = document.getElementById('terminal-cmd-input');
  const inputContainer = document.getElementById('terminal-input-container');

  // Command History Registry
  const commandRegistry = {
    help: () => {
      return `Available endpoints / executable operations:
  about       - Print summary profile of Luis Hernandez
  skills      - List categorized integration skill clusters
  projects    - Print list of active sync pipelines
  ping        - Query system infrastructure ping response
  contact     - Display API mail hook parameters
  clear       - Clear screen buffer history
  help        - Display this menu`;
    },
    about: () => {
      return `{\n  "name": "Luis Hernandez",\n  "role": "Systems Integration Engineer",\n  "objective": "Design fault-tolerant backend architectures to synchronize mission-critical business data without drift.",\n  "languages": {\n    "spanish": "Native",\n    "english": "Professional Working (B2)"\n  },\n  "focus": ["API Design & Middleware", "Reconciliation Engines", "Schema Protection", "Asynchronous Events"]\n}`;
    },
    skills: () => {
      return `================ INTEGRATION TECH CLUSTERS ================
  [ESB / Middlewares]: MuleSoft ESB, DataWeave 2.0, Apache Camel, RabbitMQ, Kafka
  [Dev & Scripting]  : Python (Asyncio, Pandas, SQLAlchemy), Node.js, SQL, XPath, XML
  [Cloud & Devops]   : AWS API Gateway, Lambda serverless, Docker, Kubernetes, CI/CD`;
    },
    projects: () => {
      return `ACTIVE DATA PIPELINES:
  1. WORKDAY-CYTRIC-SYNC-ENGINE (v2.4) [Active]
     - Flow: Workday HRIS XML schema mapping to Cytric travel profile structure
     - Parity state: 100% synchronized, drift controls enabled
  2. WEBHOOK-INGESTION-GATEWAY-AWS [Active]
     - Throughput: Scales to 10k payloads/sec, queues messages in SQS
  3. LEGACY-ORACLE-POSTGRES-ETL [Active]
     - Flow: Scheduled DB extractions, pandas processing, docker execution`;
    },
    contact: () => {
      return `ENDPOINT PARAMETERS:
  - Mail Target : luis@hernandez.dev
  - Location    : Madrid, Spain (CET Zone)
  - HTTP Access : POST request on Handshake terminal at bottom of page`;
    },
    ping: () => {
      const latencies = [8, 12, 14, 21, 6];
      const randomLatency = latencies[Math.floor(Math.random() * latencies.length)];
      return `PING https://api.luishernandez.dev (172.24.89.1) 56(84) bytes of data.
  64 bytes from 172.24.89.1: icmp_seq=1 ttl=54 time=${randomLatency}ms
  
  --- api.luishernandez.dev ping statistics ---
  1 packets transmitted, 1 received, 0% packet loss, time 0ms
  rtt min/avg/max/mdev = ${randomLatency}/${randomLatency}/${randomLatency}/0.000 ms
  
  SYSTEM LOG: MuleSoft integration gateway operational. All synchronization pipelines are healthy.`;
    }
  };

  // Helper function to append outputs to terminal
  function appendTerminalOutput(text, isError = false, isSuccess = false) {
    const outputLine = document.createElement('div');
    outputLine.className = 't-output';
    if (isError) outputLine.classList.add('error');
    if (isSuccess) outputLine.classList.add('success');
    outputLine.textContent = text;
    
    // Insert before the input container
    terminalScreen.insertBefore(outputLine, inputContainer);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  // Handle Command Submission
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const fullCmd = terminalInput.value;
        const cleanCmd = fullCmd.trim().toLowerCase();
        
        // 1. Output the typed command to the screen log
        const cmdHistoryLine = document.createElement('div');
        cmdHistoryLine.className = 'terminal-line';
        cmdHistoryLine.innerHTML = `
          <span class="t-prompt">guest@hernandez-terminal:~$&nbsp;</span>
          <span class="t-cmd">${fullCmd}</span>
        `;
        terminalScreen.insertBefore(cmdHistoryLine, inputContainer);

        // Reset input immediately
        terminalInput.value = '';

        // 2. Process Command
        if (cleanCmd === '') {
          terminalScreen.scrollTop = terminalScreen.scrollHeight;
          return;
        }

        if (cleanCmd === 'clear') {
          // Clear all except input line
          const lines = terminalScreen.querySelectorAll('.terminal-line, .t-output');
          lines.forEach(line => line.remove());
          terminalScreen.scrollTop = terminalScreen.scrollHeight;
          return;
        }

        if (commandRegistry.hasOwnProperty(cleanCmd)) {
          const result = commandRegistry[cleanCmd]();
          appendTerminalOutput(result);
        } else {
          appendTerminalOutput(`bash: command not found: ${cleanCmd}. Type "help" to see available system endpoints.`, true);
        }
        
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
      }
    });

    // Terminal click focuses input
    terminalScreen.addEventListener('click', () => {
      terminalInput.focus();
    });
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
        
        // CSS smooth transition styling trigger
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  /* ==========================================================================
     6. CONTACT HANDSHAKE FORM (SECURE POST SIMULATOR)
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const statusBox = document.getElementById('form-status-box');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic client-side validation
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
        showFormTerminalMessage('SYSTEM FAILURE: All fields in payload mapping must be populated.', true);
        return;
      }

      if (!validateEmail(emailInput.value)) {
        showFormTerminalMessage('SCHEMA ERROR: "Callback Email URI" value must be a valid email structure.', true);
        return;
      }

      // Enter Sending Loading State
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.querySelector('span').textContent;
      submitBtn.querySelector('span').textContent = 'POSTING DATA PACKETS...';
      
      statusBox.style.display = 'block';
      statusBox.innerHTML = ''; // Clear previous messages

      // Interactive terminal logs for sending email
      const logs = [
        'INITIATING Secure TLS TCP Socket Connection... DONE.',
        `ESTABLISHING virtual pipe to POST /handshake_request HTTP/1.1`,
        `SERIALIZING parameters to JSON structure...`,
        `PAYLOAD: {\n  "sender": "${nameInput.value}",\n  "callback": "${emailInput.value}",\n  "subject": "${subjectInput.value}"\n}`,
        `ENCRYPTING outbound packet blocks (AES-256 GCM)... DONE.`,
        'ROUTING packets through load balancer... 172.24.16.8',
        'TRANSMITTING handshake sequence across pipeline...',
        'WAITING for target system authorization request response...',
        'HTTP/1.1 200 OK - Handshake Trigger established successfully!',
        'SYSTEM LOG: Integration handshake established with Luis Hernandez. Packets arrived. Connection success!'
      ];

      let logIndex = 0;
      
      function printNextLog() {
        if (logIndex < logs.length) {
          const logLine = document.createElement('div');
          
          // Color success or normal log line
          if (logIndex === logs.length - 1 || logIndex === logs.length - 2) {
            logLine.style.color = 'var(--accent-green)';
            logLine.textContent = `> ${logs[logIndex]}`;
          } else if (logIndex === 3) {
            // White pre-formatted payload text
            logLine.style.color = '#FFF';
            logLine.style.whiteSpace = 'pre-wrap';
            logLine.textContent = logs[logIndex];
          } else {
            logLine.textContent = `> ${logs[logIndex]}`;
          }

          statusBox.appendChild(logLine);
          statusBox.scrollTop = statusBox.scrollHeight;
          logIndex++;
          
          // Speed up intermediate processing logs, slow down network waits
          let delay = 350;
          if (logIndex === 3) delay = 600;
          if (logIndex === 6) delay = 750;
          if (logIndex === 8) delay = 1000;

          setTimeout(printNextLog, delay);
        } else {
          // Reset form fields and submit button state
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = originalBtnText;
          
          // Append success log in home terminal as well for cohesion
          appendTerminalOutput(`API WEBHOOK: Successful /handshake_request completed by [${nameInput.value}]`, false, true);
        }
      }

      printNextLog();
    });
  }

  function showFormTerminalMessage(msg, isError = false) {
    statusBox.style.display = 'block';
    statusBox.innerHTML = '';
    const line = document.createElement('div');
    line.style.color = isError ? 'var(--accent-red)' : 'var(--accent-cyan)';
    line.textContent = `> ${msg}`;
    statusBox.appendChild(line);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }


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
