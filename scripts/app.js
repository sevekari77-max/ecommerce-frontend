document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const productGrid = document.getElementById("productGrid");

const API_URL = "https://fakestoreapi.com/products";

async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderProducts(data);
  } catch (err) {
    productGrid.innerHTML =
      "<p class='loading'>⚠️ Failed to load products.</p>";
  }
}

function renderProducts(products) {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.addEventListener("click", () => {
      window.location.href = `product.html?id=${product.id}`;
    });

    card.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.title}"
        loading="lazy"
        width="300"
        height="300"
      />

      <h3 class="product-title">${product.title}</h3>

      <p class="product-price">$${product.price}</p>

      <p class="product-desc">
        ${product.description.substring(0, 80)}...
      </p>

      <button class="add-btn">Add to Cart</button>
    `;

    productGrid.appendChild(card);
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = total;
}

fetchProducts();
