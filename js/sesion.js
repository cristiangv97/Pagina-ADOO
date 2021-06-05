function checarSesion(condicionSesion) {
    console.log('Checking: ' + condicionSesion);
    if (condicionSesion.length !== 0){
        console.log('Sesion iniciado');
        document.getElementById("barra-de-navegacion").innerHTML = "" +
            "<nav class='navbar navbar-expand-md navbar-dark bg-dark rounded-bottom'>\n" +
            "            <div class='container-fluid'>\n" +
            // "                <<a class='navbar-brand' href='index.html'>\n" +
            // "                Isurus Ictu\n" +
            // "            </a>\n>" +
            "<form\n" +
            "          class=\"form-control form-control-lg validar-form bg-transparent border-0 w-50\"\n" +
            "          id=\"index\"\n" +
            "          action=\"/index.html\"\n" +
            "          method=\"POST\"\n" +
            "        >" +
            "<button class='navbar-brand nav-link btn' type='submit'>Isurus Ictu</button>" +
            "                <button class='navbar-toggler ms-auto' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>\n" +
            "                <span class='navbar-toggler-icon'></span>\n" +
            "            </button>\n" +
            "</form>" +
            "\n" +
            "                <div class='collapse navbar-collapse' id='navbarSupportedContent'>\n" +
            "                    <ul class='navbar-nav ms-auto mt-1 text-center'>\n" +
            "                        <li class='nav-item'><a class='nav-link' href='index.html'>Catálogo completo</a></li>\n" +
            "                        <li class='nav-item'><a class='nav-link' href='mas-vendidos.html'>Más vendidos</a></li>\n" +
            "                        <li class='nav-item'><a class='nav-link' href='mas-recientes.html'>Más recientes</a></li>\n" +
            "                        <li class='nav-item'>\n" +
            "                            <!-- Inicio de DROPDOWN -->\n" +
            "                            <div class='dropdown'>\n" +
            "                                <button class='btn btn-primary dropdown-toggle col-12' type='button' id='btnDropDown' data-bs-toggle='dropdown' aria-expanded='false'>Juanito Pérez</button>\n" +
            "                                <ul class='dropdown-menu' aria-labelledby='btnDropDown'>\n" +
            "                                    <li><a class='dropdown-item' href='información-cuenta.html'>Cuenta</a></li>\n" +
            "                                    <li><a class='dropdown-item' href='consultar-compras.html'>Compras</a></li>\n" +
            "                                    <li><a class='dropdown-item' href='./index.html'>Cerrar sesión</a></li>\n" +
            "                                </ul>\n" +
            "                            </div>\n" +
            "                            <!-- Final de DROPDOWN -->\n" +
            "                        </li>\n" +
            "                    </ul>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </nav>"

    }
    else{
        console.log('Sesion no iniciada');
        // window.location.replace(index.html);
        document.getElementById("barra-de-navegacion").innerHTML = "" +
            "<nav class='navbar navbar-expand-md navbar-dark bg-dark rounded-bottom'>\n" +
            "        <div class='container-fluid'>\n" +
            "          <a class='navbar-brand' href='../index.html'> Isurus Ictu </a>\n" +
            "          <button\n" +
            "            class='navbar-toggler ms-auto'\n" +
            "            type='button'\n" +
            "            data-bs-toggle='collapse'\n" +
            "            data-bs-target='#navbarSupportedContent'\n" +
            "            aria-controls='navbarSupportedContent'\n" +
            "            aria-expanded='false'\n" +
            "            aria-label='Toggle navigation'\n" +
            "          >\n" +
            "            <span class='navbar-toggler-icon'></span>\n" +
            "          </button>\n" +
            "\n" +
            "          <div class='collapse navbar-collapse' id='navbarSupportedContent'>\n" +
            "            <ul class='navbar-nav ms-auto mt-1 text-center'>\n" +
            "              <li class='nav-item'>\n" +
            "                <a class='nav-link' href='index.html'>Catálogo completo</a>\n" +
            "              </li>\n" +
            "              <li class='nav-item'>\n" +
            "                <a class='nav-link' href='mas-vendidos.html'>Más vendidos</a>\n" +
            "              </li>\n" +
            "              <li class='nav-item'>\n" +
            "                <a class='nav-link' href='mas-recientes.html'>Más recientes</a>\n" +
            "              </li>\n" +
            "              <li class='nav-item'>\n" +
            "                <a\n" +
            "                  class='nav-link bg-secondary btn active btn-nav'\n" +
            "                  href='iniciar-sesion.html'\n" +
            "                  >Iniciar Sesion</a\n" +
            "                >\n" +
            "              </li>\n" +
            "              <li class='nav-item'>\n" +
            "                <a\n" +
            "                  class='nav-link bg-primary btn active btn-nav'\n" +
            "                  href='crear-cuenta.html'\n" +
            "                  >Registrarse</a\n" +
            "                >\n" +
            "              </li>\n" +
            "            </ul>\n" +
            "          </div>\n" +
            "        </div>\n" +
            "      </nav>"

    }
}

function checarValidacion(errorM){
    console.log("1" + errorM);
    if(errorM.length > 0){
        alert(errorM);
        console.log("2" + errorM);
    }
}