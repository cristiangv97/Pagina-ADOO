<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
  <link rel="stylesheet" href="css/personal.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js" referrerpolicy="no-referrer"></script>
  <script src="js/bootstrap.bundle.min.js"></script>

  <script src="js/confirmar-compra.js"></script>

    <title>Barras de navegación</title>
</head>
<body>
    <div>
        <h3>Barra sin sesión iniciada</h3>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark rounded-bottom">
            <div class="container-fluid">
              <a class="navbar-brand" href="index.html">
                Isurus Ictu
              </a>
              <button class="navbar-toggler ms-auto"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
        
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mt-1 text-center">
                  <li class="nav-item"><a class="nav-link" href="index.html">Catálogo completo</a></li>
                  <li class="nav-item"><a class="nav-link" href="mas-vendidos.html">Más vendidos</a></li>
                  <li class="nav-item"><a class="nav-link" href="mas-recientes.html">Más recientes</a></li>
                  <li class="nav-item"><a class="nav-link bg-secondary btn active btn-nav" href="iniciar-sesion.html">Iniciar Sesion</a></li>
                  <li class="nav-item"><a class="nav-link bg-primary btn active btn-nav" href="crear-cuenta.html">Registrarse</a></li>
                </ul>
              </div>
            </div>
          </nav>
    </div>


    <div>
        <h3>Barra de navegación de usuario</h3>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark rounded-bottom">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">
                    Isurus Ictu
                </a>
                <button class="navbar-toggler ms-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
    
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mt-1 text-center">
                        <li class="nav-item"><a class="nav-link" href="index.html">Catálogo completo</a></li>
                        <li class="nav-item"><a class="nav-link" href="mas-vendidos.html">Más vendidos</a></li>
                        <li class="nav-item"><a class="nav-link" href="mas-recientes.html">Más recientes</a></li>
                        <li class="nav-item">
                            <!-- Inicio de DROPDOWN -->
                            <div class="dropdown">
                                <button class="btn btn-primary dropdown-toggle col-12" type="button" id="btnDropDownUsuario" data-bs-toggle="dropdown" aria-expanded="false">Juanito Pérez</button>
                                <ul class="dropdown-menu" aria-labelledby="btnDropDownUsuario">
                                    <li><a class="dropdown-item" href="#">Mi cuenta</a></li>
                                    <li><a class="dropdown-item" href="#">Mis compras</a></li>
                                    <li><a class="dropdown-item" href="#">Cerrar sesión</a></li>
                                </ul>
                            </div>
                            <!-- Final de DROPDOWN -->
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    </div>



    <div>
        <h3>Barra de navegación del proveedor</h3>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark rounded-bottom">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.html">
                    Isurus Ictu
                </a>
                <button class="navbar-toggler ms-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
    
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mt-1 text-center">
                        <li class="nav-item"><a class="nav-link" href="index.html">Catálogo completo</a></li>
                        <li class="nav-item"><a class="nav-link" href="mas-vendidos.html">Más vendidos</a></li>
                        <li class="nav-item"><a class="nav-link" href="mas-recientes.html">Más recientes</a></li>
                        <li class="nav-item">
                            <!-- Inicio de DROPDOWN -->
                            <div class="dropdown">
                                <button class="btn btn-primary dropdown-toggle col-12" type="button" id="btnDropDownUsuario" data-bs-toggle="dropdown" aria-expanded="false">Carros Mauricio</button>
                                <ul class="dropdown-menu" aria-labelledby="btnDropDownUsuario">
                                    <li><a class="dropdown-item" href="../../">Mi cuenta</a></li>
                                    <li><a class="dropdown-item" href="../../">Publicar</a></li>
                                    <li><a class="dropdown-item" href="../../">Mis publicaciones</a></li>
                                    <li><a class="dropdown-item" href="../../">Mis ventas</a></li>
                                    <li><a class="dropdown-item" href="../../index.html">Cerrar sesión</a></li>
                                </ul>
                            </div>
                            <!-- Final de DROPDOWN -->
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</body>
</html>