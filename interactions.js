/* =============================================
   SBI — interactions.js
   Mouse effects · Scroll animations · UI polish
   ============================================= */

// Mark document as JS-enabled so CSS can safely hide .reveal sections
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. CUSTOM CURSOR GLOW ─────────────────────── */
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  document.body.appendChild(glow);

  let mx = -200, my = -200, gx = -200, gy = -200;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // Smooth follow with lerp — use left/top so CSS translate(-50%,-50%) centres the glow
  (function animateCursor() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.left = `${gx}px`;
    glow.style.top  = `${gy}px`;
    requestAnimationFrame(animateCursor);
  })();

  // Grow on clickable elements
  document.querySelectorAll('a, button, .coffee-1, .services-1, .blog-1').forEach(el => {
    el.addEventListener('mouseenter', () => glow.classList.add('cursor-big'));
    el.addEventListener('mouseleave', () => glow.classList.remove('cursor-big'));
  });


  /* ── 2. HERO PARALLAX ON MOUSE MOVE ───────────────*/
  const header = document.querySelector('.header');
  if (header) {
    document.addEventListener('mousemove', e => {
      const xPct = (e.clientX / window.innerWidth  - 0.5) * 18;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 10;
      header.style.backgroundPosition = `calc(50% + ${xPct}px) calc(50% + ${yPct}px)`;
    });
  }


  /* ── 3. 3-D CARD TILT ──────────────────────────── */
  document.querySelectorAll('.coffee-1, .blog-1').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const x   = e.clientX - r.left;
      const y   = e.clientY - r.top;
      const cx  = r.width  / 2;
      const cy  = r.height / 2;
      const rotX = ((y - cy) / cy) * -8;
      const rotY = ((x - cx) / cx) *  8;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ── 4. SCROLL PROGRESS BAR ────────────────────── */
  const bar = document.getElementById('progress-bar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total    = document.body.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
    });
  }


  /* ── 5. BACK-TO-TOP BUTTON ─────────────────────── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ── 6. SCROLL-REVEAL (IntersectionObserver) ───── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // delay stagger for sibling cards
        entry.target.querySelectorAll('.coffee-1, .services-1, .blog-1, .stat-item').forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
          child.classList.add('visible');
        });
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* ── 7. BUTTON RIPPLE ──────────────────────────── */
  document.querySelectorAll('.btn-1').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect   = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top  = `${e.clientY - rect.top}px`;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });


  /* ── 8. ANIMATED STATS COUNTER ─────────────────── */
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let   start  = 0;
        const step   = Math.ceil(target / 60);
        const tick   = () => {
          start = Math.min(start + step, target);
          el.textContent = start.toLocaleString();
          if (start < target) requestAnimationFrame(tick);
        };
        tick();
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObserver.observe(c));
  }


  /* ── 9. NAV ACTIVE HIGHLIGHT ───────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('nav-active');
  });

});
