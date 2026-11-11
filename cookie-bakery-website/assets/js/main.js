// Cookie Bakery interactions
const menu = document.getElementById('nav-menu');
const openMenu = document.getElementById('nav-toggle');
const closeMenu = document.getElementById('nav-close');

openMenu?.addEventListener('click', () => menu.classList.add('show-menu'));
closeMenu?.addEventListener('click', () => menu.classList.remove('show-menu'));
document.querySelectorAll('.nav__link, .nav__menu .button').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('show-menu'));
});

// Active navigation link while scrolling
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav__link')];
const updateActiveLink = () => {
  const current = window.scrollY + 130;
  let active = 'home';
  sections.forEach(section => {
    if (current >= section.offsetTop) active = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active-link', link.getAttribute('href') === `#${active}`);
  });
};
window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// Simple cart demo: count items and show confirmation
let cartCount = 0;
const countElement = document.getElementById('cart-count');
const toast = document.getElementById('toast');
let toastTimer;
document.querySelectorAll('[data-name][data-price]').forEach(button => {
  button.addEventListener('click', () => {
    cartCount += 1;
    countElement.textContent = cartCount;
    const name = button.dataset.name;
    toast.querySelector('span').textContent = `${name} added to your bag`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  });
});

// Contact form opens the visitor's email app (replace the address with yours).
document.getElementById('contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('name');
  const email = form.get('email');
  const message = form.get('message');
  const subject = encodeURIComponent(`Cookie Bakery enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:hello@cookiebakery.com?subject=${subject}&body=${body}`;
  document.getElementById('form-status').textContent = 'Your email app should open with your message ready to send.';
});

document.getElementById('year').textContent = new Date().getFullYear();

// Lightweight scroll reveal
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}
