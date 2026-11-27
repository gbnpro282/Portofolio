// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Project category filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selected = btn.getAttribute('data-filter');

    filterButtons.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    projectCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      if (selected === 'all' || category === selected) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});

// Artwork Lightbox Modal
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const zoomTriggers = document.querySelectorAll('.zoom-trigger');

function openLightbox(src, caption) {
  if (!lightbox || !lightboxImg || !lightboxCaption) return;
  lightboxImg.src = src;
  lightboxImg.alt = caption || 'Pratinjau karya';
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

zoomTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const src = trigger.getAttribute('data-img');
    const caption = trigger.getAttribute('data-caption');
    if (src) openLightbox(src, caption);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
    closeLightbox();
  }
});

// Copy to Clipboard + Toast Notification
const toast = document.getElementById('toast');
let toastTimeout;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const textToCopy = btn.getAttribute('data-copy');
    const label = btn.getAttribute('data-label') || 'Teks';
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast(`${label} disalin: ${textToCopy}`);
    } catch {
      showToast(`${label}: ${textToCopy}`);
    }
  });
});

// Active navigation highlight on scroll
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let currentId = '';
  const scrollPos = window.scrollY + 120;

  sections.forEach((sec) => {
    if (scrollPos >= sec.offsetTop) {
      currentId = sec.getAttribute('id');
    }
  });

  navItems.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
});
