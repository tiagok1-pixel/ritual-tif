'use strict';

/* ==========================================================
   RITUAL — datos y lógica del sitio (mockup, sin backend)

   >>> PARA CAMBIAR PRECIOS, TEXTOS O FOTOS, EDITÁ SOLO ESTA PRIMERA PARTE <<<
   ========================================================== */

// ---------- PRECIOS (por persona, en pesos) ----------
const PRICE_PP = 30000;   // compra puntual: $30.000 por persona  ($60.000 la caja de 2, $90.000 la de 3)
const SUB_PP = 27000;     // suscripción: $27.000 por persona por envío ($54.000 / $81.000)
const SIZES = [2, 3];     // tamaños de caja disponibles (personas)
const MAX_QTY = 10;       // máximo de cajas iguales en el carrito

// ---------- EJES ----------
const EJES = [
  { id: 'saborea', name: 'Saboreá', tagline: 'Cocinen y preparen juntos: la comida es el plan.' },
  { id: 'crea',    name: 'Creá',    tagline: 'Hacé con las manos y llevate el resultado.' },
  { id: 'pausa',   name: 'Pausá',   tagline: 'Frená el ritmo del día y compartí un momento de cuidado.' }
];

// ---------- KITS ----------
// img: ruta de la foto. Hoy son ilustraciones provisorias (.svg). Para usar una foto real,
// subila a /assets y cambiá la ruta (ej.: 'assets/kit-noche-italiana.jpg'). Ver README.
const KITS = [
  {
    id: 'noche-italiana', eje: 'saborea', name: 'Noche italiana',
    phrase: 'Una cena de pastas que se vuelve plan compartido.',
    desc: 'Convierte la preparación de una cena de pastas en un plan compartido: cocinan juntos y la comida es el plan.',
    items: ['fettuccini Don Vicente', 'salsa filetto', 'saborizador de albahaca y ajo', 'grisines', 'queso', 'aceite Laur de 30 ml', 'bocadito Cachafaz', 'delantal y cofia'],
    keep: 'delantal y cofia',
    img: 'assets/kit-noche-italiana.svg'
  },
  {
    id: 'mocktail-bar', eje: 'saborea', name: 'Mocktail bar',
    phrase: 'Preparen y prueben tragos sin alcohol.',
    desc: 'Preparar y probar tragos sin alcohol, con todo lo necesario y un recetario para guiarse.',
    items: ['copón', 'tónica', 'gaseosa de pomelo', 'ginger ale', 'jugos Baggio', 'jugo de limón', 'mix de cítricos deshidratados', 'sorbete de acero', 'cuchara de bar', 'jigger', 'recetario de tragos sin alcohol'],
    keep: 'copón, cuchara de bar y jigger',
    img: 'assets/kit-mocktail-bar.svg'
  },
  {
    id: 'aroma-y-luz', eje: 'crea', name: 'Aroma & Luz',
    phrase: 'Cada uno hace y personaliza su propia vela.',
    desc: 'Cada participante hace y personaliza su propia vela.',
    items: ['vaso Tennessee con tapa de pino', 'cera de soja', 'pabilo', 'centrador', 'esencia de 15 cc (44 aromas a elección)', 'pétalos y lavanda', 'pigmento', 'etiqueta para personalizar', 'fósforos'],
    keep: 'la vela en su vaso con tapa',
    img: 'assets/kit-aroma-y-luz.svg'
  },
  {
    id: 'pinta-el-momento', eje: 'crea', name: 'Pintá el momento',
    phrase: 'Una actividad artística sobre bastidor.',
    desc: 'Una actividad artística sobre bastidor, con todo lo necesario para pintar.',
    items: ['bastidor de 20 x 20 cm', 'atril de madera', 'set de 6 pinceles', 'paleta', '5 acrílicos', 'lápiz para el boceto'],
    keep: 'el bastidor pintado y el atril',
    img: 'assets/kit-pinta-el-momento.svg'
  },
  {
    id: 'skin-and-body-care', eje: 'pausa', name: 'Skin & Body Care',
    phrase: 'Autocuidado y relajación para compartir.',
    desc: 'Un momento de autocuidado y relajación para compartir.',
    items: ['3 mascarillas Mely (rosa, lavanda y arándano)', 'parches de ojos y de labios', 'crema de manos Hinds', 'vincha', 'antifaz de gel', 'velitas'],
    keep: 'vincha y antifaz',
    img: 'assets/kit-skin-and-body-care.svg'
  },
  {
    id: 'reset-sensorial', eje: 'pausa', name: 'Reset sensorial',
    phrase: 'Ordená tus pensamientos escribiendo, con té.',
    desc: 'Ordená tus pensamientos a través de la escritura, con té. Cada participante tiene su cuaderno y su tarjeta de consignas.',
    items: ['cuaderno A5', 'birome', 'microfibras', 'cinta washi', 'señalador', 'notas adhesivas', 'posa saquito', 'saquito de té', 'tarjeta de consignas', 'velitas'],
    keep: 'el cuaderno',
    img: 'assets/kit-reset-sensorial.svg'
  }
];

// ---------- SUSCRIPCIONES ----------
const SUBS = [
  { id: 'linea', name: 'Suscripción por Línea', desc: 'Elegís un eje y cada mes recibís una experiencia de ese eje.', showEjes: true },
  { id: 'sorpresa', name: 'Suscripción Sorpresa', desc: 'Cada mes, una experiencia de cualquiera de los tres ejes.', showEjes: false }
];

/* ==========================================================
   A partir de acá es la lógica. No hace falta tocar nada.
   ========================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const money = n => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const kitById = id => KITS.find(k => k.id === id);
const ejeById = id => EJES.find(e => e.id === id);
const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const kitAlt = k => `Caja del kit ${k.name} (imagen ilustrativa)`;

/* ---------- Render: experiencias ---------- */
function kitCard(k) {
  return `
  <article class="kit-card">
    <div class="kit-card__img"><img src="${k.img}" alt="${kitAlt(k)}" width="800" height="800" loading="lazy" decoding="async"></div>
    <div class="kit-card__body">
      <h4 class="kit-card__name">${k.name}</h4>
      <p class="kit-card__phrase">${k.phrase}</p>
      <p class="kit-card__price">desde <strong>${money(PRICE_PP)}</strong> por persona</p>
      <button class="btn btn--primary btn--block" type="button" data-kit="${k.id}">Ver kit<span class="sr-only"> ${k.name}</span></button>
    </div>
  </article>`;
}

function renderEjes() {
  $('#ejes-grid').innerHTML = EJES.map(e => `
    <div class="eje reveal">
      <header class="eje__head">
        <span class="eje__icon">${icon(e.id)}</span>
        <div><h3>${e.name}</h3><p>${e.tagline}</p></div>
      </header>
      <div class="eje__cards">${KITS.filter(k => k.eje === e.id).map(kitCard).join('')}</div>
    </div>`).join('');
}

/* ---------- Render: suscripciones ---------- */
function renderSubs() {
  $('#sub-cards').innerHTML = SUBS.map(s => `
    <article class="sub-card">
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      ${s.showEjes ? `<div class="sub-card__chips" aria-label="Ejes disponibles">${EJES.map(e => `<span class="chip">${icon(e.id)}${e.name}</span>`).join('')}</div>` : ''}
      <p class="sub-card__surprise">${icon('sparkle', 'icon--fill')} El kit de cada mes es sorpresa hasta que llega.</p>
      <div class="sub-card__price">
        <strong>${money(SUB_PP)}</strong> <span>por persona por envío</span>
        <p class="sub-card__badge">10% menos que la compra puntual</p>
      </div>
      <div class="sub-card__sizes">
        <p><span>Caja de 2 personas</span><strong>${money(SUB_PP * 2)}</strong></p>
        <p><span>Caja de 3 personas</span><strong>${money(SUB_PP * 3)}</strong></p>
      </div>
      <button class="btn btn--primary btn--block" type="button" data-demo>Quiero suscribirme</button>
    </article>`).join('');
}

/* ---------- Diálogos ---------- */
function openDialog(dlg) {
  if (!dlg.open) dlg.showModal();
  document.documentElement.classList.add('no-scroll');
}
$$('dialog').forEach(dlg => {
  dlg.addEventListener('close', () => {
    if (!$('dialog[open]')) document.documentElement.classList.remove('no-scroll');
  });
  // clic en el fondo oscuro = cerrar
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  $$('[data-close]', dlg).forEach(b => b.addEventListener('click', () => dlg.close()));
});

/* ---------- Modal de kit ---------- */
const kitModal = $('#kit-modal');
let currentKit = null;

function openKit(id) {
  const k = kitById(id);
  if (!k) return;
  currentKit = k;
  const e = ejeById(k.eje);
  const total = PRICE_PP * SIZES[0];
  $('#kit-modal-body').innerHTML = `
    <div class="kit-modal__media"><img src="${k.img}" alt="${kitAlt(k)}" width="800" height="800"></div>
    <div class="kit-modal__content">
      <p class="eyebrow">${icon(e.id)} ${e.name}</p>
      <h2 id="kit-title">${k.name}</h2>
      <p>${k.desc}</p>
      <h3>Qué trae la caja</h3>
      <ul class="checklist">${k.items.map(i => `<li>${icon('check')}<span>${cap(i)}</span></li>`).join('')}</ul>
      <p class="muted small">Los insumos de uso personal van uno por participante.</p>
      <p class="keep"><strong>Te quedás con:</strong> ${k.keep}.</p>
      <fieldset class="sizes">
        <legend>¿Para cuántos?</legend>
        <div class="sizes__opts">
          ${SIZES.map((n, i) => `<label class="size"><input type="radio" name="size" value="${n}" ${i === 0 ? 'checked' : ''}><span>${n} personas</span></label>`).join('')}
        </div>
      </fieldset>
      <p class="kit-modal__price" aria-live="polite"><strong id="kit-total">${money(total)}</strong><span id="kit-pp">${money(PRICE_PP)} por persona</span></p>
      <p class="note">¿Son más? Combiná cajas: 4 personas = dos cajas de 2; 5 personas = una de 2 + una de 3.</p>
      <button class="btn btn--primary btn--block" type="button" id="kit-add">Agregar al carrito</button>
      <button class="link-btn" type="button" id="kit-sub">O sumalo a tu suscripción</button>
    </div>`;

  $$('input[name="size"]', kitModal).forEach(r => r.addEventListener('change', () => {
    $('#kit-total').textContent = money(PRICE_PP * selectedSize());
  }));
  $('#kit-add').addEventListener('click', () => {
    addToCart(k.id, selectedSize());
    kitModal.close();
    openCart();
  });
  $('#kit-sub').addEventListener('click', () => {
    kitModal.close();
    $('#suscripcion').scrollIntoView({ behavior: 'smooth' });
  });
  kitModal.scrollTop = 0;
  openDialog(kitModal);
}
const selectedSize = () => Number(($('input[name="size"]:checked', kitModal) || {}).value) || SIZES[0];

/* ---------- Modal demo ---------- */
const demoModal = $('#demo-modal');
const openDemo = () => openDialog(demoModal);

/* ---------- Carrito ---------- */
const CART_KEY = 'ritual-cart-v1';
let cart = loadCart();

function loadCart() {
  try {
    const arr = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(arr)) return [];
    return arr
      .filter(i => i && kitById(i.id) && SIZES.includes(i.size) && Number.isInteger(i.qty) && i.qty > 0)
      .map(i => ({ id: i.id, size: i.size, qty: Math.min(i.qty, MAX_QTY) }));
  } catch (err) { return []; }
}
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (err) { /* sin almacenamiento: el carrito vive solo en esta visita */ }
}
const lineTotal = i => PRICE_PP * i.size * i.qty;
const subtotal = () => cart.reduce((s, i) => s + lineTotal(i), 0);
const countBoxes = () => cart.reduce((s, i) => s + i.qty, 0);

function addToCart(id, size) {
  const found = cart.find(i => i.id === id && i.size === size);
  if (found) found.qty = Math.min(found.qty + 1, MAX_QTY);
  else cart.push({ id, size, qty: 1 });
  saveCart(); renderCart(true);
}
function changeQty(id, size, delta) {
  const it = cart.find(i => i.id === id && i.size === size);
  if (!it) return;
  it.qty = Math.min(it.qty + delta, MAX_QTY);
  if (it.qty <= 0) cart = cart.filter(i => i !== it);
  saveCart(); renderCart();
}
function removeItem(id, size) {
  cart = cart.filter(i => !(i.id === id && i.size === size));
  saveCart(); renderCart();
}

const cartDrawer = $('#cart-drawer');
function showView(name) {
  $('#view-cart').hidden = name !== 'cart';
  $('#view-checkout').hidden = name !== 'checkout';
  $('#cart-title').textContent = name === 'cart' ? 'Tu carrito' : 'Checkout';
}
function openCart() { showView('cart'); renderCart(); openDialog(cartDrawer); }

function renderCart(bump = false) {
  const count = countBoxes();
  const badge = $('#cart-count');
  badge.textContent = count;
  badge.hidden = count === 0;
  $('#cart-open').setAttribute('aria-label', count ? `Abrir carrito, ${count} ${count === 1 ? 'caja' : 'cajas'}` : 'Abrir carrito');
  if (bump) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }

  const list = $('#cart-items');
  if (!cart.length) {
    list.innerHTML = `<div class="cart-empty">${icon('box')}<p>Tu carrito está vacío.</p><button class="btn btn--primary" type="button" data-close-go="experiencias">Ver experiencias</button></div>`;
    $('#cart-foot').hidden = true;
  } else {
    $('#cart-foot').hidden = false;
    list.innerHTML = cart.map(i => {
      const k = kitById(i.id);
      return `
      <div class="cart-item" data-id="${i.id}" data-size="${i.size}">
        <img src="${k.img}" alt="" width="76" height="76" loading="lazy">
        <div class="cart-item__info">
          <span class="cart-item__name">${k.name}</span>
          <span class="cart-item__meta">Caja de ${i.size} personas · ${money(PRICE_PP * i.size)} c/u</span>
          <div class="cart-item__bottom">
            <div class="qty" role="group" aria-label="Cantidad de ${k.name}, caja de ${i.size}">
              <button type="button" data-act="dec" aria-label="Quitar una">${icon('minus')}</button>
              <output aria-live="polite">${i.qty}</output>
              <button type="button" data-act="inc" aria-label="Sumar una" ${i.qty >= MAX_QTY ? 'disabled' : ''}>${icon('plus')}</button>
            </div>
            <span class="cart-item__price">${money(lineTotal(i))}</span>
            <button class="cart-item__remove" type="button" data-act="del" aria-label="Eliminar ${k.name} del carrito">${icon('trash')}</button>
          </div>
        </div>
      </div>`;
    }).join('');
  }
  $('#cart-subtotal').textContent = money(subtotal());
  $('#summary-subtotal').textContent = money(subtotal());
  $('#summary-items').innerHTML = cart.map(i => {
    const k = kitById(i.id);
    return `<li><span>${i.qty} × ${k.name} (${i.size} pers.)</span><strong>${money(lineTotal(i))}</strong></li>`;
  }).join('');
}

$('#cart-items').addEventListener('click', e => {
  const goBtn = e.target.closest('[data-close-go]');
  if (goBtn) {
    cartDrawer.close();
    $('#' + goBtn.dataset.closeGo).scrollIntoView({ behavior: 'smooth' });
    return;
  }
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const row = btn.closest('.cart-item');
  const id = row.dataset.id, size = Number(row.dataset.size);
  if (btn.dataset.act === 'inc') changeQty(id, size, 1);
  if (btn.dataset.act === 'dec') changeQty(id, size, -1);
  if (btn.dataset.act === 'del') removeItem(id, size);
});
$('#cart-open').addEventListener('click', openCart);
$('#go-checkout').addEventListener('click', () => { showView('checkout'); $('#pay-demo').focus(); });
$('#back-cart').addEventListener('click', () => { showView('cart'); $('#go-checkout').focus(); });
$('#pay-demo').addEventListener('click', openDemo);

/* ---------- Clics generales (Ver kit, suscripción demo, redes sin link) ---------- */
document.addEventListener('click', e => {
  const kitBtn = e.target.closest('[data-kit]');
  if (kitBtn) return openKit(kitBtn.dataset.kit);
  if (e.target.closest('[data-demo]')) return openDemo();
  const noop = e.target.closest('[data-noop]');
  if (noop) e.preventDefault();
});

/* ---------- Menú mobile ---------- */
const menuBtn = $('#menu-toggle');
const nav = $('#nav');
function setMenu(open) {
  nav.classList.toggle('is-open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  menuBtn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
}
menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });

/* ---------- Header: sombra al scrollear + link activo ---------- */
const header = $('#header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const navLinks = $$('[data-nav]');
if ('IntersectionObserver' in window) {
  const setActive = id => navLinks.forEach(a => {
    const on = a.getAttribute('href') === '#' + id;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
  }, { rootMargin: '-35% 0px -60% 0px' });
  navLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) io.observe(s); });
  // fuera de las secciones del menú (hero, Compartí, footer) no se marca ninguna
  const clear = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) setActive(''); });
  }, { rootMargin: '-35% 0px -60% 0px' });
  ['#inicio', '#comparti'].forEach(s => { const el = $(s); if (el) clear.observe(el); });
}

/* ---------- Aparición suave de bloques ---------- */
function setupReveal() {
  const els = $$('.reveal, .step, .sub-card, .benefits');
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => { el.classList.add('reveal'); io.observe(el); });
}

/* ---------- Inicio ---------- */
renderEjes();
renderSubs();
renderCart();
setupReveal();
