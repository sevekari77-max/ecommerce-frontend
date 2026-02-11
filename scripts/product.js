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

  const total = cart.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    return sum + qty;
  }, 0);

  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = total;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

/**********************
 PRODUCT LOAD
**********************/

const productDetail = document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (!productId && productDetail) {
  productDetail.innerHTML =
    "<p class='loading'>No product selected.</p>";
  throw new Error("Missing product id");
}

const API_URL = "https://fakestoreapi.com/products";

async function loadProduct() {
  try {
    const res = await fetch(`${API_URL}/${productId}`);

    if (!res.ok) throw new Error("Product not found");

    const product = await res.json();
    renderProduct(product);
  } catch (err) {
    console.error(err);

    if (productDetail) {
      productDetail.innerHTML =
        "<p class='loading'>Failed to load product.</p>";
    }
  }
}

/**********************
 RENDER PRODUCT
**********************/

function renderProduct(product) {
  productDetail.innerHTML = `
    <div class="detail-container">

      <div class="detail-image">
        <img id="mainImage" src="${product.image}" alt="${product.title}" />
      </div>

      <div class="detail-info">
        <h1>${product.title}</h1>

        <p class="detail-price">
          $<span id="unitPrice">${product.price}</span>
        </p>

        <p class="detail-desc">${product.description}</p>

        <div class="variations">
          <p>Size:</p>
          <div class="variation-options">
            <button class="var-btn active" data-value="S">S</button>
            <button class="var-btn" data-value="M">M</button>
            <button class="var-btn" data-value="L">L</button>
          </div>
        </div>

        <div class="quantity-control">
          <button id="decreaseQty">−</button>
          <span id="qty">1</span>
          <button id="increaseQty">+</button>
        </div>

        <p class="total-price">
          Total: $<span id="totalPrice">${product.price}</span>
        </p>

        <button class="add-btn" id="addToCartBtn">
          Add to Cart
        </button>

        <p class="cart-feedback" id="cartFeedback"></p>
      </div>

    </div>
  `;

  setupInteractions(product);
}

/**********************
 INTERACTIONS
**********************/

function setupInteractions(product) {
  const qtyEl = document.getElementById("qty");
  const increaseBtn = document.getElementById("increaseQty");
  const decreaseBtn = document.getElementById("decreaseQty");

  const totalPriceEl = document.getElementById("totalPrice");
  const unitPrice = Number(product.price);

  const feedback = document.getElementById("cartFeedback");

  let quantity = 1;
  let selectedSize = "S";

  function updateTotal() {
    totalPriceEl.textContent =
      (unitPrice * quantity).toFixed(2);
  }

  increaseBtn.addEventListener("click", () => {
    if (quantity < 10) {
      quantity++;
      qtyEl.textContent = quantity;
      updateTotal();
    }
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      qtyEl.textContent = quantity;
      updateTotal();
    }
  });

  document.querySelectorAll(".var-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".var-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
      selectedSize = btn.dataset.value;
    });
  });

  document
    .getElementById("addToCartBtn")
    .addEventListener("click", () => {
      addToCart(product, quantity, selectedSize);

      feedback.textContent = "✅ Added to cart!";
      feedback.classList.add("show");

      setTimeout(() => {
        feedback.classList.remove("show");
      }, 2000);
    });
}

/**********************
 ADD TO CART
**********************/

function addToCart(product, quantity, size) {
  if (quantity < 1) return;

  const cart = getCart();

  const existing = cart.find(
    (item) => item.id === product.id && item.size === size
  );

  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      image: product.image,
      quantity: Number(quantity),
      size,
    });
  }

  saveCart(cart);
  updateCartCount();
}

loadProduct();
