// Datos de planes y servicios
const planes = {
  naturaleza: {
    precio: 500,
    servicios: [
      { nombre: "Hotel 3★", precio: 200 },
      { nombre: "Tour por la montaña", precio: 150 },
      { nombre: "Traslado al aeropuerto", precio: 50 }
    ]
  },
  romantica: {
    precio: 700,
    servicios: [
      { nombre: "Hotel boutique", precio: 300 },
      { nombre: "Cena romántica", precio: 150 },
      { nombre: "Spa y masaje", precio: 250 }
    ]
  },
  familiar: {
    precio: 900,
    servicios: [
      { nombre: "Hotel familiar", precio: 400 },
      { nombre: "Parque temático", precio: 250 },
      { nombre: "Traslado + snacks", precio: 100 }
    ]
  }
};

// Elementos del formulario
const planSelect = document.getElementById("plan");
const serviciosContainer = document.getElementById("serviciosContainer");
const resumenDiv = document.getElementById("resumen");
const reservaForm = document.getElementById("reservaForm");
let serviciosSeleccionados = [];

// Mostrar servicios según plan
function mostrarServicios(plan) {
  serviciosContainer.innerHTML = "";
  serviciosSeleccionados = [];

  planes[plan].servicios.forEach((servicio, index) => {
    const disponibilidad = Math.floor(Math.random() * 5) + 1; // aleatoria 1-5

    const div = document.createElement("div");
    div.classList.add("form-check");
    div.innerHTML = `
      <input class="form-check-input servicio-check" type="checkbox" 
             value="${servicio.precio}" id="servicio${index}" checked>
      <label class="form-check-label" for="servicio${index}">
        ${servicio.nombre} - $${servicio.precio} 
        <span class="badge bg-${disponibilidad <= 2 ? "danger" : "success"}">
          ${disponibilidad <= 2 ? "Baja disponibilidad" : "Disponible"}
        </span>
      </label>
    `;
    serviciosContainer.appendChild(div);

    serviciosSeleccionados.push(servicio);
  });

  actualizarResumen();
}

// Calcular y mostrar resumen
function actualizarResumen() {
  const plan = planSelect.value;
  let total = planes[plan].precio;
  let detalle = `<strong>Plan seleccionado:</strong> ${plan.toUpperCase()} - $${planes[plan].precio}<br><ul>`;

  document.querySelectorAll(".servicio-check").forEach((check, i) => {
    if (check.checked) {
      detalle += `<li>${planes[plan].servicios[i].nombre} - $${planes[plan].servicios[i].precio}</li>`;
      total += planes[plan].servicios[i].precio;
    }
  });

  detalle += `</ul><strong>Total estimado: $${total}</strong>`;
  resumenDiv.innerHTML = detalle;
}

// Eventos
planSelect.addEventListener("change", () => mostrarServicios(planSelect.value));
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("servicio-check")) {
    actualizarResumen();
  }
});

// Inicializar
mostrarServicios(planSelect.value);

//========================================================================
// VALIDACIÓN FORMULARIO

reservaForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita envío automático

  // Obtener valores del formulario
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const people = parseInt(document.getElementById("people").value);

  // Validaciones
  if (name === "") {
    alert("Por favor ingresa tu nombre completo.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Por favor ingresa un correo electrónico válido.");
    return;
  }

  const phonePattern = /^[0-9\s+()-]{8,}$/;
  if (!phonePattern.test(phone)) {
    alert("Por favor ingresa un número de contacto válido.");
    return;
  }

  const today = new Date();
  const selectedDate = new Date(date);
  today.setHours(0,0,0,0); // Ignorar horas
  if (selectedDate < today) {
    alert("La fecha del viaje no puede ser anterior a hoy.");
    return;
  }

  if (isNaN(people) || people < 1) {
    alert("Por favor ingresa al menos 1 persona.");
    return;
  }

  // Opcional: validar que al menos un servicio esté seleccionado
  const anyChecked = Array.from(document.querySelectorAll(".servicio-check")).some(cb => cb.checked);
  if (!anyChecked) {
    alert("Debes seleccionar al menos un servicio del plan.");
    return;
  }

  // Si todo está correcto
  alert("¡Reserva enviada! Nos pondremos en contacto contigo en las próximas horas.");
  reservaForm.reset();
  mostrarServicios(planSelect.value); // reiniciar servicios
});
