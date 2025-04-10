// Make sure class names match exactly with your HTML structure
const itemList = document.querySelector('.itemlist'); // fixed: was '.item-list'
const totalItemsEl = document.querySelector('.summary-products'); // these should match your HTML
const subtotalEl = document.querySelector('.summary-subtotal');
const totalEl = document.querySelector('.summary-total');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCartItems() {
  itemList.innerHTML = '';

  if (cart.length === 0) {
    itemList.innerHTML = `<p>Your cart is empty.</p>`;
    updateSummary(); // still show $0 totals
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';

    itemDiv.innerHTML = `
      <div class="left-side">
        <img src="${item.image}" alt="${item.title}">
        <div class="item-info">
          <strong>${item.title}</strong>
          <p>${item.quantity} × $${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div class="quantity-controls">
        <button class="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="increase">+</button>
      </div>
    `;

    // Handle increase/decrease
    itemDiv.querySelector('.increase').addEventListener('click', () => {
      item.quantity++;
      saveCartAndRender();
    });

    itemDiv.querySelector('.decrease').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter(p => p.id !== item.id);
      }
      saveCartAndRender();
    });

    itemList.appendChild(itemDiv);
  });

  updateSummary();
}

function updateSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal > 0 ? 30 : 0;
  const total = subtotal + shipping;

  // If these elements don't exist in your HTML yet, add IDs or classes accordingly
  if (totalItemsEl) totalItemsEl.textContent = `Products (${totalItems}): $${subtotal.toFixed(2)}`;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

  // Also update the cart icon count
  const cartBtn = document.querySelector(".cart-btn");
  if (cartBtn) {
    cartBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${totalItems})`;
  }
}

function saveCartAndRender() {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

window.addEventListener('DOMContentLoaded', renderCartItems);
