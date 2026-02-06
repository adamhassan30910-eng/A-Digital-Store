document.addEventListener('DOMContentLoaded', () => {

  const myWhatsApp = '201288023157';

  const products = [
    { id: 'p1', title: 'GTA V (Online) Digital Access', category: 'games', price: 549, img: 'gta 549.jpg', desc: 'الوصول الرقمي إلى لعبة Grand Theft Auto V اصليه بالكامل' },
    { id: 'p2', title: 'FC 25 (Online) Digital Access', category: 'games', price: 245, img: 'fc25 245.jpg', desc: 'الوصول الرقمي إلى لعبة Football Manager 2025 اصليه بالكامل' },
    { id: 'p3', title: 'Arc Raiders Digital Access', category: 'games', price: 1329, img: 'arc 1329.jpg', desc: 'الوصول الرقمي إلى لعبة Arc Raiders اصليه بالكامل' },
    { id: 'p4', title: 'WIN 11 pro Activation Code Life Time', category: 'app', price: 139, img: 'win 139.jpg', desc: 'رمز تفعيل Windows 11 Pro مدى الحياة' },
    { id: 'p5', title: 'CapCut 1 Month Activated Digital Access', category: 'app', price: 149, img: 'cap 149.jpg', desc: 'الوصول الرقمي إلى تطبيق CapCut مفعل لمدة شهر واحد' },
    { id: 'p6', title: 'FC 26 (Online) Digital Access', category: 'games', price: 759, img: 'fc26 759.jpg', desc: 'الوصول الرقمي إلى لعبة Football Manager 2026 اصليه بالكامل' },
    { id: 'p7', title: 'Red Dead Redemption 2 Digital Access', category: 'games', price: 579, img: 'red 579.jpg', desc: 'الوصول الرقمي إلى لعبة Red Dead Redemption 2 اصليه بالكامل' },
    { id: 'p8', title: 'MineCraft (Online) Digital Access', category: 'games', price: 610, img: 'mine 610.jpg', desc: 'الوصول الرقمي إلى لعبة Minecraft اصليه بالكامل تقدر تلعب اونلاين' },
    { id: 'p9', title: 'Battlefield 2042 Digital Access', category: 'games', price: 220, img: 'ba2042 220.jpg', desc: 'الوصول الرقمي إلى لعبة Battlefield 2042 اصليه بالكامل' },
    { id: 'p10', title: 'Battlefield 5 Digital Access', category: 'games', price: 149, img: 'ba5 149.jpg', desc: 'الوصول الرقمي إلى لعبة Battlefield V اصليه بالكامل' },
    { id: 'p11', title: 'Battlefield 6 Digital Access', category: 'games', price: 1360, img: 'ba6 1360.jpg', desc: 'الوصول الرقمي إلى لعبة Battlefield 6 اصليه بالكامل' },
  ];

  // ===== العناصر =====
  const productsSection = document.getElementById('productsSection');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');
  const favCountEl = document.querySelector('.count_favourite');
  const cartCountEl = document.querySelector('.count_items_header');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const yearEl = document.getElementById('year');
  const productModal = document.getElementById('productModal');
  const modalBody = document.getElementById('modalBody');
  const closeModal = document.getElementById('closeModal');
  const closeCartBtn = document.getElementById('closeCart');
  const confirmOrderBtn = document.getElementById('confirmOrder');
  const scrollBtn = document.getElementById('scrollTopBtn');
  const themeToggle = document.getElementById('themeToggle');

  // ===== Overlay =====
  let overlay = document.getElementById('overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'overlay';
    document.body.prepend(overlay);
  }

  let favorites = JSON.parse(localStorage.getItem('ah_favorites') || '[]');
  let cart = JSON.parse(localStorage.getItem('ah_cart') || '[]');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Theme Toggle =====
  const savedTheme = localStorage.getItem('ah_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('ah_theme', isLight ? 'light' : 'dark');
  });

  // ===== Toast =====
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast success';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i><span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ===== العدادات =====
  function updateCounters() {
    if (favCountEl) {
      favCountEl.textContent = favorites.length;
      favCountEl.style.transform = 'scale(1.35)';
      setTimeout(() => favCountEl.style.transform = 'scale(1)', 350);
    }
    if (cartCountEl) {
      cartCountEl.textContent = cart.reduce((s, i) => s + i.qty, 0);
      cartCountEl.style.transform = 'scale(1.35)';
      setTimeout(() => cartCountEl.style.transform = 'scale(1)', 350);
    }
  }

  function saveState() {
    localStorage.setItem('ah_favorites', JSON.stringify(favorites));
    localStorage.setItem('ah_cart', JSON.stringify(cart));
    updateCounters();
  }

  // ===== عرض المنتجات =====
  function renderProducts(list) {
    if (!productsSection) return;
    productsSection.innerHTML = '';

    if (list.length === 0) {
      productsSection.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 60px; margin-bottom: 20px;">🔍</div>
          <h3 style="margin-bottom: 10px; color: var(--text);">لا توجد منتجات</h3>
          <p style="color: var(--muted);">جرب البحث بكلمات مختلفة</p>
        </div>
      `;
      return;
    }

    list.forEach((p, index) => {
      const isFav = favorites.includes(p.id);
      const card = document.createElement('article');
      card.className = 'product_card';
      card.style.animationDelay = `${index * 0.06}s`;
      card.innerHTML = `
        <div class="product_img">
          <img src="${p.img}" alt="${p.title}" loading="lazy">
        </div>
        <div class="product_meta">
          <div class="product_title">${p.title}</div>
          <div class="product_price">${p.price.toLocaleString()} ج.م</div>
          <div class="product_desc">${p.desc}</div>
        </div>
        <div class="product_actions">
          <button class="btn btn_view" data-id="${p.id}">
            <i class="fa-solid fa-eye"></i> عرض
          </button>
          <button class="btn btn_add" data-id="${p.id}">
            <i class="fa-solid fa-cart-plus"></i> أضف
          </button>
          <button class="btn btn_fav ${isFav ? 'active' : ''}" data-id="${p.id}">
            <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>
      `;
      productsSection.appendChild(card);
    });
  }

  // ===== الفلترة =====
  function filterAndRender() {
    const q = searchInput?.value.trim().toLowerCase() || '';
    const cat = categorySelect?.value || 'all';
    const list = products.filter(p => {
      const matchQ = p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
      const matchCat = cat === 'all' || p.category === cat;
      return matchQ && matchCat;
    });
    renderProducts(list);
  }

  // ===== أحداث البحث =====
  searchForm?.addEventListener('submit', e => { e.preventDefault(); filterAndRender(); });
  searchInput?.addEventListener('input', filterAndRender);
  categorySelect?.addEventListener('change', filterAndRender);

  // ===== أحداث المنتجات =====
  productsSection?.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const id = btn.dataset.id;
    if (btn.classList.contains('btn_view')) openModal(id);
    else if (btn.classList.contains('btn_add')) addToCart(id);
    else if (btn.classList.contains('btn_fav')) toggleFav(id);
  });

  // ===== فتح المودال =====
  function openModal(id) {
    const p = products.find(x => x.id === id);
    if (!p || !modalBody || !productModal) return;

    modalBody.innerHTML = `
      <div class="modal_img">
        <img src="${p.img}" alt="${p.title}">
      </div>
      <div class="modal_info">
        <h2>${p.title}</h2>
        <div class="price">${p.price.toLocaleString()} ج.م</div>
        <p class="desc">${p.desc}</p>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <button class="btn btn_add" data-id="${p.id}" style="flex:1; padding: 15px;">
            <i class="fa-solid fa-cart-plus"></i> أضف للسلة
          </button>
          <button class="btn btn_fav ${favorites.includes(p.id) ? 'active' : ''}" data-id="${p.id}" style="width: 55px; height: 55px;">
            <i class="fa-${favorites.includes(p.id) ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>
      </div>
    `;

    productModal.classList.remove('hidden');
    productModal.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // ===== إغلاق المودال =====
  function closeModalFunc() {
    productModal?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeModal?.addEventListener('click', closeModalFunc);
  productModal?.addEventListener('click', e => {
    if (e.target === productModal) closeModalFunc();
  });

  modalBody?.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.classList.contains('btn_add')) {
      addToCart(id);
      closeModalFunc();
    } else if (btn.classList.contains('btn_fav')) {
      toggleFav(id);
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
    }
  });

  // ===== المفضلة =====
  function toggleFav(id) {
    const idx = favorites.indexOf(id);
    if (idx === -1) favorites.push(id);
    else favorites.splice(idx, 1);
    saveState();
    filterAndRender();
  }

  // ===== السلة =====
  function addToCart(id) {
    const p = products.find(x => x.id === id);
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty++;
    else cart.push({ id, qty: 1 });
    saveState();
    renderCart();
    openCartSidebar();
    showToast(`تم إضافة "${p?.title}" للسلة ✓`);
  }

  function openCartSidebar() {
    cartSidebar?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartSidebar() {
    cartSidebar?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelector('.icon-cart')?.addEventListener('click', e => {
    e.preventDefault();
    openCartSidebar();
  });

  closeCartBtn?.addEventListener('click', closeCartSidebar);
  overlay?.addEventListener('click', () => {
    closeCartSidebar();
    closeModalFunc();
  });

  // ===== عرض السلة =====
  function renderCart() {
    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `
        <div style="text-align: center; padding: 50px 20px; color: var(--muted);">
          <div style="font-size: 50px; margin-bottom: 15px;">🛒</div>
          <p>السلة فارغة</p>
        </div>
      `;
      if (cartTotalEl) cartTotalEl.textContent = '0 ج.م';
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const p = products.find(x => x.id === item.id);
      if (!p) return;
      total += p.price * item.qty;

      const div = document.createElement('div');
      div.className = 'cart_item';
      div.innerHTML = `
        <img src="${p.img}" alt="${p.title}">
        <div style="flex: 1;">
          <div style="font-weight: 600; color: var(--text); margin-bottom: 5px;">${p.title}</div>
          <div style="color: var(--accent); font-weight: 700;">${p.price.toLocaleString()} ج.م</div>
          <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
            <button class="qty_minus" data-id="${item.id}">−</button>
            <span class="qty_val">${item.qty}</span>
            <button class="qty_plus" data-id="${item.id}">+</button>
            <button class="remove_item" data-id="${item.id}" style="margin-right: auto;">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
      cartItemsEl.appendChild(div);
    });

    if (cartTotalEl) cartTotalEl.textContent = total.toLocaleString() + ' ج.م';
  }

  cartItemsEl?.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;

    if (btn.classList.contains('qty_plus')) {
      const item = cart.find(i => i.id === id);
      if (item) item.qty++;
    } else if (btn.classList.contains('qty_minus')) {
      const item = cart.find(i => i.id === id);
      if (item) {
        item.qty--;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
      }
    } else if (btn.classList.contains('remove_item')) {
      cart = cart.filter(i => i.id !== id);
    }
    saveState();
    renderCart();
  });

  // ===== تأكيد الطلب =====
  confirmOrderBtn?.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('السلة فارغة!');
      return;
    }
    let msg = '🛒 طلب جديد:\n\n';
    let total = 0;
    cart.forEach(item => {
      const p = products.find(x => x.id === item.id);
      if (p) {
        msg += `• ${p.title}\n  الكمية: ${item.qty} | السعر: ${(p.price * item.qty).toLocaleString()} ج.م\n\n`;
        total += p.price * item.qty;
      }
    });
    msg += `💰 الإجمالي: ${total.toLocaleString()} ج.م`;
    window.open(`https://wa.me/${myWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  // ===== زر الصعود =====
  window.addEventListener('scroll', () => {
    scrollBtn?.classList.toggle('show', window.scrollY > 300);
  });
  scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ===== إخفاء الهيدر =====
  const header = document.querySelector('header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (header) {
      if (current > lastScroll && current > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    lastScroll = current;
  });

  // ===== Escape =====
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModalFunc();
      closeCartSidebar();
    }
  });

  // ===== التشغيل =====
  saveState();
  filterAndRender();
  renderCart();
});