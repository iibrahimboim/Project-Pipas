document.addEventListener('DOMContentLoaded', () => {
  // Collect facility images for lightbox
  const imgSrcs = {};
  document.querySelectorAll('.facility-card').forEach((card, i) => {
    imgSrcs['img' + (i + 1)] = card.querySelector('img').src;
  });
  window._imgSrcs = imgSrcs;

  // Scroll reveal
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  // Counter
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.target;
      let n = 0, step = target / 50;
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = Math.floor(n) + '+';
        if (n >= target) clearInterval(t);
      }, 28);
      co.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => co.observe(el));

  // Nav shrink
  window.addEventListener('scroll', () => {
    document.querySelector('nav').style.padding =
      scrollY > 50 ? '11px 6vw' : '18px 6vw';
  });
});

function openLightbox(key) {
  document.getElementById('lightbox-img').src = window._imgSrcs[key];
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
function switchTab(i) {
  document.querySelectorAll('.room-tab').forEach((t, j) => t.classList.toggle('active', i === j));
  document.querySelectorAll('.tab-content').forEach((c, j) => c.classList.toggle('active', i === j));
}