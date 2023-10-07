//Declarativas

function nombre_funcion() {
  return 5;
}

function Suma(a, b) {
  return a + b;
}

console.log("el resultado de la suma es: ", Suma(4, 5));

// Expresion

var a = {
  numero: 5,
};
var b = {
  numero: 6,
};

var sumaab = function (a, b) {
  return a + b;
};

function saludar(nombre) {
  console.log("hola buenos dias", nombre);
}

saludar("Diego");
saludar("pedro");

var nombre = function (nombre) {
  console.log("hola buena tarde", nombre);
};
nombre("camilo");

function solution(valor) {
  return typeof valor;
}

solution(1);
solution("Diego");
solution(true);

println(nombre);
