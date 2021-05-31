
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
        "<input type='text' class='form-control col' placeholder='Ejemplo: Rojo'>\n" +
        "<button type=\"button\" class=\"btn btn-warning col-2 mx-1\" onclick=\"eliminarOpcion('caracteristica-" + no_caracteristica +"-opcion-"+ opcion_caracteristica[no_caracteristica] + "')\" > X </button>\n" +
        "</div>");
}

function agregarCaracteristica() {

    let elementoCaracteristica = document.getElementById( "caracteristica-"+numero_caracteristica);
    numero_caracteristica++;
    console.log("Creating caracteristica #"+numero_caracteristica);

    elementoCaracteristica.insertAdjacentHTML("afterend","" +
        "<!-- Titulo \"caracterisiticas\" -->\n" +
        "\n" +
        "                    <div class=\"col col-lg-6 col-sm-12\">\n" +
        "                        <label for='caracteristica-personalizacion' class='form-label w-100'>Característica</label>\n" +
        "                        <input type='text' class='form-control' id='caracteristica-personalizacion' placeholder='Color'>\n" +
        "                    </div>" +
        " <!-- Titulo \"opciones\" -->\n" +
        "                    <div class=\"col col-lg-6 col-sm-12\" id=\"caracteristica-"+ numero_caracteristica +"\">\n" +
        "                        <div class=\"row\">\n" +
        "                            <label class='form-label' id=\"\">Opciones</label>\n" +
        "                            <div id=\"lista-caracteristica-"+ numero_caracteristica +"\">\n" +
        "                                <!--Elementos de las caracteristicas -->\n" +
        "                                <span id=\"caracteristica-"+ numero_caracteristica +"-opcion-0\"></span>\n" +
        "                            </div>\n" +
        "                            <button type=\"button\" class=\"btn btn-info \" onclick=\"agregarOpcion("+numero_caracteristica+")\">Agregar Opcion</button>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <!--    Fin de ingreso de características del proveedor al vehiculo -->");
}