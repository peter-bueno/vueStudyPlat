// Vue 3 Learning Guide JavaScript

class Vue3LearningApp {
  constructor() {
    this.currentSection = 'introduction';
    this.sections = [
      'introduction', 'reactivity', 'components', 'apis', 'state', 
      'router', 'lifecycle', 'structure', 'ecosystem', 'examples'
    ];
    this.searchData = this.buildSearchIndex();
    this.theme = localStorage.getItem('theme') || 'auto';
    
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupSearch();
    this.setupCodeTabs();
    this.setupAPIComparison();
    this.setupCopyButtons();
    this.setupInteractiveDemos();
    this.updateProgress();
    
    // Apply saved theme
    this.applyTheme(this.theme);
    
    // Initialize syntax highlighting
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const section = e.currentTarget.dataset.section;
        this.navigateToSection(section);
      });
    });
  }

  navigateToSection(sectionName) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

    // Update active section
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');

    this.currentSection = sectionName;
    this.updateProgress();
    
    // Scroll to top of content
    document.querySelector('.main-content').scrollTop = 0;
  }

  updateProgress() {
    const currentIndex = this.sections.indexOf(this.currentSection);
    const progress = ((currentIndex + 1) / this.sections.length) * 100;
    
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${Math.round(progress)}%`;
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    themeToggle.addEventListener('click', () => {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.applyTheme(this.theme);
      localStorage.setItem('theme', this.theme);
    });
  }

  applyTheme(theme) {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    body.setAttribute('data-color-scheme', theme);
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
  }

  setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.performSearch(e.target.value);
      }
    });
  }

  buildSearchIndex() {
    return {
      'introduction': ['setup', 'vue 3', 'vite', 'cli', 'project', 'installation', 'getting started'],
      'reactivity': ['ref', 'reactive', 'computed', 'watch', 'reactivity', 'state', 'binding'],
      'components': ['props', 'emit', 'slots', 'single file', 'sfc', 'communication'],
      'apis': ['composition api', 'options api', 'setup', 'methods', 'data', 'lifecycle'],
      'state': ['pinia', 'vuex', 'store', 'actions', 'getters', 'state management'],
      'router': ['routing', 'navigation', 'guards', 'dynamic routes', 'nested routes'],
      'lifecycle': ['hooks', 'mounted', 'created', 'updated', 'unmounted', 'lifecycle'],
      'structure': ['project structure', 'organization', 'folders', 'architecture'],
      'ecosystem': ['tools', 'vite', 'testing', 'typescript', 'eslint', 'devtools'],
      'examples': ['todo', 'real world', 'patterns', 'best practices', 'applications']
    };
  }

  performSearch(query) {
    if (!query.trim()) return;

    const results = [];
    const lowerQuery = query.toLowerCase();

    for (const [section, keywords] of Object.entries(this.searchData)) {
      if (keywords.some(keyword => keyword.includes(lowerQuery))) {
        results.push(section);
      }
    }

    if (results.length > 0) {
      this.navigateToSection(results[0]);
      this.showSearchFeedback(`Found in: ${this.getSectionTitle(results[0])}`);
    } else {
      this.showSearchFeedback('No results found');
    }
  }

  getSectionTitle(sectionName) {
    const titles = {
      'introduction': 'Introduction & Setup',
      'reactivity': 'Reactivity Fundamentals',
      'components': 'Component Basics',
      'apis': 'Composition vs Options API',
      'state': 'State Management',
      'router': 'Vue Router',
      'lifecycle': 'Lifecycle Hooks',
      'structure': 'Project Structure',
      'ecosystem': 'Ecosystem & Tools',
      'examples': 'Real-world Examples'
    };
    return titles[sectionName] || sectionName;
  }

  showSearchFeedback(message) {
    // Create or update search feedback
    let feedback = document.querySelector('.search-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'search-feedback';
      feedback.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-8) var(--space-12);
        font-size: var(--font-size-sm);
        z-index: 1000;
        margin-top: 4px;
      `;
      document.querySelector('.search-container').appendChild(feedback);
    }
    
    feedback.textContent = message;
    
    // Hide after 3 seconds
    setTimeout(() => {
      if (feedback) {
        feedback.remove();
      }
    }, 3000);
  }

  setupCodeTabs() {
    const tabContainers = document.querySelectorAll('.code-tabs');
    
    tabContainers.forEach(container => {
      const tabs = container.querySelectorAll('.code-tab');
      const contents = container.parentElement.querySelectorAll('.code-tab-content');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetTab = tab.dataset.tab;
          
          // Update active tab
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          // Update active content
          contents.forEach(content => {
            content.classList.remove('active');
            if (content.dataset.tabContent === targetTab) {
              content.classList.add('active');
            }
          });
        });
      });
    });
  }

  setupAPIComparison() {
    const apiToggleButtons = document.querySelectorAll('.api-toggle-btn');
    const apiContents = document.querySelectorAll('.api-content');
    
    apiToggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetAPI = button.dataset.api;
        
        // Update active button
        apiToggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active content
        apiContents.forEach(content => {
          content.classList.remove('active');
          if (content.dataset.apiContent === targetAPI) {
            content.classList.add('active');
          }
        });
      });
    });
  }

  setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', async () => {
        try {
          let textToCopy;
          
          if (button.dataset.copy) {
            textToCopy = button.dataset.copy;
          } else {
            // Get code from the nearest pre element
            const codeElement = button.parentElement.querySelector('pre code');
            textToCopy = codeElement ? codeElement.textContent : '';
          }
          
          await navigator.clipboard.writeText(textToCopy);
          
          // Visual feedback
          const originalText = button.textContent;
          button.textContent = '✅';
          setTimeout(() => {
            button.textContent = originalText;
          }, 2000);
          
        } catch (err) {
          console.error('Failed to copy text: ', err);
          button.textContent = '❌';
          setTimeout(() => {
            button.textContent = '📋';
          }, 2000);
        }
      });
    });
  }

  setupInteractiveDemos() {
    this.setupCounterDemo();
    this.setupNameDemo();
  }

  setupCounterDemo() {
    let count = 0;
    const incrementBtn = document.getElementById('incrementBtn');
    const countDisplay = document.getElementById('countDisplay');
    
    if (incrementBtn && countDisplay) {
      incrementBtn.addEventListener('click', () => {
        count++;
        countDisplay.textContent = count;
        
        // Add a small animation
        countDisplay.style.transform = 'scale(1.2)';
        countDisplay.style.color = 'var(--color-primary)';
        
        setTimeout(() => {
          countDisplay.style.transform = 'scale(1)';
          countDisplay.style.color = 'inherit';
        }, 150);
      });
    }
  }

  setupNameDemo() {
    const names = ['John', 'Jane', 'Alice', 'Bob', 'Charlie'];
    let currentNameIndex = 0;
    
    const updateNameBtn = document.getElementById('updateNameBtn');
    const nameDisplay = document.getElementById('nameDisplay');
    
    if (updateNameBtn && nameDisplay) {
      updateNameBtn.addEventListener('click', () => {
        currentNameIndex = (currentNameIndex + 1) % names.length;
        const newName = names[currentNameIndex];
        
        // Add transition effect
        nameDisplay.style.opacity = '0';
        
        setTimeout(() => {
          nameDisplay.textContent = newName;
          nameDisplay.style.opacity = '1';
        }, 150);
      });
    }
  }

  // Utility methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Keyboard navigation
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            document.getElementById('searchInput').focus();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.navigateNext();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.navigatePrevious();
            break;
        }
      }
    });
  }

  navigateNext() {
    const currentIndex = this.sections.indexOf(this.currentSection);
    if (currentIndex < this.sections.length - 1) {
      this.navigateToSection(this.sections[currentIndex + 1]);
    }
  }

  navigatePrevious() {
    const currentIndex = this.sections.indexOf(this.currentSection);
    if (currentIndex > 0) {
      this.navigateToSection(this.sections[currentIndex - 1]);
    }
  }

  // Initialize tooltips for better UX
  initializeTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target, e.target.dataset.tooltip);
      });
      
      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
      position: absolute;
      background: var(--color-charcoal-800);
      color: var(--color-cream-50);
      padding: var(--space-6) var(--space-8);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-xs);
      z-index: 1000;
      white-space: nowrap;
      pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width/2 - tooltip.offsetWidth/2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
  }

  hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Performance monitoring
  measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
      });
    }
  }
}

// Enhanced features for better learning experience
class LearningTracker {
  constructor() {
    this.visitedSections = JSON.parse(localStorage.getItem('visitedSections') || '[]');
    this.bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  }

  markSectionVisited(section) {
    if (!this.visitedSections.includes(section)) {
      this.visitedSections.push(section);
      localStorage.setItem('visitedSections', JSON.stringify(this.visitedSections));
    }
  }

  toggleBookmark(section) {
    const index = this.bookmarks.indexOf(section);
    if (index > -1) {
      this.bookmarks.splice(index, 1);
    } else {
      this.bookmarks.push(section);
    }
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  getProgress() {
    return {
      visited: this.visitedSections.length,
      total: 10,
      percentage: Math.round((this.visitedSections.length / 10) * 100)
    };
  }
}

// Code playground for live examples
class CodePlayground {
  constructor() {
    this.setupPlaygrounds();
  }

  setupPlaygrounds() {
    const playgrounds = document.querySelectorAll('[data-playground]');
    
    playgrounds.forEach(playground => {
      this.createPlayground(playground);
    });
  }

  createPlayground(element) {
    const code = element.dataset.code || '';
    const template = element.dataset.template || '';
    
    // Create a simple playground interface
    const playgroundHTML = `
      <div class="code-playground">
        <div class="playground-controls">
          <button class="btn btn--sm btn--primary run-code">Run Code</button>
          <button class="btn btn--sm btn--outline reset-code">Reset</button>
        </div>
        <div class="playground-output">
          <div class="output-display"></div>
        </div>
      </div>
    `;
    
    element.innerHTML = playgroundHTML;
    
    const runBtn = element.querySelector('.run-code');
    const resetBtn = element.querySelector('.reset-code');
    const output = element.querySelector('.output-display');
    
    runBtn.addEventListener('click', () => {
      this.executeCode(code, template, output);
    });
    
    resetBtn.addEventListener('click', () => {
      output.innerHTML = '<p>Click "Run Code" to see the output</p>';
    });
  }

  executeCode(jsCode, htmlTemplate, outputElement) {
    try {
      // Simple code execution simulation
      // In a real implementation, you'd use a sandboxed environment
      outputElement.innerHTML = htmlTemplate || '<p>Code executed successfully!</p>';
    } catch (error) {
      outputElement.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  }
}

// Accessibility enhancements
class AccessibilityManager {
  constructor() {
    this.setupAccessibility();
  }

  setupAccessibility() {
    this.setupSkipLinks();
    this.setupFocusManagement();
    this.setupScreenReaderAnnouncements();
  }

  setupSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
      position: absolute;
      left: -9999px;
      z-index: 1000;
      padding: var(--space-8);
      background: var(--color-primary);
      color: var(--color-btn-primary-text);
      text-decoration: none;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.left = '0';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupFocusManagement() {
    // Trap focus in modals, ensure logical tab order
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        // Focus management logic would go here
      }
    });
  }

  setupScreenReaderAnnouncements() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    this.announcer = announcer;
  }

  announce(message) {
    if (this.announcer) {
      this.announcer.textContent = message;
    }
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Main application
  const app = new Vue3LearningApp();
  
  // Additional features
  const learningTracker = new LearningTracker();
  const codePlayground = new CodePlayground();
  const accessibilityManager = new AccessibilityManager();
  
  // Setup keyboard navigation
  app.setupKeyboardNavigation();
  
  // Initialize tooltips
  app.initializeTooltips();
  
  // Performance monitoring
  app.measurePerformance();
  
  // Track section visits
  const originalNavigateToSection = app.navigateToSection.bind(app);
  app.navigateToSection = function(section) {
    originalNavigateToSection(section);
    learningTracker.markSectionVisited(section);
    accessibilityManager.announce(`Navigated to ${app.getSectionTitle(section)}`);
  };
  
  // Global error handling
  window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
  });
  
  // Service worker registration for offline capability (if needed)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // navigator.serviceWorker.register('/sw.js')
      //   .then(registration => console.log('SW registered'))
      //   .catch(error => console.log('SW registration failed'));
    });
  }
  
  console.log('Vue 3 Learning Guide initialized successfully! 🚀');
  console.log('Keyboard shortcuts:');
  console.log('- Ctrl/Cmd + K: Focus search');
  console.log('- Ctrl/Cmd + →: Next section');
  console.log('- Ctrl/Cmd + ←: Previous section');
});