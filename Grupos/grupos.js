$(document).ready(function () {
  let tablagrupos = $("#tablaGrupos");
  let mensajes = $("#mensajes");

  let url = "https://paginas-web-cr.com/Api/apis/";
  let listar = "ListaGrupo.php";
  let insertar = "InsertarGrupo.php";
  let actualizar = "ActualizarGrupo.php";

  let formulario = $("#formulario");
  let formularioEditar = $("#formularioEditar");

  let nombrePagina = document.title;
  let listarPagina = "Listar Grupos";
  let crearPagina = "Crear Grupos";

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
    tablagrupos.html("");
    cargarSpinner();
    $.ajax({
      url: url + listar,
      method: "GET",
      success: function (datosrepuestas) {
        pintarDatos(datosrepuestas);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  function pintarDatos(objetodatos) {
    if (objetodatos.code == 200) {
      $.each(objetodatos.data, function (i, item) {
        tablagrupos.append(`
          <tr class="table-info">
              <td scope="row">${item.id}</td>
              <td>${item.nombre}</td>
              <td>
                  <a
                      name=""
                      id=""
                      class="btn btn-primary"
                      onclick="editar('${encodeURIComponent(JSON.stringify(item))}')"
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

  function cargarSpinner() {
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

  const modalEdicion = new bootstrap.Modal($("#modalEdicion")[0]);

  window.editar = function (datos) {
    let objeto = JSON.parse(decodeURIComponent(datos));

    $("#id").val(objeto.id);
    $("#nombre").val(objeto.nombre);

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
        <strong>Modificación exitosa</strong>
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

  const modalEliminar = new bootstrap.Modal($("#modalEliminar")[0]);

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
      url: url + "BorrarGrupo.php",
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
            <strong>Eliminación exitosa</strong>
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