/* ====================================================
   Studio FK — app.js
   ==================================================== */

const CONFIG = {
  SHEET_CSV_URL: 'SUA_PLANILHA_CSV_URL_AQUI',
  DEMO_PHOTOS: [
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed1/600/600', titulo: 'Casamento ao pôr do sol', descricao: 'Igreja histórica, 2024' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed2/600/600', titulo: 'Troca de alianças', descricao: 'Jardim botânico' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed3/600/600', titulo: 'Primeira dança', descricao: 'Fazenda Santa Luzia' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed4/600/600', titulo: 'Buquê de noiva', descricao: 'Detalhe floral' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed5/600/600', titulo: 'Cerimônia ao ar livre', descricao: '' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed6/600/600', titulo: 'Festa na recepção', descricao: '' },
    { categoria: 'infantil', url: 'https://picsum.photos/seed/kid1/600/600', titulo: 'Parabéns pequenina', descricao: '1 aninho' },
    { categoria: 'infantil', url: 'https://picsum.photos/seed/kid2/600/600', titulo: 'Hora do bolo', descricao: '' },
    { categoria: 'infantil', url: 'https://picsum.photos/seed/kid3/600/600', titulo: 'Decoração temática', descricao: '' },
    { categoria: 'infantil', url: 'https://picsum.photos/seed/kid4/600/600', titulo: 'Brincadeiras', descricao: '' },
    { categoria: 'debutante', url: 'https://picsum.photos/seed/deb1/600/600', titulo: 'Valsa dos sonhos', descricao: '' },
    { categoria: 'debutante', url: 'https://picsum.photos/seed/deb2/600/600', titulo: 'Sessão ao ar livre', descricao: '' },
    { categoria: 'debutante', url: 'https://picsum.photos/seed/deb3/600/600', titulo: 'Detalhes do vestido', descricao: '' },
    { categoria: 'debutante', url: 'https://picsum.photos/seed/deb4/600/600', titulo: 'Coroação', descricao: '' },
    { categoria: 'aniversario', url: 'https://picsum.photos/seed/ani1/600/600', titulo: '50 anos com estilo', descricao: '' },
    { categoria: 'aniversario', url: 'https://picsum.photos/seed/ani2/600/600', titulo: 'Família reunida', descricao: '' },
    { categoria: 'aniversario', url: 'https://picsum.photos/seed/ani3/600/600', titulo: 'Bolo comemorativo', descricao: '' },
    { categoria: 'prewedd', url: 'https://picsum.photos/seed/pre1/600/600', titulo: 'Amor no campo', descricao: '' },
    { categoria: 'prewedd', url: 'https://picsum.photos/seed/pre2/600/600', titulo: 'Pôr do sol a dois', descricao: '' },
    { categoria: 'prewedd', url: 'https://picsum.photos/seed/pre3/600/600', titulo: 'Sessão urbana', descricao: '' },
    { categoria: 'prewedd', url: 'https://picsum.photos/seed/pre4/600/600', titulo: 'Entre flores', descricao: '' },
    { categoria: 'corporativo', url: 'https://picsum.photos/seed/corp1/600/600', titulo: 'Evento empresarial', descricao: 'Congresso 2024' },
    { categoria: 'corporativo', url: 'https://picsum.photos/seed/corp2/600/600', titulo: 'Headshot executivo', descricao: '' },
    { categoria: 'corporativo', url: 'https://picsum.photos/seed/corp3/600/600', titulo: 'Fotografia de produto', descricao: '' },
    { categoria: 'corporativo', url: 'https://picsum.photos/seed/corp4/600/600', titulo: 'Equipe corporativa', descricao: '' },
    { categoria: 'corporativo', url: 'https://picsum.photos/seed/corp5/600/600', titulo: 'Lançamento de produto', descricao: '' },
    { categoria: 'corporativo', url: 'https://picsum.photos/seed/corp6/600/600', titulo: 'Workshop empresarial', descricao: '' },
  ],
};

const CATALOG_META = {
  casamento:   { label: 'Casamentos',    desc: 'Histórias de amor eternizadas' },
  infantil:    { label: 'Festa Infantil', desc: 'A magia da infância em cada clique' },
  debutante:   { label: '15 Anos',        desc: 'Um sonho que merece ser registrado' },
  aniversario: { label: 'Aniversários',  desc: 'Celebrações inesquecíveis' },
  prewedd:     { label: 'Pré-Wedd',      desc: 'O romance antes do grande dia' },
  corporativo: { label: 'Corporativo',   desc: 'Eventos, headshots e produtos profissionais' },
};

let allPhotos = [];
let lightboxPhotos = [];
let lbIndex = 0;

/* ══════════════════════════════════════
   LOADER
══════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  const fill   = document.getElementById('loaderFill');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
      }, 400);
    }
    fill.style.width = progress + '%';
  }, 80);
}

/* ══════════════════════════════════════
   CURSOR PERSONALIZADO
══════════════════════════════════════ */
function initCursor() {
  // Não ativa em dispositivos touch
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let cx = -100, cy = -100; // posição suavizada do anel
  let mx = -100, my = -100; // posição real do mouse

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  });

  // Anel segue com leve delay
  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover em links e botões
  const hoverTargets = 'a, button, .catalog-card, .strip-photo, .modal-photo';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Cursor claro sobre fundo escuro
  const darkSections = ['#home', '#como', '#contato', '#photoStrip', '.footer'];
  function updateCursorTheme() {
    const isOnDark = darkSections.some(sel => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return my >= rect.top && my <= rect.bottom;
    });
    document.body.classList.toggle('cursor-dark', isOnDark);
  }
  document.addEventListener('mousemove', updateCursorTheme);
}

/* ══════════════════════════════════════
   BARRA DE PROGRESSO
══════════════════════════════════════ */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const total  = document.body.scrollHeight - window.innerHeight;
    const pct    = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ══════════════════════════════════════
   WHATSAPP FLUTUANTE
══════════════════════════════════════ */
function initWaFloat() {
  const btn = document.getElementById('waFloat');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════
   CONTADORES ANIMADOS
══════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.count-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = target >= 100 ? '+' : (target === 6 ? '' : '+');
      const duration = 1400;
      const step   = Math.ceil(duration / target);
      let current  = 0;

      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / 16));
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + suffix;
      }, 16);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ══════════════════════════════════════
   NAV FIXO
══════════════════════════════════════ */
function initNav() {
  const nav  = document.getElementById('nav');
  const hero = document.getElementById('home');

  function updateNav() {
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
    nav.classList.toggle('scrolled', window.scrollY > heroBottom - 80);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // Hamburger
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

  // Link ativo
  const sections = ['home', 'catalogos', 'como', 'sobre', 'contato'];
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }, { passive: true });
}

/* ══════════════════════════════════════
   CARREGAR FOTOS
══════════════════════════════════════ */
async function loadPhotos() {
  if (CONFIG.SHEET_CSV_URL === 'SUA_PLANILHA_CSV_URL_AQUI') {
    allPhotos = CONFIG.DEMO_PHOTOS;
    return;
  }
  try {
    const res  = await fetch(CONFIG.SHEET_CSV_URL);
    const text = await res.text();
    const rows = text.trim().split('\n').slice(1);
    allPhotos  = rows.map(row => {
      const cols = row.split(',');
      return { categoria: (cols[0]||'').trim().toLowerCase(), url: (cols[1]||'').trim(), titulo: (cols[2]||'').trim(), descricao: (cols[3]||'').trim() };
    }).filter(p => p.url);
  } catch(e) {
    console.warn('Planilha indisponível, usando demo.', e);
    allPhotos = CONFIG.DEMO_PHOTOS;
  }
}

/* ══════════════════════════════════════
   FAIXA DE FOTOS
══════════════════════════════════════ */
function buildPhotoStrip() {
  const track = document.getElementById('stripTrack');
  if (!track || !allPhotos.length) return;

  const shuffled = [...allPhotos].sort(() => Math.random() - 0.5).slice(0, 16);
  const photos   = [...shuffled, ...shuffled]; // duplica para loop

  track.innerHTML = '';
  photos.forEach(photo => {
    const div = document.createElement('div');
    div.className = 'strip-photo';
    const meta = CATALOG_META[photo.categoria] || { label: photo.categoria };
    div.innerHTML = `<img src="${photo.url}" alt="${photo.titulo||''}" loading="lazy"/><span class="strip-photo-label">${meta.label}</span>`;
    div.addEventListener('click', () => openCatalog(photo.categoria));
    track.appendChild(div);
  });
}

/* ══════════════════════════════════════
   CATÁLOGO / MODAL
══════════════════════════════════════ */
async function openCatalog(category) {
  const meta = CATALOG_META[category] || { label: category, desc: '' };
  document.getElementById('modalTitle').textContent   = meta.label;
  document.getElementById('modalDesc').textContent    = meta.desc;
  document.getElementById('modalLoading').style.display = 'flex';
  document.getElementById('modalGrid').innerHTML      = '';
  document.getElementById('modalEmpty').style.display = 'none';
  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';

  if (!allPhotos.length) await loadPhotos();

  const photos = allPhotos.filter(p => p.categoria === category);
  document.getElementById('modalLoading').style.display = 'none';

  if (!photos.length) { document.getElementById('modalEmpty').style.display = 'block'; return; }

  lightboxPhotos = photos;
  const grid = document.getElementById('modalGrid');
  photos.forEach((photo, idx) => {
    const div = document.createElement('div');
    div.className = 'modal-photo';
    div.innerHTML = `<img src="${photo.url}" alt="${photo.titulo||''}" loading="lazy"/>`;
    div.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(div);
  });
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  closeLightbox();
}

/* ══════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════ */
function openLightbox(idx) { lbIndex = idx; updateLightbox(); document.getElementById('lightbox').classList.add('open'); }
function closeLightbox()   { document.getElementById('lightbox').classList.remove('open'); }
function updateLightbox() {
  const p = lightboxPhotos[lbIndex];
  document.getElementById('lbImg').src = p.url;
  document.getElementById('lbImg').alt = p.titulo||'';
  document.getElementById('lbCaption').textContent = [p.titulo, p.descricao].filter(Boolean).join(' — ');
}
function lbMove(dir) { lbIndex = (lbIndex + dir + lightboxPhotos.length) % lightboxPhotos.length; updateLightbox(); }

/* ══════════════════════════════════════
   FORMULÁRIO
══════════════════════════════════════ */
function initForm() {
  emailjs.init('EUrmzxrZQUwW8f1yv');
  const form = document.getElementById('contactForm');
  const btn  = form.querySelector('.btn-submit');

  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    emailjs.send('service_8k8xjye', 'template_1p3ifeb', {
      nome:      document.getElementById('nome').value.trim(),
      telefone:  document.getElementById('tel').value.trim(),
      evento:    document.getElementById('evento').value,
      mensagem:  document.getElementById('mensagem').value.trim(),
    }).then(() => {
      document.getElementById('formSuccess').classList.add('show');
      setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
      form.reset();
      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
    }).catch(err => {
      console.error(err);
      alert('Erro ao enviar. Tente pelo WhatsApp!');
      btn.textContent = 'Enviar mensagem';
      btn.disabled = false;
    });
  });
}

/* ══════════════════════════════════════
   EVENTOS MODAL / LIGHTBOX
══════════════════════════════════════ */
function initModalEvents() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', e => { if (e.target === document.getElementById('modalBackdrop')) closeModal(); });
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => lbMove(-1));
  document.getElementById('lbNext').addEventListener('click', () => lbMove(1));
  document.addEventListener('keydown', e => {
    if (document.getElementById('lightbox').classList.contains('open')) {
      if (e.key === 'ArrowLeft')  lbMove(-1);
      if (e.key === 'ArrowRight') lbMove(1);
      if (e.key === 'Escape')     closeLightbox();
    } else if (document.getElementById('modalBackdrop').classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
    }
  });
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  initLoader();
  initCursor();
  initProgressBar();
  initWaFloat();
  initNav();
  initScrollReveal();
  initCounters();
  initForm();
  initModalEvents();
  await loadPhotos();
  buildPhotoStrip();
});

window.openCatalog = openCatalog;
