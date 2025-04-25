// menu.js
(() => {
  const botonMenu = document.getElementById('botonMenu');
  const menu = document.getElementById('menuPrincipal');

  if (botonMenu && menu) {
    botonMenu.addEventListener('click', () => {
      menu.classList.toggle('Menu--abierto');
      menu.classList.toggle('Menu--cerrado');
    });

    // Cierra el menú al clicar un enlace en móviles
    menu.addEventListener('click', (e) => {
      if (e.target.matches('.Menu-link') && window.innerWidth <= 768) {
        menu.classList.remove('Menu--abierto');
        menu.classList.add('Menu--cerrado');
      }
    });

    // Cierra el menú al pasar a escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        menu.classList.remove('Menu--abierto');
        menu.classList.add('Menu--cerrado');
      }
    });
  }
})();
