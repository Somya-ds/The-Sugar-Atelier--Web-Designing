// ---------- Sticky header ----------
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ---------- Mobile nav ----------
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close nav when clicking a link (mobile)
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  })
);

// ---------- Hero slider ----------
const heroSlides = [...document.querySelectorAll('.hero__slide')];
const dotsWrap = document.getElementById('heroDots');
let current = 0;
let timer;

function goTo(i) {
  heroSlides[current].classList.remove('is-active');
  dotsWrap.children[current]?.classList.remove('active');
  current = i;
  heroSlides[current].classList.add('is-active');
  dotsWrap.children[current]?.classList.add('active');
}

function next() {
  goTo((current + 1) % heroSlides.length);
}

function startSlider() {
  timer = setInterval(next, 6000);
}

function buildDots() {
  heroSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      startSlider();
    });
    dotsWrap.appendChild(dot);
  });
}

if (heroSlides.length > 1) {
  buildDots();
  goTo(0);
  startSlider();
}

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ---------- Newsletter dummy handler ----------
const newsletterForm = document.getElementById('newsletterForm');
const msg = document.getElementById('newsletterMsg');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value.trim();
    msg.textContent = `Thanks! We'll keep you posted at ${email}.`;
    newsletterForm.reset();
  });
}

// ---------- Year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Testimonial Slider ----------
const testimonialSlides = [...document.querySelectorAll('.testimonial__slide')];
const testimonialDotsWrap = document.getElementById('testimonialDots');
let testimonialCurrent = 0;
let testimonialTimer;

function goToTestimonial(i) {
  testimonialSlides[testimonialCurrent].classList.remove('is-active');
  testimonialDotsWrap?.children[testimonialCurrent]?.classList.remove('active');
  testimonialCurrent = i;
  testimonialSlides[testimonialCurrent].classList.add('is-active');
  testimonialDotsWrap?.children[testimonialCurrent]?.classList.add('active');
}

function nextTestimonial() {
  goToTestimonial((testimonialCurrent + 1) % testimonialSlides.length);
}

function startTestimonialSlider() {
  testimonialTimer = setInterval(nextTestimonial, 5000);
}

function buildTestimonialDots() {
  if (!testimonialDotsWrap) return;
  testimonialSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => {
      clearInterval(testimonialTimer);
      goToTestimonial(i);
      startTestimonialSlider();
    });
    testimonialDotsWrap.appendChild(dot);
  });
}

if (testimonialSlides.length > 1) {
  buildTestimonialDots();
  goToTestimonial(0);
  startTestimonialSlider();
}
