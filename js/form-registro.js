$(document).ready(function () {
    $(".validar-form").validetta({
            bubblePosition: 'bottom',
            bubbleGapTop: 10,
            bubbleGapLeft: -5,
            realTime: true,
            onValid:function(e){
                e.preventDefault(); //Cancelar el submit
            },

        });
})

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

    document.getElementById("formulario-registro").innerHTML = "\n"+
        "   <div class=\"form-row\">\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"nombre_registro\">Nombre/s*</label>\n" +
        "        <input type=\"text\" class=\"form-control\" id=\"nombre_registro\" data-validetta=\"letters,required\" data-vd-message-required='Debes llenar el campo de Nombre/s'>" +
        "      </div>\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"apellidos\">Apellido paterno*</label>\n" +
        "        <input type=\"text\" class=\"form-control\" id=\"apellidos\" data-validetta=\"letters,required\" data-vd-message-required='Debes llenar el campo de Appellido Paterno'>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"apellidos\">Apellido materno*</label>\n" +
        "        <input type=\"text\" class=\"form-control\" id=\"apellidos\" data-validetta=\"letters,required\" data-vd-message-required='Debes llenar el campo de Appellido Materno'>\n" +
        "      </div>\n" +
        "    <div class=\"form-row\">\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"correo\">Correo electronico*</label>\n" +
        "        <input type=\"text\" id=\"correo\" class=\"form-control\" id=\"correo\" data-validetta='required,email' data-vd-message-required='Debes llenar el campo de Correo electronico'>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"contrasena\">Contraseña*</label>\n" +
        "        <input type=\"password\" id=\"contrasena\" class=\"form-control\" data-validetta=\"required,minLength[6],maxLength[16]\" data-vd-message-required='Debes llenar el campo de Contraseña'>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"contrasena\">Confirmar contraseña*</label>\n" +
        "        <input type=\"password\" id=\"contrasena\" class=\"form-control\" data-validetta=\"required,minLength[6],maxLength[16]\" data-vd-message-required='Debes llenar el campo de Confirmar contraseña'>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "    </div>\n" +
        "    <h6>Todos los campos con un asterisco* son obligatorios.</h6>\n" +
        "    <div class=\"input-field\">\n" +
        "        <input type=\"submit\" class=\"btn btn-primary col-12\" style=\"width: 100%;\" value=\"Registrarse\">\n" +
        "    </div>"
}

function formularioProveedor(){
    document.getElementById("formulario-registro").innerHTML = "\n" +
        "   <div class=\"form-row\">\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"nombre_registro\">Razón social / Nombre de la empresa*</label>\n" +
        "        <input type=\"text\" class=\"form-control\" id=\"nombre_registro\" data-validetta=\"required\" data-vd-message-required='Debes llenar el campo de Razón social / Nombre de la empresa*'>" +
        "      </div>\n" +
        "    <div class=\"form-row\">\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"correo\">Correo electronico*</label>\n" +
        "        <input type=\"text\" id=\"correo\" class=\"form-control\" id=\"correo\" data-validetta='required,email' data-vd-message-required='Debes llenar el campo de Correo electronico'>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"contrasena\">Telefono*</label>\n" +
        "        <input type=\"text\" id=\"contrasena\" class=\"form-control\" data-validetta=\"number,required,minLength[6],maxLength[16]\" data-vd-message-required='Debes llenar el campo de Telefono'>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"contrasena\">Contraseña*</label>\n" +
        "        <input type=\"password\" id=\"contrasena\" class=\"form-control\" data-validetta=\"required,minLength[6],maxLength[16]\" data-vd-message-required='Debes llenar el campo de Contraseña'>\n" +
        "      </div>\n" +
        "      <div class=\"mb-3 input-field\">\n" +
        "        <label for=\"contrasena\">Confirmar contraseña*</label>\n" +
        "        <input type=\"password\" id=\"contrasena\" class=\"form-control\" data-validetta=\"required,minLength[6],maxLength[16]\" data-vd-message-required='Debes llenar el campo de Confirmar contraseña'>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "    </div>\n" +
        "    <h6>Todos los campos con un asterisco* son obligatorios.</h6> \n" +
        "    <button class='btn btn-primary col-12' type='submit' id='buton-registro'>Registrarse</button>"

}