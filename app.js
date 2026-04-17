/* ====================================================
   StudioLens — app.js
   Integração com Google Sheets (planilha publicada)
   ==================================================== */

// ──────────────────────────────────────────────────
// CONFIGURAÇÃO — edite aqui com seus dados
// ──────────────────────────────────────────────────
const CONFIG = {
  /*
    Para conectar sua planilha do Google Sheets:
    1. Abra a planilha no Google Drive
    2. Vá em Arquivo → Compartilhar → Publicar na web
    3. Selecione a aba e escolha "CSV"
    4. Copie a URL gerada e cole em SHEET_CSV_URL abaixo

    A planilha deve ter as colunas:
    categoria | url_foto | titulo | descricao

    Exemplo de linha:
    casamento | https://i.imgur.com/xyzabc.jpg | Casamento Silva | Igreja da Consolação
  */
  SHEET_CSV_URL: 'SUA_PLANILHA_CSV_URL_AQUI',

  /*
    Dados de demonstração (usados enquanto a planilha não é configurada).
    Cada objeto: { categoria, url, titulo, descricao }
  */
  DEMO_PHOTOS: [
    // Casamentos
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed1/600/600', titulo: 'Casamento ao pôr do sol', descricao: 'Igreja histórica, 2024' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed2/600/600', titulo: 'Troca de alianças', descricao: 'Jardim botânico' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed3/600/600', titulo: 'Primeira dança', descricao: 'Fazenda Santa Luzia' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed4/600/600', titulo: 'Buquê de noiva', descricao: 'Detalhe floral' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed5/600/600', titulo: 'Cerimônia ao ar livre', descricao: '' },
    { categoria: 'casamento', url: 'https://picsum.photos/seed/wed6/600/600', titulo: 'Festa na recepção', descricao: '' },
    // Festas infantis
    { categoria: 'infantil', url: 'https://picsum.photos/seed/kid1/600/600', titulo: 'Parabéns pequenina', descricao: '1 aninho' },
    { categoria: 'infantil', url: 'https://picsum.photos/seed/kid2/600/600', titulo: 'Hora do bolo', descricao: '' },
    { categoria: 'infantil', url: 'https://picsum.photos/seed/kid3/600/600', titulo: 'Decoração temática', descricao: '' },
    { categoria: 'infantil', url: 'https://picsum.photos/seed/kid4/600/600', titulo: 'Brincadeiras', descricao: '' },
    // 15 anos
    { categoria: 'debutante', url: 'https://picsum.photos/seed/deb1/600/600', titulo: 'Valsa dos sonhos', descricao: '' },
    { categoria: 'debutante', url: 'https://picsum.photos/seed/deb2/600/600', titulo: 'Sessão ao ar livre', descricao: '' },
    { categoria: 'debutante', url: 'https://picsum.photos/seed/deb3/600/600', titulo: 'Detalhes do vestido', descricao: '' },
    { categoria: 'debutante', url: 'https://picsum.photos/seed/deb4/600/600', titulo: 'Coroação', descricao: '' },
    // Aniversários
    { categoria: 'aniversario', url: 'https://picsum.photos/seed/ani1/600/600', titulo: '50 anos com estilo', descricao: '' },
    { categoria: 'aniversario', url: 'https://picsum.photos/seed/ani2/600/600', titulo: 'Família reunida', descricao: '' },
    { categoria: 'aniversario', url: 'https://picsum.photos/seed/ani3/600/600', titulo: 'Bolo comemorativo', descricao: '' },
    // Pré-Wedd
    { categoria: 'prewedd', url: 'https://picsum.photos/seed/pre1/600/600', titulo: 'Amor no campo', descricao: '' },
    { categoria: 'prewedd', url: 'https://picsum.photos/seed/pre2/600/600', titulo: 'Pôr do sol a dois', descricao: '' },
    { categoria: 'prewedd', url: 'https://picsum.photos/seed/pre3/600/600', titulo: 'Sessão urbana', descricao: '' },
    { categoria: 'prewedd', url: 'https://picsum.photos/seed/pre4/600/600', titulo: 'Entre flores', descricao: '' },
    // Corporativo
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

// ──────────────────────────────────────────────────
// ESTADO GLOBAL
// ──────────────────────────────────────────────────
let allPhotos = [];
let lightboxPhotos = [];
let lbIndex = 0;

// ──────────────────────────────────────────────────
// CARREGAR FOTOS
// ──────────────────────────────────────────────────
async function loadPhotos() {
  if (CONFIG.SHEET_CSV_URL === 'SUA_PLANILHA_CSV_URL_AQUI') {
    allPhotos = CONFIG.DEMO_PHOTOS;
    return;
  }
  try {
    const res = await fetch(CONFIG.SHEET_CSV_URL);
    const text = await res.text();
    const rows = text.trim().split('\n').slice(1); // pula cabeçalho
    allPhotos = rows.map(row => {
      const cols = row.split(',');
      return {
        categoria: (cols[0] || '').trim().toLowerCase(),
        url:       (cols[1] || '').trim(),
        titulo:    (cols[2] || '').trim(),
        descricao: (cols[3] || '').trim(),
      };
    }).filter(p => p.url);
  } catch (e) {
    console.warn('Planilha não disponível, usando dados demo.', e);
    allPhotos = CONFIG.DEMO_PHOTOS;
  }
}

// ──────────────────────────────────────────────────
// ABRIR CATÁLOGO
// ──────────────────────────────────────────────────
async function openCatalog(category) {
  const meta = CATALOG_META[category] || { label: category, desc: '' };
  document.getElementById('modalTitle').textContent = meta.label;
  document.getElementById('modalDesc').textContent = meta.desc;
  document.getElementById('modalLoading').style.display = 'flex';
  document.getElementById('modalGrid').innerHTML = '';
  document.getElementById('modalEmpty').style.display = 'none';
  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';

  if (allPhotos.length === 0) await loadPhotos();

  const photos = allPhotos.filter(p => p.categoria === category);
  document.getElementById('modalLoading').style.display = 'none';

  if (photos.length === 0) {
    document.getElementById('modalEmpty').style.display = 'block';
    return;
  }

  lightboxPhotos = photos;
  const grid = document.getElementById('modalGrid');
  photos.forEach((photo, idx) => {
    const div = document.createElement('div');
    div.className = 'modal-photo';
    div.innerHTML = `<img src="${photo.url}" alt="${photo.titulo || ''}" loading="lazy" />`;
    div.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(div);
  });
}

// ──────────────────────────────────────────────────
// FECHAR MODAL
// ──────────────────────────────────────────────────
function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  closeLightbox();
}

// ──────────────────────────────────────────────────
// LIGHTBOX
// ──────────────────────────────────────────────────
function openLightbox(idx) {
  lbIndex = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
function updateLightbox() {
  const p = lightboxPhotos[lbIndex];
  document.getElementById('lbImg').src = p.url;
  document.getElementById('lbImg').alt = p.titulo || '';
  document.getElementById('lbCaption').textContent = [p.titulo, p.descricao].filter(Boolean).join(' — ');
}
function lbMove(dir) {
  lbIndex = (lbIndex + dir + lightboxPhotos.length) % lightboxPhotos.length;
  updateLightbox();
}

// ──────────────────────────────────────────────────
// NAVEGAÇÃO
// ──────────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Fecha menu mobile ao clicar num link
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  // Active link on scroll
  const sections = ['home', 'catalogos', 'sobre', 'contato'];
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  });
}

// ──────────────────────────────────────────────────
// FORMULÁRIO DE CONTATO (envia via WhatsApp ou mailto)
// ──────────────────────────────────────────────────
function initForm() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome    = document.getElementById('nome').value.trim();
    const tel     = document.getElementById('tel').value.trim();
    const evento  = document.getElementById('evento').value;
    const msg     = document.getElementById('mensagem').value.trim();

    const texto = `Olá! Me chamo *${nome}*.\nTelefone: ${tel || 'não informado'}\nEvento: ${evento || 'não informado'}\nMensagem: ${msg}`;
    const url = `https://wa.me/5511999999999?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');

    document.getElementById('formSuccess').classList.add('show');
    setTimeout(() => document.getElementById('formSuccess').classList.remove('show'), 5000);
    form.reset();
  });
}

// ──────────────────────────────────────────────────
// EVENTOS DO MODAL / LIGHTBOX
// ──────────────────────────────────────────────────
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
}

// ──────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initForm();
  initModalEvents();
  loadPhotos(); // pré-carrega em background
});

// Exporta para uso inline nos botões HTML
window.openCatalog = openCatalog;
