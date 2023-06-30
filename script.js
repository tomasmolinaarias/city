alert("Los resultados de los botones apareceran en la consola, para abrir la consola rapidamente presione ctrl+shift+i")
// Definición de la clase Nodo
class Nodo {
  constructor(id) {
    this.id = id;
    this.vecinos = [];
    this.familias = [];
  }

  agregarVecino(nodo, distancia) {
    this.vecinos.push({ nodo, distancia });
  }

  agregarFamilia(familia) {
    this.familias.push(familia);
  }
}

// Definición de la clase Familia
class Familia {
  constructor(nombre, miembros, imagen) {
    this.nombre = nombre;
    this.miembros = miembros;
    this.imagen = imagen;
  }
}

// Función para generar un número aleatorio entre un rango dado
function generarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Creación del grafo de 25 nodos
const grafo = [];
for (let i = 0; i <= 25; i++) {
  grafo.push(new Nodo(`nodo${i}`));
}

// Conexiones entre los nodos
const filas = 5;
const columnas = 5;
for (let i = 0; i < filas; i++) {
  for (let j = 0; j < columnas; j++) {
    const nodoActual = grafo[i * columnas + j];
    // Conexión con el nodo de la izquierda (si existe)
    if (j > 0) {
      const nodoIzquierda = grafo[i * columnas + j - 1];
      const distancia = generarNumeroAleatorio(70, 130);
      nodoActual.agregarVecino(nodoIzquierda, distancia);
      nodoIzquierda.agregarVecino(nodoActual, distancia);
    }
    // Conexión con el nodo de arriba (si existe)
    if (i > 0) {
      const nodoArriba = grafo[(i - 1) * columnas + j];
      const distancia = generarNumeroAleatorio(70, 130);
      nodoActual.agregarVecino(nodoArriba, distancia);
      nodoArriba.agregarVecino(nodoActual, distancia);
    }
  }
}

// Función para el algoritmo A*
function algoritmoAStar(inicio, final) {
  // Función heurística para estimar la distancia restante (distancia Manhattan)
  function heuristica(nodo1, nodo2) {
    const id1 = parseInt(nodo1.id.replace('nodo', ''));
    const id2 = parseInt(nodo2.id.replace('nodo', ''));
    const fila1 = Math.floor((id1 - 1) / columnas);
    const columna1 = (id1 - 1) % columnas;
    const fila2 = Math.floor((id2 - 1) / columnas);
    const columna2 = (id2 - 1) % columnas;
    return Math.abs(fila1 - fila2) + Math.abs(columna1 - columna2);
  }

  const abiertos = new Set();
  const cerrados = new Set();
  const gScore = new Map();
  const fScore = new Map();
  const cameFrom = new Map();

  gScore.set(inicio, 0);
  fScore.set(inicio, heuristica(inicio, final));
  abiertos.add(inicio);

  while (abiertos.size > 0) {
    let nodoActual = null;
    let menorFScore = Infinity;
    for (const nodo of abiertos) {
      if (fScore.get(nodo) < menorFScore) {
        nodoActual = nodo;
        menorFScore = fScore.get(nodo);
      }
    }

    if (nodoActual === final) {
      // Se encontró el mejor camino
      const camino = [nodoActual];
      let distanciaTotal = gScore.get(nodoActual);
      while (cameFrom.has(nodoActual)) {
        nodoActual = cameFrom.get(nodoActual);
        camino.unshift(nodoActual);
      }
      return { camino, distanciaTotal };
    }

    abiertos.delete(nodoActual);
    cerrados.add(nodoActual);

    for (const { nodo, distancia } of nodoActual.vecinos) {
      if (cerrados.has(nodo)) {
        continue;
      }

      const gScoreNuevo = gScore.get(nodoActual) + distancia;

      if (!abiertos.has(nodo)) {
        abiertos.add(nodo);
      } else if (gScoreNuevo >= gScore.get(nodo)) {
        continue;
      }

      cameFrom.set(nodo, nodoActual);
      gScore.set(nodo, gScoreNuevo);
      fScore.set(nodo, gScoreNuevo + heuristica(nodo, final));
    }
  }

  // No se encontró un camino
  return null;
}


function algoritmoAStar1(inicio, final) {
  // Función heurística para estimar la distancia restante (distancia Manhattan)
  function heuristica(nodo1, nodo2) {
    const id1 = parseInt(nodo1.id.replace('nodo', ''));
    const id2 = parseInt(nodo2.id.replace('nodo', ''));
    const fila1 = Math.floor((id1 - 1) / columnas);
    const columna1 = (id1 - 1) % columnas;
    const fila2 = Math.floor((id2 - 1) / columnas);
    const columna2 = (id2 - 1) % columnas;
    return Math.abs(fila1 - fila2) + Math.abs(columna1 - columna2);
  }

  const abiertos = new Set();
  const cerrados = new Set();
  const gScore = new Map();
  const fScore = new Map();
  const cameFrom = new Map();

  gScore.set(inicio, 0);
  fScore.set(inicio, heuristica(inicio, final));
  abiertos.add(inicio);

  while (abiertos.size > 0) {
    let nodoActual = null;
    let menorFScore = Infinity;
    for (const nodo of abiertos) {
      if (fScore.get(nodo) < menorFScore) {
        nodoActual = nodo;
        menorFScore = fScore.get(nodo);
      }
    }

    if (nodoActual === final) {
      // Se encontró el mejor camino
      const camino = [nodoActual];
      let distanciaTotal = gScore.get(nodoActual);
      while (cameFrom.has(nodoActual)) {
        nodoActual = cameFrom.get(nodoActual);
        camino.unshift(nodoActual);
      }
      return { camino, distanciaTotal };
    }

    abiertos.delete(nodoActual);
    cerrados.add(nodoActual);

    for (const { nodo, distancia } of nodoActual.vecinos) {
      if (cerrados.has(nodo)) {
        continue;
      }

      const gScoreNuevo = gScore.get(nodoActual) + distancia;

      if (!abiertos.has(nodo)) {
        abiertos.add(nodo);
      } else if (gScoreNuevo >= gScore.get(nodo)) {
        continue;
      }

      cameFrom.set(nodo, nodoActual);
      gScore.set(nodo, gScoreNuevo);
      fScore.set(nodo, gScoreNuevo + heuristica(nodo, final));
    }
  }

  // No se encontró un camino
  return null;
}


function algoritmoAStar2(inicio, final) {
  // Función heurística para estimar la distancia restante (distancia Manhattan)
  function heuristica(nodo1, nodo2) {
    const id1 = parseInt(nodo1.id.replace('nodo', ''));
    const id2 = parseInt(nodo2.id.replace('nodo', ''));
    const fila1 = Math.floor((id1 - 1) / columnas);
    const columna1 = (id1 - 1) % columnas;
    const fila2 = Math.floor((id2 - 1) / columnas);
    const columna2 = (id2 - 1) % columnas;
    return Math.abs(fila1 - fila2) + Math.abs(columna1 - columna2);
  }

  const abiertos = new Set();
  const cerrados = new Set();
  const gScore = new Map();
  const fScore = new Map();
  const cameFrom = new Map();

  gScore.set(inicio, 0);
  fScore.set(inicio, heuristica(inicio, final));
  abiertos.add(inicio);

  while (abiertos.size > 0) {
    let nodoActual = null;
    let menorFScore = Infinity;
    for (const nodo of abiertos) {
      if (fScore.get(nodo) < menorFScore) {
        nodoActual = nodo;
        menorFScore = fScore.get(nodo);
      }
    }

    if (nodoActual === final) {
      // Se encontró el mejor camino
      const camino = [nodoActual];
      let distanciaTotal = gScore.get(nodoActual);
      while (cameFrom.has(nodoActual)) {
        nodoActual = cameFrom.get(nodoActual);
        camino.unshift(nodoActual);
      }
      return { camino, distanciaTotal };
    }

    abiertos.delete(nodoActual);
    cerrados.add(nodoActual);

    for (const { nodo, distancia } of nodoActual.vecinos) {
      if (cerrados.has(nodo)) {
        continue;
      }

      const gScoreNuevo = gScore.get(nodoActual) + distancia;

      if (!abiertos.has(nodo)) {
        abiertos.add(nodo);
      } else if (gScoreNuevo >= gScore.get(nodo)) {
        continue;
      }

      cameFrom.set(nodo, nodoActual);
      gScore.set(nodo, gScoreNuevo);
      fScore.set(nodo, gScoreNuevo + heuristica(nodo, final));
    }
  }

  // No se encontró un camino
  return null;
}

function algoritmoAStar3(inicio, final) {
  // Función heurística para estimar la distancia restante (distancia Manhattan)
  function heuristica(nodo1, nodo2) {
    const id1 = parseInt(nodo1.id.replace('nodo', ''));
    const id2 = parseInt(nodo2.id.replace('nodo', ''));
    const fila1 = Math.floor((id1 - 1) / columnas);
    const columna1 = (id1 - 1) % columnas;
    const fila2 = Math.floor((id2 - 1) / columnas);
    const columna2 = (id2 - 1) % columnas;
    return Math.abs(fila1 - fila2) + Math.abs(columna1 - columna2);
  }

  const abiertos = new Set();
  const cerrados = new Set();
  const gScore = new Map();
  const fScore = new Map();
  const cameFrom = new Map();

  gScore.set(inicio, 0);
  fScore.set(inicio, heuristica(inicio, final));
  abiertos.add(inicio);

  while (abiertos.size > 0) {
    let nodoActual = null;
    let menorFScore = Infinity;
    for (const nodo of abiertos) {
      if (fScore.get(nodo) < menorFScore) {
        nodoActual = nodo;
        menorFScore = fScore.get(nodo);
      }
    }

    if (nodoActual === final) {
      // Se encontró el mejor camino
      const camino = [nodoActual];
      let distanciaTotal = gScore.get(nodoActual);
      while (cameFrom.has(nodoActual)) {
        nodoActual = cameFrom.get(nodoActual);
        camino.unshift(nodoActual);
      }
      return { camino, distanciaTotal };
    }

    abiertos.delete(nodoActual);
    cerrados.add(nodoActual);

    for (const { nodo, distancia } of nodoActual.vecinos) {
      if (cerrados.has(nodo)) {
        continue;
      }

      const gScoreNuevo = gScore.get(nodoActual) + distancia;

      if (!abiertos.has(nodo)) {
        abiertos.add(nodo);
      } else if (gScoreNuevo >= gScore.get(nodo)) {
        continue;
      }

      cameFrom.set(nodo, nodoActual);
      gScore.set(nodo, gScoreNuevo);
      fScore.set(nodo, gScoreNuevo + heuristica(nodo, final));
    }
  }

  // No se encontró un camino
  return null;
}




// Función para mostrar el grafo en la tabla
function mostrarGrafoEnTabla() {
  const tablaGrafo = document.getElementById('grafo');
  const distancia = document.getElementById('distancia');
  tablaGrafo.innerHTML = '';

  for (let i = 0; i < filas; i++) {
    const fila = document.createElement('tr');
    for (let j = 0; j < columnas; j++) {
      const nodo = grafo[i * columnas + j];
      const celda = document.createElement('td');
      celda.textContent = nodo.id;
      fila.appendChild(celda);
    }
    tablaGrafo.appendChild(fila);
  }

  for (const nodo of grafo) {
    for (const { nodo: vecino, distancia } of nodo.vecinos) {
      const fila = document.createElement('tr');
      const celda = document.createElement('td');
      celda.colSpan = columnas;
      celda.textContent = `Arista: ${nodo.id} - ${vecino.id}, Distancia: ${distancia}`;
      fila.appendChild(celda);
      tablaGrafo.appendChild(fila);
    }
  }
}

// Nodo inicial y final
let nodoInicial = grafo[6];
let nodoFinal = grafo[21];

// Ejecución inicial del algoritmo A*
let resultado = algoritmoAStar(nodoInicial, nodoFinal);

// Impresión de resultados en consola
console.log(`Edificio inicial: ${nodoInicial.id}`);
console.log(`Edificio final: ${nodoFinal.id}`);
console.log(`Manzanas recorridos: ${resultado.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado.distanciaTotal}`);

// Mostrar el grafo en la tabla
mostrarGrafoEnTabla();

// Creación de objetos de la clase Familia
const familia1 = new Familia("Colegio", 5, "./img/Colegio.png");
const familia2 = new Familia("Comp. de luz", 5, "./img/Electrica.png");
const familia3 = new Familia("Comp. de gas", 5, "./img/gas.png");
const familia4 = new Familia("Comp. de agua", 5, "./img/Agua.png");
const familia5 = new Familia("Est.bomberos", 5, "./img/Bombero estacion.png");
const familia6 = new Familia("Comisaria", 5, "./img/Policia estacion.png");
const familia7 = new Familia("Hospital", 5, "./img/Hospital.png ");
const familia8 = new Familia("Market", 5, "./img/Super.png");
const familia9 = new Familia("Market 2", 5, "./img/super2(1).png");
const familia10 = new Familia("Familia 10", 5, "./img/Casaa.png");
const familia11 = new Familia("Familia 11", 5, "./img/Casaa.png");
const familia12 = new Familia("Familia 12", 5, "./img/Casaa.png");
const familia13 = new Familia("Familia 13", 5, "./img/Casaa.png");
const familia14 = new Familia("Familia 14", 5, "./img/Casaa.png");

// Agregar familias a los nodos
// Creación de un array con las ubicaciones disponibles
const ubicacionesDisponibles = Array.from({ length: grafo.length }, (_, index) => index);

// Función para asignar una ubicación aleatoria y eliminarla de las disponibles
function asignarUbicacionAleatoria() {
  const indiceAleatorio = Math.floor(Math.random() * ubicacionesDisponibles.length);
  return ubicacionesDisponibles.splice(indiceAleatorio, 1)[0];
}

// Función para agregar una familia a una ubicación específica en el grafo
function agregarFamiliaEnUbicacion(familia, ubicacion) {
  grafo[ubicacion].agregarFamilia(familia);
}

// Asignación de familias a los nodos de forma aleatoria sin repeticiones
const ubicacionFamilia1 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia1, ubicacionFamilia1);

const ubicacionFamilia2 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia2, ubicacionFamilia2);

const ubicacionFamilia3 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia3, ubicacionFamilia3);

const ubicacionFamilia4 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia4, ubicacionFamilia4);

const ubicacionFamilia5 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia5, ubicacionFamilia5);

const ubicacionFamilia6 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia6, ubicacionFamilia6);

const ubicacionFamilia7 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia7, ubicacionFamilia7);

const ubicacionFamilia8 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia8, ubicacionFamilia8);

const ubicacionFamilia9 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia9, ubicacionFamilia9);

const ubicacionFamilia10 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia10, ubicacionFamilia10);

const ubicacionFamilia11 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia11, ubicacionFamilia11);

const ubicacionFamilia12 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia12, ubicacionFamilia12);

const ubicacionFamilia13 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia13, ubicacionFamilia13);

const ubicacionFamilia14 = asignarUbicacionAleatoria();
agregarFamiliaEnUbicacion(familia14, ubicacionFamilia14);

// Función para mostrar las familias en la tabla del grafo
function mostrarFamiliasEnTabla() {
  const tablaGrafo = document.getElementById('grafo');

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const nodo = grafo[i * columnas + j];
      const celda = tablaGrafo.rows[i].cells[j];

      // Crear un elemento <div> para mostrar las familias
      const familiaDiv = document.createElement('div');
      familiaDiv.classList.add('familia');

      // Verificar si el nodo tiene familias
      if (nodo.familias.length > 0) {
        // Recorrer las familias del nodo y mostrar la imagen y nombre correspondiente
        for (const familia of nodo.familias) {
          const imagen = document.createElement('img');
          imagen.src = familia.imagen;

          const nombreSpan = document.createElement('span');
          nombreSpan.textContent = familia.nombre;

          // Agregar la imagen y nombre al elemento <div>
          familiaDiv.appendChild(imagen);
          familiaDiv.appendChild(nombreSpan);
        }
      } else {
        // Si no hay familias, agregar un contenido de relleno al elemento <div>
        familiaDiv.textContent = '-';
      }

      // Agregar el elemento <div> a la celda de la tabla
      celda.appendChild(familiaDiv);
    }
  }
}

mostrarFamiliasEnTabla();

function recorrerGrafodiario() {   

  


  const indicefinal = parseInt(prompt("Ingrese el número de la casa para iniciar ruta diaria"));

  if (isNaN(indicefinal) || indicefinal < 0 || indicefinal >= grafo.length) {
    console.log("Índice inválido. Inténtelo de nuevo.");
    return;
  }
  let nodoInicial = grafo[indicefinal];
  const nodoFinal = grafo[ubicacionFamilia1];



  
  let resultado = algoritmoAStar1(nodoInicial, nodoFinal);
  // Impresión de resultados en consola
console.log(`Partiendo desde: ${nodoInicial.id}`);
console.log(`Hacia colegio: ${nodoFinal.id}`);
console.log(`Manzanas recorridos: ${resultado.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado.distanciaTotal}`);


let nodoInicial1 = grafo[ubicacionFamilia1];
const nodoFinal1 = grafo[ubicacionFamilia3];
let resultado1 = algoritmoAStar1(nodoInicial1, nodoFinal1);

console.log(`Desde colegio: ${nodoInicial1.id}`);
console.log(`Hasta compañia 1: ${nodoFinal1.id}`);
console.log(`Manzanas recorridos: ${resultado1.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado1.distanciaTotal}`);

let nodoInicial2 = grafo[ubicacionFamilia3];
const nodoFinal2 = grafo[ubicacionFamilia4];
let resultado2 = algoritmoAStar2(nodoInicial2, nodoFinal2);

console.log(`Desde compañia 1: ${nodoInicial2.id}`);
console.log(`Hacia compañia 2: ${nodoFinal2.id}`);
console.log(`Manzanas recorridos: ${resultado2.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida,  Se  ha recorrido la ruta diaria correctamente  : ${resultado2.distanciaTotal}`);







}







function recorrerGrafotarde() {   

  


  const indicefinal = parseInt(prompt("Ingrese el número de la casa para iniciar ruta diaria"));

  if (isNaN(indicefinal) || indicefinal < 0 || indicefinal >= grafo.length) {
    console.log("Índice inválido. Inténtelo de nuevo.");
    return;
  }
  let nodoInicial = grafo[ubicacionFamilia4];
  const nodoFinal = grafo[ubicacionFamilia3];



  
  let resultado = algoritmoAStar1(nodoInicial, nodoFinal);
  // Impresión de resultados en consola
console.log(`Partiendo desde compañia 2: ${nodoInicial.id}`);
console.log(`Hacia compañia 1: ${nodoFinal.id}`);
console.log(`Manzanas recorridos: ${resultado.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado.distanciaTotal}`);


let nodoInicial1 = grafo[ubicacionFamilia3];
const nodoFinal1 = grafo[ubicacionFamilia1];
let resultado1 = algoritmoAStar1(nodoInicial1, nodoFinal1);

console.log(`Desde compañia 1: ${nodoInicial1.id}`);
console.log(`Hasta colegio: ${nodoFinal1.id}`);
console.log(`Manzanas recorridos: ${resultado1.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado1.distanciaTotal}`);

let nodoInicial2 = grafo[ubicacionFamilia1];
const nodoFinal2 = grafo[ubicacionFamilia8];
let resultado2 = algoritmoAStar2(nodoInicial2, nodoFinal2);

console.log(`Desde colegio: ${nodoInicial2.id}`);
console.log(`Hacia Supermercado: ${nodoFinal2.id}`);
console.log(`Manzanas recorridos: ${resultado2.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado2.distanciaTotal}`);


let nodoInicial3 = grafo[ubicacionFamilia8];
const nodoFinal3 = grafo[indicefinal];
let resultado3 = algoritmoAStar3(nodoInicial2, nodoFinal2);

console.log(`Desde Supermercado: ${nodoInicial3.id}`);
console.log(`Hacia casa: ${nodoFinal3.id}`);
console.log(`Manzanas recorridos: ${resultado3.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida, se recorrio la ruta diaria de la tarde correctamente : ${resultado3.distanciaTotal}`);







}












function recorrerGrafoluz() { 
  const familia2 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Comp. de luz"));
  const familia5 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Est.bomberos"));
  const familia6 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Comisaria"));
  const familia7 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Hospital"));
  const familia10 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 10"));
  const familia11 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 11"));
  const familia12 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 12"));
  const familia13 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 13"));
  const familia14 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 14"));

  const nodos = [familia2, familia5, familia6, familia7, familia10, familia11, familia12, familia13, familia14];
  const visitados = new Set();
  const ruta = [];

  let nodoActual = familia2;
  let distanciaTotal = 0;

  while (nodos.length > 0) {
    let menorDistancia = Infinity;
    let siguienteNodo = null;

    for (const nodo of nodos) {
      if (!visitados.has(nodo) && nodo !== nodoActual) {
        const resultado = algoritmoAStar(nodoActual, nodo);
        if (resultado && resultado.distanciaTotal < menorDistancia) {
          menorDistancia = resultado.distanciaTotal;
          siguienteNodo = nodo;
        }
      }
    }

    if (siguienteNodo) {
      const resultado = algoritmoAStar(nodoActual, siguienteNodo);
      if (resultado) {
        ruta.push(...resultado.camino);
        distanciaTotal += resultado.distanciaTotal;
        visitados.add(siguienteNodo);
        nodos.splice(nodos.indexOf(siguienteNodo), 1);
        nodoActual = siguienteNodo;
      }
    } else {
      break;
    }
  }

  // Imprimir la ruta en la consola
  console.log("Ruta:");
  for (const nodo of ruta) {
    console.log(nodo.id);
  }

  // Mostrar la distancia total recorrida
  console.log("Distancia total recorrida:, se repartio luz a todas las casas optimamente ", distanciaTotal);

}


function recorrerGrafogas() { 
  const familia3 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Comp. de gas"));
  const familia5 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Est.bomberos"));
  const familia6 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Comisaria"));
  const familia7 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Hospital"));
  const familia10 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 10"));
  const familia11 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 11"));
  const familia12 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 12"));
  const familia13 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 13"));
  const familia14 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 14"));

  const nodos = [familia3, familia5, familia6, familia7, familia10, familia11, familia12, familia13, familia14];
  const visitados = new Set();
  const ruta = [];

  let nodoActual = familia3;
  let distanciaTotal = 0;

  while (nodos.length > 0) {
    let menorDistancia = Infinity;
    let siguienteNodo = null;

    for (const nodo of nodos) {
      if (!visitados.has(nodo) && nodo !== nodoActual) {
        const resultado = algoritmoAStar(nodoActual, nodo);
        if (resultado && resultado.distanciaTotal < menorDistancia) {
          menorDistancia = resultado.distanciaTotal;
          siguienteNodo = nodo;
        }
      }
    }

    if (siguienteNodo) {
      const resultado = algoritmoAStar(nodoActual, siguienteNodo);
      if (resultado) {
        ruta.push(...resultado.camino);
        distanciaTotal += resultado.distanciaTotal;
        visitados.add(siguienteNodo);
        nodos.splice(nodos.indexOf(siguienteNodo), 1);
        nodoActual = siguienteNodo;
      }
    } else {
      break;
    }
  }

  // Imprimir la ruta en la consola
  console.log("Ruta:");
  for (const nodo of ruta) {
    console.log(nodo.id);
  }

  // Mostrar la distancia total recorrida
  console.log("Distancia total recorrida:, Se repartio Gas correctamente ", distanciaTotal);

}


function recorrerGrafoagua() { 
  const familia4 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Comp. de agua"));
  const familia5 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Est.bomberos"));
  const familia6 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Comisaria"));
  const familia7 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Hospital"));
  const familia10 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 10"));
  const familia11 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 11"));
  const familia12 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 12"));
  const familia13 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 13"));
  const familia14 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 14"));

  const nodos = [familia4, familia5, familia6, familia7, familia10, familia11, familia12, familia13, familia14];
  const visitados = new Set();
  const ruta = [];

  let nodoActual = familia4;
  let distanciaTotal = 0;

  while (nodos.length > 0) {
    let menorDistancia = Infinity;
    let siguienteNodo = null;

    for (const nodo of nodos) {
      if (!visitados.has(nodo) && nodo !== nodoActual) {
        const resultado = algoritmoAStar(nodoActual, nodo);
        if (resultado && resultado.distanciaTotal < menorDistancia) {
          menorDistancia = resultado.distanciaTotal;
          siguienteNodo = nodo;
        }
      }
    }

    if (siguienteNodo) {
      const resultado = algoritmoAStar(nodoActual, siguienteNodo);
      if (resultado) {
        ruta.push(...resultado.camino);
        distanciaTotal += resultado.distanciaTotal;
        visitados.add(siguienteNodo);
        nodos.splice(nodos.indexOf(siguienteNodo), 1);
        nodoActual = siguienteNodo;
      }
    } else {
      break;
    }
  }

  // Imprimir la ruta en la consola
  console.log("Ruta:");
  for (const nodo of ruta) {
    console.log(nodo.id);
  }

  // Mostrar la distancia total recorrida
  console.log("Distancia total recorrida:", distanciaTotal);

}

  






// Función para recorrer el grafo desde la familia 8 hasta la posición de la familia 8 pasando por las ubicaciones de las familias 10, 11, 12, 13 y 14 en el orden que minimice la distancia recorrida y sin pasar más de una vez por cada una de estas familias
// Función para recorrer el grafo desde la familia 8 hasta la posición de la familia 8 pasando por las ubicaciones de las familias 10, 11, 12, 13 y 14 en el orden que minimice la distancia recorrida y sin pasar más de una vez por cada una de estas familias
function recorrerGrafosuper() {
  const familia8 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Market"));
  const familia10 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 10"));
  const familia11 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 11"));
  const familia12 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 12"));
  const familia13 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 13"));
  const familia14 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 14"));

  const nodos = [familia10, familia11, familia12, familia13, familia14, familia8];
  const visitados = new Set();
  const ruta = [];

  let nodoActual = familia8;
  let distanciaTotal = 0;

  while (nodos.length > 0) {
    let menorDistancia = Infinity;
    let siguienteNodo = null;

    for (const nodo of nodos) {
      if (!visitados.has(nodo) && nodo !== nodoActual) {
        const resultado = algoritmoAStar(nodoActual, nodo);
        if (resultado && resultado.distanciaTotal < menorDistancia) {
          menorDistancia = resultado.distanciaTotal;
          siguienteNodo = nodo;
        }
      }
    }

    if (siguienteNodo) {
      const resultado = algoritmoAStar(nodoActual, siguienteNodo);
      if (resultado) {
        ruta.push(...resultado.camino);
        distanciaTotal += resultado.distanciaTotal;
        visitados.add(siguienteNodo);
        nodos.splice(nodos.indexOf(siguienteNodo), 1);
        nodoActual = siguienteNodo;
      }
    } else {
      break;
    }
  }

  const resultadoFinal = algoritmoAStar(nodoActual, familia8);
  if (resultadoFinal) {
    ruta.push(...resultadoFinal.camino);
    distanciaTotal += resultadoFinal.distanciaTotal;
  }

  // Imprimir la ruta en la consola
  console.log("Ruta:");
  for (const nodo of ruta) {
    console.log(nodo.id);
  }

  // Mostrar la distancia total recorrida
  console.log("Distancia total recorrida:", distanciaTotal);
}

// Función para recorrer el grafo desde la familia 8 hasta la posición de la familia 8 pasando por las ubicaciones de las familias 10, 11, 12, 13 y 14 en el orden que minimice la distancia recorrida y sin pasar más de una vez por cada una de estas familias
function recorrerGrafosuper2() {
  const familia9 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Market 2"));
  const familia10 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 10"));
  const familia11 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 11"));
  const familia12 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 12"));
  const familia13 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 13"));
  const familia14 = grafo.find(nodo => nodo.familias.some(familia => familia.nombre === "Familia 14"));

  const nodos = [familia10, familia11, familia12, familia13, familia14, familia9];
  const visitados = new Set();
  const ruta = [];

  let nodoActual = familia9;
  let distanciaTotal = 0;

  while (nodos.length > 0) {
    let menorDistancia = Infinity;
    let siguienteNodo = null;

    for (const nodo of nodos) {
      if (!visitados.has(nodo) && nodo !== nodoActual) {
        const resultado = algoritmoAStar(nodoActual, nodo);
        if (resultado && resultado.distanciaTotal < menorDistancia) {
          menorDistancia = resultado.distanciaTotal;
          siguienteNodo = nodo;
        }
      }
    }

    if (siguienteNodo) {
      const resultado = algoritmoAStar(nodoActual, siguienteNodo);
      if (resultado) {
        ruta.push(...resultado.camino);
        distanciaTotal += resultado.distanciaTotal;
        visitados.add(siguienteNodo);
        nodos.splice(nodos.indexOf(siguienteNodo), 1);
        nodoActual = siguienteNodo;
      }
    } else {
      break;
    }
  }

  const resultadoFinal = algoritmoAStar(nodoActual, familia9);
  if (resultadoFinal) {
    ruta.push(...resultadoFinal.camino);
    distanciaTotal += resultadoFinal.distanciaTotal;
  }

  // Imprimir la ruta en la consola
  console.log("Ruta:");
  for (const nodo of ruta) {
    console.log(nodo.id);
  }

  // Mostrar la distancia total recorrida
  console.log("Distancia total recorrida:", distanciaTotal);
}



function botonEjecutarRutadiaria() {
  recorrerGrafodiario()

}



function botonEjecutarRutatarde() {
  recorrerGrafotarde()
}



function botonEjecutarMover() {

  const indiceinicio = parseInt(prompt("Ingrese el número de índice para nodoInicial:"));

  if (isNaN(indiceinicio) || indiceinicio < 0 || indiceinicio >= grafo.length) {
    console.log("Índice inválido. Inténtelo de nuevo.");
    return;
  }
  const indicefinal = parseInt(prompt("Ingrese el número de índice para nodoInicial:"));

  if (isNaN(indicefinal) || indicefinal < 0 || indicefinal >= grafo.length) {
    console.log("Índice inválido. Inténtelo de nuevo.");
    return;
  }
  const nodoInicial = grafo[indiceinicio];
  const nodoFinal = grafo[indicefinal];
  
  let resultado = algoritmoAStar(nodoInicial, nodoFinal);
  // Impresión de resultados en consola
console.log(`Edificio inicial: ${nodoInicial.id}`);
console.log(`Edificio final: ${nodoFinal.id}`);
console.log(`Manzanas recorridos: ${resultado.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado.distanciaTotal}`);

}



function botonEjecutarIncendio() {


  const indicefinal = parseInt(prompt("Ingrese el número de la casa a quemar"));

  if (isNaN(indicefinal) || indicefinal < 0 || indicefinal >= grafo.length) {
    console.log("Índice inválido. Inténtelo de nuevo.");
    return;
  }
  let nodoInicial = grafo[ubicacionFamilia5];
  const nodoFinal = grafo[indicefinal];
  
  let resultado = algoritmoAStar(nodoInicial, nodoFinal);
  // Impresión de resultados en consola
console.log(`Ubicacion inicial camion de bomberos: ${nodoInicial.id}`);
console.log(`Edificio incendiado: ${nodoFinal.id}`);
console.log(`Manzanas recorridos: ${resultado.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado.distanciaTotal}`);

}



function botonEjecutarRobo() {

  const indicefinal = parseInt(prompt("Ingrese el número de la casa a robar"));

  if (isNaN(indicefinal) || indicefinal < 0 || indicefinal >= grafo.length) {
    console.log("Índice inválido. Inténtelo de nuevo.");
    return;
  }
  let nodoInicial = grafo[ubicacionFamilia6];
  const nodoFinal = grafo[indicefinal];
  
  let resultado = algoritmoAStar(nodoInicial, nodoFinal);
  // Impresión de resultados en consola
console.log(`Ubicacion inicial policia: ${nodoInicial.id}`);
console.log(`Edificio robado: ${nodoFinal.id}`);
console.log(`Manzanas recorridos: ${resultado.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado.distanciaTotal}`);
}



function botonEjecutarMedico() {

  const indicefinal = parseInt(prompt("Ingrese el número de la casa que tendra la emergencia medica"));

  if (isNaN(indicefinal) || indicefinal < 0 || indicefinal >= grafo.length) {
    console.log("Índice inválido. Inténtelo de nuevo.");
    return;
  }
  let nodoInicial = grafo[ubicacionFamilia7];
  const nodoFinal = grafo[indicefinal];
  
  let resultado = algoritmoAStar(nodoInicial, nodoFinal);
  // Impresión de resultados en consola
console.log(`Ubicacion inicial ambulancia: ${nodoInicial.id}`);
console.log(`Edificio con emergencia medica: ${nodoFinal.id}`);
console.log(`Manzanas recorridos: ${resultado.camino.map(nodo => nodo.id).join(' -> ')}`);
console.log(`Distancia total recorrida: ${resultado.distanciaTotal}`);
}



function botonEjecutarluz() {

recorrerGrafoluz()

}



function botonEjecutargas() {
  recorrerGrafogas()
}




function botonEjecutaragua() {recorrerGrafoagua()
  }



function botonEjecutarsuper() {



recorrerGrafosuper();

}


function botonEjecutarsuper2() {
  


recorrerGrafosuper2();

}

