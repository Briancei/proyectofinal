// tienda.js
(() => {
  const gridProductos = document.querySelector('.Productos');
  const carritoSidebar = document.getElementById('carritoSidebar');
  const carritoItems = document.getElementById('carritoItems');
  const carritoVacio = document.getElementById('carritoVacio');
  const carritoTotal = document.getElementById('carritoTotal');
  const botonPagar = document.getElementById('botonPagar');
  const botonCerrarCarrito = document.getElementById('botonCerrarCarrito');
  const botonMenu = document.getElementById('botonMenu');

  let carrito = [];

  // Renderizado inicial de carrito
  refrescarCarrito();

  // Delegación de eventos para botones "Añadir"
  gridProductos.addEventListener('click', (e) => {
    if (e.target.matches('.Producto-boton')) {
      const id = e.target.dataset.id;
      const producto = PRODUCTOS.find(p => p.id == id);
      carrito.push(producto);
      refrescarCarrito();
      abrirCarrito();
    }
  });

  botonCerrarCarrito.addEventListener('click', cerrarCarrito);

  botonPagar.addEventListener('click', () => {
    alert('Simulación de pago completada. ¡Gracias por tu compra!');
    carrito = [];
    refrescarCarrito();
    cerrarCarrito();
  });

  function abrirCarrito() {
    carritoSidebar.classList.add('Carrito--abierto');
  }

  function cerrarCarrito() {
    carritoSidebar.classList.remove('Carrito--abierto');
  }

  function refrescarCarrito() {
    carritoItems.innerHTML = '';
    if (carrito.length === 0) {
      carritoVacio.style.display = 'block';
      carritoTotal.textContent = '';
      botonPagar.disabled = true;
      botonPagar.classList.add('Boton--bloqueado');
    } else {
      carritoVacio.style.display = 'none';
      let total = 0;
      carrito.forEach(item => {
        total += item.precio;
        const div = document.createElement('div');
        div.className = 'Carrito-item';
        div.innerHTML = `
          <span class="Carrito-item-nombre">${item.nombre}</span>
          <span class="Carrito-item-precio">€${item.precio.toFixed(2)}</span>
        `;
        carritoItems.appendChild(div);
      });
      carritoTotal.textContent = 'Total: €' + total.toFixed(2);
      botonPagar.disabled = false;
      botonPagar.classList.remove('Boton--bloqueado');
    }
  }
})();
