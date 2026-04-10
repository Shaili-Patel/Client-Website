document.addEventListener("DOMContentLoaded", function () {

  const totalBackgrounds = 17; // You have 17 gifs
  const randomNumber = Math.floor(Math.random() * totalBackgrounds) + 1;

  const heroBanner = document.getElementById("hero-banner");

  if (heroBanner) {
    heroBanner.style.backgroundImage = `url('imgs/background${randomNumber}.gif')`;
  }

});

let cart = [];

// + / - BUTTONS
function changeQty(btn, amount) {
  const card = btn.closest(".menu-card");

  const qtyEl = card.querySelector(".qty");
  let qty = parseInt(qtyEl.innerText);

  qty += amount;
  if (qty < 1) qty = 1;

  qtyEl.innerText = qty;

  // 💰 UPDATE PRICE LIVE
  const basePrice = parseInt(card.dataset.price);
  const priceEl = card.querySelector(".base-price");

  priceEl.innerText = basePrice * qty;
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// RENDER CART
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!container) return;

  container.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        $${item.price} x ${item.quantity} = <b>$${itemTotal}</b>
      </div>

      <button class="remove-btn" onclick="removeItem(${index})">
        Remove
      </button>
    `;

    container.appendChild(div);
  });

  totalEl.innerText = "Total: $" + total;
}

// BACK TO MENU
function scrollToMenu() {
  document.getElementById("menu").scrollIntoView({
    behavior: "smooth"
  });
}