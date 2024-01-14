

function cuadricula(){

let ulTabla3 = document.querySelectorAll('.ULtabla3');
let table = document.querySelector('.table');
let productooo = document.querySelectorAll('.productooo');
console.log(productooo.length);
table.classList.toggle('tableMostrar');//muestro la tabla
for(let k = 0 ; k < productooo.length;k++ ){
productooo[k].classList.toggle('cadaProducto');
ulTabla3[k].classList.toggle('claseTabla3-JS');
}
//--------------------------------
//-
}

//-----------------------------------------------------------------
 function buscarProductos(){
  
  console.log('diste click');
  const searchInput = document.getElementById('buscarPrincipal');
  const valorBusqueda = searchInput.value.trim();
  let galeriaImagenesBusqueda = document.getElementById('galeriaImagenes');
  console.log(valorBusqueda, 'dato del query');
  // Realiza la solicitud al servidor
  fetch("/cliente", {
    method: "POST",
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      busqueda: valorBusqueda
    })
  })
  .then(res=>res.json())
  .then(res=>{
   console.log(res.producto[0],'datos recibidos desde el servidor');
    // Redirige al cliente a la plantilla 'prueba.ejs' con los datos recibidos   "{-_-}" si pude "[-_-]"
   let url =`/ruta?nombre=${res.producto[0].nombre}&codigo=${res.producto[0].codigo}&precio=${res.producto[0].precio}&descripcion=${res.producto[0].descripcion}&cantidad=${res.producto[0].cantidad}&url=${res.producto[0].url}&calidad=${res.producto[0].calidad}`;
   
  window.location.href = url;
  })
}
//-----------------------------------------------------------------------
 /*function buscarProductos2(){
   const searchInput = document.getElementById('searchInputt');
  const valorBusqueda = searchInput.value.trim();
  let galeriaImagenesBusqueda = document.getElementById('galeriaImagenes');  
  console.log(valorBusqueda,'dato del query');

    // Elimina el último hijo de galeriaImagenesBusqueda, si existe
 const ultimoHijo = galeriaImagenesBusqueda.lastElementChild;
  if (ultimoHijo) {
    galeriaImagenesBusqueda.removeChild(ultimoHijo);
  }

     // Realiza la solicitud al servidor
    fetch(`/cliente?busqueda=${valorBusqueda}`)
    .then(response => response.json())
    .then(data => {

        if(data && data.producto.length > 0){

        let fragmento= document.createDocumentFragment();
         let img = document.createElement("img");
         let nombre = document.createElement('P');
         let precio = document.createElement('P');
         let div = document.createElement('DIV');
         let div2 = document.createElement('DIV');
         div2.style='display:flex;flex-direction:column;justify-content:center;aling-item:center;margin-left:30px';
         div.style='display:flex';
         nombre.innerHTML=`<span class='etiquetaP'>Nombre :</span> ${data.producto[0].nombre}`;
         precio.innerHTML=`<span class='etiquetaP'>Precio :</span> <span style='color:green'>${data.producto[0].precio} $</span>`;
         nombre.style='margin-top:30px';
         img.src=data.producto[0].url;
         img.classList.add('claseIMG');
         div2.append(nombre);
         div2.append(precio);
         div.append(img);
         div.append(div2);
         fragmento.append(div);
         galeriaImagenesBusqueda.append(fragmento);
      // Muestra los resultados en la página  

        }else{
              // No se encontraron resultados, muestra un mensaje
        let mensaje = document.createElement('P');
        mensaje.style='color:red;margin-top:60px;font:30px "fuenteC"';
        mensaje.innerHTML = 'No se encontraron resultados';
        galeriaImagenesBusqueda.appendChild(mensaje);

        }
         
    })
    .catch(error => {
      console.error(error.message);
    });
}*/





//--------------------------------------------------------------

//------------------------------------------------------------------
//peticion fetch
