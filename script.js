// ========================
// HERO BACKGROUND
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const totalBackgrounds = 17;
  const randomNumber = Math.floor(Math.random() * totalBackgrounds) + 1;

  const heroBanner = document.getElementById("hero-banner");
  if (heroBanner) {
    heroBanner.style.backgroundImage =
      `url('imgs/background${randomNumber}.gif')`;
  }

  updateCartCount();
  renderCart();
});

// ========================
// CART STORAGE
// ========================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// ========================
// ADD TO CART (MERGE SAME ITEM)
// ========================
function addToCart(btn, name, price) {
  const card = btn.closest(".menu-card");
  const qty = parseInt(card.querySelector(".qty").innerText);
  const image = card.querySelector("img")?.src || "";

  let cart = getCart();

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      name,
      price,
      quantity: qty,
      image
    });
  }

  saveCart(cart);

  card.querySelector(".qty").innerText = 1;
}

// ========================
// NAV COUNT
// ========================
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const el = document.getElementById("cart-count");
  if (el) el.innerText = count;
}

// ========================
// MENU QTY BUTTONS
// ========================
function changeQty(btn, amount) {
  const card = btn.closest(".menu-card");
  const qtyEl = card.querySelector(".qty");

  let qty = parseInt(qtyEl.innerText);
  qty = Math.max(1, qty + amount);

  qtyEl.innerText = qty;

  const price = parseInt(card.dataset.price);
  const priceEl = card.querySelector(".base-price");

  if (priceEl) {
    priceEl.innerText = price * qty;
  }
}

// ========================
// REMOVE FULL ITEM
// ========================
function removeItem(name) {
  let cart = getCart();
  cart = cart.filter(item => item.name !== name);
  saveCart(cart);
}

// ========================
// CHANGE QTY IN CART
// ========================
function changeCartQty(name, delta) {
  let cart = getCart();

  const item = cart.find(i => i.name === name);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.name !== name);
  }

  saveCart(cart);
}

// ========================
// RENDER CART (GROUPED PRODUCT SECTIONS)
// ========================
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!container || !totalEl) return;

  const cart = getCart();

  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("menu-card", "horizontal", "cart-card");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">

      <div class="menu-card-content">
        <h3>${item.name}</h3>

        <p class="price">$${item.price} each</p>

        <div class="cart-controls">
          <button class="qty-btn" onclick="changeCartQty('${item.name}', -1)">−</button>
          <span class="qty">${item.quantity}</span>
          <button class="qty-btn" onclick="changeCartQty('${item.name}', 1)">+</button>
        </div>

        <p class="price">
          Subtotal: <b>$${subtotal}</b>
        </p>
      </div>

      <button class="remove-btn" onclick="removeItem('${item.name}')">
        Remove
      </button>
    `;

    container.appendChild(div);
  });

  totalEl.innerText = "Total: $" + total;
}