var tasa_de_cambio;
var pesos_colombianos;
var dolares;

tasa_de_cambio = 4000;

pesos_colombianos = 40000;

dolares = pesos_colombianos / tasa_de_cambio;

console.log(
  "la cantidad de dolares equivalentes a: $" +
    pesos_colombianos +
    " es: " +
    dolares +
    " dolares "
);
