// edades
const prompt = require("prompt-sync")();

var edades = [];
var loop = 0;
var suma = 0;
var menor = 0;
var mayor = 0;
var adulto = 0;
var edad_alta = 0;
var edad_baja = 0;
var promedio = 0;

while (loop < 10) {
  let edad = prompt("digitar edad: ");
  if (NaN(edad)) {
    console.log("debe ser un valor numerico");
  }
}
