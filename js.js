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

function renderProducts() {
        const productContainer = document.getElementById('product-container');
        if (!productContainer) {
            console.error("Product container not found");
            return;
        }

        productContainer.innerHTML = ''; // Clear existing products

        productos.forEach(producto => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-white rounded-lg overflow-hidden shadow-sm product-card animate__animated animate__fadeIn';

            const imageUrl = producto.imageUrl || 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80';

            let variantsHTML = '';
            if (producto.variantes && producto.variantes.length > 0) {
                variantsHTML = `<p class="mt-1 text-sm text-gray-500">Variantes: ${producto.variantes.join(', ')}</p>`;
            }

            let ingredientsHTML = '';
            if (producto.ingredientes && producto.ingredientes.length > 0) {
                ingredientsHTML = `<p class="mt-1 text-sm text-gray-500">Ingredientes: ${producto.ingredientes.join(', ')}</p>`;
            }

            // Escape single quotes in product name for onclick handler
            const safeProductName = producto.nombre.replace(/'/g, "\\'");

            productCard.innerHTML = `
                <div class="relative pb-2/3 h-48 bg-gray-100">
                    <img src="${imageUrl}" alt="${producto.nombre}" class="absolute h-full w-full object-cover">
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <div class="flex-grow">
                        <div class="flex justify-between items-start">
                            <h3 class="text-lg font-medium text-gray-900">${producto.nombre}</h3>
                            <p class="text-lg font-bold text-green-700">$${producto.precio}</p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">${producto.descripcion}</p>
                        <p class="mt-1 text-sm text-gray-500">${producto.peso ? `Peso: ${producto.peso}` : ''}</p>
                        ${variantsHTML}
                        ${ingredientsHTML}
                    </div>
                    <div class="mt-auto pt-4">
                        <button onclick="addToCart('${safeProductName}', ${producto.precio}, '${imageUrl}')" class="btn-hover w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors">
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            `;
            productContainer.appendChild(productCard);
        });
    }

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // DOM elements
    const cartButton = document.getElementById('cart-button');
    const closeCart = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const continueShopping = document.getElementById('continue-shopping');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    // Initialize cart when page loads
    document.addEventListener('DOMContentLoaded', function() {
        renderProducts();
        updateCart();
        setupCartToggle();
        animateOnScroll(); // Run once on load
    });

    // Cart toggle functionality
    function setupCartToggle() {
        if (!cartButton || !cartSidebar) return;

        // Open cart
        cartButton.addEventListener('click', (e) => {
            e.stopPropagation();
            cartSidebar.classList.remove('translate-x-full');
            cartOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        // Close cart function
        const closeCartFn = () => {
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        };

        // Event listeners for closing
        if (closeCart) closeCart.addEventListener('click', closeCartFn);
        if (continueShopping) continueShopping.addEventListener('click', closeCartFn);
        if (cartOverlay) cartOverlay.addEventListener('click', closeCartFn);
    }

    // Add to cart function with animation
    function addToCart(name, price, image) {
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name,
                price,
                image,
                quantity: 1
            });
        }

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Animate cart count
        if (cartCount) {
            cartCount.classList.remove('animate__bounceIn');
            void cartCount.offsetWidth; // Trigger reflow
            cartCount.classList.add('animate__animated', 'animate__bounceIn');
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }

        updateCart();

        // Show cart sidebar
        if (cartSidebar) {
            cartSidebar.classList.remove('translate-x-full');
            if (cartOverlay) cartOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        // Show success notification
        showNotification('Añadido al carrito', 'fas fa-check-circle', 'bg-green-600');
    }

    // Remove from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        showNotification('Sacado del carrito', 'fas fa-trash-alt', 'bg-red-500');
    }

    // Update quantity
    function updateQuantity(index, change) {
        const newQuantity = cart[index].quantity + change;

        if (newQuantity < 1) {
            removeFromCart(index);
        } else {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();

            if (change > 0) {
                showNotification('Se agrego una unidad', 'fas fa-plus', 'bg-blue-500');
            } else {
                showNotification('Se quito una unidad', 'fas fa-minus', 'bg-yellow-500');
            }
        }
    }

    // Show notification function
    function showNotification(message, icon, bgColor) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 ${bgColor} text-white px-4 py-3 rounded-md shadow-lg flex items-center z-50 cart-notification`;
        notification.innerHTML = `
            <i class="${icon} mr-2"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2500);
    }

    // Update cart UI
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalItems;

        // Update cart items
        if (cartItemsContainer) {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="text-center py-12">
                        <i class="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">Tu carrito está vacío</p>
                    </div>
                `;
            } else {
                cartItemsContainer.innerHTML = `
                    <ul class="-my-6 divide-y divide-gray-200">
                        ${cart.map((item, index) => `
                            <li class="cart-item py-6 flex animate__animated animate__fadeIn">
                                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src="${item.image}" alt="${item.name}" class="h-full w-full object-cover object-center">
                                </div>
                                <div class="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div class="flex justify-between text-base font-medium text-gray-900">
                                            <h3>${item.name}</h3>
                                            <p class="ml-4">$${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div class="flex flex-1 items-end justify-between text-sm">
                                        <div class="flex items-center border rounded-md">
                                            <button onclick="updateQuantity(${index}, -1)" class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors">-</button>
                                            <span class="px-3">${item.quantity}</span>
                                            <button onclick="updateQuantity(${index}, 1)" class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors">+</button>
                                        </div>
                                        <button onclick="removeFromCart(${index})" class="font-medium text-green-600 hover:text-green-500 transition-colors">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </li>
                        `).join('')}
                    </ul>
                `;
            }
        }

        // Update cart total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Checkout function with WhatsApp integration
    function checkout() {
        if (cart.length === 0) {
            showNotification('¡Tu carrito está vacío!', 'fas fa-exclamation-circle', 'bg-red-500');
            return;
        }

        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create order message for WhatsApp
        let message = "¡Hola! Quiero hacer un pedido:\n\n";

        cart.forEach(item => {
            message += `- ${item.name} (${item.quantity} x $${item.price.toFixed(2)}) = $${(item.price * item.quantity).toFixed(2)}\n`;
        });

        message += `\nTotal: $${total.toFixed(2)}\n\nGracias!`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/+5491133683420?text=${encodedMessage}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        // Show confirmation
        showNotification(`¡Pedido realizado por $${total.toFixed(2)}!`, 'fas fa-check-circle', 'bg-green-600');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                const animationClass = element.classList.contains('animate__fadeIn') ? 'animate__fadeIn' :
                                      element.classList.contains('animate__fadeInUp') ? 'animate__fadeInUp' :
                                      element.classList.contains('animate__fadeInLeft') ? 'animate__fadeInLeft' :
                                      element.classList.contains('animate__fadeInRight') ? 'animate__fadeInRight' : '';

                if (animationClass && !element.classList.contains('animate__animated')) {
                    element.classList.add('animate__animated', animationClass);
                }
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
