// Validacion de datos:

function Cedula(cedula, personas) {
  const cedulaRegex = /^\d+$/;

  if (cedula === "") {
    console.log("El número de documento no puede estar vacío.");
    return false;
  } else if (!cedulaRegex.test(cedula)) {
    console.log("El número de documento debe contener solo números.");
    return false;
  } else if (personas.some((persona) => persona.cedula === cedula)) {
    console.log("El número de documento ya existe, ingrese uno nuevo.");
    return false;
  }
  return true;
}
function Correo(email) {
  const emailRegex =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  return emailRegex.test(email);
}

function Celular(celular) {
  const celularRegex = /^\d{10}$/;
  return celularRegex.test(celular);
}

function Datos(datos) {
  const datosRegex = /^[A-Za-z]+$/;

  if (datos === "") {
    console.log("El campo no puede estar vacío.");
    return false;
  } else if (!datosRegex.test(datos)) {
    console.log("verifique que escribio bien el campo");
    return false;
  }
  return datosRegex.test(datos);
}

module.exports = {
  Cedula: Cedula,
  Correo: Correo,
  Celular: Celular,
  Datos: Datos,
};
