// hallar el area de un rectangulo
var base1 = 6;
let altura1 = 8;
var lado1 = 10;

function AreaRectangulo(base, altura) {
  return base * altura;
}
function AreaTriangulo(base, altura) {
  return (base * altura) / 2;
}
function AreaCuadrado(lado) {
  return lado * lado;
}

console.log("area del Rectangulo: ", AreaRectangulo(base1, altura1));
console.log("area del triangulo: ", AreaTriangulo(base1, altura1));

console.log("el area del cuadrado es: ", AreaCuadrado(lado1));

length = "pedro";
