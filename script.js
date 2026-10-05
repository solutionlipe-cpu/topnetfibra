
const progress = document.getElementById('progress');
const menu = document.getElementById('menu');
const nav = document.querySelector('.nav');
const links = document.querySelectorAll('#links a');

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = `${p}%`;
});

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open ? 'true' : 'false');
});
links.forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const countEl = document.querySelector('[data-count]');
let counted = false;
if(countEl){
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !counted){
        counted = true;
        const target = Number(countEl.dataset.count || 20);
        let current = 0;
        const step = () => {
          current += 1;
          countEl.textContent = current;
          if(current < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
  }, {threshold:.5});
  counterObserver.observe(countEl);
}

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = 'Solicitação preparada. Conecte aqui o WhatsApp ou formulário oficial da Topnet.';
});

// Parallax suave no visual principal
const heroArt = document.querySelector('.hero-art');
const globe = document.querySelector('.globe-card');
if(heroArt && globe && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  heroArt.addEventListener('pointermove', (e) => {
    const r = heroArt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    globe.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
  });
  heroArt.addEventListener('pointerleave', () => {
    globe.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
  });
}

// Leve tilt nos cards em telas com ponteiro preciso
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.process-card,.city-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width-.5;
      const y = (e.clientY-r.top)/r.height-.5;
      const lift = card.classList.contains('city-card') ? -9 : -10;
      card.style.transform = `translateY(${lift}px) perspective(900px) rotateY(${x*4}deg) rotateX(${-y*4}deg) scale(1.012)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}
