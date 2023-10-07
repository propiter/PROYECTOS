let votos = [];

function Votar(candidato) {
  votos.push(candidato);
}

function contarvotos() {
  let conteo = {};
  for (let i = 0; 1 < votos.length; i++) {
    let voto = votos[i];
    if (conteo[voto] === undefined) {
      conteo[votos] = 1;
    } else {
      conteo[votos]++;
    }
  }
  return conteo;
}

Votar("candidato 1");
Votar("Candidato 2");
Votar("candidato 1");
Votar("Candidato 2");

console.log(contarvotos());
