/* ==========================================
   Array de frutas
========================================== */
const frutas = [
  {id:1, nombre:"anana", precio:30, ruta_img:"./img/anana.jpg"},
  {id:2, nombre:"arandano", precio:50, ruta_img:"./img/arandano.jpg"},
  {id:3, nombre:"banana", precio:10, ruta_img:"./img/banana.jpg"},
  {id:4, nombre:"frambuesa", precio:40, ruta_img:"./img/frambuesa.png"},
  {id:5, nombre:"frutilla", precio:30, ruta_img:"./img/frutilla.jpg"},
  {id:6, nombre:"kiwi", precio:20, ruta_img:"./img/kiwi.jpg"},
  {id:7, nombre:"mandarina", precio:80, ruta_img:"./img/mandarina.jpg"},
  {id:8, nombre:"manzana", precio:15, ruta_img:"./img/manzana.jpg"},
  {id:9, nombre:"naranja", precio:90, ruta_img:"./img/naranja.jpg"},
  {id:10, nombre:"pera", precio:25, ruta_img:"./img/pera.jpg"},
  {id:11, nombre:"pomelo-amarillo", precio:20, ruta_img:"./img/pomelo-amarillo.jpg"},
  {id:12, nombre:"pomelo-rojo", precio:20, ruta_img:"./img/pomelo-rojo.jpg"},
  {id:13, nombre:"sandia", precio:10, ruta_img:"./img/sandia.jpg"}
];

/* ==========================================
   Variables del DOM
========================================== */
let carrito = [];
let htmlCarrito = "";

const barraBusqueda = document.getElementById("barra-busqueda");
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const totalPrecio = document.getElementById("total-precio");

/* ==========================================
   imprimir datos alumno ej1
========================================== */
function imprimirDatosAlumno(){
  const alumno = {dni:"12345678", nombre:"Anibal", apellido:"Caeiro"};
  console.log(`Alumno: ${alumno.nombre} ${alumno.apellido}, DNI: ${alumno.dni}`);
  document.getElementById("nav-datos").textContent = `${alumno.nombre} ${alumno.apellido}`;
}

/* ==========================================
   Mostrar productos ej3
========================================== */
function mostrarLista(array){
  let htmlProductos = "";
  array.forEach(fruta=>{
    htmlProductos += `
      <div class="card-producto">
        <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
        <h3>${fruta.nombre}</h3>
        <p>$${fruta.precio}</p>
        <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
      </div>
    `;
  });
  contenedorProductos.innerHTML = htmlProductos;
}

/* ==========================================
   Filtro ej4
========================================== */
barraBusqueda.addEventListener("input", filtrarProducto);

function filtrarProducto(){
  let texto = barraBusqueda.value.toLowerCase();
  let filtradas = frutas.filter(f=>f.nombre.toLowerCase().includes(texto));
  mostrarLista(filtradas);
}

/* ==========================================
   carrito ej 5, 6, 7, 9
========================================== */
function agregarACarrito(idFruta){
  carrito.push(frutas.find(f=>f.id==idFruta));
  mostrarCarrito();
  actualizarCarrito();
}

function mostrarCarrito(){
  htmlCarrito = "<ul>";
  carrito.forEach((fruta, index)=>{
    htmlCarrito += `
      <li class="bloque-item">
        <p class="nombre-item">${fruta.nombre} - $${fruta.precio}</p>
        <button class="boton-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
      </li>
    `;
  });
  htmlCarrito += "</ul><button onclick='vaciarCarrito()'>Vaciar Carrito</button>";
  contenedorCarrito.innerHTML = htmlCarrito;
  actualizarContador();
}

function eliminarProducto(indice){
  carrito.splice(indice,1);
  mostrarCarrito();
  actualizarCarrito();
}

function vaciarCarrito(){
  carrito = [];
  mostrarCarrito();
  actualizarCarrito();
}

function cargarCarrito(){
  try{
    let guardado = localStorage.getItem("carrito");
    if(guardado){ carrito = JSON.parse(guardado); }
  }catch(e){
    carrito = [];
  }
}

function actualizarCarrito(){
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador(){
  contadorCarrito.textContent = `Carrito: ${carrito.length} Productos`;
  let total = carrito.reduce((suma,f)=>suma+f.precio,0);
  totalPrecio.textContent = `Total: $${total}`;
}

/* ==========================================
   Ordenar ej8
========================================== */
document.getElementById("ordenar-nombre").addEventListener("click",()=>{
  let ordenados = [...frutas].sort((a,b)=>a.nombre.localeCompare(b.nombre));
  mostrarLista(ordenados);
});

document.getElementById("ordenar-precio").addEventListener("click",()=>{
  let ordenados = [...frutas].sort((a,b)=>a.precio-b.precio);
  mostrarLista(ordenados);
});

/* ==========================================
   Init
========================================== */
function init(){
  imprimirDatosAlumno();
  cargarCarrito();
  mostrarLista(frutas);
  mostrarCarrito();
}
init();
