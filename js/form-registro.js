$(document).ready(function () {
  $(".validar-form").validetta({
          bubblePosition: 'bottom',
          bubbleGapTop: 10,
          bubbleGapLeft: -5,
          realTime: true,
          onValid:function(e){
              // e.preventDefault(); //Cancelar el submit
          },
          onError:function(e){
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
      "   <div class='form-row'>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='nombre_registro'>Nombre/s*</label>\n" +
      "        <input type='text' class='form-control' id='nombre_registro' name='nombre_registro' data-validetta='letters,required' data-vd-message-required='Debes llenar el campo de Nombre/s'>\n" +
      "      </div>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='apellidoPaterno'>Apellido paterno*</label>\n" +
      "        <input type='text' class='form-control' id='apellidoPaterno' name='apellidoPaterno' data-validetta='letters,required' data-vd-message-required='Debes llenar el campo de Apellido Paterno'>\n" +
      "      </div>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='apellidoMaterno'>Apellido materno*</label>\n" +
      "        <input type='text' class='form-control' id='apellidoMaterno' name='apellidoMaterno' data-validetta='letters,required' data-vd-message-required='Debes llenar el campo de Apellido Materno'>\n" +
      "      </div>\n" +
      "    </div>\n" +
      "    <div class='form-row'>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='correo'>Correo electronico*</label>\n" +
      "        <input type='text' id='correo' name='correo' class='form-control' id='correo' data-validetta='required,email' data-vd-message-required='Debes llenar el campo de Correo electronico'>\n" +
      "      </div>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='contrasena'>Contraseña*</label>\n" +
      "        <input type='password' id='contrasena' name='contrasena' class='form-control' data-validetta='password,required' data-vd-message-required='Debes llenar el campo de Contraseña'>\n" +
      "      </div>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='confirmarContrasena'>Confirmar contraseña*</label>\n" +
      "        <input type='password' id='confirmarContrasena' name='confirmarContrasena' class='form-control' data-validetta='equalTo[contrasena],required' data-vd-message-required='Debes llenar el campo de Confirmar contraseña'>\n" +
      "      </div>\n" +
      "    </div>\n" +
      "    <h6>Todos los campos con un asterisco* son obligatorios.</h6>\n" +
      "    <div class='input-field'>\n" +
      "        <input type='submit' class='btn btn-primary col-12' style='width: 100%;' value='Registrarse'>\n" +
      "    </div>"
}

function formularioProveedor(){
  document.getElementById("formulario-registro").innerHTML = "\n" +
      "   <div class='form-row'>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='nombre_registroPro'>Razón social / Nombre de la empresa*</label>\n" +
      "        <input type='text' class='form-control' id='nombre_registroPro' name='nombre_registroPro' data-validetta='required' data-vd-message-required='Debes llenar el campo de Razón social / Nombre de la empresa'>\n" +
      "      </div>\n" +
      "    </div>\n" +
      "    <div class='form-row'>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='correoPro'>Correo electronico*</label>\n" +
      "        <input type='text' id='correoPro' name='correoPro' class='form-control' data-validetta='required,email' data-vd-message-required='Debes llenar el campo de Correo electronico'>\n" +
      "      </div>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='numPro'>Telefono*</label>\n" +
      "        <input type='text' id='numPro' name='numPro' class='form-control' data-validetta='number,required,minLength[10],maxLength[10]' data-vd-message-required='Debes llenar el campo de Telefono'>\n" +
      "      </div>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='contrasenaPro'>Contraseña*</label>\n" +
      "        <input type='password' id='contrasenaPro' name='contrasenaPro' class='form-control' data-validetta='password,required' data-vd-message-required='Debes llenar el campo de Contraseña'>\n" +
      "      </div>\n" +
      "      <div class='mb-3 input-field'>\n" +
      "        <label for='confContrasenaPro'>Confirmar contraseña*</label>\n" +
      "        <input type='password' id='confContrasenaPro' name='confContrasenaPro' class='form-control' data-validetta='equalTo[contrasenaPro],required' data-vd-message-required='Debes llenar el campo de Confirmar contraseña'>\n" +
      "      </div>\n" +
      "    </div>\n" +
      "    </div>\n" +
      "    <h6>Todos los campos con un asterisco* son obligatorios.</h6> \n" +
      "    <div class='input-field'>\n" +
      "        <input type='submit' class='btn btn-primary col-12' style='width: 100%;' value='Registrarse'>\n" +
      "    </div>"

}