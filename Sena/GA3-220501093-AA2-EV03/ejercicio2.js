// antes se debe instalar el "prompt-sync"digitando en la terminal: npn install prompt-sync
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
  if (isNaN(edad)) {
    console.log("la edad debe ser un valor numerico");
  } else if (edad < 1 || edad > 120) {
    console.log("ingrese un rango de edad entre 1 y 120 años");
  } else {
    edad = parseInt(edad);
    suma = suma + edad;
    loop = loop + 1;
    edades.push(edad);
    if (edad < 18) {
      menor = menor + 1;
      if (edad_baja == 0 || edad_baja > edad) {
        edad_baja = edad;
      }
    } else if (edad >= 18 && edad < 59) {
      mayor = mayor + 1;
    } else if (edad >= 60) {
      adulto = adulto + 1;
      if (edad > edad_alta) {
        edad_alta = edad;
      }
    }
  }
}
promedio = suma / loop;
console.log("============================");
console.log("grupo de edades: ", edades);
console.log("se ingresaron un total de: ", loop, "edades");
console.log("la suma de todas las edades es: ", suma);
console.log("la cantidad de personas menores de edad es: ", menor);
console.log("la cantidad de personas mayores de edad son: ", mayor);
console.log("la cantidad de adultos mayores son: ", adulto);
console.log("la edad mas baja del grupo es: ", edad_baja);
console.log("la edad mas alta del grupo es: ", edad_alta);
console.log("el promedio de edades es: ", promedio);
