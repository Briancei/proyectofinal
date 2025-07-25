document.addEventListener("DOMContentLoaded", () => {
  const productos = [
    { id: 1, nombre: "Café en grano", precio: 9.5 },
    { id: 2, nombre: "Café molido", precio: 8.5 }
  ];

  const carrito = [];
  const items = document.getElementById("items");
  const vacio = document.getElementById("vacio");
  const total = document.getElementById("total");
  const pagar = document.getElementById("pagar");
  const cerrar = document.getElementById("cerrar");
  const aside = document.getElementById("carrito");

  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const prod = productos.find(p => p.id === id);
      if (prod) carrito.push(prod);
      renderCarrito();
      aside.classList.add("abierto");
    });
  });

  cerrar.addEventListener("click", () => aside.classList.remove("abierto"));

  pagar.addEventListener("click", () => {
    alert("Compra realizada");
    carrito.length = 0;
    renderCarrito();
    aside.classList.remove("abierto");
  });

  function renderCarrito() {
    items.innerHTML = "";
    if (carrito.length === 0) {
      vacio.style.display = "block";
      total.textContent = "";
      pagar.disabled = true;
      return;
    }
    vacio.style.display = "none";
    let suma = 0;
    carrito.forEach(p => {
      suma += p.precio;
      const div = document.createElement("div");
      div.textContent = `${p.nombre} - €${p.precio.toFixed(2)}`;
      items.appendChild(div);
    });
    total.textContent = "Total: €" + suma.toFixed(2);
    pagar.disabled = false;
  }
});
