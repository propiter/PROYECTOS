// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito =document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito =[];

cargarEventListeners();
function cargarEventListeners() {
    // cuando da clic en agregar al carrito 
    listaCursos.addEventListener("click", agregarCurso)

    // eliminar objeto del carrito 
    carrito.addEventListener("click", eliminarCurso)

    vaciarCarrito.addEventListener("click", () => {
        articulosCarrito = [];
        limpiarCarrito()
    })
}

// Funciones 
function agregarCurso(e){
    e.preventDefault ();
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado =(e.target.parentElement.parentElement)
        leerDatosCurso(cursoSeleccionado)
    }  
}

function eliminarCurso(e){
    //e.preventDefault();
     
    if(e.target.classList.contains("borrar-curso")){
        const cursoId=e.target.getAttribute("data-id");

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHtml();
       
    }
}



//Lee el contenido del html y extrae informacion 
function leerDatosCurso (curso){
    //console.log(curso)
    // crear el objeto con el contenido del curso actual 
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".u-pull-right ").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
 
// revisa si ya esta el curso en el carrito
const existe = articulosCarrito.some (curso => curso.id === infoCurso.id);
if(existe){
const cursos = articulosCarrito.map (curso => {
if(curso.id === infoCurso.id){
    curso.cantidad++;
    return curso;
} else{
    return curso;
}
});
articulosCarrito =[...cursos];


} else{
    // agrega elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
   
}
       console.log(articulosCarrito)
        carritoHtml();
}

// muestra el carrito de compras en el html 
function carritoHtml (){
// limpiar el carrito
    limpiarCarrito();

    // agregar elemento al carrito
    articulosCarrito.forEach ((curso)=>{
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement("tr");
        row.innerHTML = `
        <td> <img src="${imagen}" width= "100" ></td>
        <td> ${titulo}</td>
        <td> ${precio}</td>
        <td> ${cantidad}</td>
        <td> <a href="#" class = "borrar-curso"data-id="${id}"  > X </a> </td>
        `;

        //agrega el html del carrito
        contenedorCarrito.appendChild(row);

    })
}

function limpiarCarrito (){
    //contenedorCarrito.innerHTML = "";
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}

