document.getElementById('tripForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener datos del formulario
  const budget = document.getElementById('budget').value;
  const tripType = document.getElementById('tripType').value;
  const interests = document.getElementById('interests').value;
  const destination = document.getElementById('destination').value;

  // Generar un plan según los datos
  const planDetails = generateTripPlan(budget, tripType, interests, destination);

  // Mostrar el plan
  document.getElementById('planDetails').innerHTML = planDetails;
  document.getElementById('results').style.display = 'block';
});

function generateTripPlan(budget, tripType, interests, destination) {
  // Aquí se pueden hacer cálculos más complejos, pero por ahora es un ejemplo básico
  let plan = `<h3>Plan para un viaje ${tripType} a ${destination}</h3>`;
  plan += `<p>Presupuesto: $${budget}</p>`;
  plan += `<p>Intereses: ${interests}</p>`;
  plan += `<p>Opciones de viaje:</p>`;

  if (tripType === 'family') {
    plan += `<ul>
      <li>Alojamiento: Hotel familiar</li>
      <li>Actividades: Parque de diversiones, Museo para niños</li>
      <li>Restaurantes: Menú para niños</li>
    </ul>`;
  } else if (tripType === 'couple') {
    plan += `<ul>
      <li>Alojamiento: Hotel boutique</li>
      <li>Actividades: Cena romántica, Paseo por la ciudad</li>
      <li>Restaurantes: Restaurantes gourmet</li>
    </ul>`;
  } else {
    plan += `<ul>
      <li>Alojamiento: Hostel o Airbnb</li>
      <li>Actividades: Caminatas, Tour cultural</li>
      <li>Restaurantes: Comida local, Opciones económicas</li>
    </ul>`;
  }

  return plan;
}
