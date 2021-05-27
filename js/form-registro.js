function checarUsuario() {
    var x = document.getElementById("tipo-usuario").value;
    if (x === "Cliente"){
        formularioCliente();
    }
    else{
        formularioProveedor();
    }

}

function formularioCliente() {
    document.getElementById("formulario-registro").innerHTML = "<div class=\"form-row\">\n" +
        "      <div class=\"mb-3\">\n" +
        "        <label for=\"validationCustom01\">Nombre/s</label>\n" +
        "        <input type=\"text\" class=\"form-control\" id=\"validationCustom01\" placeholder=\"Juan\" required>\n" +
        "        <div class=\"invalid-feedback\">Favor de ingresar su nombre.</div>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3\">\n" +
        "        <label for=\"validationCustom02\">Apellidos</label>\n" +
        "        <input type=\"text\" class=\"form-control\" id=\"validationCustom02\" placeholder=\"Perez\" required>\n" +
        "        <div class=\"invalid-feedback\">Favor de ingresar su apellido.</div>\n" +
        "      </div>\n" +
        "    <div class=\"form-row\">\n" +
        "      <div class=\"mb-3\">\n" +
        "        <label for=\"validationCustom04\">Correo electronico</label>\n" +
        "        <input type=\"email\" class=\"form-control\" id=\"validationCustom04\" placeholder=\"nombre@email.com\" required>\n" +
        "        <div class=\"invalid-feedback\">Email valido pls</div>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3\">\n" +
        "        <label for=\"validationCustom03\">Contraseña</label>\n" +
        "        <input type=\"password\" class=\"form-control\" id=\"validationCustom03\" required>\n" +
        "        <div class=\"invalid-feedback\">Favor de ingresar una contraseña</div>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "    </div>\n" +
        "    <button class='btn btn-primary col-12' type='submit'>Registrarse</button>"
}

function formularioProveedor(){
    document.getElementById("formulario-registro").innerHTML = "\n" +
        "      <div class='mb-3'>\n" +
        "        <label for='entrada-nombre' class='form-label'>Nombre de organizacion</label>\n" +
        "        <input type='text' class='form-control' id='entrada-nombre'>\n" +
        "      </div>\n" +
        "      <div class='mb-3'>\n" +
        "        <label for='entrada-nombre' class='form-label'><em>Campo en blanco</em></label>\n" +
        "        <input type='text' class='form-control' id='entrada-nombre'>\n" +
        "      </div>\n" +
        "      <div class='mb-3'>\n" +
        "        <label for='entrada-nombre' class='form-label'><em>Campo en blanco</em></label>\n" +
        "        <input type='text' class='form-control' id='entrada-nombre'>\n" +
        "      </div>\n" +
        "      <div class='mb-3'>\n" +
        "        <label for='exampleInputEmail1' class='form-label'>Correo electronico</label>\n" +
        "        <input type='email' class='form-control' id='exampleInputEmail1' aria-describedby='emailHelp'>\n" +
        "      </div>\n" +
        "      <div class='mb-3'>\n" +
        "        <label for='entrada-contrasena' class='form-label'>Contraseña</label>\n" +
        "        <input type='password' class='form-control' id='entrada-contrasena'>\n" +
        "      </div>\n" +
        "      <a href='index.html' class='btn btn-primary col-12' role='button'>Registrarse</a>\n"
}