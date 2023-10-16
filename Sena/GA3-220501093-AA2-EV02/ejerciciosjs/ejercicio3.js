const prompt = require("prompt-sync")();

function leerVector() {
  const numeros = [];

  for (let i = 0; i < 5; i++) {
    const input = prompt("Ingrese el número " + (i + 1) + " : ");
    const num = parseFloat(input);

    if (!isNaN(num)) {
      numeros.push(num);
    } else {
      console.log("Por favor, ingrese un número válido.");
      i--;
    }
  }

  return numeros;
}

console.log("Ingrese los elementos del primer vector:");
const vector1 = leerVector();

console.log("Ingrese los elementos del segundo vector:");
const vector2 = leerVector();

const mergedVector = [...vector1, ...vector2];
mergedVector.sort((a, b) => a - b);

console.log("==========================================");
console.log("La lista ordenada de la mezcla de los dos vectores es:");
console.log(mergedVector.join(" "));
