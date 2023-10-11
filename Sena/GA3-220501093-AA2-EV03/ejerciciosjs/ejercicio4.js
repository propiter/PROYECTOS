const print = require("prompt-sync")();
const validar = require("./validaciones");

class Persona {
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

var cantPersonas = print("¿Cuántas personas desea encuestar?: ");

function agregarPersona() {
  while (personas.length < cantPersonas) {
    let reg = personas.length;
    console.log("Digitar datos de la persona #" + (reg + 1) + ": ");

    let cedula = print("Documento de identidad: ");
    while (
      !validar.Cedula(cedula, personas) ||
      personas.some((persona) => persona.cedula === cedula)
    ) {
      console.log(
        "El número de documento no es válido o ya existe. Intente de nuevo."
      );
      cedula = print("Documento de identidad: ");
    }

    let nombre = print("Nombre: ");
    while (!validar.Datos(nombre)) {
      console.log(
        "El nombre no debe contener números, ni caracteres especiales"
      );
      nombre = print("Nombre: ");
    }

    let celular = print("Celular: ");
    while (!validar.Celular(celular)) {
      console.log("Ingrese un número de celular válido.");
      celular = print("Celular: ");
    }

    let email = print("Correo Electrónico: ");
    while (!validar.Correo(email)) {
      console.log("Ingrese un correo electrónico válido.");
      email = print("Correo Electrónico: ");
    }

    let fechaNacimiento = print("Fecha de Nacimiento: ");
    let ciudadResidencia = print("Ciudad de Residencia: ");
    while (!validar.Datos(ciudadResidencia)) {
      console.log(
        "la ciudad de residencia no debe contener números, ni caracteres especiales"
      );
      ciudadResidencia = print("Ciudad de Residencia: ");
    }
    let ciudadOrigen = print("Ciudad de Origen: ");
    while (!validar.Datos(ciudadOrigen)) {
      console.log(
        "La ciudad de Origen no debe contener números, ni caracteres especiales"
      );
      ciudadOrigen = print("ciudad de Origen: ");
    }
    let canciones = [];
    for (let i = 0; i < 3; i++) {
      let cancion = print("Nombre de la canción favorita #" + (i + 1) + ": ");
      let artista = print(
        "Nombre del artista de la canción #" + (i + 1) + ": "
      );
      canciones.push({ cancion, artista });
    }

    personas.push(
      new Persona(
        cedula,
        nombre,
        celular,
        email,
        fechaNacimiento,
        ciudadResidencia,
        ciudadOrigen,
        canciones
      )
    );
    console.log("Persona agregada con éxito.");
    console.log("===========================");
  }
}

function mostrarInfo() {
  console.log("=================");
  console.log("Escoja una opción: ");
  console.log("1. Buscar persona por Documento de identidad");
  console.log("2. Buscar persona por Nombre");
  console.log("3. Volver atrás");
  let mostrarInfoOption = parseInt(print("Seleccione una opción: "));
  switch (mostrarInfoOption) {
    case 1:
      let cedulaBuscada = print(
        "Ingrese el documento de la persona a buscar: "
      );
      let cedulaEncontrada = personas.find(
        (persona) => persona.cedula === cedulaBuscada
      );
      if (cedulaEncontrada) {
        console.log("Información de la persona:");
        console.log("Cédula: " + cedulaEncontrada.cedula);
        console.log("Nombre: " + cedulaEncontrada.nombre);
        console.log("Celular: " + cedulaEncontrada.celular);
        console.log("Correo Electrónico: " + cedulaEncontrada.email);
        console.log("Fecha de Nacimiento: " + cedulaEncontrada.fechaNacimiento);
        console.log(
          "Ciudad de Residencia: " + cedulaEncontrada.ciudadResidencia
        );
        console.log("Ciudad de Origen: " + cedulaEncontrada.ciudadOrigen);
        console.log("Canciones Favoritas:");
        cedulaEncontrada.canciones.forEach((cancion, index) => {
          console.log("Canción #" + (index + 1) + ": " + cancion.cancion);
          console.log(
            "Artista de la Canción #" + (index + 1) + ": " + cancion.artista
          );
        });
      } else {
        console.log("No se encontró una persona con documento");
      }
      break;
    case 2:
      let nombreBuscado = print("Ingrese el Nombre de la persona a buscar: ");
      let nombreEncontrado = personas.find((persona) => persona.nombre);
      if (nombreEncontrado) {
        console.log("Información de la persona:");
        console.log("Cédula: " + nombreEncontrado.cedula);
        console.log("Nombre: " + nombreEncontrado.nombre);
        console.log("Celular: " + nombreEncontrado.celular);
        console.log("Correo Electrónico: " + nombreEncontrado.email);
        console.log("Fecha de Nacimiento: " + nombreEncontrado.fechaNacimiento);
        console.log(
          "Ciudad de Residencia: " + nombreEncontrado.ciudadResidencia
        );
        console.log("Ciudad de Origen: " + nombreEncontrado.ciudadOrigen);
        console.log("Canciones Favoritas:");
        nombreEncontrado.canciones.forEach((cancion, index) => {
          console.log("Canción #" + (index + 1) + ": " + cancion.canción);
          console.log(
            "Artista de la Canción #" + (index + 1) + ": " + cancion.artista
          );
        });
      } else {
        console.log("No se encontró una persona con este nombre");
      }
      break;
    case 3:
      menu();
      break;
    default:
      console.log("Ingrese una opción válida (1, 2, 3).");
  }
}

function rifa() {
  let aleatorio = personas[Math.floor(Math.random() * personas.length)];
  if ((aleatorio = "undefined")) {
    console.log("no se ha registrado ningun estudiante");
    menu();
  }
  console.log("La persona ganadora de la rifa es:");
  console.log("Nombre: " + aleatorio);
}

function menu() {
  let opcion;
  do {
    console.log("=================");
    console.log("Escoja una opción: ");
    console.log("1. Agregar una persona");
    console.log("2. Mostrar información de una persona");
    console.log("3. Realizar rifa entre los inscritos");
    console.log("4. Salir");
    console.log("=================");
    opcion = parseInt(print("Seleccione una opción: "));

    switch (opcion) {
      case 1:
        agregarPersona();
        break;
      case 2:
        mostrarInfo();
        break;
      case 3:
        rifa();
        break;
      case 4:
        console.log("Gracias, nos vemos pronto...");
        console.log("=============================");
        break;
      default:
        console.log("Ingrese una opción válida (1, 2, 3, 4).");
    }
  } while (opcion !== 4);
}

menu();
