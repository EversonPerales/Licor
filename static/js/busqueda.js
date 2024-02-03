
function cuadricula(){

    let ulTabla3 = document.querySelectorAll('.ULtabla3');
    let table = document.querySelector('.table');
    let productooo = document.querySelectorAll('.productooo');
    table.classList.toggle('tableMostrar');//muestro la tabla
    for(let k = 0 ; k < productooo.length;k++ ){
    productooo[k].classList.toggle('cadaProducto');
    ulTabla3[k].classList.toggle('claseTabla3-JS');
    }
    
    }
    
    //-----------------------------------------------------------------
     function buscarProductos(){
      const searchInput = document.getElementById('buscarPrincipal');
      const valorBusqueda = searchInput.value.trim();
      let galeriaImagenesBusqueda = document.getElementById('galeriaImagenes'); 
      console.log(valorBusqueda,'dato del query');
       // Elimina el último hijo de galeriaImagenesBusqueda, si existe
     const ultimoHijo = galeriaImagenesBusqueda.lastElementChild;
      if (ultimoHijo){
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
             let a = document.createElement('A');
             
              
             let divContenedorPuntuacion = document.createElement('DIV');
             divContenedorPuntuacion.style='margin-left:2rem;padding:.5rem;display:flex';
             divContenedorPuntuacion.classList.add('estrellas');
             let imgPuntuacion = [];
             for(let l = 0; l < 5;l++){
              let imagenP = document.createElement('IMG');
             imgPuntuacion.push(imagenP);
             imgPuntuacion[l].src='/icon/estrella.png';
             imgPuntuacion[l].style='width:20px';
             divContenedorPuntuacion.append(imgPuntuacion[l]);
             console.log(imgPuntuacion[l],'imagenes dentro del vector'); 
             }
    
             fetch(`/puntosDebusqueda?idProducto=${data.producto[0].producto_id}`)
             .then(res=>res.json())
             .then(respuesta=>{
    
              if(respuesta.error == true){
              console.log('Producto no calificado');  
            }else{
              console.log(respuesta.data,'datos de la puntuacion');
            }
              
             })
             
    
             
    
       
             a.setAttribute('href',`/comprar/${data.producto[0].producto_id}`);
             let imgComprar = document.createElement('IMG');
             imgComprar.src='/icon/comprar.png';
             imgComprar.style='width:30px';
             a.append(imgComprar);
             div2.style='display:flex;flex-direction:column;justify-content:center;aling-item:center;margin-left:30px';
             div.style='display:flex;flex-direction:column;padding:2rem';
             nombre.innerHTML=`<span class='etiquetaP'>Nombre :</span> ${data.producto[0].nombre}`;
             precio.innerHTML=`<span class='etiquetaP'>Precio :</span> <span style='color:green'>${data.producto[0].precio} $</span>`;
             nombre.style='margin-top:30px';
             img.src=data.producto[0].url;
             img.classList.add('claseIMG');
             div2.append(nombre);
             div2.append(precio);
             div2.append(a);
             div.append(img);
             div.append(div2);
             div.append(divContenedorPuntuacion);
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
    }
    //-----------------------------------------------------------------------
    async function buscarProductos2() {
      const searchInput = document.getElementById('searchInputt');
      const valorBusqueda = searchInput.value.trim();
      let galeriaImagenesBusqueda = document.getElementById('galeriaImagenes');
      console.log(valorBusqueda, 'dato del query');
    
      // Elimina el último hijo de galeriaImagenesBusqueda, si existe
      const ultimoHijo = galeriaImagenesBusqueda.lastElementChild;
      if (ultimoHijo) {
        galeriaImagenesBusqueda.removeChild(ultimoHijo);
      }
    
      try {
        // Realiza la solicitud al servidor utilizando async/await
        const response = await fetch(`/cliente?busqueda=${valorBusqueda}`);
        const data = await response.json();
        console.log(data);///////////////
        if (data && data.producto.length > 0){
          let fragmento = document.createDocumentFragment();
          let img = document.createElement("img");
          let nombre = document.createElement('P');
          let precio = document.createElement('P');
          let div = document.createElement('DIV');
          let div2 = document.createElement('DIV');
          div2.style = 'display:flex;flex-direction:column;justify-content:center;aling-item:center;margin-left:30px';
          let a = document.createElement('A');
          a.setAttribute('href',`/comprar/${data.producto[0].producto_id}`);
          let imgComprar = document.createElement('IMG');
          imgComprar.src = '/icon/comprar.png';
          imgComprar.style = 'width:30px';
          a.append(imgComprar);
          div.style = 'display:flex';
          nombre.innerHTML = `<span class='etiquetaP'>Nombre :</span> ${data.producto[0].nombre}`;
          precio.innerHTML = `<span class='etiquetaP'>Precio :</span> <span style='color:green'>${data.producto[0].precio} $</span>`;
          nombre.style = 'margin-top:30px';
          img.src = data.producto[0].url;
          img.classList.add('claseIMG');
          div2.append(nombre);
          div2.append(precio);
          div2.append(a);
          div.append(img);
          div.append(div2);
          fragmento.append(div);
          galeriaImagenesBusqueda.append(fragmento);
          // Muestra los resultados en la página  
    
        } else {
          // No se encontraron resultados, muestra un mensaje
          let mensaje = document.createElement('P');
          mensaje.style = 'color:red;margin-top:60px;font:30px "fuenteC"';
          mensaje.innerHTML = 'No se encontraron resultados';
          galeriaImagenesBusqueda.appendChild(mensaje);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    
    
    ///////////////////////////////////////////////
    
    
    ////////////////////////////////////////////////
    
    
    
    //--------------------------------------------------------------
    
    