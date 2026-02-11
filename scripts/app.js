const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    productGrid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price}</p>
        <button class="add-btn">Add to Cart</button>
      `;

      productGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load products:", error);
    productGrid.innerHTML = "<p>Error loading products.</p>";
  }
}

loadProducts();

