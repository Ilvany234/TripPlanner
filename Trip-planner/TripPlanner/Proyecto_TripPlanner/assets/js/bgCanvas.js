// Obtener el canvas y su contexto 2D
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let width, height;
// Función para ajustar el tamaño del canvas al de la ventana
function resize() {
  width = canvas.width = window.innerWidth; // Ancho = ancho de la ventana
  height = canvas.height = window.innerHeight; // Alto = alto de la ventana
}
// Se actualiza el tamaño del canvas cada vez que cambia la ventana
window.addEventListener("resize", resize);
resize(); // Llamada inicial para establecer dimensiones

// ==== Clase Sphere ====
// Representa una esfera animada en el canvas
class Sphere {
  constructor() {
    // Radio aleatorio entre 20 y 50 px
    this.radius = Math.random() * 30 + 20;
    // Posición inicial aleatoria dentro del canvas
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    // Velocidad en x e y (valores pequeños, positivos o negativos)
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    // Color en tono naranja con transparencia aleatoria
    this.color = `rgba(255, 153, 0, ${Math.random() * 0.3 + 0.2})`;
  }

  // Dibuja la esfera en el canvas
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Círculo completo
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Actualiza la posición de la esfera
  update() {
    this.x += this.vx; // Desplazamiento en X
    this.y += this.vy; // Desplazamiento en Y

    // Rebote en los bordes horizontales
    if (this.x + this.radius > width || this.x - this.radius < 0) this.vx *= -1;
    // Rebote en los bordes verticales
    if (this.y + this.radius > height || this.y - this.radius < 0) this.vy *= -1;
  }
}

// Crear un arreglo de esferas
const spheres = [];
for (let i = 0; i < 25; i++) spheres.push(new Sphere());

// ==== Animación ====
function animate() {
  // Limpiar el canvas en cada frame
  ctx.clearRect(0, 0, width, height);

  // Actualizar y dibujar cada esfera
  spheres.forEach(s => {
    s.update();
    s.draw();
  });

  // Volver a ejecutar la función en el siguiente frame
  requestAnimationFrame(animate);
}

// Iniciar animación
animate();
