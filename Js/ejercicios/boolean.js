// boolean son valores tipo definitivos:. true o false

var edad = 20;

var esMayorDeEdad = edad >= 18; //verifica si edad es mayor o igual a 18
alert("es mayor de edad: " + esMayorDeEdad);

alert("es menor de edad: " + !esMayorDeEdad); // "!" verifica que no es mayor de edad.

var tieneCedula = false;
console.log("tiene cedula?: " + tieneCedula);
console.log(
  "¿es mayor de edad y tiene cedula?: ",
  esMayorDeEdad && tieneCedula
); // "&&"operador "AND", comprueba que dos valores son true al tiempo

console.log("es mayor de edad o tiene cedula?: ", esMayorDeEdad || tieneCedula); // "||" operador "OR" uno de los valores es true

console.log("-----------------");
console.log("buzon de entrada");
var mensajesInput = prompt(
  "porfavor ingresa la cantidad de mensajes sin leer "
);
var cantidadDeMensajesSinLeer = parseInt(mensajesInput);
if (cantidadDeMensajesSinLeer) {
  alert("tenes " + cantidadDeMensajesSinLeer + " mensajes sin leer");
} else {
  alert("no tenes mensajes sin leer");
}

var nombreUsuario = "pedro";
console.log(nombreUsuario.toUpperCase());
console.log("===============================");

var usuario = {
  nombre: "piter",
  apellido: "Parker",
  edad: 21,
  email: "p@p.com",
  direccion: "calle con carrera tal",
};
console.log(usuario);
