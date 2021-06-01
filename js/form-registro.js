function checarUsuario() {
    var tipoUsuario = document.getElementById("tipo-usuario").value;
    if (tipoUsuario === "Cliente"){
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
        "        <div class=\"invalid-feedback\">Favor de ingresa un correo valido.</div>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3\">\n" +
        "        <label for=\"validationCustom03\">Contraseña</label>\n" +
        "        <input type=\"password\" class=\"form-control\" id=\"validationCustom03\" required>\n" +
        "        <div class=\"invalid-feedback\">Favor de ingresar una contraseña</div>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "    </div>\n" +
        "    <button class='btn btn-primary col-12' type='submit' id='buton-registro'>Registrarse</button>"
}

function formularioProveedor(){
    document.getElementById("formulario-registro").innerHTML = "\n" +
        "      <div class=\"mb-3\">\n" +
        "        <label for=\"validationCustom01\">Razón social / Nombre de la empresa</label>\n" +
        "        <input type=\"text\" class=\"form-control\" id=\"validationCustom01\" required>\n" +
        "        <div class=\"invalid-feedback\">Favor de ingresar su nombre.</div>\n" +
        "      </div>\n" +
        "    <div class=\"form-row\">\n" +
        "      <div class=\"mb-3\">\n" +
        "        <label for=\"validationCustom04\">Correo electronico</label>\n" +
        "        <input type=\"email\" class=\"form-control\" id=\"validationCustom04\" placeholder=\"nombre@email.com\" required>\n" +
        "        <div class=\"invalid-feedback\">Favor de ingresa un correo valido.</div>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3\">\n" +
        "        <label for=\"validationCustom01\">Teléfono</label>\n" +
        "        <input type=\"tel\" class=\"form-control\" id=\"validationCustom01\" placeholder=\"5563218942\" required>\n" +
        "        <div class=\"invalid-feedback\">Favor de ingresar un numero de telefono.</div>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3\">\n" +
        "        <label for=\"validationCustom03\">Contraseña</label>\n" +
        "        <input type=\"password\" class=\"form-control\" id=\"validationCustom03\" required>\n" +
        "        <div class=\"invalid-feedback\">Favor de ingresar una contraseña</div>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "    </div>\n" +
        "    <button class='btn btn-primary col-12' type='submit' id='buton-registro'>Registrarse</button>"

}

(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();