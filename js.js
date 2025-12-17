class Producto {
  constructor({
    id,
    nombre,
    descripcion,
    precio,
    unidad,
    peso,
    categoria,
    variantes = [],
    ingredientes = [],
    imageUrl = "" // holder para imagen
  }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.unidad = unidad;
    this.peso = peso;
    this.categoria = categoria;
    this.variantes = variantes;
    this.ingredientes = ingredientes;
    this.imageUrl = imageUrl;
  }
}

const productos = [
  new Producto({
    id: "budin-ingles-350",
    nombre: "Budín inglés",
    descripcion: "Budín inglés glaseado",
    precio: 5500,
    unidad: "c/u",
    peso: "350 grs",
    categoria: "Budines",
    variantes: [
      "Frutas abrillantadas",
      "Chips de chocolate"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "mayonesa-de-ave",
    nombre: "Mayonesa de ave",
    descripcion: "Porción mediana, presentada en bandeja",
    precio: 5000,
    unidad: "por bandeja",
    peso: "Porción mediana",
    categoria: "Platos salados",
    ingredientes: [
      "Pollo",
      "Papa",
      "Zanahoria",
      "Arvejas",
      "Mayonesa"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "budines-saborizados-250",
    nombre: "Budines saborizados",
    descripcion: "Budines individuales",
    precio: 4500,
    unidad: "c/u",
    peso: "250 grs",
    categoria: "Budines",
    variantes: [
      "Vainilla",
      "Chocolate",
      "Marmolado",
      "Limón",
      "Banana"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "pan-dulce-individual",
    nombre: "Pan dulce individual",
    descripcion: "Pan dulce individual con mix de frutas o chips",
    precio: 3000,
    unidad: "c/u",
    peso: "Individual",
    categoria: "Pan dulce",
    variantes: [
      "Mix de frutas abrillantadas y secas",
      "Chips de chocolate"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "pan-dulce-400",
    nombre: "Pan dulce",
    descripcion: "Pan dulce tradicional",
    precio: 6000,
    unidad: "c/u",
    peso: "400 grs",
    categoria: "Pan dulce",
    variantes: [
      "Mix de frutas abrillantadas y secas",
      "Chips de chocolate"
    ],
    imageUrl: ""
  }),

  new Producto({
    id: "empanada-carne",
    nombre: "Empanada de carne suave",
    descripcion: "Empanada de carne tradicional",
    precio: 2500,
    unidad: "c/u",
    peso: "",
    categoria: "Empanadas",
    imageUrl: ""
  })
];

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('product-container')) {
        renderProducts();
    } else if (document.getElementById('product-detail-container')) {
        renderProductDetails();
    }

    updateCartUI();
    setupCartToggle();
    animateOnScroll();
});

function renderProductDetails() {
    const productDetailContainer = document.getElementById('product-detail-container');
    if (!productDetailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = productos.find(p => p.id === productId);

    if (!product) {
        productDetailContainer.innerHTML = '<p>Producto no encontrado.</p>';
        return;
    }

    const imageUrl = product.imageUrl || 'https://images.unsplash.com/photo-1589954738576-029b4b0abe0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

    productDetailContainer.innerHTML = `
        <div class="grid md:grid-cols-2 gap-12 items-start">
            <div class="rounded-lg overflow-hidden shadow-lg">
                <img src="${imageUrl}" alt="${product.nombre}" class="w-full h-full object-cover">
            </div>
            <div>
                <h1 class="text-3xl font-bold mb-4">${product.nombre}</h1>
                <p class="text-2xl font-bold text-green-700 mb-4">$${product.precio.toFixed(2)}</p>
                <p class="text-gray-600 mb-6">${product.descripcion}</p>

                <div class="flex items-center mb-6">
                    <button id="quantity-decrease" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-l">-</button>
                    <span id="quantity-value" class="px-4 py-1 border-t border-b">1</span>
                    <button id="quantity-increase" class="bg-gray-200 text-gray-700 px-3 py-1 rounded-r">+</button>
                </div>

                <button id="add-to-cart-btn" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md">
                    Añadir al carrito
                </button>
            </div>
        </div>
    `;

    const decreaseBtn = document.getElementById('quantity-decrease');
    const increaseBtn = document.getElementById('quantity-increase');
    const quantitySpan = document.getElementById('quantity-value');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    let quantity = 1;

    decreaseBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        }
    });

    increaseBtn.addEventListener('click', () => {
        quantity++;
        quantitySpan.textContent = quantity;
    });

    addToCartBtn.addEventListener('click', () => {
        addToCart(product.nombre, product.precio, imageUrl, quantity);
    });
}

function renderProducts() {
    const productContainer = document.getElementById('product-container');
    if (!productContainer) return;

    productContainer.innerHTML = '';

    productos.forEach(producto => {
        const productLink = document.createElement('a');
        productLink.href = `product.html?id=${producto.id}`;
        productLink.className = 'product-card bg-white rounded-lg overflow-hidden shadow-sm transition-transform hover:scale-105';

        const imageUrl = producto.imageUrl || 'https://images.unsplash.com/photo-1589954738576-029b4b0abe0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

        productLink.innerHTML = `
            <div class="relative pb-2/3 h-48 bg-gray-100">
                <img src="${imageUrl}" alt="${producto.nombre}" class="absolute h-full w-full object-cover">
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <div class="flex-grow">
                    <h3 class="text-lg font-medium text-gray-900">${producto.nombre}</h3>
                    <p class="text-lg font-bold text-green-700">$${producto.precio.toFixed(2)}</p>
                    <p class="mt-1 text-sm text-gray-500">${producto.descripcion}</p>
                </div>
                <div class="mt-auto pt-4">
                     <button class="btn-hover w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md">Ver Producto</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productLink);
    });
}

// --- Cart Functionality ---

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function setupCartToggle() {
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const continueShopping = document.getElementById('continue-shopping');

    if (cartButton) {
        cartButton.addEventListener('click', () => openCart());
    }
    if (closeCartButton) {
        closeCartButton.addEventListener('click', () => closeCart());
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => closeCart());
    }
    if (continueShopping) {
        continueShopping.addEventListener('click', () => closeCart());
    }
}

function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar) cartSidebar.classList.remove('translate-x-full');
    if (cartOverlay) cartOverlay.classList.remove('hidden');
}

function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar) cartSidebar.classList.add('translate-x-full');
    if (cartOverlay) cartOverlay.classList.add('hidden');
}

function addToCart(name, price, image, quantity = 1) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, image, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification('Añadido al carrito', 'fas fa-check-circle', 'bg-green-600');
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    if (!cartItemsContainer || !cartTotal || !cartCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="text-center py-12"><i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i><p class="text-gray-500">Tu carrito está vacío</p></div>`;
    } else {
        cartItemsContainer.innerHTML = `
            <ul class="-my-6 divide-y divide-gray-200">
                ${cart.map((item, index) => `
                    <li class="py-6 flex">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover">
                        </div>
                        <div class="ml-4 flex flex-1 flex-col">
                            <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                    <h3>${item.name}</h3>
                                    <p class="ml-4">$${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                                <div class="flex items-center">
                                    <button onclick="updateQuantity(${index}, -1)" class="px-2 py-1 text-gray-500 hover:text-gray-700">-</button>
                                    <p class="text-gray-500 px-2">Qty ${item.quantity}</p>
                                    <button onclick="updateQuantity(${index}, 1)" class="px-2 py-1 text-gray-500 hover:text-gray-700">+</button>
                                </div>
                                <div class="flex">
                                    <button onclick="removeFromCart(${index})" class="font-medium text-green-600 hover:text-green-500">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function showNotification(message, icon, bgColor) {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-3 rounded-md shadow-lg flex items-center z-50 animate__animated animate__fadeInRight`;
    notification.innerHTML = `<i class="${icon} mr-2"></i><span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.replace('animate__fadeInRight', 'animate__fadeOutRight');
        notification.addEventListener('animationend', () => notification.remove());
    }, 2000);
}

function checkout() {
    let message = 'Hola! Me gustaría pedir los siguientes productos:\n\n';
    cart.forEach(item => {
        message += `${item.name} - Cantidad: ${item.quantity} - Precio: $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal: $${total.toFixed(2)}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5491123456789&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('animate__fadeOut');
                entry.target.classList.add('animate__fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate__animated').forEach(el => {
        observer.observe(el);
    });
}
