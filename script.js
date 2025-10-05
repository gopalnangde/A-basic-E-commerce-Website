// Sample Product Data (Reduced to 6 products)
const products = [
    { id: 1, name: 'Wireless Headphones', category: 'electronics', price: 1499, emoji: '🎧', description: 'Premium wireless headphones with noise cancellation and long battery life.' },
    { id: 2, name: 'Cotton T-Shirt', category: 'clothing', price: 499, emoji: '👕', description: 'Comfortable 100% cotton t-shirt available in multiple colors.' },
    { id: 3, name: 'Leather Wallet', category: 'accessories', price: 299, emoji: '👛', description: 'Genuine leather wallet with multiple card slots and coin pocket.' },
    { id: 4, name: 'Smart Watch', category: 'electronics', price: 1899, emoji: '⌚', description: 'Feature-rich smartwatch with fitness tracking and notifications.' },
    { id: 5, name: 'Sunglasses', category: 'accessories', price: 249, emoji: '🕶️', description: 'Stylish sunglasses with UV protection and polarized lenses.' },
    { id: 6, name: 'Table Lamp', category: 'home', price: 599, emoji: '💡', description: 'Modern LED table lamp with adjustable brightness settings.' }
];

let cart = [];
let currentFilter = 'all';
let selectedProduct = null;

// Initialize
renderProducts();
updateCartCount();

// Render Products
function renderProducts() {
    const grid = document.getElementById('productGrid');
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openModal(${product.id})">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description.substring(0, 60)}...</p>
                <div class="product-footer">
                    <div class="product-price">Rs. ${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Products
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.filter;
        renderProducts();
    });
});

// Modal Functions
function openModal(productId) {
    const product = products.find(p => p.id === productId);
    selectedProduct = product;
    
    document.getElementById('modalImage').textContent = product.emoji;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `Rs. ${product.price.toFixed(2)}`;
    
    document.getElementById('productModal').classList.add('active');
}

document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('productModal').classList.remove('active');
});

document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
        document.getElementById('productModal').classList.remove('active');
    }
});

document.getElementById('modalAddToCart').addEventListener('click', () => {
    if (selectedProduct) {
        addToCart(selectedProduct.id);
    }
});

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) existingItem.quantity++;
    else cart.push({ ...product, quantity: 1 });

    updateCartCount();
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        document.getElementById('cartTotal').textContent = 'Rs. 0.00';
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rs. ${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `Rs. ${total.toFixed(2)}`;
}

// Cart Sidebar Toggle
document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.add('active');
});

document.getElementById('cartClose').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('active');
});
