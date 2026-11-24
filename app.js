/* =============================================
   FRESHMART — APP.JS
   ============================================= */

// ── Langflow API Config ──────────────────────
const API_KEY   = 'sk-ozFkXBewh938ch2M6wd1WKa10gBd0y60H0cLBiMzJjM';
const FLOW_URL  = 'http://127.0.0.1:7860/api/v1/run/2425ba8f-baaf-4402-b76a-66dfa05807ce';
let   sessionId = generateUUID();

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// ── Product Data ─────────────────────────────
const PRODUCTS = [
  { id:1,  name:'Apel Fuji',        emoji:'🍎', cat:'buah',    price:18000,  oldPrice:22000, unit:'500g',  rating:'4.8', badge:'sale' },
  { id:2,  name:'Mangga Harum Manis',emoji:'🥭', cat:'buah',    price:25000,  oldPrice:null,  unit:'1 kg',  rating:'4.9', badge:'hot' },
  { id:3,  name:'Semangka Merah',   emoji:'🍉', cat:'buah',    price:32000,  oldPrice:38000, unit:'1 buah',rating:'4.7', badge:'sale' },
  { id:4,  name:'Pisang Cavendish', emoji:'🍌', cat:'buah',    price:12000,  oldPrice:null,  unit:'1 sisir',rating:'4.6', badge:null  },
  { id:5,  name:'Bayam Hijau',      emoji:'🌿', cat:'sayur',   price:5000,   oldPrice:null,  unit:'1 ikat',rating:'4.5', badge:'new' },
  { id:6,  name:'Wortel Organik',   emoji:'🥕', cat:'sayur',   price:8000,   oldPrice:10000, unit:'500g',  rating:'4.7', badge:'sale'},
  { id:7,  name:'Brokoli Segar',    emoji:'🥦', cat:'sayur',   price:15000,  oldPrice:null,  unit:'1 pcs', rating:'4.8', badge:null  },
  { id:8,  name:'Tomat Cherry',     emoji:'🍅', cat:'sayur',   price:12000,  oldPrice:14000, unit:'250g',  rating:'4.6', badge:'sale'},
  { id:9,  name:'Daging Sapi Segar',emoji:'🥩', cat:'daging',  price:135000, oldPrice:150000,unit:'500g',  rating:'4.9', badge:'hot' },
  { id:10, name:'Ayam Kampung',     emoji:'🍗', cat:'daging',  price:45000,  oldPrice:null,  unit:'1 kg',  rating:'4.7', badge:null  },
  { id:11, name:'Ikan Salmon',      emoji:'🐟', cat:'daging',  price:85000,  oldPrice:95000, unit:'300g',  rating:'4.8', badge:'sale'},
  { id:12, name:'Udang Segar',      emoji:'🦐', cat:'daging',  price:60000,  oldPrice:null,  unit:'500g',  rating:'4.6', badge:'new' },
  { id:13, name:'Susu Full Cream',  emoji:'🥛', cat:'susu',    price:17500,  oldPrice:19500, unit:'1 liter',rating:'4.8',badge:'sale'},
  { id:14, name:'Telur Ayam',       emoji:'🥚', cat:'susu',    price:28000,  oldPrice:null,  unit:'1 tray',rating:'4.9', badge:'hot' },
  { id:15, name:'Keju Cheddar',     emoji:'🧀', cat:'susu',    price:35000,  oldPrice:40000, unit:'200g',  rating:'4.7', badge:'sale'},
  { id:16, name:'Yogurt Strawberry',emoji:'🍓', cat:'susu',    price:22000,  oldPrice:null,  unit:'250ml', rating:'4.6', badge:'new' },
  { id:17, name:'Chitato Sapi',     emoji:'🍿', cat:'snack',   price:9500,   oldPrice:11000, unit:'68g',   rating:'4.5', badge:'sale'},
  { id:18, name:'Oreo Original',    emoji:'🍪', cat:'snack',   price:8000,   oldPrice:null,  unit:'133g',  rating:'4.7', badge:null  },
  { id:19, name:'Kacang Atom',      emoji:'🥜', cat:'snack',   price:6000,   oldPrice:7000,  unit:'100g',  rating:'4.4', badge:'sale'},
  { id:20, name:'Wafer Tango',      emoji:'🍫', cat:'snack',   price:5500,   oldPrice:null,  unit:'130g',  rating:'4.5', badge:null  },
  { id:21, name:'Teh Botol Sosro',  emoji:'🧃', cat:'minuman', price:5000,   oldPrice:null,  unit:'330ml', rating:'4.8', badge:'hot' },
  { id:22, name:'Aqua Galon',       emoji:'💧', cat:'minuman', price:22000,  oldPrice:24000, unit:'19L',   rating:'4.9', badge:'sale'},
  { id:23, name:'Jus Jeruk Segar',  emoji:'🍊', cat:'minuman', price:12000,  oldPrice:null,  unit:'500ml', rating:'4.6', badge:'new' },
  { id:24, name:'Yakult',           emoji:'🥤', cat:'minuman', price:9000,   oldPrice:null,  unit:'5 pcs', rating:'4.7', badge:null  },
  { id:25, name:'Bawang Merah',     emoji:'🧅', cat:'bumbu',   price:12000,  oldPrice:15000, unit:'500g',  rating:'4.5', badge:'sale'},
  { id:26, name:'Cabai Merah',      emoji:'🌶️', cat:'bumbu',   price:35000,  oldPrice:null,  unit:'500g',  rating:'4.4', badge:'hot' },
  { id:27, name:'Kecap Manis ABC',  emoji:'🫙', cat:'bumbu',   price:14000,  oldPrice:16000, unit:'275ml', rating:'4.8', badge:'sale'},
  { id:28, name:'Garam Halus',      emoji:'🧂', cat:'bumbu',   price:4500,   oldPrice:null,  unit:'250g',  rating:'4.5', badge:null  },
];

// ── State ────────────────────────────────────
let cart      = [];
let activecat = 'all';
let searchQ   = '';
let sortMode  = 'default';

// ── Toast ────────────────────────────────────
function showToast(msg) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

// ── Render Products ──────────────────────────
function renderProducts() {
  const grid = document.getElementById('productGrid');
  let list = [...PRODUCTS];

  // Filter category
  if (activecat !== 'all') list = list.filter(p => p.cat === activecat);

  // Filter search
  if (searchQ) list = list.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()));

  // Sort
  if (sortMode === 'price-asc')  list.sort((a,b) => a.price - b.price);
  if (sortMode === 'price-desc') list.sort((a,b) => b.price - a.price);
  if (sortMode === 'name')       list.sort((a,b) => a.name.localeCompare(b.name));

  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--gray-500);">😔 Produk tidak ditemukan. Coba kata kunci lain.</div>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const badgeHtml = p.badge
      ? `<span class="product-badge ${p.badge === 'new' ? 'badge-new' : p.badge === 'sale' ? 'badge-sale' : ''}">${
          p.badge === 'hot' ? '🔥 HOT' : p.badge === 'new' ? '✨ BARU' : '🏷️ SALE'
        }</span>`
      : '';
    const oldPriceHtml = p.oldPrice
      ? `<span class="product-price-old">${formatRp(p.oldPrice)}</span>`
      : '';
    return `
      <div class="product-card" data-id="${p.id}">
        ${badgeHtml}
        <div class="product-img">${p.emoji}</div>
        <div class="product-info">
          <span class="product-category">${catLabel(p.cat)}</span>
          <div class="product-name">${p.name}</div>
          <div class="product-unit">${p.unit}</div>
          <div class="product-price-row">
            <span class="product-price">${formatRp(p.price)}</span>
            ${oldPriceHtml}
          </div>
          <div class="product-rating">⭐ ${p.rating}</div>
          <div class="product-actions">
            <button class="btn-add-cart" onclick="addToCart(${p.id})">🛒 Tambah</button>
            <button class="btn-wishlist" onclick="showToast('💚 Ditambahkan ke Wishlist!')">♡</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function catLabel(cat) {
  const map = { buah:'Buah-buahan', sayur:'Sayuran', daging:'Daging & Ikan', susu:'Susu & Telur', snack:'Snack', minuman:'Minuman', bumbu:'Bumbu & Rempah' };
  return map[cat] || cat;
}

function formatRp(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

// ── Cart Logic ───────────────────────────────
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`✅ ${product.name} ditambahkan ke keranjang`);
  // Animate badge
  const badge = document.getElementById('cartBadge');
  badge.style.transform = 'scale(1.4)';
  setTimeout(() => badge.style.transform = 'scale(1)', 200);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
  renderCartItems();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartBadge').textContent = total;
  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const footer    = document.getElementById('cartFooter');

  if (!cart.length) {
    container.innerHTML = '<p class="cart-empty">Keranjang masih kosong 😢</p>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'flex';
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatRp(item.price)}</div>
      </div>
      <div class="cart-qty">
        <button onclick="changeQty(${item.id},-1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${item.id},1)">+</button>
      </div>
    </div>
  `).join('');

  const totalPrice  = cart.reduce((s,c) => s + c.price * c.qty, 0);
  const freeShipMin = 150000;
  const left        = Math.max(0, freeShipMin - totalPrice);

  document.getElementById('cartTotal').textContent = formatRp(totalPrice);
  const shippingLeft = document.getElementById('shippingLeft');
  const shippingNote = document.getElementById('shippingNote');

  if (left === 0) {
    shippingNote.innerHTML = '🎉 Selamat! Anda mendapat <strong>GRATIS ONGKIR</strong>!';
  } else {
    shippingNote.innerHTML = `🚚 Tambah <strong>${formatRp(left)}</strong> lagi untuk gratis ongkir`;
  }
}

// ── Cart Drawer ──────────────────────────────
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

// ── Checkout ─────────────────────────────────
function checkout() {
  if (!cart.length) return;
  const orderId = 'FM-' + Date.now().toString(36).toUpperCase();
  document.getElementById('orderId').textContent = orderId;
  document.getElementById('checkoutOverlay').style.display = 'flex';
  cart = [];
  updateCartUI();
  closeCart();
}
function closeCheckout() {
  document.getElementById('checkoutOverlay').style.display = 'none';
}

// ── Promo Cart ───────────────────────────────
function addPromoToCart(cat) {
  const items = PRODUCTS.filter(p => p.cat === cat).slice(0, 3);
  items.forEach(p => addToCart(p.id));
  showToast('🎁 Paket promo ditambahkan ke keranjang!');
}

// ── Category Filter ──────────────────────────
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activecat = btn.dataset.cat;
    renderProducts();
    document.getElementById('products').scrollIntoView({ behavior:'smooth' });
  });
});

// ── Search ───────────────────────────────────
document.getElementById('searchInput').addEventListener('input', e => {
  searchQ = e.target.value;
  renderProducts();
});

// ── Sort ─────────────────────────────────────
document.getElementById('sortSelect').addEventListener('change', e => {
  sortMode = e.target.value;
  renderProducts();
});

// ── Cart Button ──────────────────────────────
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
document.getElementById('cartOverlay').addEventListener('click', closeCart);

// ── Chatbot Logic ─────────────────────────────
const chatFab    = document.getElementById('chatFab');
const chatWindow = document.getElementById('chatWindow');
const chatInput  = document.getElementById('chatInput');
const chatMsgs   = document.getElementById('chatMessages');
const chatTyping = document.getElementById('chatTyping');

let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  chatWindow.classList.toggle('open', chatOpen);
  document.getElementById('chatNotify').style.display = chatOpen ? 'none' : '';
  if (chatOpen) setTimeout(() => chatInput.focus(), 300);
}

chatFab.addEventListener('click', toggleChat);
document.getElementById('chatMinimize').addEventListener('click', () => {
  chatOpen = false;
  chatWindow.classList.remove('open');
});

function sendQuick(text) {
  chatInput.value = text;
  sendMessage();
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';

  appendMessage('user', text);
  chatInput.disabled = true;
  chatTyping.style.display = 'flex';
  scrollChat();

  callLangflow(text)
    .then(reply => {
      chatTyping.style.display = 'none';
      chatInput.disabled = false;
      appendMessage('bot', reply);
      chatInput.focus();
    })
    .catch(err => {
      chatTyping.style.display = 'none';
      chatInput.disabled = false;
      appendMessage('bot', '⚠️ Maaf, saya sedang tidak bisa terhubung ke server. Silakan coba lagi atau hubungi CS kami di 0800-1234-5678.');
      console.error('Langflow error:', err);
    });
}

async function callLangflow(message) {
  const payload = {
    output_type: 'chat',
    input_type:  'chat',
    input_value: message,
    session_id:  sessionId,
  };

  const response = await fetch(FLOW_URL, {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key':    API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();

  // Parse Langflow response — try common output paths
  try {
    return (
      data?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
      data?.outputs?.[0]?.outputs?.[0]?.messages?.[0]?.message ||
      data?.outputs?.[0]?.outputs?.[0]?.artifacts?.message ||
      data?.result?.text ||
      data?.text ||
      JSON.stringify(data)
    );
  } catch {
    return JSON.stringify(data);
  }
}

function appendMessage(role, text) {
  const isBot  = role === 'bot';
  const time   = new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
  const avatar = isBot ? '🤖' : '👤';

  const wrapper = document.createElement('div');
  wrapper.className = `msg ${role}`;
  wrapper.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div>
      <div class="msg-bubble">${escapeHtml(text)}</div>
      <div class="msg-time">${time}</div>
    </div>
  `;
  chatMsgs.appendChild(wrapper);
  scrollChat();
}

function scrollChat() {
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function clearChat() {
  chatMsgs.innerHTML = `
    <div class="chat-welcome">
      <div class="chat-avatar-lg">🤖</div>
      <p>Halo! Saya <strong>MartBot</strong>, asisten belanja FreshMart Anda. Saya bisa membantu soal produk, promo, pengiriman, atau pesanan. Ada yang bisa saya bantu? 😊</p>
      <div class="quick-replies">
        <button onclick="sendQuick('Apa saja promo hari ini?')">🎁 Promo hari ini</button>
        <button onclick="sendQuick('Bagaimana cara memesan?')">📦 Cara memesan</button>
        <button onclick="sendQuick('Berapa ongkos kirim?')">🚚 Ongkos kirim</button>
        <button onclick="sendQuick('Produk apa yang tersedia?')">🛍️ Lihat produk</button>
      </div>
    </div>`;
  sessionId = generateUUID(); // reset session
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');
}

// ── Init ─────────────────────────────────────
renderProducts();
renderCartItems();
