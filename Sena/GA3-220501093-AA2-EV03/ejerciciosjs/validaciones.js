// Validacion de datos:

function Cedula(cedula) {
  if (Cedula === "") {
    console.log("el numero de documento no puede estar vacio");
    return false;
  } else if (personas.some((persona) => persona.cedula === cedula)) {
    console.log("El numero de documento ya existe, ingresa uno nuevo");
    return false;
  }
  return true;
}

function Correo(email) {
  const emailRegex =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  return emailRegex.test(correo);
}

function Celular(celular) {
  const celularRegex = /^\d{10}$/;
  return celularRegex.test(celular);
}

function Nombre(nombre) {
  const nombreRegex = /^[A-Za-z]+$/;
  return nombreRegex.test(nombre);
}
