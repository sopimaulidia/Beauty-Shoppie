/**
 * SHOPPAY-Beauty - Core Interactive Application script (Vanilla JavaScript)
 * Implements catalog search/filter, shopping cart via localStorage, detail modals,
 * and a fully simulated payment gateway flow.
 */

// 1. PRODUCT CATALOG DATA (10 Products)
const PRODUCTS = [
  {
    id: 'sb-01',
    name: 'Glowing Vitamin C + E Serum',
    category: 'Skincare',
    price: 149000,
    originalPrice: 189000,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    description: 'A powerful, fast-absorbing Vitamin C serum blended with Vitamin E and Hyaluronic Acid. Designed to fade dark spots, brighten uneven skin tone, boost collagen, and deliver a brilliant daily glow while protecting against environmental stressors.',
    rating: 4.9,
    reviewsCount: 142,
    stock: 24,
    benefits: [
      'Brightens hyperpigmentation and fades dark spots',
      'Boosts skin elasticity and reduces fine lines',
      'Provides deep hydration and long-lasting lock-in moisture',
      'Neutralizes harmful free radicals and UV damage'
    ],
    ingredients: 'Water, Sodium Ascorby Phosphate (Vitamin C), Tocopheryl Acetate (Vitamin E), Hyaluronic Acid, Aloe Barbadensis Leaf Juice, Glycerin, Ferulic Acid, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: 'Apply 3-5 drops of serum to clean, dry facial skin each morning. Gently press into the skin using your fingertips. Follow with moisturizer and mineral sunscreen.'
  },
  {
    id: 'sb-02',
    name: 'Matte Velvet Liquid Lipstick',
    category: 'Makeup',
    price: 89000,
    originalPrice: 109000,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
    description: 'An ultra-pigmented liquid lipstick that glides on like a dream and dries down to a velvety matte finish. Infused with Shea Butter and Jojoba Oil to keep your lips moist and comfortable for up to 16 hours without cracking.',
    rating: 4.8,
    reviewsCount: 98,
    stock: 45,
    benefits: [
      '16-hour long-wear smudge-proof formula',
      'Deeply moisturizing with natural oils (non-drying)',
      'Intense, high-pigment payoff in a single swipe',
      'Lightweight feel that does not cake or peel'
    ],
    ingredients: 'Isododecane, Trimethylsiloxysilicate, Cyclopentasiloxane, Shea Butter, Jojoba Seed Oil, Vitamin E, Dimethicone, Silica, Titanium Dioxide, Iron Oxides.',
    howToUse: 'Define lip borders with the precision applicator, then fill in the rest. Allow 60 seconds to dry completely to set the matte, transfer-proof finish.'
  },
  {
    id: 'sb-03',
    name: 'Hydrating Damask Rose Toner',
    category: 'Skincare',
    price: 119000,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80',
    description: 'A soothing facial toner infused with real, organic Damask Rose petals and Hyaluronic Acid. It removes residual impurities, balances pH levels, tightens enlarged pores, and preps your skin to absorb serums and moisturizers with maximum efficacy.',
    rating: 4.7,
    reviewsCount: 84,
    stock: 15,
    benefits: [
      'Restores skin pH balance instantly post-cleanse',
      'Soothes redness, irritation, and calm skin layers',
      'Hydrates, plumps, and softens skin texture',
      'Tightens pores and controls excess sebum'
    ],
    ingredients: 'Organic Rosa Damascena Flower Water, Real Rose Petals, Glycerin, Sodium Hyaluronate, Centella Asiatica Extract, Witch Hazel Leaf Extract, Panthenol, Allantoin.',
    howToUse: 'After cleansing, pour a moderate amount onto a cotton pad or your palms. Gently sweep or pat across the face and neck. Use morning and night.'
  },
  {
    id: 'sb-04',
    name: 'Ultimate Lash Volumizing Mascara',
    category: 'Makeup',
    price: 99000,
    originalPrice: 129000,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
    description: 'Get instantly longer, thicker, and beautifully separated lashes with our water-resistant, fiber-infused volumizing mascara. Features an hourglass-shaped brush designed to coat every single lash with deep, carbon-black pigment.',
    rating: 4.6,
    reviewsCount: 115,
    stock: 30,
    benefits: [
      'Delivers up to 5x dramatic lash volume and length',
      'Waterproof, sweatproof, and smudge-resistant all day',
      'Infused with Panthenol and Keratin to nourish lashes',
      'Zero clumping or flaking under eyes'
    ],
    ingredients: 'Water, Beeswax, Copernicia Cerifera Wax, Stearic Acid, Carbon Black, Panthenol, Hydrolyzed Keratin, Tocopheryl Acetate, Phenoxyethanol.',
    howToUse: 'Sweep the mascara wand from the base of the eyelashes to the tips in a gentle wiggling motion. Build with a second coat while wet for extra drama.'
  },
  {
    id: 'sb-05',
    name: 'Nourishing Argan & Rosemary Hair Oil',
    category: 'Haircare',
    price: 179000,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    description: 'A luxurious hair treatment that combines Pure Moroccan Argan Oil and Rosemary Essential Oil. This dual-action formula strengthens hair roots, stimulates hair growth, tames frizzy split ends, and leaves hair with a brilliant, silky-smooth shine.',
    rating: 4.9,
    reviewsCount: 156,
    stock: 18,
    benefits: [
      'Stimulates scalp circulation to boost hair growth',
      'Repairs split ends and tames unruly, dry frizz',
      'Provides intense heat protection from styling tools',
      'Non-greasy, lightweight formula suitable for all hair types'
    ],
    ingredients: 'Moroccan Argan Kernel Oil, Rosemary Leaf Oil, Jojoba Seed Oil, Sweet Almond Oil, Coconut Oil, Vitamin E, Lavender Essential Oil.',
    howToUse: 'Apply a few drops to damp hair before styling, or massage directly onto the scalp 30 minutes before washing as a deep-conditioning hair treatment.'
  },
  {
    id: 'sb-06',
    name: 'Rose De Mai Luxury Eau de Parfum',
    category: 'Fragrance',
    price: 349000,
    originalPrice: 420000,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
    description: 'An elegant, long-lasting fragrance that captures the essence of fresh-blooming May Roses in Grasse. Accented with subtle notes of White Jasmine, sparkling Bergamot, and warm Cedarwood for a highly sophisticated, sensual, and modern finish.',
    rating: 4.9,
    reviewsCount: 74,
    stock: 8,
    benefits: [
      'High-concentration Eau de Parfum lasting up to 8-10 hours',
      'Crafted from premium, hand-harvested organic floral extracts',
      'Chic, minimalist glass bottle that looks gorgeous on vanity tables',
      'Hypoallergenic formula gentle on sensitive pulse points'
    ],
    ingredients: 'Alcohol Denat., Fragrance (Parfum), Rosa Centifolia (Rose de Mai) Extract, Jasminum Officinale Extract, Citrus Aurantium Bergamia Fruit Oil, Water, Linalool, Citronellol.',
    howToUse: 'Spray onto your pulse points—wrists, neck, and behind the ears. Avoid rubbing your wrists together as it can break down the delicate top fragrance notes.'
  },
  {
    id: 'sb-07',
    name: 'Gentle Oat Cleansing Balm',
    category: 'Skincare',
    price: 129000,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    description: 'A nourishing melting cleansing balm that effortlessly dissolves stubborn waterproof makeup, sunscreen, and daily pollutants while calming sensitive skin. Formulated with Colloidal Oatmeal and Sweet Almond Oil to protect the natural skin barrier.',
    rating: 4.8,
    reviewsCount: 62,
    stock: 22,
    benefits: [
      'Melts from balm to oil to gentle milk, rinsing clean',
      'Deeply cleanses without stripping natural moisture',
      'Soothes irritated, dry, or redness-prone skin with oats',
      'Safe and non-irritating for sensitive eyes and lips'
    ],
    ingredients: 'Prunus Amygdalus Dulcis (Sweet Almond) Oil, Caprylic/Capric Trygliceride, PEG-20 Glyceryl Triisostearate, Colloidal Oatmeal, Candelilla Wax, Tocopherol.',
    howToUse: 'Massage a small scoop onto dry skin, including around the eyes to dissolve makeup. Add warm water to emulsify into a milky rinse, then splash clean.'
  },
  {
    id: 'sb-08',
    name: 'Mineral Sunscreen SPF 50+ PA++++',
    category: 'Skincare',
    price: 159000,
    originalPrice: 199000,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    description: 'An ultra-lightweight, 100% physical mineral sunscreen that provides broad-spectrum protection against UVA/UVB rays. Formulated with Zinc Oxide, Centella Asiatica, and Niacinamide to soothe skin and deliver a clean, invisible, zero-white-cast finish.',
    rating: 4.7,
    reviewsCount: 110,
    stock: 35,
    benefits: [
      'Broad-spectrum SPF 50+ PA++++ physical protection',
      'Zero white-cast, lightweight, and non-greasy matte texture',
      'Niacinamide brightens skin tone and strengthens barriers',
      'Reef-safe and completely free of toxic chemical filters'
    ],
    ingredients: 'Zinc Oxide, Titanium Dioxide, Centella Asiatica Extract, Niacinamide, Adenosine, Glycerin, Silica, Aqua, Chamomilla Recutita Extract.',
    howToUse: 'Apply a generous amount (approx. two-finger length) to the face and neck as the final step of your morning skincare routine, 15 minutes before sun exposure.'
  },
  {
    id: 'sb-09',
    name: 'Tinted Rose Lip Glow Balm',
    category: 'Makeup',
    price: 79000,
    image: 'https://images.unsplash.com/photo-1617224908560-6b3a0cc0124b?auto=format&fit=crop&w=600&q=80',
    description: 'A deeply hydrating daily lip balm that reacts with your lips\' natural pH level to create a custom, natural pink glow. Packed with Macadamia Nut Oil and Beeswax to soothe chapped lips and provide a glossy, healthy sheen.',
    rating: 4.8,
    reviewsCount: 125,
    stock: 40,
    benefits: [
      'Reacts with lip pH to deliver a unique personal flush',
      'Heals cracked, chapped lips and seals in moisture',
      'Gives a plump, glossy finish without sticky residue',
      'Sweet, subtle organic berry aroma'
    ],
    ingredients: 'Macadamia Seed Oil, Beeswax, Coconut Oil, Shea Butter, Vitamin E, Sunflower Seed Oil, pH-Responsive Color Pigments.',
    howToUse: 'Swipe on clean lips throughout the day whenever hydration is needed. Can be worn alone or as a hydrating base primer before applying matte lipstick.'
  },
  {
    id: 'sb-10',
    name: 'Keratin Intense Repair Hair Mask',
    category: 'Haircare',
    price: 139000,
    originalPrice: 169000,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
    description: 'An intensive, salon-grade hair repair treatment that restores damaged, over-processed hair. Packed with Hydrolyzed Keratin, Argan Oil, and Biotin, it strengthens hair strands, reduces breakage, and restores elasticity in just one use.',
    rating: 4.9,
    reviewsCount: 92,
    stock: 12,
    benefits: [
      'Reconstructs damaged hair shaft structure with Keratin',
      'Infuses deep moisture, reducing breakage by up to 95%',
      'Promotes thicker-looking hair with Biotin enrichment',
      'Protects colored or chemically treated hair'
    ],
    ingredients: 'Water, Cetearyl Alcohol, Hydrolyzed Keratin, Argania Spinosa Kernel Oil, Biotin, Panthenol, Behentrimonium Chloride, Dimethicone, Phenoxyethanol.',
    howToUse: 'After shampooing, apply a generous scoop from mid-lengths to ends. Leave on for 5-10 minutes, then rinse thoroughly with cool water. Use 1-2 times weekly.'
  }
];

// 2. STATE MANAGERS
let cart = [];
let currentCategory = 'All';
let searchQuery = '';
let maxPrice = 500000;
let currentDetailProduct = null;
let paymentTimerInterval = null;

// 3. ANALYTICS (Dummy Google Analytics Logger)
const GA = {
  logEvent: function(eventName, eventParams) {
    console.log(`[Google Analytics Tracker] 📊 Event: "${eventName}" logged.`, eventParams);
    
    // Add real-time log simulation inside the DOM if a tracker console exists
    const analyticsConsole = document.getElementById('analytics-log-container');
    if (analyticsConsole) {
      const logLine = document.createElement('div');
      logLine.style.fontFamily = 'monospace';
      logLine.style.fontSize = '12px';
      logLine.style.padding = '6px 12px';
      logLine.style.borderBottom = '1px solid #e2deda';
      logLine.style.color = '#57534e';
      logLine.innerHTML = `<strong>[${new Date().toLocaleTimeString()}]</strong> event: <span style="color: #b37456; font-weight: 600;">${eventName}</span> - ${JSON.stringify(eventParams)}`;
      analyticsConsole.prepend(logLine);
    }
  }
};

// 4. HELPER FUNCTIONS
function formatRupiah(num) {
  return 'Rp ' + num.toLocaleString('id-ID');
}

// 5. BOOTSTRAP INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  renderProducts();
  setupEventListeners();
  setupHeaderScroll();
  GA.logEvent('session_start', { timestamp: Date.now(), platform: 'Web-Desktop' });
});

// 6. HEADER SCROLL UTILITY
function setupHeaderScroll() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// 7. PRODUCT RENDERER
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filtered = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <p class="text-muted" style="font-size: 16px;">Tidak ada produk kecantikan yang cocok dengan kriteria filter Anda.</p>
        <button class="btn btn-outline" style="margin-top: 16px;" onclick="resetFilters()">Reset Filter</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const discountTag = product.originalPrice 
      ? `<span class="product-tag">Sale -${Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%</span>` 
      : '';
    
    const oldPriceHtml = product.originalPrice 
      ? `<span class="product-old-price">${formatRupiah(product.originalPrice)}</span>` 
      : '';

    return `
      <div class="product-card" id="card-${product.id}">
        ${discountTag}
        <div class="product-img-container">
          <img src="${product.image}" alt="${product.name}" referrerPolicy="no-referrer">
          <div class="product-overlay">
            <button class="btn btn-primary" onclick="openProductDetail('${product.id}')">Lihat Detail</button>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-name" onclick="openProductDetail('${product.id}')">${product.name}</h3>
          
          <div class="product-rating">
            <span class="stars">★ ${product.rating.toFixed(1)}</span>
            <span class="reviews-count">(${product.reviewsCount} ulasan)</span>
          </div>

          <div class="product-price-row">
            <span class="product-price">${formatRupiah(product.price)}</span>
            ${oldPriceHtml}
          </div>

          <div class="product-actions">
            <button class="btn btn-primary" onclick="addToCart('${product.id}')">Keranjang</button>
            <button class="btn btn-outline" onclick="openProductDetail('${product.id}')">Detail</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 8. PRODUCT FILTERS & SEARCH
window.setCategory = (category) => {
  currentCategory = category;
  
  // Update active state in UI tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.innerText.trim() === category || (category === 'All' && btn.innerText.includes('Semua'))) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
  GA.logEvent('filter_category', { category: category });
};

window.handleSearch = (e) => {
  searchQuery = e.target.value;
  renderProducts();
};

window.handlePriceChange = (val) => {
  maxPrice = parseInt(val);
  const label = document.getElementById('price-limit-label');
  if (label) {
    label.innerText = formatRupiah(maxPrice);
  }
  renderProducts();
};

window.resetFilters = () => {
  searchQuery = '';
  currentCategory = 'All';
  maxPrice = 500000;
  
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  
  const slider = document.getElementById('price-slider');
  if (slider) slider.value = 500000;
  
  const label = document.getElementById('price-limit-label');
  if (label) label.innerText = formatRupiah(500000);

  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.innerText.includes('Semua')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderProducts();
  GA.logEvent('reset_filters', {});
};

// 9. DETAIL MODAL LOGIC
window.openProductDetail = (id) => {
  const prod = PRODUCTS.find(p => p.id === id);
  if (!prod) return;

  currentDetailProduct = prod;
  
  document.getElementById('modal-img').src = prod.image;
  document.getElementById('modal-category').innerText = prod.category;
  document.getElementById('modal-title').innerText = prod.name;
  document.getElementById('modal-price').innerText = formatRupiah(prod.price);
  document.getElementById('modal-description').innerText = prod.description;
  
  // Tabs Contents
  document.getElementById('tab-deskripsi').innerHTML = `
    <p style="margin-bottom: 12px; font-weight: 500;">Manfaat Utama:</p>
    <ul style="list-style-type: disc; padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
      ${prod.benefits.map(b => `<li>${b}</li>`).join('')}
    </ul>
  `;
  document.getElementById('tab-ingredients').innerText = prod.ingredients;
  document.getElementById('tab-howtouse').innerText = prod.howToUse;
  
  // Reset tabs UI
  selectModalTab('deskripsi');

  // Trigger modal open
  const modal = document.getElementById('product-detail-modal');
  modal.classList.add('open');
  
  GA.logEvent('view_item', { item_id: prod.id, item_name: prod.name, price: prod.price });
};

window.closeProductDetail = () => {
  const modal = document.getElementById('product-detail-modal');
  modal.classList.remove('open');
  currentDetailProduct = null;
};

window.selectModalTab = (tabName) => {
  document.querySelectorAll('.modal-tab-header').forEach(hdr => {
    if (hdr.getAttribute('onclick').includes(tabName)) {
      hdr.classList.add('active');
    } else {
      hdr.classList.remove('active');
    }
  });

  document.querySelectorAll('.modal-tab-content').forEach(content => {
    if (content.id === `tab-${tabName}`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
};

window.addCurrentProductToCart = () => {
  if (currentDetailProduct) {
    addToCart(currentDetailProduct.id);
    closeProductDetail();
  }
};

// 10. SHOPPING CART LOGIC (localStorage)
function initCart() {
  const saved = localStorage.getItem('shoppay_beauty_cart');
  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('shoppay_beauty_cart', JSON.stringify(cart));
  updateCartUI();
}

window.addToCart = (id) => {
  const prod = PRODUCTS.find(p => p.id === id);
  if (!prod) return;

  const existing = cart.find(item => item.product.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product: prod, quantity: 1 });
  }

  saveCart();
  openCart();
  
  GA.logEvent('add_to_cart', { item_id: prod.id, item_name: prod.name, quantity: 1, value: prod.price });
};

window.updateQty = (id, change) => {
  const item = cart.find(item => item.product.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(item => item.product.id !== id);
    GA.logEvent('remove_from_cart', { item_id: id });
  }

  saveCart();
};

window.removeFromCart = (id) => {
  cart = cart.filter(item => item.product.id !== id);
  saveCart();
  GA.logEvent('remove_from_cart', { item_id: id });
};

function updateCartUI() {
  // Update badge in navbar
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.innerText = totalQty;
    if (totalQty > 0) {
      badge.style.display = 'flex';
    } else {
      badge.style.display = 'none';
    }
  });

  // Render list inside drawer
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <p style="font-size: 15px;">Keranjang belanja Anda kosong</p>
        <p style="font-size: 13px; color: var(--color-text-muted); margin-top: 6px;">Temukan kosmetik impian Anda di katalog kami.</p>
      </div>
    `;
    
    document.getElementById('cart-subtotal').innerText = formatRupiah(0);
    document.getElementById('cart-total').innerText = formatRupiah(0);
    document.getElementById('checkout-btn').disabled = true;
    document.getElementById('checkout-btn').style.opacity = '0.5';
    return;
  }

  document.getElementById('checkout-btn').disabled = false;
  document.getElementById('checkout-btn').style.opacity = '1';

  container.innerHTML = cart.map(item => {
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.product.image}" alt="${item.product.name}" referrerPolicy="no-referrer">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.product.name}</h4>
          <span class="cart-item-price">${formatRupiah(item.product.price)}</span>
          
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button class="qty-btn" onclick="updateQty('${item.product.id}', -1)">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateQty('${item.product.id}', 1)">+</button>
            </div>
            
            <button class="remove-item-btn" onclick="removeFromCart('${item.product.id}')">
              Hapus
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Auto Promo Discount if cart is > 200k
  const discount = subtotal > 200000 ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 150000 ? 0 : 150000 ? 15000 : 0; // Free delivery over 150k, else 15k
  const finalTotal = subtotal - discount + delivery;

  document.getElementById('cart-subtotal').innerText = formatRupiah(subtotal);
  
  // Set delivery and discount display if elements exist
  const discountEl = document.getElementById('cart-discount');
  if (discountEl) {
    discountEl.innerText = discount > 0 ? `-${formatRupiah(discount)} (10% Diskon Promo)` : formatRupiah(0);
  }
  
  const deliveryEl = document.getElementById('cart-delivery');
  if (deliveryEl) {
    deliveryEl.innerText = delivery === 0 ? 'Gratis Ongkir' : formatRupiah(delivery);
  }

  document.getElementById('cart-total').innerText = formatRupiah(finalTotal);
}

window.openCart = () => {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
};

window.closeCart = () => {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
};

// 11. CHECKOUT NAVIGATION FLOW
window.navigateToCheckout = () => {
  closeCart();
  
  // Hide main store categories / search / hero if needed
  const heroSection = document.getElementById('hero-banner');
  if (heroSection) heroSection.style.display = 'none';

  const brandFeatures = document.getElementById('brand-features');
  if (brandFeatures) brandFeatures.style.display = 'none';
  
  const catalogSection = document.getElementById('catalog-section');
  if (catalogSection) catalogSection.style.display = 'none';

  // Show checkout
  const checkoutSection = document.getElementById('checkout-section');
  checkoutSection.classList.add('active');

  // Populate checkout summaries
  renderCheckoutSummary();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  GA.logEvent('begin_checkout', { items_count: cart.length });
};

window.navigateBackToStore = () => {
  // Show standard store sections
  const heroSection = document.getElementById('hero-banner');
  if (heroSection) heroSection.style.display = 'block';

  const brandFeatures = document.getElementById('brand-features');
  if (brandFeatures) brandFeatures.style.display = 'block';
  
  const catalogSection = document.getElementById('catalog-section');
  if (catalogSection) catalogSection.style.display = 'block';

  // Hide checkout
  const checkoutSection = document.getElementById('checkout-section');
  checkoutSection.classList.remove('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items-list');
  if (!container) return;

  container.innerHTML = cart.map(item => {
    return `
      <div class="checkout-item-row" style="margin-bottom: 12px; font-size: 13px; border-bottom: 1px solid var(--color-bg-50); padding-bottom: 8px;">
        <span style="max-width: 70%; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">${item.product.name} <strong>x${item.quantity}</strong></span>
        <span>${formatRupiah(item.product.price * item.quantity)}</span>
      </div>
    `;
  }).join('');

  // Math
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = subtotal > 200000 ? Math.round(subtotal * 0.1) : 0;
  
  // Selected shipping cost
  const shippingMethod = document.querySelector('input[name="shipping_method"]:checked')?.value || 'reguler';
  const delivery = shippingMethod === 'instant' ? 25000 : (subtotal > 150000 ? 0 : 15000);
  const finalTotal = subtotal - discount + delivery;

  document.getElementById('checkout-subtotal').innerText = formatRupiah(subtotal);
  document.getElementById('checkout-discount').innerText = discount > 0 ? `-${formatRupiah(discount)}` : 'Rp 0';
  document.getElementById('checkout-delivery').innerText = delivery === 0 ? 'Gratis' : formatRupiah(delivery);
  document.getElementById('checkout-grandtotal').innerText = formatRupiah(finalTotal);
}

window.handleShippingChange = (method) => {
  // Update UI selection card
  document.querySelectorAll('#shipping-options .radio-card').forEach(card => {
    if (card.querySelector('input').value === method) {
      card.classList.add('selected');
      card.querySelector('input').checked = true;
    } else {
      card.classList.remove('selected');
    }
  });
  renderCheckoutSummary();
};

window.handlePaymentMethodChange = (method) => {
  // Update UI selection card
  document.querySelectorAll('#payment-options .radio-card').forEach(card => {
    if (card.querySelector('input').value === method) {
      card.classList.add('selected');
      card.querySelector('input').checked = true;
    } else {
      card.classList.remove('selected');
    }
  });
};

// 12. CHECKOUT FORM VALIDATION & SIMULATED GATEWAY
window.submitOrder = (e) => {
  e.preventDefault();

  // Basic Form Fields Validation
  const fields = [
    { id: 'billing-name', name: 'Nama Lengkap' },
    { id: 'billing-email', name: 'Email' },
    { id: 'billing-phone', name: 'Nomor Handphone' },
    { id: 'billing-address', name: 'Alamat Pengiriman' },
    { id: 'billing-city', name: 'Kota' },
    { id: 'billing-postal', name: 'Kode Pos' }
  ];

  for (let f of fields) {
    const el = document.getElementById(f.id);
    if (!el || !el.value.trim()) {
      alert(`Mohon lengkapi data Anda: ${f.name} wajib diisi.`);
      el?.focus();
      return;
    }
  }

  // Trigger simulated payment flow
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked')?.value || 'qris';
  openSimulatedPaymentGateway(paymentMethod);
};

function openSimulatedPaymentGateway(method) {
  const modal = document.getElementById('payment-gateway-modal');
  modal.classList.add('open');

  const totalText = document.getElementById('checkout-grandtotal').innerText;
  document.getElementById('payment-amount').innerText = totalText;

  // Render instructions based on payment method
  const box = document.getElementById('payment-instruction-box');
  if (method === 'qris') {
    box.innerHTML = `
      <div class="payment-badge">Simulasi Midtrans Sandbox QRIS</div>
      <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 12px;">Pindai kode QRIS di bawah ini dengan aplikasi dompet digital Anda (Gopay/OVO/Dana) untuk mensimulasikan pembayaran instan.</p>
      <div class="qr-code-box">
        <div class="simulated-qr" style="display: flex; align-items: center; justify-content: center;">
          <!-- SVG QR Code Mock for beautiful high fidelity -->
          <svg width="150" height="150" viewBox="0 0 29 29" style="image-rendering: pixelated;">
            <path d="M0 0h7v7H0zm1 1v5h5V1zm21-1h7v7h-7zm1 1v5h5V1zM0 22h7v7H0zm1 1v5h5v-5zm11-13h2v2h-2zm3-3h2v2h-2zm-1 5h2v2h-2zm-3 2h2v2h-2zm1-5h2v2h-2zm5-1h2v2h-2zm3 3h2v2h-2zm-3 2h2v2h-2zm3-4h2v2h-2zm-1 5h2v2h-2zm-5 4h2v2h-2zm1 3h2v2h-2zm3-1h2v2h-2zm-3 3h2v2h-2zm1-8h2v2h-2zm5-1h2v2h-2zm3 3h2v2h-2zm-3 2h2v2h-2zm3-4h2v2h-2zm-1 5h2v2h-2zm-11 5h2v2h-2zm1 3h2v2h-2zm3-1h2v2h-2zm-3 3h2v2h-2zm1-8h2v2h-2zm11 11h2v2h-2z" fill="#1c0f0a"/>
          </svg>
          <div class="qr-logo">QRIS</div>
        </div>
      </div>
      <p style="font-size: 11px; color: var(--color-text-muted); font-style: italic;">Simulasi: Pembayaran akan otomatis terdeteksi BERHASIL dalam waktu 5 detik...</p>
    `;
  } else {
    // Bank Transfer
    box.innerHTML = `
      <div class="payment-badge">Simulasi Virtual Account (VA)</div>
      <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 12px;">Lakukan transfer ke nomor Virtual Account Mandiri / BCA Sandbox di bawah ini.</p>
      <div style="background-color: var(--color-bg-50); padding: 16px; border-radius: var(--border-radius-sm); margin: 16px 0;">
        <p style="font-size: 12px; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Mandiri Virtual Account</p>
        <p style="font-family: monospace; font-size: 20px; font-weight: 700; color: var(--color-primary); letter-spacing: 2px; margin: 4px 0;">8831 9823 4110 3290</p>
        <p style="font-size: 11px; color: var(--color-text-muted);">Atas Nama: SHOPPAY-Beauty Sandbox</p>
      </div>
      <p style="font-size: 11px; color: var(--color-text-muted); font-style: italic;">Simulasi: Pembayaran akan otomatis terdeteksi BERHASIL dalam waktu 5 detik...</p>
    `;
  }

  // Countdown timer simulation (5:00 minutes)
  let minutes = 5;
  let seconds = 0;
  const timerLabel = document.getElementById('payment-time-countdown');
  
  if (timerLabel) {
    timerLabel.innerText = `05:00`;
  }

  if (paymentTimerInterval) clearInterval(paymentTimerInterval);
  
  paymentTimerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(paymentTimerInterval);
        alert('Waktu pembayaran habis. Silakan checkout ulang.');
        closeSimulatedPayment();
        return;
      }
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    const minsStr = minutes < 10 ? '0' + minutes : minutes;
    const secsStr = seconds < 10 ? '0' + seconds : seconds;
    if (timerLabel) {
      timerLabel.innerText = `${minsStr}:${secsStr}`;
    }
  }, 1000);

  // Auto-Success Simulation (After 5 seconds)
  setTimeout(() => {
    triggerPaymentSuccess();
  }, 5000);

  GA.logEvent('add_payment_info', { payment_type: method });
}

window.closeSimulatedPayment = () => {
  const modal = document.getElementById('payment-gateway-modal');
  modal.classList.remove('open');
  if (paymentTimerInterval) clearInterval(paymentTimerInterval);
};

function triggerPaymentSuccess() {
  if (paymentTimerInterval) clearInterval(paymentTimerInterval);

  const box = document.getElementById('payment-instruction-box');
  const timerLabel = document.getElementById('payment-time-countdown');
  if (timerLabel) timerLabel.style.display = 'none';

  // Order Details
  const orderId = 'SPB-' + Math.floor(100000 + Math.random() * 900000);
  const name = document.getElementById('billing-name').value;
  const address = document.getElementById('billing-address').value;
  const email = document.getElementById('billing-email').value;

  box.innerHTML = `
    <div class="payment-success-tick">✓</div>
    <h3 style="font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--color-success); margin-bottom: 8px;">Pembayaran Berhasil!</h3>
    <p style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 20px;">Terima kasih atas pembelian Anda di SHOPPAY-Beauty.</p>
    
    <div style="text-align: left; background-color: var(--color-bg-50); padding: 16px; border-radius: var(--border-radius-md); font-size: 13px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: var(--color-text-muted);">ID Transaksi:</span>
        <strong style="font-family: monospace;">${orderId}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: var(--color-text-muted);">Penerima:</span>
        <strong>${name}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span style="color: var(--color-text-muted);">Email:</span>
        <strong>${email}</strong>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--color-text-muted);">Alamat:</span>
        <strong style="max-width: 60%; text-align: right; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${address}</strong>
      </div>
    </div>
    
    <button class="btn btn-primary" style="width: 100%;" onclick="finalizeCheckout()">Selesai & Belanja Lagi</button>
  `;

  GA.logEvent('purchase', { 
    transaction_id: orderId, 
    value: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), 
    currency: 'IDR',
    items: cart.map(item => ({ item_id: item.product.id, item_name: item.product.name, quantity: item.quantity }))
  });
}

window.finalizeCheckout = () => {
  // Clear cart
  cart = [];
  saveCart();
  closeSimulatedPayment();
  
  // Go back to main storefront
  navigateBackToStore();
};

// 13. ADDITIONAL EVENT LISTENERS SETUP
function setupEventListeners() {
  // Setup Search Input Event
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Setup Newsletter Submission
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nlForm.querySelector('input');
      if (input && input.value.trim()) {
        alert(`Terima kasih! Email "${input.value}" telah berhasil didaftarkan untuk mendapatkan diskon promosi 15%.`);
        input.value = '';
        GA.logEvent('lead_generation', { channel: 'newsletter_footer' });
      }
    });
  }
}
