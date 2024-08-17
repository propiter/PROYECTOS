
function calcularAreaTriangulo(base, altura) {
    return (base * altura) / 2;
}

function calcularAreaRectangulo(base, altura) {
    return base * altura;
}

function calcularAreaCuadrado(lado) {
    return lado * lado;
}

function calcularAreaCirculo(radio) {
    return Math.PI * radio * radio;
}

// Ejemplos de uso
console.log("Área del triángulo:", calcularAreaTriangulo(5, 8));
console.log("Área del rectángulo:", calcularAreaRectangulo(4, 10));
console.log("Área del Cuadrado:", calcularAreaCuadrado(5, 8));
console.log("Área del Circulo:", calcularAreaCirculo(3));