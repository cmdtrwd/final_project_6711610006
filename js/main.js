document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    const newCursor = document.createElement('div');
    newCursor.classList.add('custom-cursor');
    document.body.appendChild(newCursor);
  }
  const realCursor = document.querySelector('.custom-cursor');

  document.addEventListener('mousemove', (e) => {
    if(realCursor) {
      realCursor.style.left = e.clientX + 'px';
      realCursor.style.top = e.clientY + 'px';
    }
  });

  const interactiveElements = document.querySelectorAll('a, .btn-outline, .hamburger, .survival-card, img, .close-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if(realCursor) realCursor.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      if(realCursor) realCursor.classList.remove('hovering');
    });
  });

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Survival Guide Modal
  const cards = document.querySelectorAll('.survival-card');
  const modal = document.querySelector('.modal');
  const modalContent = document.querySelector('.modal-content-details');
  const modalTitle = document.querySelector('.modal h3');
  const closeBtn = document.querySelector('.close-btn');

  if (cards.length > 0 && modal) {
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('h3').innerText;
        const details = card.getAttribute('data-details');
        
        modalTitle.innerText = title;
        modalContent.innerHTML = `<p>${details}</p>`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
