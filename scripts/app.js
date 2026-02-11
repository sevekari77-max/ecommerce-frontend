const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
const productGrid = document.getElementById("productGrid");

const API_URL = "https://fakestoreapi.com/products";
const CACHE_KEY = "products-cache";
const CACHE_TIME = 1000 * 60 * 10; // 10 minutes

async function fetchProducts() {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    const parsed = JSON.parse(cached);

    if (Date.now() - parsed.timestamp < CACHE_TIME) {
      renderProducts(parsed.data);
      return;
    }
  }

  try {
    productGrid.innerHTML = `<p class="loading">Loading products...</p>`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(API_URL, {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    );

    renderProducts(data);
  } catch (error) {
    console.error(error);

    productGrid.innerHTML = `
      <p class="loading">⚠️ Failed to load products. Please refresh.</p>
    `;
  }
}

function renderProducts(products) {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" loading="lazy" />

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

fetchProducts();


