///// PROPIEDADES //////
let $datosTabla = $('#datos');
let $formulario = $('#formulario');
let nombrePagina = document.title;
let nombreModuloListar = 'Estudiantes';
let nombreModuloCrear = 'Crear Estudiante';
let $formularioEditar = $('#formularioEditar');
let $formularioEliminar = $('#modalEliminar');


let url= "https://paginas-web-cr.com/Api/apis/";
let listar = "ListaEstudiantes.php";
let insertar = "InsertarEstudiantes.php";
let actualizar = "ActualizarEstudiantes.php";
let borrar = "BorrarEstudiantes.php";



//spinner de carga de los datos//
let spinner= ` <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div> `




/////  EVENTOS  //////
if (nombrePagina == nombreModuloCrear) {
    $formulario.on('submit', function (e){
        e.preventDefault();

        let datos = $formulario.serializeArray();
        let datosEnviar = {};
        $.each(datos, function() {
            datosEnviar[this.name] = this.value;
        });

        $.ajax({
            url: url + insertar,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datosEnviar),
            success: function (datosrespuesta) {
                mensajeInsertar(datosrespuesta);
            },
            error: function (error) {
                console.log(error);
            }
        });

        console.log(datosEnviar);
    });
}

if(nombrePagina == nombreModuloListar){
    $formularioEditar.on('submit', function(e) {
        e.preventDefault();//evita que la pagina se recargue
        
        let datos = $formularioEditar.serializeArray();
        let datosEnviar = {};
        $.each(datos, function() {
            datosEnviar[this.name] = this.value;
        });

        $.ajax({
            url: url + actualizar,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datosEnviar),
            success: function (datosrepuesta) {
                mensajeActualizar(datosrepuesta);
                console.log(datosrepuesta);
                console.log(datosEnviar);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
}


///  FUNCIONES Y METODOS ////
function mensajeInsertar(datos){
    if(datos.code == 200){        
        $('#mensajesSistema').html(`<div
                class="alert alert-success alert-dismissible fade show"
                role="alert"
            >
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
                <strong>Ingreso exitoso</strong>
            </div>`);
    }
    else{
        $('#mensajesSistema').html(`<div
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
            >
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
                <strong>Correo duplicado</strong>
            </div>`);
    }
}

function mensajeActualizar(datos){
    if(datos.code == 200){        
        $('#mensajesSistema').html(`<div
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
            </div>`);

        setTimeout(cargarDatos, 3000);    
    }
    else{
        $('#mensajesSistema').html(`<div
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
            </div>`);
    }
}

function cargarDatos(){
    loadspinner();
    $.get(url + listar, function(datosrespuesta) {
        mostrarDatos(datosrespuesta);
    }).fail(function(error) {
        console.log(error);
    });
}

function mostrarDatos(datos){
    if (datos.code == 200) {
        $.each(datos.data, function(index, iterator) {
            $datosTabla.append(`
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
                <td>${iterator.id}</td>
                <td>${iterator.nombre} ${iterator.apellidopaterno} ${iterator.apellidomaterno}</td>
                <td>${iterator.correoelectronico}</td>
                <td>${iterator.telefono}</td>
                <td>${iterator.telefonocelular}</td>
                <td>${iterator.fechanacimiento}</td>
                <td>${iterator.sexo}</td>
                <td>${iterator.direccion}</td>
                <td>${iterator.apellidopaterno}</td>
                <td>${iterator.apellidomaterno}</td>
                <td>${iterator.nacionalidad}</td>
                <td>${iterator.idCarreras}</td>
                <td>${iterator.usuario}</td>
            `);
        });
    } else {
        alert("algo salio mal");
    }

    $("#spinnerload").html("");
}

function loadspinner(){
    $("#spinnerload").html(spinner);
}

function editar(datos) {
    let objeto = JSON.parse(decodeURIComponent(datos));
    const modalEdicion = new bootstrap.Modal($('#modalEditar')[0]);
    modalEdicion.show();
    $('#cedula').val(objeto.cedula);
    $('#correoelectronico').val(objeto.correoelectronico);
    $('#telefono').val(objeto.telefono);
    $('#telefonocelular').val(objeto.telefonocelular);
    $('#fechanacimiento').val(objeto.fechanacimiento);
    $('#sexo').val(objeto.sexo);
    $('#direccion').val(objeto.direccion);
    $('#nombre').val(objeto.nombre);
    $('#apellidopaterno').val(objeto.apellidopaterno);
    $('#apellidomaterno').val(objeto.apellidomaterno);
    $('#nacionalidad').val(objeto.nacionalidad);
    $('#idCarreras').val(objeto.idCarreras);
    $('#usuario').val(objeto.usuario);
    $('#id').val(objeto.id);
    $('#idEditar').html(objeto.id);
}

function eliminar(id){
    $("#idEliminar").html(id);
    $("#idEliminarModal").val(id);
    const modalEliminar = new bootstrap.Modal($('#modalEliminar')[0]);
    modalEliminar.show();
}

function modalConfirmacionEliminar() {
    let idEliminar = $('#idEliminarModal').val();
    let datosEnviar = { id: idEliminar };

    $.ajax({
        url: url + borrar,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(datosEnviar),
        success: function (datosrespuesta) {
            if (datosrespuesta.code == 200) {
                $('#mensajesSistema').html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <strong>Eliminación exitosa</strong>
                </div>`);
                setTimeout(cargarDatos, 3000); 
            } else {
                $('#mensajesSistema').html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    <strong>Error al eliminar</strong>
                </div>`);
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

///SECCION DE EJECUCIOND DE LOS DATOS/////
if (nombrePagina == nombreModuloListar) {
    cargarDatos();
}
