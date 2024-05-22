// Seccion de Menu
let menu = `
            <ul
                class="nav nav-tabs justify-content-center"
                id="navId"
                role="tablist"
                >
                <li class="nav-item">
                    <a
                        href="/index.html"
                        class="nav-link active"
                        
                        aria-current="page"
                        >Home</a
                    >
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
                        <a class="dropdown-item" href="/Estudiantes/listaEstudiantes.html">Lista Estudiantes</a>
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
                        <a class="dropdown-item" href="/Curso/listaCurso.html">Lista</a>
                        <a class="dropdown-item" href="/Curso/crearCurso.html">Crear</a>
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
                        <a class="dropdown-item" href="/Profesor/listaProfesor.html">Lista</a>
                        <a class="dropdown-item" href="/Profesor/crearProfesor.html">Crear</a>
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
                        <a class="dropdown-item" href="/Grupo/listaGrupos.html">Lista</a>
                        <a class="dropdown-item" href="/Grupo/crearGrupo.html">Crear</a>
                    </div>
                    
                </li>
                
            </ul>
`;

document.getElementById("contenedormenu").innerHTML = menu;


// Seccion de pie de pagina


let pie = `
<div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <p class="col-md-4 mb-0 text-muted">© 2024 Proyecto Personal, Byron Solano, UCR</p>

    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
    </a>

    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
    </ul>
  </footer>
</div>
`;

document.getElementById("contenedorpie").innerHTML = pie;