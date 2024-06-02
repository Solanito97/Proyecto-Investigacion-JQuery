let menu = `
<ul
    class="nav nav-tabs justify-content-center"
    id="navId"
    role="tablist"
    >
    <li class="nav-item">
        <a
            href="/index.html"
            class="nav-link"
            aria-current="page"
            >Inicio
        </a>
    </li>
    <li class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            >Estudiante</a
        >
        <div class="dropdown-menu">
            <a class="dropdown-item" href="/Estudiantes/estudiantes.html">Lista Estudiantes</a>
            <a class="dropdown-item" href="/Estudiantes/crearEstudiante.html">Crear</a>
        </div>
    </li>

    <li class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            >Curso</a
        >
        <div class="dropdown-menu">
            <a class="dropdown-item" href="/Cursos/cursos.html">Lista Cursos</a>
            <a class="dropdown-item" href="/Cursos/crearCurso.html">Crear</a>
        </div>
        
    </li>

    <li class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            >Profesor</a
        >
        <div class="dropdown-menu">
            <a class="dropdown-item" href="/Profesores/profesores.html">Lista Profesores</a>
            <a class="dropdown-item" href="/Profesores/crearProfesor.html">Crear Profesor</a>
        </div>
        
    </li>

    <li class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            >Grupo</a
        >
        <div class="dropdown-menu">
            <a class="dropdown-item" href="/Grupos/grupos.html">Lista Grupos</a>
            <a class="dropdown-item" href="/Grupos/crearGrupo.html">Crear Grupo</a>
        </div>
        
    </li>
</ul>
`;

document.getElementById("menu").innerHTML = menu;


const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');
const dropdownItems = document.querySelectorAll('.dropdown-item');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

dropdownItems.forEach(item => {
    if (item.getAttribute('href') === currentPath) {
        item.classList.add('active');
        item.closest('.dropdown').querySelector('.nav-link').classList.add('active');
    }
});

let piedepagina = `
<div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <p class="col-md-4 mb-0 text-muted">© 2024 Proyecto Investigación, UCR</p>


    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">UP ⬆️</a></li>
    </ul>
  </footer>
</div>
`;

document.getElementById("piedepagina").innerHTML = piedepagina;