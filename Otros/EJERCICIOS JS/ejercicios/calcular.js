var numero1Input = prompt("numero 1");
var numero2Input = prompt("numero 2");
var operacionInput = prompt(
  "Operación a realizar: \n1. Suma \n2. Resta \n3. Multiplicación \n4. División"
);
var n1 = parseInt(numero1Input);
var n2 = parseInt(numero2Input);
var operacion = parseInt(operacionInput);

var resultado;
switch (operacion) {
  case 1:
    resultado = n1 + n2;
    break;
  case 2:
    resultado = n1 - n2;
    break;
  case 3:
    resultado = n1 * n2;
    break;
  case 4:
    if (n2 !== 0) resultado = n1 / n2;
    else resultado = "no se puede dividir por 0";
    break;
}
alert("el resultado de la operacion es " + resultado);
