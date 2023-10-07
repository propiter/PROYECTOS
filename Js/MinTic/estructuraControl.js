// estructura condicional
// estructura if

var edad = 16;

if (edad >= 18) {
  console.log("eres mayor de edad"); //codigo a ejecutar si la condicion es verdadera
} else {
  console.log("eres menor de edad"); // codigo si la condicion es falsa
}

// =====BUCLES=====
let numeros = 5;
// se repite hasta que numeros ya no sea menor a 9
while (numeros < 9) {
  console.log(numeros); // se imprime la variable numeros en consola
  numeros++; // agrega 1 a la variable numeros
}

for (let numeros = 0; numeros < 9; numeros++) {
  console.log(numeros);
}
