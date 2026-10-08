/**
 * Rachana Portfolio - Interactive Logic & Theme Management
 */
document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Theme Management (Night / Dark Mode vs. Light Mode)
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to 'dark' for futuristic aesthetic
  const savedTheme = localStorage.getItem('rachana-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('rachana-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      const isDark = theme === 'dark';
      themeToggle.setAttribute('aria-pressed', (!isDark).toString());
      if (themeIcon) {
        themeIcon.innerHTML = isDark ? '&#9790;' : '&#9788;';
      }
      if (themeLabel) {
        themeLabel.textContent = isDark ? 'Dark' : 'Light';
      }
    }
  }

  // -------------------------------------------------------------------------
  // 2. Active Section Highlighting in Navigation
  // -------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
              link.style.color = 'var(--cyan-neon)';
            } else {
              link.classList.remove('active');
              link.style.color = '';
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // -------------------------------------------------------------------------
  // 3. Contact Form Submission Simulation
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');
      const submitBtn = contactForm.querySelector('.btn-submit');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        alert('Please fill out all required fields.');
        return;
      }

      // Show temporary sending status
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Transmitting Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent Successfully!';
        submitBtn.style.background = 'var(--emerald-neon)';
        submitBtn.style.color = '#000';

        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 900);
    });
  }

  // -------------------------------------------------------------------------
  // 4. Subtle Pixel Mouse Follow Effect on Hero Pixel Window
  // -------------------------------------------------------------------------
  const pixelWrapper = document.querySelector('.pixel-window-wrapper');
  if (pixelWrapper && window.matchMedia('(pointer: fine)').matches) {
    pixelWrapper.addEventListener('mousemove', (e) => {
      const rect = pixelWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 8;
      const rotateY = (x / rect.width) * 8;
      pixelWrapper.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    pixelWrapper.addEventListener('mouseleave', () => {
      pixelWrapper.style.transform = '';
    });
  }
});
