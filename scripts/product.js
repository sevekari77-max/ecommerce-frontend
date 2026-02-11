const productDetail = document.getElementById("productDetail");
const cartCountEl = document.getElementById("cartCount");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const API_URL = "https://fakestoreapi.com/products";

async function loadProduct() {
  try {
    const res = await fetch(`${API_URL}/${productId}`);

    if (!res.ok) throw new Error("Product not found");

    const product = await res.json();

    renderProduct(product);
  } catch (err) {
    productDetail.innerHTML =
      "<p class='loading'>Failed to load product.</p>";
  }
}

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

        <!-- VARIATIONS -->
        <div class="variations">
          <p>Size:</p>
          <div class="variation-options">
            <button class="var-btn active" data-value="S">S</button>
            <button class="var-btn" data-value="M">M</button>
            <button class="var-btn" data-value="L">L</button>
          </div>
        </div>

        <!-- QUANTITY -->
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

function setupInteractions(product) {
  const qtyEl = document.getElementById("qty");
  const increaseBtn = document.getElementById("increaseQty");
  const decreaseBtn = document.getElementById("decreaseQty");

  const totalPriceEl = document.getElementById("totalPrice");
  const unitPrice = product.price;

  const feedback = document.getElementById("cartFeedback");

  let quantity = 1;
  let selectedSize = "S";

  /* -------- QUANTITY -------- */

  function updateTotal() {
    totalPriceEl.textContent = (unitPrice * quantity).toFixed(2);
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

  /* -------- VARIATIONS -------- */

  document.querySelectorAll(".var-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".var-btn")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
      selectedSize = btn.dataset.value;
    });
  });

  /* -------- ADD TO CART -------- */

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

/* CART */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product, quantity, size) {
  const cart = getCart();

  cart.push({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity,
    size,
  });

  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  cartCountEl.textContent = cart.length;
}

updateCartCount();
loadProduct();
