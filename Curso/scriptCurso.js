///// PROPIEDADES //////
let datosTabla = document.querySelector('#datos');
let formulario = document.getElementById('formulario');
let nombrePagina = document.title;
let nombreModuloListar = 'Lista Curso';
let nombreModuloCrear = 'Crear Curso';
let formularioEditar = document.getElementById('formularioEditar');
let formularioEliminar = document.getElementById('formularioEliminar');


let url= "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaCurso.php";
let insertar = "InsertarCursos.php";
let actualizar = "ActualizarCursos.php";
let borrar = "BorrarCursos.php";



//spinner de carga de los datos//
let spinner= ` <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div> `



/////  EVENTOS  //////
if (nombrePagina == nombreModuloCrear) {

    formulario.addEventListener('submit', 
    function (e){
        e.preventDefault();

        let datos = new FormData(formulario);

        let datosEnviar = {
            nombre: datos.get('nombre'),
            descripcion: datos.get('descripcion'),
            tiempo: datos.get('tiempo'),
            usuario: datos.get('usuario'),
            
        }

            fetch(url + insertar, 
                {
                    method: 'POST',
                    body: JSON.stringify(datosEnviar)
                }
            )


            .then (respuesta => respuesta.json())
            .then ( (datosrespuesta) =>{
            //console.log(datosrespuesta)
            mensajeInsertar(datosrespuesta)
        })
           .catch(console.log)

           console.log(datosEnviar);
        //console.log(datos.get('correoelectronico'));
        //alert('1');
    })
}

if(nombrePagina == nombreModuloListar){
    formularioEditar.addEventListener('submit', 
        function(e) {
        e.preventDefault();//evita que la pagina se recargue
        
        let datos = new FormData(formularioEditar);
    
        let datosEnviar = {
                id: datos.get('id'),
                nombre: datos.get('nombre'),
                descripcion: datos.get('descripcion'),
                tiempo: datos.get('tiempo'),
                usuario: datos.get('usuario'),
        }
        console.log(datosEnviar);
    
            //url + insertar esto es la url del servicio concatenada
            fetch( url + actualizar,
                {
                    method: 'POST',
                    body: JSON.stringify(datosEnviar)
                } 
            )
            .then(respuesta=>respuesta.json())
            .then( (datosrepuesta) => {
                mensajeActualizar(datosrepuesta)
                console.log(datosrepuesta);
                console.log(datosEnviar);
            })
            .catch(console.log)
    })
}



///  FUNCIONES Y METODOS ////
function mensajeInsertar(datos){
    if (datos.code == 200) {
        alert("Ingreso exitoso");
    } 
    else 
    {
        alert("El correo ya fue utilizado");
    }
}


function cargarDatos(){
    loadspinner();
    fetch(url + listar)
    .then (respuesta => respuesta.json())
    .then ( (datosrespuesta) =>{
        //console.log(datosrespuesta)
        mostrarDatos(datosrespuesta)
    })
    .catch(console.log)
}

function mensajeActualizar(datos){
    if(datos.code == 200){        
        mensajesSistema.innerHTML = `<div
                class="alert alert-success alert-dismissible fade show"
                role="alert"
            >
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
                <strong>Actualizacion exitosa</strong>
            </div>`;

        setTimeout(cargarDatos, 3000);    
    }
    else{
        mensajesSistema.innerHTML = `<div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
            >
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
                <strong>Error al actualizar</strong>
            </div>`;
    }
}

function mostrarDatos(datos){
    //console.log(datos)
   
    if (datos.code == 200) {

       for(const iterator of datos.data){

        datosTabla.innerHTML += `

        <tr class= "">
            <td>
            <a
            name=""
            id=""
            class="btn btn-success"
            onclick="editar('${encodeURIComponent(JSON.stringify(iterator))}')"
            role="button"
            ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg></a
        >                    
        
        <a
            name=""
            id=""
            class="btn btn-danger"                        
            role="button"
            onclick="eliminar('${iterator.id}')"
            ><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg></a
        >
            
            
            </td>
            <td>${iterator.nombre}</td>
            <td>${iterator.descripcion}</td>
            <td>${iterator.tiempo}</td>
            <td>${iterator.usuario}</td> `
       }
       

    } else {
        alert("algo salio mal");
        
    }

    document.getElementById("spinnerload").innerHTML = "";

}


function editar(datos) {
    let objeto = JSON.parse(decodeURIComponent(datos));
    //console.log(objeto);
    const modalEdicion = new bootstrap.Modal(
        document.getElementById("modalEditar"));
        modalEdicion.show();
        document.getElementById("id").value = objeto.id;
    document.getElementById("nombre").value = objeto.nombre;
    document.getElementById("descripcion").value = objeto.descripcion;
    document.getElementById("tiempo").value = objeto.tiempo;
    document.getElementById("usuario").value = objeto.usuario;
    document.getElementById("idCarreras").value = objeto.idCarreras;
    document.getElementById("idEditar").innerHTML = objeto.id;


}


function loadspinner(){

    document.getElementById("spinnerload").innerHTML = spinner;

}

function eliminar(id){
    document.getElementById("idEliminar").innerHTML = id;
    document.getElementById("idEliminarModal").value = id;
    
    let modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
    modalEliminar.show();
}

function modalConfirmacionEliminar() {
    let idEliminar = document.getElementById('idEliminarModal').value;
    let datosEnviar = {
        id: idEliminar
    };

    fetch(url + borrar, {
        method: 'POST',
        body: JSON.stringify(datosEnviar)
    })
        .then(respuesta => respuesta.json())
        .then((datosrespuesta) => {
            if (datosrespuesta.code == 200) {
                document.getElementById('mensajesSistema').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <strong>Eliminación exitosa</strong>
                </div>`;
                setTimeout(cargarDatos, 3000); 
            } else {
                document.getElementById('mensajesSistema').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <strong>Error al eliminar</strong>
                </div>`;
            }
        })
        .catch(console.log);
}


///SECCION DE EJECUCIOND DE LOS DATOS/////
if (nombrePagina == nombreModuloListar) {
    cargarDatos();
}