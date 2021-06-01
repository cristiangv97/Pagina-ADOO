
let numero_caracteristica = 0;
let opcion_caracteristica = [0,0,0,0,0,0,0,0,0,0];

function eliminarOpcion(id_opcion) {
    opcion_caracteristica[numero_caracteristica]--;
    console.log("Removing " + id_opcion);
    console.log("We have " + opcion_caracteristica[numero_caracteristica] + " options");
    // alert("Tried to delete: "+id_opcion)
    document.getElementById(id_opcion).remove();
}

function agregarOpcion(no_caracteristica) {
    let elementoOpcion = document.getElementById( "caracteristica-"+no_caracteristica+"-opcion-0");
    // opcion_numero++;
    opcion_caracteristica[no_caracteristica] ++;
    console.log("Adding to caracteristica #"+no_caracteristica+" option #: "+opcion_caracteristica[no_caracteristica]);
    elementoOpcion.insertAdjacentHTML("beforebegin","" +
        "<div class='row mb-1' id='caracteristica-" + no_caracteristica + "-opcion-" + opcion_caracteristica[no_caracteristica] + "'>\n" +
        "<input type='text' class='form-control col' placeholder='Número de serie'>\n" +
        "<button type=\"button\" class=\"btn btn-warning col-2 mx-1\" onclick=\"eliminarOpcion('caracteristica-" + no_caracteristica +"-opcion-"+ opcion_caracteristica[no_caracteristica] + "')\" > X </button>\n" +
        "</div>");
}

function agregarCaracteristica() {

    let elementoCaracteristica = document.getElementById( "series-"+numero_caracteristica);
    numero_caracteristica++;
    console.log("Creating caracteristica #"+numero_caracteristica);

    elementoCaracteristica.insertAdjacentHTML("afterend","" +
        "<span id=\"series-"+ numero_caracteristica +"\">" +
        "   <div class=\"row text-center\">\n" +
        "                <h4 class=\"col\">Color</h4>\n" +
        "                <h4 class=\"col\">Asientos</h4>\n" +
        "                <h4 class=\"col\">Rines</h4>\n" +
        "                <h4 class=\"col\">Motor</h4>\n" +
        "                <h4 class=\"col\">Precio</h4>\n" +
        "                </div>\n" +
        "\n" +
        "                <div class=\"contenedorCapacidades  mb-3\">\n" +
        "                    <div class=\"row\" id=\"lista-caracteristicas\">\n" +
        "                        <!--    Ingreso de características del proveedor al vehiculo -->\n" +
        "                        <!-- Titulo \"opciones\" -->\n" +
        "                        <div class=\"col col-12 col-sm-12\">\n" +
        "                            <div class=\"row m-1\">\n" +
        "                                <div id=\"lista-caracteristica-0\">\n" +
        "                                    <!--Elementos de las caracteristicas -->\n" +
        "                                    <span id=\"caracteristica-" + numero_caracteristica + "-opcion-0\"></span>\n" +
        "                                </div>\n" +
        "                                <button class=\"btn btn-info \" onclick=\"agregarOpcion("+ numero_caracteristica +")\" type=\"button\">Agregar Stock\n" +
        "                                </button>\n" +
        "                            </div>\n" +
        "                        </div>\n" +
        "                        <!--    Fin de ingreso de características del proveedor al vehiculo -->\n" +
        "\n" +
        "\n" +
        "                    </div>\n" +
        "\n" +
        "\n" +
        "                 </div>" +
        "</span>");
}