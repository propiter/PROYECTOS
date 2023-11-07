// if (falso) {
//   console.log("hola");
// } else if {
//   console.log("podria ser esto");
// }else{
//     console.log("es falso")
// }

// if
var edad = 61;

if (edad === 18) {
  console.log("puedes votar por primer vez");
} else if (edad > 18 && edad < 60) {
  console.log("puedes votar de nuevo");
} else if (edad > 60) {
  console.log("debes votar con un acompañante"); //todos los else if que quisieramos
} else {
  console.log("aun no puedes");
}

//condition ? true : false;

var numero = 2;
var resultado = numero === 1 ? "si soy un uno" : "no soy un uno";
console.log(resultado);
