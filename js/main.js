/* ============ Product Data ============ */
const PRODUCTS = [
  { id:'p1', name:'Whole Lamb Leg, Bone-In', category:'Meat & Poultry', price:1450, unit:'per kg', img:'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=600&q=80', badges:['Bestseller'], stock:'In Stock' },
  { id:'p2', name:'Free-Range Chicken, Whole', category:'Meat & Poultry', price:620, unit:'per kg', img:'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&q=80', badges:[], stock:'In Stock' },
  { id:'p3', name:'Beef Chuck Cubes', category:'Meat & Poultry', price:980, unit:'per kg', img:'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80', badges:['New'], stock:'In Stock' },
  { id:'p4', name:'Spiced Chicken Seekh Kebab', category:'Meat & Poultry', price:540, unit:'per box', img:'https://images.unsplash.com/photo-1633436375795-577c3bf76ec5?w=600&q=80', badges:[], stock:'Limited' },
  { id:'p5', name:'Vine-Ripened Tomatoes', category:'Produce', price:180, unit:'per kg', img:'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=600&q=80', badges:[], stock:'In Stock' },
  { id:'p6', name:'Organic Baby Spinach', category:'Produce', price:140, unit:'per bunch', img:'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&q=80', badges:['Bestseller'], stock:'In Stock' },
  { id:'p7', name:'Alphonso Mangoes', category:'Produce', price:420, unit:'per dozen', img:'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80', badges:['New'], stock:'In Stock' },
  { id:'p8', name:'Fresh Ginger & Garlic Mix', category:'Produce', price:95, unit:'per pack', img:'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80', badges:[], stock:'In Stock' },
  { id:'p9', name:'Sourdough Country Loaf', category:'Bakery', price:340, unit:'per loaf', img:'https://images.unsplash.com/photo-1585478259715-4d3a5f8bcd42?w=600&q=80', badges:['Bestseller'], stock:'In Stock' },
  { id:'p10', name:'Butter Croissants, Pack of 4', category:'Bakery', price:390, unit:'per pack', img:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80', badges:[], stock:'In Stock' },
  { id:'p11', name:'Cardamom Rusk Biscuits', category:'Bakery', price:210, unit:'per box', img:'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80', badges:['New'], stock:'Limited' },
  { id:'p12', name:'Whole Wheat Khameeri Roti', category:'Bakery', price:120, unit:'per pack', img:'https://images.unsplash.com/photo-1549931319-a545749fcd7c?w=600&q=80', badges:[], stock:'In Stock' },
  { id:'p13', name:'Basmati Rice, Aged 2 Years', category:'Pantry', price:1850, unit:'per 10kg', img:'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80', badges:['Bestseller'], stock:'In Stock' },
  { id:'p14', name:'Cold-Pressed Olive Oil', category:'Pantry', price:1290, unit:'per litre', img:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80', badges:[], stock:'In Stock' },
  { id:'p15', name:'Whole Spice Gift Box', category:'Pantry', price:760, unit:'per box', img:'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80', badges:['New'], stock:'In Stock' },
  { id:'p16', name:'Organic Honey, Raw', category:'Pantry', price:980, unit:'per 500g', img:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80', badges:[], stock:'In Stock' },
  { id:'p17', name:'Farmhouse Full Cream Milk', category:'Dairy', price:220, unit:'per litre', img:'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80', badges:[], stock:'In Stock' },
  { id:'p18', name:'Aged Cheddar Block', category:'Dairy', price:890, unit:'per 400g', img:'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=600&q=80', badges:['Bestseller'], stock:'In Stock' },
  { id:'p19', name:'Fresh River Prawns', category:'Seafood', price:1650, unit:'per kg', img:'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80', badges:['Limited'], stock:'Limited' },
  { id:'p20', name:'Whole Sea Bream', category:'Seafood', price:980, unit:'per kg', img:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80', badges:['New'], stock:'In Stock' },
];

const CATEGORIES = ['Meat & Poultry','Produce','Bakery','Pantry','Dairy','Seafood'];

/* ============ Cart (persisted via localStorage) ============ */
const CART_KEY = 'finest_halal_cart_v1';

function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || {}; }
  catch(e){ return {}; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(id, qty=1){
  const cart = getCart();
  cart[id] = (cart[id]||0) + qty;
  saveCart(cart);
  renderCartDrawer();
  showToast('Added to cart');
}
function setQty(id, qty){
  const cart = getCart();
  if(qty<=0){ delete cart[id]; } else { cart[id]=qty; }
  saveCart(cart);
  renderCartDrawer();
}
function removeFromCart(id){
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
  renderCartDrawer();
}
function cartItemCount(){
  const cart = getCart();
  return Object.values(cart).reduce((a,b)=>a+b,0);
}
function cartLines(){
  const cart = getCart();
  return Object.entries(cart).map(([id,qty])=>{
    const p = PRODUCTS.find(x=>x.id===id);
    return p ? {...p, qty} : null;
  }).filter(Boolean);
}
function cartSubtotal(){
  return cartLines().reduce((sum,l)=>sum + l.price*l.qty, 0);
}
function fmtPrice(n){
  return 'Rs. ' + n.toLocaleString('en-PK');
}
function updateCartCount(){
  document.querySelectorAll('.cart-count').forEach(el=>{
    const n = cartItemCount();
    el.textContent = n;
    el.style.display = n>0 ? 'flex' : 'none';
  });
}

/* ============ Toast ============ */
function showToast(msg){
  let t = document.querySelector('.toast');
  if(!t){
    t = document.createElement('div');
    t.className='toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ============ Cart Drawer ============ */
function renderCartDrawer(){
  const itemsEl = document.querySelector('.cart-items');
  const footerEl = document.querySelector('.cart-footer');
  if(!itemsEl) return;
  const lines = cartLines();
  if(lines.length===0){
    itemsEl.innerHTML = '<div class="cart-empty">Your cart is empty.<br>Start adding something delicious.</div>';
    if(footerEl) footerEl.style.display='none';
    return;
  }
  if(footerEl) footerEl.style.display='block';
  itemsEl.innerHTML = lines.map(l=>`
    <div class="cart-item" data-id="${l.id}">
      <img src="${l.img}" alt="${l.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${l.name}</div>
        <div class="cart-item-price">${fmtPrice(l.price)} ${l.unit}</div>
        <div class="qty-control">
          <button class="qty-dec" data-id="${l.id}">−</button>
          <span>${l.qty}</span>
          <button class="qty-inc" data-id="${l.id}">+</button>
        </div>
      </div>
      <div>
        <div style="font-size:13px;font-weight:600;margin-bottom:8px;">${fmtPrice(l.price*l.qty)}</div>
        <div class="cart-item-remove" data-id="${l.id}">Remove</div>
      </div>
    </div>
  `).join('');

  const subtotalRow = document.querySelector('.cart-subtotal-row strong');
  if(subtotalRow) subtotalRow.textContent = fmtPrice(cartSubtotal());

  itemsEl.querySelectorAll('.qty-inc').forEach(b=>b.addEventListener('click', ()=>{
    const id=b.dataset.id; const cart=getCart(); setQty(id,(cart[id]||0)+1);
  }));
  itemsEl.querySelectorAll('.qty-dec').forEach(b=>b.addEventListener('click', ()=>{
    const id=b.dataset.id; const cart=getCart(); setQty(id,(cart[id]||0)-1);
  }));
  itemsEl.querySelectorAll('.cart-item-remove').forEach(b=>b.addEventListener('click', ()=>{
    removeFromCart(b.dataset.id);
  }));
}

function openCart(){
  document.querySelector('.overlay')?.classList.add('open');
  document.querySelector('.cart-drawer')?.classList.add('open');
  renderCartDrawer();
}
function closeCart(){
  document.querySelector('.overlay')?.classList.remove('open');
  document.querySelector('.cart-drawer')?.classList.remove('open');
}

/* ============ Product Card Builder ============ */
function productCardHTML(p){
  const badgeHTML = p.badges.map((b,i)=>`<span class="badge ${i===0?'brass':''}">${b}</span>`).join('');
  return `
  <div class="product-card" data-category="${p.category}">
    <a href="shop.html#${p.id}" style="display:block;">
      <div class="product-media">
        <div class="badge-row">${badgeHTML}</div>
        <span class="stock-tag">${p.stock}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <button class="quick-add" data-id="${p.id}" aria-label="Add to cart" onclick="event.preventDefault(); addToCart('${p.id}');">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L4 2H2"/></svg>
        </button>
      </div>
      <div class="product-info">
        <div class="cat-label">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">${fmtPrice(p.price)} <span class="product-unit">${p.unit}</span></div>
      </div>
    </a>
  </div>`;
}

/* ============ Mobile menu + nav ============ */
function openMenu(){
  document.querySelector('.overlay')?.classList.add('open');
  document.querySelector('.mobile-menu')?.classList.add('open');
}
function closeMenu(){
  document.querySelector('.overlay')?.classList.remove('open');
  document.querySelector('.mobile-menu')?.classList.remove('open');
}
function closeAllPanels(){
  closeCart();
  closeMenu();
}

function initNav(){
  const burger = document.querySelector('.hamburger');
  if(burger){
    burger.addEventListener('click', openMenu);
  }
  document.querySelector('.mobile-menu-close')?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click', closeMenu));

  document.querySelectorAll('.cart-trigger').forEach(b=>b.addEventListener('click', (e)=>{ e.preventDefault(); openCart(); }));
  document.querySelector('.cart-close')?.addEventListener('click', closeCart);
  document.querySelector('.overlay')?.addEventListener('click', closeAllPanels);
  updateCartCount();

  // highlight active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-menu a').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', initNav);
