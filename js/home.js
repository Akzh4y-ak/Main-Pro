const productList = document.getElementById('product-list');
const categoryButtons = document.querySelectorAll('#category-buttons button');

let allProducts = [];

// Fetch all products once
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  });

// Render product cards
function renderProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h4 class="product-title">${product.title}</h4>
      <p class="product-description">${product.description}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <div class="product-buttons">
        <button class="details-btn">Details</button>
        <button class="add-btn">Add to Cart</button>
      </div>
    `;

    // 🛒 Attach event listener to "Add to Cart" button
    const addBtn = card.querySelector('.add-btn');
    addBtn.addEventListener('click', () => addToCart(product));

    productList.appendChild(card);
  });
}

// Filter products by category
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.category;

    // Highlight active button
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filter products
    if (selectedCategory === 'all') {
      renderProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      renderProducts(filteredProducts);
    }
  });
});


// ✅ Add to Cart function
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// ✅ Update cart icon count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((sum, item) => {
    const qty = item.quantity || 1; // avoid NaN
    return sum + qty;
  }, 0);

  const cartBtn = document.querySelector(".cart-btn");
  if (cartBtn) {
    cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${totalItems})`;
  }
}

// ✅ Call this on load
window.addEventListener("DOMContentLoaded", updateCartCount);


