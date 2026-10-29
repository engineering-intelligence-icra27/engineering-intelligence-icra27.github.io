'use strict';
document.documentElement.classList.add('js-enabled');

// Progressive enhancement: the content, profile links, and panel questions
// remain accessible without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 850) closeMenu();
});

// The loop is an illustrative research framing, not a simulation.
const stageCaptions = {
  design: 'Geometry, materials, and constraints—optimized together.',
  build: 'Process plans, toolpaths, and fabrication—informing the design.',
  operate: 'Grasping, assembly, and inspection—feeding physical evidence back.'
};
document.querySelectorAll('[data-stage]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-stage]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('.geometry-caption').textContent = stageCaptions[button.dataset.stage];
  });
});

document.querySelectorAll('[data-program]').forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.dataset.program;
    document.querySelectorAll('[data-program]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-session]').forEach(block => {
      block.hidden = selected !== 'all' && block.dataset.session !== selected;
    });
    document.querySelector('.program-grid').classList.toggle('filtered', selected !== 'all');
  });
});

// Native dialogs provide keyboard focus containment and Escape dismissal.
const openers = new WeakMap();
document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialog);
    if (!dialog) return;
    openers.set(dialog, button);
    dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.querySelector('.dialog-close').focus();
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    openers.get(dialog)?.focus();
  });
});

// Stable card layout if a profile site temporarily fails to serve a portrait.
document.querySelectorAll('.portrait img').forEach(img => {
  const onFailure = () => {
    img.classList.add('failed');
    img.parentElement.setAttribute('role', 'img');
    img.parentElement.setAttribute('aria-label', `${img.alt} — portrait temporarily unavailable`);
  };
  img.addEventListener('error', onFailure);
  if (img.complete && img.naturalWidth === 0) onFailure();
});

if ('IntersectionObserver' in window) {
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
