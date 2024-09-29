//funcion para cargar perezosamente las imagenes 
//por aitageo


document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const img = entry.target;
            if (entry.isIntersecting) {
                console.log('elemento interceptado');
                
                img.setAttribute('src', img.getAttribute('data-src')); 
                img.style.opacity = 1;
                img.classList.add('animate__animated', 'animate__swing'); 
                observer.unobserve(img); 
            } else {
                img.style.opacity = 0;
            }
        });
    });

    images.forEach((image) => {
        observer.observe(image);
    }, {threshold: 1.0});
});





const carrito = document.getElementById('carrito');
const contenedor = document.querySelector('.Popular-Container');
// console.log(contenedor);
const contenedorCarrito = document.getElementById('lista-carrito').querySelector('tbody');
// console.log(contenedorCarrito);

let carritoAll = []

// console.log(carrito);


MostrarCarrito()//llamando a la funcion
function MostrarCarrito(){
    carrito.addEventListener('click',()=>{
        const modal = new bootstrap.Modal(document.getElementById('Mimodal'));
        modal.show();
    })
} 

cargar()
function cargar(){
    contenedor.addEventListener('click',cargarProductos);
    
}



function cargarProductos(e){
    e.preventDefault();
    const Seleccionado = e.target.classList.contains('btn-primary');
    if (Seleccionado) {
        const ProductoSeleccionado = e.target.parentElement.parentElement;
        console.log(ProductoSeleccionado);
        leerDatos(ProductoSeleccionado);
          
    }
    

}


function leerDatos(data){
   console.log(data);

   const productos = {
    img : data.querySelector('img').src,
    nombre : data.querySelector('h3').textContent,
    precio: Math.floor(data.querySelector('p').innerText.replace(/[^0-9.-]+/g, "")),
    cantidad: 1,
    id : data.querySelector('a').getAttribute('data-id')


   }


   carritoAll = [...carritoAll,productos]//spread operator
   console.log(productos);
   ActualizarCarritoHtml();
   
}


function ActualizarCarritoHtml(){
    contenedorCarrito.innerHTML = ``;
    const row = document.createElement('tr');
    carritoAll.forEach((producto)=>{
        const {img,nombre,precio,cantidad,id} = producto;
          row.innerHTML = `
          <td><img src="${img}" width="100"></td>
          <td>${nombre}</td>
          <td>${precio}</td>
          <td>${cantidad}</td>
          <td>${id}</td>
          `;
        })
        contenedorCarrito.appendChild(row);
}


