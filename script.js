// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.querySelectorAll('span').forEach(s => { s.style.transform = 'none'; s.style.opacity = '1'; });
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTDOWN TIMER =====
function startCountdown() {
  // Set sale end to 3 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3);
  endDate.setHours(0, 0, 0, 0);

  function update() {
    const now = new Date();
    const diff = endDate - now;
    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    document.getElementById('timerDays').textContent = String(days).padStart(2, '0');
    document.getElementById('timerHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('timerMins').textContent = String(mins).padStart(2, '0');
    document.getElementById('timerSecs').textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}
startCountdown();

// ===== ADD TO CART (TOAST) =====
const productNames = {
  paint: 'Premium Interior Paint',
  steel: 'Fe-500D TMT Steel Bars',
  cement: 'OPC 53 Grade Cement',
  sanitary: 'Designer Wash Basin Set',
  electrical: 'Modular Switches Kit',
  tiles: 'Vitrified Floor Tiles'
};

function addToCart(product) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `✅ <strong>${productNames[product]}</strong> added to cart!`;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 3000);
}

// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('#name').value;
  const toast = document.getElementById('toast');
  toast.innerHTML = `🎉 Thank you, <strong>${name}</strong>! We'll contact you within 2 hours.`;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';
  form.reset();
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 4000);
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== PARALLAX ON HERO ORBS =====
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 15;
    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});
