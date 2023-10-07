//Número (Number):
let edad = 25;
let precio = 19.99;

//Cadena de texto (String):
let nombre = "Juan";
let mensaje = "¡Hola, mundo!";
let plantilla = `Mi nombre es ${nombre}.`;

//Booleano (Boolean):
let esMayorDeEdad = true;
let estaActivo = false;

//Nulo (Null):
let valorNulo = null;

//Indefinido (Undefined):
let variableNoDefinida;

//Símbolo (Símbolo):
const simboloUnico = Symbol("descripcion");
let objeto = {
  [simboloUnico]: "Valor privado",
};

// operadores Aritmemticos:
let resultado = 10 + 5; // resultado es igual a 15

// operadores de Asignacion:
let x = 5;
x += 2; // x es igual a 7 después de esta operación

// operadores de Comparacion:
let a = 5;
let b = "5";
console.log(a == b); // true (compara solo valores)
console.log(a === b); // false (compara valores y tipos)

// operadodes Lógicos:
let esMayorDeEdad = true;
let tieneLicencia = false;
let puedeConducir = esMayorDeEdad && tieneLicencia; // false

// Operadores de Concatenación de Cadenas:
let nombre = "Juan";
let apellido = "Pérez";
let nombreCompleto = nombre + " " + apellido; // 'Juan Pérez'

//operador ternario:
let edad = 18;
let mensaje = edad >= 18 ? "Eres mayor de edad" : "Eres menor de edad";
