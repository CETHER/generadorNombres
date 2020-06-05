//variables
const formulario = document.getElementById('generar-nombre');
const origen = document.getElementById('origen');
const genero = document.getElementById('genero');
const cantidad = document.getElementById('numero');

//eventlisteners
formulario.addEventListener('submit', cargarNombres);

//funciones
function cargarNombres(e) {
  e.preventDefault();

  origenSeleccionado = origen.options[origen.selectedIndex].value;
  generoSeleccionado = genero.options[genero.selectedIndex].value;
  cantidadSeleccionada = cantidad.value;

  let url = '';
  url += 'https://uinames.com/api/?';

  if (origenSeleccionado !== '') {
    url += `region=${origenSeleccionado}&`;
  }
  if (generoSeleccionado !== '') {
    url += `gender=${generoSeleccionado}&`;
  }
  if (cantidadSeleccionada !== '') {
    url += `amount=${cantidadSeleccionada}&`;
  }
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (this.status === 200) {
      const nombres = JSON.parse(this.responseText)
      let templateNombres = `
        <h2>Nombres Generados</h2>
      `;

      templateNombres += `
        <ul class="lista">
      `
      nombres.forEach(nombre => {
        templateNombres += `
          <li>${nombre.name}
        `
      });

      templateNombres += `
        </ul">
      `

      const div = document.getElementById('reslutado');
      div.innerHTML = templateNombres
    }
  }
  
  xhr.send();
}