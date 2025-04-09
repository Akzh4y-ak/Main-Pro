const productList = document.getElementById('product-list');

fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => renderProducts(data));

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

    productList.appendChild(card);
  });
}

