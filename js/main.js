document.addEventListener('DOMContentLoaded', () => {
  // Cargar el carrito desde localStorage o inicializar un array vacío.
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Objeto que mapea los nombres de productos a sus precios.
  const productList = {
    "Café Especial": 3.50,
    "Capuchino": 4.00,
    "Espresso": 2.50,
    "Latte": 4.50,
    "Frappé": 5.00
    // Puedes agregar más productos aquí.
  };

  // Función para guardar el carrito en localStorage.
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Función para actualizar la visualización del carrito.
  function updateCartDisplay() {
    const cartList = document.querySelector('.Carrito-list');
    const cartTotalEl = document.querySelector('.Carrito-total');
    // Si no se encuentra la sección del carrito (por ejemplo, en tienda.html), se sale.
    if (!cartList || !cartTotalEl) return;
    
    // Limpiar el contenido actual.
    cartList.innerHTML = '';
    let total = 0;
    
    // Recorrer y mostrar cada producto del carrito.
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('Carrito-item');
      li.innerHTML = `
        <span class="Carrito-itemName">${item.name}</span>
        <span class="Carrito-itemPrice">$${item.price.toFixed(2)}</span>
        <button class="Carrito-itemRemove" data-index="${index}">Eliminar</button>
      `;
      cartList.appendChild(li);
      total += item.price;
    });
    
    // Actualizar el total.
    cartTotalEl.textContent = `$${total.toFixed(2)}`;

    // Asignar eventos a los botones de eliminación.
    const removeButtons = document.querySelectorAll('.Carrito-itemRemove');
    removeButtons.forEach(button => {
      button.addEventListener('click', removeItemFromCart);
    });
  }

  // Función para agregar un producto al carrito.
  function addToCart(event) {
    const button = event.currentTarget;
    const productContainer = button.closest('.Tienda-item');
    const productNameEl = productContainer.querySelector('.Tienda-itemTitle');
    if (!productNameEl) return;
    
    const productName = productNameEl.textContent.trim();
    const productPrice = productList[productName] || 0;
    
    // Agregar el producto al array del carrito.
    cart.push({ name: productName, price: productPrice });
    alert(`Se ha añadido "${productName}" al carrito.`);
    
    // Guardar el carrito y actualizar la visualización.
    saveCart();
    updateCartDisplay();
  }

  // Función para eliminar un producto del carrito.
  function removeItemFromCart(event) {
    const index = event.currentTarget.getAttribute('data-index');
    if (index !== null) {
      cart.splice(index, 1);
      saveCart();
      updateCartDisplay();
    }
  }

  // Asignar eventos a los botones "Añadir al carrito" si existen (en tienda.html).
  const addButtons = document.querySelectorAll('.Tienda-itemButton');
  if (addButtons.length > 0) {
    addButtons.forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }

  // Actualizar la visualización del carrito (si la página contiene la sección correspondiente).
  updateCartDisplay();
});
