// Ejemplo de interacción (puedes ampliarlo)
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Gracias por tu interés. Pronto te contactaremos.');
    });
  });
});
