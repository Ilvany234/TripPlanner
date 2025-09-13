// ==================== DATOS DE PLANES Y SERVICIOS ====================
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

// ==================== ELEMENTOS DEL FORMULARIO ====================
const planSelect = document.getElementById("plan"); // selector de plan
const serviciosContainer = document.getElementById("serviciosContainer"); // contenedor para los servicios
const resumenDiv = document.getElementById("resumen"); // resumen dinámico
const reservaForm = document.getElementById("reservaForm"); // formulario de reserva
let serviciosSeleccionados = []; // array para almacenar servicios elegidos

// ==================== MOSTRAR SERVICIOS SEGÚN PLAN ====================
function mostrarServicios(plan) {
  serviciosContainer.innerHTML = ""; // limpiar contenedor
  serviciosSeleccionados = []; // reiniciar seleccionados

  // recorrer servicios del plan elegido
  planes[plan].servicios.forEach((servicio, index) => {
    // generar disponibilidad aleatoria entre 1 y 5
    const disponibilidad = Math.floor(Math.random() * 5) + 1;

    // crear div contenedor del servicio
    const div = document.createElement("div");
    div.classList.add("form-check");

    // crear checkbox + etiqueta con disponibilidad
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

    serviciosContainer.appendChild(div); // agregar al DOM
    serviciosSeleccionados.push(servicio); // añadir al array
  });

  actualizarResumen(); // actualizar total
}

// ==================== CALCULAR Y MOSTRAR RESUMEN ====================
function actualizarResumen() {
  const plan = planSelect.value; // obtener plan actual
  let total = planes[plan].precio; // precio base del plan
  let detalle = `<strong>Plan seleccionado:</strong> ${plan.toUpperCase()} - $${planes[plan].precio}<br><ul>`;

  // recorrer todos los checkboxes de servicios
  document.querySelectorAll(".servicio-check").forEach((check, i) => {
    if (check.checked) {
      // agregar servicio al detalle y sumar precio
      detalle += `<li>${planes[plan].servicios[i].nombre} - $${planes[plan].servicios[i].precio}</li>`;
      total += planes[plan].servicios[i].precio;
    }
  });

  detalle += `</ul><strong>Total estimado: $${total}</strong>`;
  resumenDiv.innerHTML = detalle; // mostrar en el DOM
}

// ==================== EVENTOS ====================
// Cuando cambia el plan seleccionado
planSelect.addEventListener("change", () => mostrarServicios(planSelect.value));

// Cuando cambia algún servicio (checkbox)
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("servicio-check")) {
    actualizarResumen();
  }
});

// Inicializar con el plan por defecto
mostrarServicios(planSelect.value);

//========================================================================
// ==================== VALIDACIÓN DEL FORMULARIO ====================
reservaForm.addEventListener("submit", (e) => {
  e.preventDefault(); // evita que se envíe automáticamente

  // Obtener valores de los campos
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const people = parseInt(document.getElementById("people").value);

  // Validación: nombre no vacío
  if (name === "") {
    alert("Por favor ingresa tu nombre completo.");
    return;
  }

  // Validación: email con formato correcto
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Por favor ingresa un correo electrónico válido.");
    return;
  }

  // Validación: teléfono con caracteres permitidos
  const phonePattern = /^[0-9\s+()-]{8,}$/;
  if (!phonePattern.test(phone)) {
    alert("Por favor ingresa un número de contacto válido.");
    return;
  }

  // Validación: fecha no puede ser anterior a hoy
  const today = new Date();
  const selectedDate = new Date(date);
  today.setHours(0,0,0,0); // ignorar horas
  if (selectedDate < today) {
    alert("La fecha del viaje no puede ser anterior a hoy.");
    return;
  }

  // Validación: al menos 1 persona
  if (isNaN(people) || people < 1) {
    alert("Por favor ingresa al menos 1 persona.");
    return;
  }

  // Validación: al menos un servicio seleccionado
  const anyChecked = Array.from(document.querySelectorAll(".servicio-check")).some(cb => cb.checked);
  if (!anyChecked) {
    alert("Debes seleccionar al menos un servicio del plan.");
    return;
  }

  // Si todas las validaciones pasan
  alert("¡Reserva enviada! Nos pondremos en contacto contigo en las próximas horas.");
  reservaForm.reset(); // limpiar formulario
  mostrarServicios(planSelect.value); // reiniciar servicios y resumen
});
