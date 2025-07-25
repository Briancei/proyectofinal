
const PRODUCTOS = [
  { id: 1, nombre: "Café en grano", precio: 9.5 },
  { id: 2, nombre: "Café en capsulas", precio: 8 },
  { id: 3, nombre: "Café molido", precio: 8.5 },
  { id: 4, nombre: "Set de tazas café", precio: 19.9 }
];

window.addEventListener('DOMContentLoaded', () => {
  const gridProductos = document.querySelector('.Productos');
  const carritoSidebar = document.getElementById('carritoSidebar');
  const carritoItems = document.getElementById('carritoItems');
  const carritoVacio = document.getElementById('carritoVacio');
  const carritoTotal = document.getElementById('carritoTotal');
  const botonPagar = document.getElementById('botonPagar');
  const botonCerrarCarrito = document.getElementById('botonCerrarCarrito');

  let carrito = [];

  refrescarCarrito();

  
  gridProductos.addEventListener('click', (e) => {
    if (e.target.matches('.Producto-boton')) {
      const id = parseInt(e.target.dataset.id);
      const producto = PRODUCTOS.find(p => p.id === id);
      if (producto) {
        carrito.push(producto);
        refrescarCarrito();
        abrirCarrito();
      }
    }
  });

  // Cerrar carrito
  botonCerrarCarrito.addEventListener('click', cerrarCarrito);

  // Simular pago
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
});
