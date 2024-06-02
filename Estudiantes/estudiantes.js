$(document).ready(function () {
  let tablaEstudiantes = $("#tablaEstudiantes");
  let mensajes = $("#mensajes");

  let url = "https://paginas-web-cr.com/Api/apis/";
  let listar = "ListaEstudiantes.php";
  let insertar = "InsertarEstudiantes.php";
  let actualizar = "ActualizarEstudiantes.php";

  let formulario = $("#formulario");
  let formularioEditar = $("#formularioEditar");

  let nombrePagina = document.title;
  let listarPagina = "Listar Estudiantes";
  let crearPagina = "Crear Estudiante";

  let spinner = `
            <button
            class="btn btn-primary"
            type="button"
            disabled
            >
            <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
            ></span>
            Loading...
            </button>`;

  if (nombrePagina == crearPagina) {
    formulario.on("submit", function (evento) {
      evento.preventDefault();

      let datos = formulario.serializeArray();
      let datosEnviar = {};

      $.each(datos, function (i, field) {
        datosEnviar[field.name] = field.value;
      });

      $.ajax({
        url: url + insertar,
        method: "POST",
        data: JSON.stringify(datosEnviar),
        success: function (datosrepuestas) {
          insertarDatos(datosrepuestas);

        },
        error: function (error) {
          console.log(error);
        }
      });
    });
  }

  if (nombrePagina == listarPagina) {
    formularioEditar.on("submit", function (evento) {
      evento.preventDefault();

      let datos = formularioEditar.serializeArray();
      let datosEnviar = {};

      $.each(datos, function (i, field) {
        datosEnviar[field.name] = field.value;
      });

      $.ajax({
        url: url + actualizar,
        method: "POST",
        data: JSON.stringify(datosEnviar),
        success: function (datosrepuestas) {
          editarDatos(datosrepuestas);
        },
        error: function (error) {
          console.log(error);
        }
      });
    });

    cargar();
  }

  function cargar() {
    tablaEstudiantes.html("");
    cargarspinner();
    $.ajax({
      url: url + listar,
      method: "GET",
      success: function (datosrepuestas) {
        pintardatos(datosrepuestas);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  function pintardatos(objetodatos) {
    if (objetodatos.code == 200) {
      $.each(objetodatos.data, function (i, item) {
        tablaEstudiantes.append(`
          <tr class="table-primary">
              <td scope="row">${item.id}</td>
              <td>${item.cedula}</td>
              <td>${item.correoelectronico}</td>
              <td>${item.telefono}</td>
              <td>${item.telefonocelular}</td>
              <td>${item.fechanacimiento}</td>
              <td>${item.sexo}</td>
              <td>${item.direccion}</td>
              <td>${item.nombre}</td>
              <td>${item.apellidopaterno}</td>
              <td>${item.apellidomaterno}</td>
              <td>${item.nacionalidad}</td>
              <td>${item.idCarreras}</td>
              <td>${item.usuario}</td>
              <td>
                  <a
                      name=""
                      id=""
                      class="btn btn-primary"
                      onclick="editar('${encodeURIComponent(
                        JSON.stringify(item)
                      )}')"
                      role="button"
                  >Editar</a>
                  <a
                      name=""
                      id=""
                      class="btn btn-danger"
                      onclick="eliminar('${item.id}')"
                      role="button"
                  >Eliminar</a>
              </td>
          </tr>`);
      });
    }
    $("#seccionspinner").html("");
  }

  function cargarspinner() {
    $("#seccionspinner").html(spinner);
  }

  function insertarDatos(datosrepuestas) {
    if (datosrepuestas.code == 200) {
      mensajes.html(`<div
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
      formulario.trigger("reset");

    } else {
      mensajes.html(`<div
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
  >
      <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
      ></button>
      <strong>Algo fallo</strong>
  </div>`);
    }
  }

  const modalEdicion = new bootstrap.Modal(
    document.getElementById("modalEdicion")
  );

  window.editar = function (datos) {
    let objeto = JSON.parse(decodeURIComponent(datos));

    $("#id").val(objeto.id);
    $("#cedula").val(objeto.cedula);
    $("#correoelectronico").val(objeto.correoelectronico);
    $("#telefono").val(objeto.telefono);
    $("#telefonocelular").val(objeto.telefonocelular);
    $("#fechanacimiento").val(objeto.fechanacimiento);
    $("#sexo").val(objeto.sexo);
    $("#direccion").val(objeto.direccion);
    $("#nombre").val(objeto.nombre);
    $("#apellidopaterno").val(objeto.apellidopaterno);
    $("#apellidomaterno").val(objeto.apellidomaterno);
    $("#nacionalidad").val(objeto.nacionalidad);
    $("#idCarreras").val(objeto.idCarreras);
    $("#usuario").val(objeto.usuario);

    modalEdicion.show();
  }

  function editarDatos(datosrepuestas) {
    if (datosrepuestas.code == 200) {
      mensajes.html(`<div
      class="alert alert-success alert-dismissible fade show"
      role="alert"
  >
      <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
      ></button>
      <strong>Modificacion exitosa</strong>
  </div>`);
      modalEdicion.hide();
      setTimeout(cargar, 1000);
    } else {
      mensajes.html(`<div
      class="alert alert-warning alert-dismissible fade show"
      role="alert"
  >
      <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
      ></button>
      <strong>Algo fallo</strong>
  </div>`);
    }
  }

  const modalEliminar = new bootstrap.Modal(
    document.getElementById("modalEliminar")
  );

  window.eliminar = function (id) {
    modalEliminar.show();
    $("#idEliminar").html(id);
    $("#idEliminarModal").val(id);
  }

  window.modalConfirmacionEliminar = function () {
    let datosEnviar = {
      id: $("#idEliminarModal").val()
    };

    $.ajax({
      url: url + "BorrarEstudiantes.php",
      method: "POST",
      data: JSON.stringify(datosEnviar),
      success: function (datosrepuestas) {
        if (datosrepuestas.code == 200) {
          modalEliminar.hide();
          mensajes.html(`<div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
      >
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
          ></button>
          <strong>Eliminacion exitosa</strong>
      </div>`);
        } else {
          mensajes.html(`<div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
      >
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
          ></button>
          <strong>Algo fallo</strong>
      </div>`);
        }
        setTimeout(cargar, 1000);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }
});
