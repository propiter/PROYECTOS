const print = require("prompt-sync")();
const validar = require("./validaciones.js");

class persona {
  constructor(
    cedula,
    nombre,
    celular,
    email,
    fechaNacimiento,
    ciudadResidencia,
    ciudadOrigen,
    canciones
  ) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.celular = celular;
    this.email = email;
    this.fechaNacimiento = fechaNacimiento;
    this.ciudadResidencia = ciudadResidencia;
    this.ciudadOrigen = ciudadOrigen;
    this.canciones = canciones;
  }
}

var personas = [];

function agregarPersona() {
  while (personas.length < 6) {
    let reg = personas.length;
    console.log("Digitar datos de estudiante # " + reg + 1 + ": ");

    let cedula = print("Documento de identidad: ");
    while (validar.Cedula(cedula)) {
      console.log("ingrese un nuevo documento de Identidad: ");
    }

    let nombre = print("Nombre: ");
    while (!validar.Nombre(nombre)) {
      console.log("el nombre no debe contener numeros");
      nombre = print("Nombre: ");
    }

    let celular = print("Celular: ");
    while (!validar.Celular(celular)) {
      console.log("ingrese un numero Válido");
      celular = print("Celular: ");
    }
    let email = print("Correo Electrónico: ");
    while (!validar.Correo(email)) {
      console.log("ingrese un correo Válido");
      email = print("Correo Electrónico: ");
    }
    let fechaNacimiento = print("fecha de Nacimiento: ");
    let ciudadResidencia = print("ciudad de Residencia: ");
    let ciudadOrigen = print("Ciudad de Origen: ");
    let canciones = [];
    for (let i = 0; i < 3; i++) {
      let cancion = print("nombre de la cancion favorita # " + i + 1 + ": ");
      let artista = print("nombre del artista de la cancion # " + i + 1 + ": ");
      canciones.push({ cancion, artista });
    }
  }
  personas.push(persona);
}

let opcion;
do {
  console.log("=================");
  console.log("escoge una Opcion: ");
  console.log("1. Agregar una persona");
  console.log("2. Mostrar informacion de una persona");
  console.log("3. Realizar rifa entre los inscritos");
  console.log("4. Salir");
  opcion = parseInt(print("seleccione una opcion: "));

  switch (opcion) {
    case 1:
      agregarPersona();
      break;
  }
} while (opcion !== 3);
