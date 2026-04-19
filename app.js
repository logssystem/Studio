/* ====================================================
   Studio FK — app.js
   ==================================================== */

const CONFIG = {
  SHEET_CSV_URL: 'SUA_PLANILHA_CSV_URL_AQUI',

  /* ── Instagram: cole seu token de acesso aqui ──
     1. Acesse: https://developers.facebook.com
     2. Crie um app → adicione produto "Instagram Basic Display"
     3. Gere um token de longa duração e cole abaixo
     Se deixar vazio, a seção Instagram não aparece.
  */
  INSTAGRAM_TOKEN: '',
  INSTAGRAM_USER_ID: '',  /* seu user ID numérico do Instagram */

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

let allPhotos    = [];
let lightboxPhotos = [];
let lbIndex      = 0;

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
        initHeroReveal(); // dispara animação do hero depois do loader
      }, 400);
    }
    fill.style.width = progress + '%';
  }, 80);
}

/* ══════════════════════════════════════
   HERO — ANIMAÇÃO DE TEXTO (WORD REVEAL)
══════════════════════════════════════ */
function initHeroReveal() {
  // Quebra o título em spans por palavra para revelar uma a uma
  const title = document.querySelector('.hero-title');
  if (!title) return;

  // Pega o HTML existente e envolve cada palavra em span
  const wrapWords = (el) => {
    el.childNodes.forEach(node => {
      if (node.nodeType === 3) { // texto puro
        const words = node.textContent.split(/(\s+)/);
        const frag  = document.createDocumentFragment();
        words.forEach(w => {
          if (w.trim()) {
            const span = document.createElement('span');
            span.className = 'word-reveal';
            span.textContent = w;
            frag.appendChild(span);
          } else if (w) {
            frag.appendChild(document.createTextNode(w));
          }
        });
        node.replaceWith(frag);
      } else if (node.nodeName === 'EM') {
        wrapWords(node);
      }
    });
  };
  wrapWords(title);

  // Aplica delay escalonado em cada palavra
  const words = title.querySelectorAll('.word-reveal');
  words.forEach((w, i) => {
    w.style.transitionDelay = (i * 0.08) + 's';
  });

  // Anima o eyebrow e subtítulo também
  const eyebrow = document.querySelector('.hero-eyebrow');
  const sub     = document.querySelector('.hero-sub');
  const btn     = document.querySelector('.btn-hero');

  setTimeout(() => title.classList.add('revealed'), 50);
  if (eyebrow) { eyebrow.style.animationDelay = '0s'; eyebrow.classList.add('hero-anim'); }
  if (sub)     setTimeout(() => sub.classList.add('hero-anim'), words.length * 80 + 200);
  if (btn)     setTimeout(() => btn.classList.add('hero-anim'), words.length * 80 + 400);
}

/* ══════════════════════════════════════
   PARALLAX NO HERO
══════════════════════════════════════ */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;

  // Só roda em desktop (parallax em mobile causa layout shift)
  if (window.matchMedia('(hover: none)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        // Move o fundo a 40% da velocidade do scroll = efeito profundidade
        heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════
   BARRA DE PROGRESSO
══════════════════════════════════════ */
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
  }, { passive: true });
}

/* ══════════════════════════════════════
   WHATSAPP FLUTUANTE
══════════════════════════════════════ */
function initWaFloat() {
  const btn = document.getElementById('waFloat');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-section').forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════
   CONTADORES ANIMADOS
══════════════════════════════════════ */
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = target >= 100 ? '+' : (target === 6 ? '' : '+');
      let current  = 0;
      const timer  = setInterval(() => {
        current += Math.ceil(target / (1400 / 16));
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + suffix;
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.count-num[data-target]').forEach(c => obs.observe(c));
}

/* ══════════════════════════════════════
   NAV FIXO + HAMBURGER ANIMADO
══════════════════════════════════════ */
function initNav() {
  const nav       = document.getElementById('nav');
  const hero      = document.getElementById('home');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function updateNav() {
    const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
    nav.classList.toggle('scrolled', window.scrollY > heroBottom - 80);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // Hamburger → X animado
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fechar menu ao clicar num link
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', e => {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Link ativo por seção
  const sections = ['home', 'catalogos', 'como', 'faq', 'sobre', 'instagram', 'contato'];
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
    allPhotos = CONFIG.DEMO_PHOTOS; return;
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
  const photos   = [...shuffled, ...shuffled];
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
   INSTAGRAM — fotos reais via API
══════════════════════════════════════ */
async function loadInstagram() {
  const section = document.getElementById('instagram');
  if (!section) return;

  // Se não tem token configurado, esconde a seção
  if (!CONFIG.INSTAGRAM_TOKEN) {
    section.style.display = 'none';
    return;
  }

  const grid = document.getElementById('igGrid');
  try {
    const url = `https://graph.instagram.com/me/media?fields=id,media_type,thumbnail_url,media_url,permalink,caption&limit=12&access_token=${CONFIG.INSTAGRAM_TOKEN}`;
    const res  = await fetch(url);
    const data = await res.json();

    if (!data.data || data.error) throw new Error('Token inválido ou expirado');

    grid.innerHTML = '';
    data.data
      .filter(p => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM')
      .slice(0, 9)
      .forEach(post => {
        const a = document.createElement('a');
        a.href   = post.permalink;
        a.target = '_blank';
        a.rel    = 'noopener noreferrer';
        a.className = 'ig-item';
        const imgUrl = post.media_url || post.thumbnail_url;
        a.innerHTML  = `
          <img src="${imgUrl}" alt="${(post.caption || '').slice(0, 60)}" loading="lazy"/>
          <div class="ig-overlay">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </div>
        `;
        grid.appendChild(a);
      });
  } catch(e) {
    console.warn('Instagram não carregou:', e);
    section.style.display = 'none';
  }
}

/* ══════════════════════════════════════
   CATÁLOGO / MODAL
══════════════════════════════════════ */
async function openCatalog(category) {
  const meta = CATALOG_META[category] || { label: category, desc: '' };
  document.getElementById('modalTitle').textContent    = meta.label;
  document.getElementById('modalDesc').textContent     = meta.desc;
  document.getElementById('modalLoading').style.display = 'flex';
  document.getElementById('modalGrid').innerHTML       = '';
  document.getElementById('modalEmpty').style.display  = 'none';
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
   LIGHTBOX + SWIPE MOBILE
══════════════════════════════════════ */
function openLightbox(idx) {
  lbIndex = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
function updateLightbox() {
  const p = lightboxPhotos[lbIndex];
  const img = document.getElementById('lbImg');
  // Fade rápido na troca de foto
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = p.url;
    img.alt = p.titulo || '';
    img.style.opacity = '1';
  }, 150);
  document.getElementById('lbCaption').textContent = [p.titulo, p.descricao].filter(Boolean).join(' — ');
  document.getElementById('lbCounter').textContent = `${lbIndex + 1} / ${lightboxPhotos.length}`;
}
function lbMove(dir) {
  lbIndex = (lbIndex + dir + lightboxPhotos.length) % lightboxPhotos.length;
  updateLightbox();
}

function initSwipe() {
  const lb = document.getElementById('lightbox');
  let startX = 0, startY = 0;

  lb.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    // Só registra swipe horizontal maior que 50px e mais horizontal que vertical
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      lbMove(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
}

/* ══════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════ */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Fecha todos
      document.querySelectorAll('.faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-answer').style.maxHeight = '0';
      });
      // Abre o clicado (se estava fechado)
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });
}

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
      nome:     document.getElementById('nome').value.trim(),
      telefone: document.getElementById('tel').value.trim(),
      evento:   document.getElementById('evento').value,
      mensagem: document.getElementById('mensagem').value.trim(),
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
  document.getElementById('modalBackdrop').addEventListener('click', e => {
    if (e.target === document.getElementById('modalBackdrop')) closeModal();
  });
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
  initSwipe();
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  initLoader();
  initParallax();
  initProgressBar();
  initWaFloat();
  initNav();
  initScrollReveal();
  initCounters();
  initFaq();
  initForm();
  initModalEvents();
  await loadPhotos();
  buildPhotoStrip();
  loadInstagram();
});

window.openCatalog = openCatalog;
