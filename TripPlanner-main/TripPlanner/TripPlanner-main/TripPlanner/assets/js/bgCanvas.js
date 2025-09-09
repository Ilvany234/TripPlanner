const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Crear esferas naranjas
class Sphere {
  constructor() {
    this.radius = Math.random() * 30 + 20;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.color = `rgba(255, 153, 0, ${Math.random() * 0.3 + 0.2})`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Rebote en los bordes
    if (this.x + this.radius > width || this.x - this.radius < 0) this.vx *= -1;
    if (this.y + this.radius > height || this.y - this.radius < 0) this.vy *= -1;
  }
}

const spheres = [];
for (let i = 0; i < 25; i++) spheres.push(new Sphere());

// Animación
function animate() {
  ctx.clearRect(0, 0, width, height);
  spheres.forEach(s => {
    s.update();
    s.draw();
  });
  requestAnimationFrame(animate);
}

animate();
