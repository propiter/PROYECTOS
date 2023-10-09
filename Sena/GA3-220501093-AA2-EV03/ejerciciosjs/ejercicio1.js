function datos() {
  const figura = document.getElementById("figura").value;
  const inputContainer = document.getElementById("inputContainer");
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  if (figura === "triangulo") {
    inputContainer.innerHTML = `
                <p>para calcular el área del Triangulo digite: </p>
                <label for="base">Base:</label>
                <input type="number" id="base">
                <label for="altura">Altura:</label>
                <input type="number" id="altura">
                <p>para calcular el Perímetro del Triangulo digite: </p>
                <label for="lado1">Lado 1:</label>
                <input type="number" id="lado1">
                <label for="lado2">Lado 2:</label>
                <input type="number" id="lado2">
                <label for="lado3">Lado 3:</label>
                <input type="number" id="lado3">
                <button  onclick="calculartriangulo()">calcular</button>
            `;
  } else if (figura === "rectangulo") {
    inputContainer.innerHTML = `
                <p>para calcular el área del rectangulo digite: </p>
                <label for="base">Base:</label>
                <input type="number" id="base">
                <label for="altura">Altura:</label>
                <input type="number" id="altura">
                <button  onclick="calcularrectangulo()">calcular</button>
                `;
  } else if (figura === "cuadrado") {
    inputContainer.innerHTML = `
                <p>para calcular el área del cuadrado digite: </p>
                <label for="lado">lado:</label>
                <input type="number" id="lado">
                <button  onclick="calcularcuadrado()">calcular</button>
                `;
  } else if (figura === "circulo") {
    inputContainer.innerHTML = `
                <p>para calcular el área del circulo digite: </p>
                <label for="radio">radio del circulo:</label>
                <input type="number" id="radio">
                <button  onclick="calcularcirculo()">calcular</button>
                `;
  }
}

function calculartriangulo() {
  const base = parseFloat(document.getElementById("base").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const area = calcularAreaTriangulo(base, altura);
  var lado1 = parseFloat(document.getElementById("lado1").value);
  var lado2 = parseFloat(document.getElementById("lado2").value);
  var lado3 = parseFloat(document.getElementById("lado3").value);
  const perimetro = calcularPerimetroTriangulo(lado1, lado2, lado3);

  function calcularAreaTriangulo(base, altura) {
    return (base * altura) / 2;
  }

  function calcularPerimetroTriangulo(lado1, lado2, lado3) {
    return lado1 + lado2 + lado3;
  }
  resultado.innerHTML = "Área: " + area + ", Perímetro: " + perimetro;
}

function calcularrectangulo() {
  const base = parseFloat(document.getElementById("base").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const area = arearectangulo(base, altura);
  const perimetro = perimetrorectangulo(base, altura);
  function arearectangulo(base, altura) {
    return base * altura;
  }
  function perimetrorectangulo(base, altura) {
    return 2 * (base * altura);
  }
  resultado.innerHTML = "Área: " + area + ", Perímetro: " + perimetro;
}

function calcularcuadrado() {
  const lado = parseFloat(document.getElementById("lado").value);

  const area = areacuadrado(lado);
  const perimetro = perimetrocuadrado(lado);
  function areacuadrado(lado) {
    return 4 * lado;
  }
  function perimetrocuadrado(lado) {
    return lado * lado;
  }
  resultado.innerHTML = "Área: " + area + ", Perímetro: " + perimetro;
}

function calcularcirculo() {
  const radio = parseFloat(document.getElementById("radio").value);

  const area = areacirculo(radio);
  const perimetro = perimetrocirculo(radio);
  function areacirculo(radio) {
    const pi = Math.PI;
    return pi * (radio * radio);
  }
  function perimetrocirculo(radio) {
    const pi = Math.PI;
    return 2 * pi * (radio * radio);
  }
  resultado.innerHTML = "Área: " + area + ", Perímetro: " + perimetro;
}
