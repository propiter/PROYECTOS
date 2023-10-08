function calculartriangulo() {
  // Solicitar datos al usuario usando prompt
  const base = parseInt(prompt("Ingrese la base del triángulo:"));
  const altura = parseInt(prompt("Ingrese la altura del triángulo:"));
  const lado1 = parseInt(prompt("Ingrese el lado 1 del triángulo:"));
  const lado2 = parseInt(prompt("Ingrese el lado 2 del triángulo:"));
  const lado3 = parseInt(prompt("Ingrese el lado 3 del triángulo:"));

  // Calcular área y perímetro
  const area = calcularAreaTriangulo(base, altura);
  const perimetro = calcularPerimetroTriangulo(lado1, lado2, lado3);

  // Mostrar los resultados en la consola
  console.log("Área del triángulo: " + area);
  console.log("Perímetro del triángulo: " + perimetro);
}

function calcularAreaTriangulo(base, altura) {
  return (base * altura) / 2;
}

function calcularPerimetroTriangulo(lado1, lado2, lado3) {
  return lado1 + lado2 + lado3;
}

// Llama a la función para calcular el triángulo
calculartriangulo();
