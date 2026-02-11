/**********************
 CART HELPERS
**********************/

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();

  const totalQty = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = totalQty;
}

/**********************
 CART PAGE LOGIC
**********************/

const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

function renderCart() {
  const cart = getCart();

  updateCartCount();

  if (cart.length === 0) {
    cartItemsEl.innerHTML =
      "<p class='loading'>Your cart is empty.</p>";

    cartTotalEl.textContent = "0";
    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  cartItemsEl.innerHTML = "";

  cart.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />

      <div class="cart-info">
        <h3>${item.title}</h3>
        <p>Size: ${item.size}</p>
        <p>$${item.price}</p>
      </div>

      <div class="cart-qty">
        <button data-index="${index}" class="decrease">−</button>
        <span>${item.quantity}</span>
        <button data-index="${index}" class="increase">+</button>
      </div>

      <button class="remove-btn" data-index="${index}">
        Remove
      </button>
    `;

    cartItemsEl.appendChild(row);
  });

  updateTotal();
}

function updateTotal() {
  const cart = getCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * Number(item.quantity),
    0
  );

  cartTotalEl.textContent = total.toFixed(2);
}

/**********************
 EVENT HANDLING
**********************/

cartItemsEl.addEventListener("click", (e) => {
  const cart = getCart();

  if (e.target.classList.contains("increase")) {
    const i = e.target.dataset.index;
    cart[i].quantity++;
  }

  if (e.target.classList.contains("decrease")) {
    const i = e.target.dataset.index;

    if (cart[i].quantity > 1) {
      cart[i].quantity--;
    }
  }

  if (e.target.classList.contains("remove-btn")) {
    const i = e.target.dataset.index;
    cart.splice(i, 1);
  }

  saveCart(cart);
  renderCart();
});

/**********************
 INIT
**********************/

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});
