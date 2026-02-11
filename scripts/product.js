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
        <img src="${product.image}" alt="${product.title}" />
      </div>

      <div class="detail-info">
        <h1>${product.title}</h1>
        <p class="detail-price">$${product.price}</p>
        <p class="detail-desc">${product.description}</p>

        <button class="add-btn" id="addToCartBtn">
          Add to Cart
        </button>
      </div>

    </div>
  `;

  document
    .getElementById("addToCartBtn")
    .addEventListener("click", () => addToCart(product));
}

/* CART */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();

  cart.push(product);

  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  cartCountEl.textContent = cart.length;
}

updateCartCount();
loadProduct();
