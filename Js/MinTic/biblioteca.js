let biblioteca = [
  {
    titulo: "100 años de soledad",
    autor: "gabo",
    publicacion: 1967,
    prestado: false,
  },
  {
    titulo: "Quijote de la mancha",
    autor: "Miguel de Cervantes",
    publicacion: 1605,
    prestado: true,
  },
  { titulo: "Biblia", autor: "Reina arela", publicacion: 1960, prestado: true },
];

function addBook(titulo, autor, publicacion, prestado) {
  const addBook = {
    titulo,
    autor,
    publicacion,
    prestado,
  };

  biblioteca.push(addBook);

  function buscarlibro(titulo) {
    for (let libro of biblioteca) {
      if (libro.titulo.toLowerCase() === titulo.toLowerCase()) {
        return libro;
      }
    }
    return null;
  }

  function prestardevolverlibro(titulo) {
    let libro = buscarlibro(titulo);
    if (libro) {
      libro.prestado = !libro.prestado;
      return libro;
    } else {
      return "libro no se encuentra en la biblioteca";
    }
  }
}

addBook("diccionario", "ingles", 1964, false);

console.log(buscarlibro("diccionario"));
console.log(prestardevolverlibro("diccionario"));
console.log(prestardevolverlibro("otro"));
