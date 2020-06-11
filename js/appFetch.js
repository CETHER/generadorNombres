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
  url += 'http://localhost/api/?';

  if (origenSeleccionado !== '') {
    url += `region=${origenSeleccionado}&`;
  }
  if (generoSeleccionado !== '') {
    url += `gender=${generoSeleccionado}&`;
  }
  if (cantidadSeleccionada !== '') {
    url += `amount=${cantidadSeleccionada}&`;
  }

  //fetch
  fetch(url)
    .then( res => res.json() )
    .then( data => {
      let templateNombres = `<h2>Nombres Generados</h2>`;
      templateNombres += `<ul class="lista">`
      data.forEach(nombre => {
        templateNombres += `
          <li>${nombre.name}</li>
        `
      });
      templateNombres += `</ul">`

      const div = document.getElementById('resultado');
      div.innerHTML = templateNombres
    })
    .catch( error => console.log(error) );
}